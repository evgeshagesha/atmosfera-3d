"""Lead drip after channel subscribe (job-queue + JSON persist for VPS restarts).

Timeline after successful subscribe:
  T+20s   — save-the-bot reminder
  T+24h   — Day 1 workout
  T+28h   — Day 1 nudge
  T+48h   — Day 2 breath + short tip
  T+72h   — Day 3 EG 3D + short tip
  T+96h   — Day 4 start-post reminder
  T+100h  — Day 4 nudge
  T+120h  — Day 5
  T+132h  — final nudge, then STOP

Click-based 3–5h nudge is NOT scheduled: Telegram URL buttons do not fire callbacks.
"""
from __future__ import annotations

import json
import logging
import time
from pathlib import Path
from typing import Any

from telegram.ext import Application, ContextTypes

import funnel_copy as copy
import onboarding_state
from bot_analytics import track

logger = logging.getLogger(__name__)

HOUR = 3600
DAY_TIP_DELAY = 45

FOLLOWUP_DELAYS = (
    (20, "fu_save_bot"),
    (24 * HOUR, "fu_day1"),
    (28 * HOUR, "fu_day1_nudge"),
    (48 * HOUR, "fu_day2"),
    (72 * HOUR, "fu_day3"),
    (96 * HOUR, "fu_day4"),
    (100 * HOUR, "fu_day4_nudge"),
    (120 * HOUR, "fu_day5"),
    (132 * HOUR, "fu_final"),
)

_JOBS_PATH = Path(__file__).resolve().parent / "data" / "lead_drip_jobs.json"
_KIND_ORDER = (
    "fu_save_bot",
    "fu_day1",
    "fu_day1_nudge",
    "fu_day2",
    "fu_day2_tip",
    "fu_day3",
    "fu_day3_tip",
    "fu_day4",
    "fu_day4_nudge",
    "fu_day5",
    "fu_final",
)

_DAY_FLAGS = {
    "fu_day1": "day1_sent",
    "fu_day2": "day2_sent",
    "fu_day3": "day3_sent",
    "fu_day4": "day4_sent",
    "fu_day5": "day5_sent",
    "fu_final": "final_nudge_sent",
}


def _load_jobs() -> list[dict[str, Any]]:
    if not _JOBS_PATH.exists():
        return []
    try:
        data = json.loads(_JOBS_PATH.read_text(encoding="utf-8"))
        return data if isinstance(data, list) else []
    except Exception as exc:
        logger.warning("lead drip jobs load failed: %s", exc)
        return []


def _save_jobs(jobs: list[dict[str, Any]]) -> None:
    try:
        _JOBS_PATH.parent.mkdir(parents=True, exist_ok=True)
        _JOBS_PATH.write_text(
            json.dumps(jobs, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
    except Exception as exc:
        logger.warning("lead drip jobs save failed: %s", exc)


def _remove_user_jobs(user_id: int) -> list[dict[str, Any]]:
    jobs = [j for j in _load_jobs() if int(j.get("user_id") or 0) != int(user_id)]
    _save_jobs(jobs)
    return jobs


def _upsert_job(entry: dict[str, Any]) -> None:
    jobs = _load_jobs()
    key = (int(entry["user_id"]), str(entry["kind"]))
    jobs = [
        j
        for j in jobs
        if (int(j.get("user_id") or 0), str(j.get("kind") or "")) != key
    ]
    jobs.append(entry)
    _save_jobs(jobs)


def _mark_done(user_id: int, kind: str) -> None:
    jobs = [
        j
        for j in _load_jobs()
        if not (
            int(j.get("user_id") or 0) == int(user_id)
            and str(j.get("kind") or "") == kind
        )
    ]
    _save_jobs(jobs)


def _job_name(kind: str, user_id: int) -> str:
    return f"lead_{kind}_{user_id}"


def user_has_pending_jobs(user_id: int) -> bool:
    uid = int(user_id)
    return any(int(j.get("user_id") or 0) == uid for j in _load_jobs())


def _schedule_once(
    jq,
    *,
    kind: str,
    chat_id: int,
    user_id: int,
    delay: float,
    run_at: float | None = None,
) -> None:
    name = _job_name(kind, user_id)
    for old in jq.get_jobs_by_name(name):
        old.schedule_removal()
    when = max(0.0, float(delay))
    jq.run_once(
        _job_followup,
        when=when,
        data={"chat_id": chat_id, "kind": kind, "user_id": user_id},
        name=name,
        chat_id=chat_id,
        user_id=user_id,
    )
    _upsert_job(
        {
            "chat_id": chat_id,
            "user_id": user_id,
            "kind": kind,
            "run_at": float(run_at if run_at is not None else time.time() + when),
        }
    )


async def _send(context: ContextTypes.DEFAULT_TYPE, chat_id: int, text: str, markup=None) -> None:
    await context.bot.send_message(
        chat_id,
        text,
        reply_markup=markup,
        parse_mode=copy.PARSE_MODE,
        disable_web_page_preview=True,
    )


async def _job_followup(context: ContextTypes.DEFAULT_TYPE) -> None:
    data = context.job.data or {}
    chat_id = data.get("chat_id")
    kind = data.get("kind")
    user_id = data.get("user_id")
    if not chat_id or not kind:
        return

    if user_id and onboarding_state.is_completed(int(user_id)):
        _mark_done(int(user_id), str(kind))
        return

    try:
        if kind == "fu_save_bot":
            await _send(context, chat_id, copy.save_bot_text())
        elif kind == "fu_day1":
            await _send(context, chat_id, copy.day1_text(), copy.day1_keyboard())
        elif kind == "fu_day1_nudge":
            await _send(
                context, chat_id, copy.day1_nudge_text(), copy.day1_nudge_keyboard()
            )
        elif kind == "fu_day2":
            await _send(context, chat_id, copy.day2_text(), copy.day2_keyboard())
            jq = context.application.job_queue
            if jq is not None and user_id:
                _schedule_once(
                    jq,
                    kind="fu_day2_tip",
                    chat_id=int(chat_id),
                    user_id=int(user_id),
                    delay=DAY_TIP_DELAY,
                )
        elif kind == "fu_day2_tip":
            await _send(context, chat_id, copy.day2_tip_text())
        elif kind == "fu_day3":
            await _send(context, chat_id, copy.day3_text(), copy.day3_keyboard())
            jq = context.application.job_queue
            if jq is not None and user_id:
                _schedule_once(
                    jq,
                    kind="fu_day3_tip",
                    chat_id=int(chat_id),
                    user_id=int(user_id),
                    delay=DAY_TIP_DELAY,
                )
        elif kind == "fu_day3_tip":
            await _send(context, chat_id, copy.day3_tip_text())
        elif kind == "fu_day4":
            await _send(
                context,
                chat_id,
                copy.day4_text(),
                copy.open_start_keyboard("📌 Вернуться к точке старта"),
            )
        elif kind == "fu_day4_nudge":
            await _send(
                context,
                chat_id,
                copy.day4_nudge_text(),
                copy.open_start_keyboard("🎯 Определить свою точку старта"),
            )
        elif kind == "fu_day5":
            await _send(
                context,
                chat_id,
                copy.day5_text(),
                copy.open_start_keyboard("🎯 Начать сейчас"),
            )
        elif kind == "fu_final":
            await _send(
                context,
                chat_id,
                copy.final_nudge_text(),
                copy.open_start_keyboard("📌 Начать с главного"),
            )
            if user_id:
                onboarding_state.update_state(
                    int(user_id),
                    final_nudge_sent=True,
                    drip_active=False,
                    onboarding_sequence_completed=True,
                )
                track("bot_final_nudge_sent", user_id=user_id)
        else:
            logger.warning("unknown lead drip kind=%s", kind)
            return
    except Exception as exc:
        logger.warning("followup %s failed chat=%s: %s", kind, chat_id, exc)
        return

    if user_id:
        flag = _DAY_FLAGS.get(str(kind))
        if flag and kind != "fu_final":
            onboarding_state.update_state(int(user_id), **{flag: True})
        _mark_done(int(user_id), str(kind))


def schedule_lead_followups(
    context: ContextTypes.DEFAULT_TYPE, *, chat_id: int, user_id: int
) -> None:
    """Schedule 5-day onboarding. No-op if already active or completed."""
    if onboarding_state.is_completed(user_id):
        logger.info("skip drip schedule — already completed user=%s", user_id)
        return
    if onboarding_state.is_drip_active(user_id) or user_has_pending_jobs(user_id):
        logger.info("skip drip schedule — already active user=%s", user_id)
        return

    jq = context.application.job_queue
    if jq is None:
        logger.warning("job_queue unavailable — follow-ups not scheduled")
        return

    for kind in _KIND_ORDER:
        name = _job_name(kind, user_id)
        for old in jq.get_jobs_by_name(name):
            old.schedule_removal()
    _remove_user_jobs(user_id)

    now = time.time()
    for delay, kind in FOLLOWUP_DELAYS:
        _schedule_once(
            jq,
            kind=kind,
            chat_id=chat_id,
            user_id=user_id,
            delay=delay,
            run_at=now + delay,
        )
    onboarding_state.update_state(user_id, drip_active=True)
    logger.info(
        "Scheduled %s lead drip jobs for user=%s", len(FOLLOWUP_DELAYS), user_id
    )


async def restore_lead_followups(application: Application) -> None:
    """Re-queue pending drip jobs after bot restart."""
    jq = application.job_queue
    if jq is None:
        logger.warning("job_queue unavailable — cannot restore drip jobs")
        return

    now = time.time()
    pending = _load_jobs()
    restored = 0
    kept: list[dict[str, Any]] = []
    for entry in pending:
        try:
            chat_id = int(entry["chat_id"])
            user_id = int(entry["user_id"])
            kind = str(entry["kind"])
            run_at = float(entry["run_at"])
        except (KeyError, TypeError, ValueError):
            continue
        if onboarding_state.is_completed(user_id):
            continue
        delay = max(0.0, run_at - now)
        if run_at < now - 2 * 24 * 3600:
            continue
        name = _job_name(kind, user_id)
        for old in jq.get_jobs_by_name(name):
            old.schedule_removal()
        jq.run_once(
            _job_followup,
            when=delay,
            data={"chat_id": chat_id, "kind": kind, "user_id": user_id},
            name=name,
            chat_id=chat_id,
            user_id=user_id,
        )
        kept.append(
            {
                "chat_id": chat_id,
                "user_id": user_id,
                "kind": kind,
                "run_at": run_at if run_at > now else now + delay,
            }
        )
        restored += 1
    _save_jobs(kept)
    if restored:
        logger.info("Restored %s lead drip jobs from disk", restored)
