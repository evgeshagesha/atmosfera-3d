"""Lead drip after free daily workout (job-queue + JSON persist for VPS restarts).

Timeline after workout delivery:
  T+25s  — soft ask «Сделал»
  T+24h  — Day 1 (repeat workout)
  T+48h  — Day 2 (breath) + T+45s tip
  T+72h  — Day 3 (EG 3D) + T+45s tip
  T+96h  — Day 4 (body test / final step)
"""
from __future__ import annotations

import json
import logging
import time
from pathlib import Path
from typing import Any

from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, ContextTypes

from products import get_page_url

logger = logging.getLogger(__name__)

WORKOUT_URL = "https://t.me/EvgeniiGoshev/1326"
BREATH_URL = "https://t.me/EvgeniiGoshev/760"
EG3D_URL = "https://t.me/EvgeniiGoshev/1299"
TEST_URL_FALLBACK = "https://egoshev.ru/testik"

# seconds after workout delivery
FOLLOWUP_DELAYS = (
    (25, "fu_ask"),
    (24 * 3600, "fu_day1"),
    (48 * 3600, "fu_day2"),
    (72 * 3600, "fu_day3"),
    (96 * 3600, "fu_day4"),
)

# secondary tips after day video messages (seconds after that day job fires)
DAY_TIP_DELAY = 45

_JOBS_PATH = Path(__file__).resolve().parent / "data" / "lead_drip_jobs.json"
_KIND_ORDER = ("fu_ask", "fu_day1", "fu_day2", "fu_day2_tip", "fu_day3", "fu_day3_tip", "fu_day4")


def _test_url() -> str:
    return get_page_url("body_test") or TEST_URL_FALLBACK


def _workout_url() -> str:
    return get_page_url("lead_telo") or WORKOUT_URL


def _progress_line(kind: str) -> str:
    return {
        "fu_day1": "✅ День 1 из 4",
        "fu_day2": "✅ День 2 из 4",
        "fu_day3": "✅ День 3 из 4",
        "fu_day4": "✅ Финальный шаг",
    }.get(kind, "")


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


async def _job_followup(context: ContextTypes.DEFAULT_TYPE) -> None:
    data = context.job.data or {}
    chat_id = data.get("chat_id")
    kind = data.get("kind")
    user_id = data.get("user_id")
    if not chat_id or not kind:
        return

    try:
        if kind == "fu_ask":
            await context.bot.send_message(
                chat_id,
                "🔥 Небольшая просьба.\n\n"
                "Не откладывай.\n"
                "Сделай тренировку сегодня.\n\n"
                "Это займёт всего 8–10 минут, но именно первое выполненное "
                "занятие станет началом изменений.\n\n"
                "После выполнения напиши мне, пожалуйста:\n"
                "«Сделал».\n\n"
                "Мне будет интересно узнать твои ощущения.",
            )
        elif kind == "fu_day1":
            progress = _progress_line(kind)
            workout = _workout_url()
            await context.bot.send_message(
                chat_id,
                f"{progress}\n\n"
                "💬 Как ощущения после первой тренировки?\n\n"
                "Удалось выполнить её?\n\n"
                "Даже если сделал только часть комплекса — это уже отличный "
                "первый шаг.\n\n"
                "Очень часто после первого занятия люди замечают:\n"
                "✅ лёгкость в теле;\n"
                "✅ уменьшение напряжения;\n"
                "✅ больше подвижности;\n"
                "✅ ощущение, что двигаться стало проще.\n\n"
                "Если ещё не успел — ничего страшного.\n"
                "Не откладывай.\n"
                "Сегодня выдели всего 10 минут для себя.\n\n"
                "🎥 Нажми кнопку ниже и выполни тренировку ещё раз.\n"
                "Каждый повтор — это вклад в здоровье твоего тела.",
                reply_markup=InlineKeyboardMarkup(
                    [[InlineKeyboardButton("▶️ Повторить тренировку", url=workout)]]
                ),
            )
        elif kind == "fu_day2":
            progress = _progress_line(kind)
            await context.bot.send_message(
                chat_id,
                f"{progress}\n\n"
                "🌬 Сегодня хочу подарить тебе ещё одну практику.\n\n"
                "Большинство людей заботится только о мышцах.\n"
                "Но забывает о самом главном — дыхании.\n\n"
                "Именно дыхание помогает:\n"
                "🧠 снизить уровень стресса;\n"
                "❤️ успокоить нервную систему;\n"
                "💨 улучшить насыщение тканей кислородом;\n"
                "⚡ почувствовать больше энергии и ясности.\n\n"
                "Я подготовил для тебя простую дыхательную практику.\n"
                "Выполняй её спокойно, не торопясь и внимательно наблюдай "
                "за ощущениями.\n\n"
                "После выполнения обязательно напиши мне:\n"
                "Что изменилось?",
                reply_markup=InlineKeyboardMarkup(
                    [
                        [
                            InlineKeyboardButton(
                                "🌬 Открыть дыхательную практику",
                                url=BREATH_URL,
                            )
                        ]
                    ]
                ),
            )
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
            await context.bot.send_message(
                chat_id,
                "✨ Помни.\n\n"
                "Движение и дыхание работают намного сильнее вместе, "
                "чем по отдельности.\n\n"
                "Попробуй сегодня совместить дыхательную практику "
                "и первую тренировку.\n"
                "Ты почувствуешь разницу.",
            )
        elif kind == "fu_day3":
            progress = _progress_line(kind)
            await context.bot.send_message(
                chat_id,
                f"{progress}\n\n"
                "🔥 Хочу подарить тебе ещё один инструмент.\n\n"
                "Это не просто зарядка.\n"
                "Это моя авторская EG 3D функциональная зарядка.\n\n"
                "Она одновременно работает как:\n"
                "✅ тест тела;\n"
                "✅ качественная разминка;\n"
                "✅ полноценная тренировка.\n\n"
                "Во время выполнения ты сразу заметишь:\n"
                "• где тело двигается свободно;\n"
                "• где есть ограничения;\n"
                "• отличается ли правая сторона от левой;\n"
                "• насколько хорошо работает баланс;\n"
                "• где появляется лишнее напряжение.\n\n"
                "Всего 7–10 минут.\n"
                "Но именно такие ежедневные движения постепенно возвращают "
                "телу мобильность, устойчивость и контроль.\n\n"
                "Попробуй выполнить комплекс спокойно и ответь себе "
                "на три вопроса:\n"
                "1️⃣ Где движение ограничено?\n"
                "2️⃣ Есть ли разница между сторонами?\n"
                "3️⃣ Что изменилось после второго круга?\n\n"
                "Тело всегда подсказывает, что ему необходимо.\n"
                "Нужно только научиться его слышать.",
                reply_markup=InlineKeyboardMarkup(
                    [
                        [
                            InlineKeyboardButton(
                                "💪 Выполнить EG 3D зарядку",
                                url=EG3D_URL,
                            )
                        ]
                    ]
                ),
            )
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
            await context.bot.send_message(
                chat_id,
                "✨ Сохрани эту зарядку.\n\n"
                "Если выполнять её регулярно утром или после долгого сидения, "
                "тело постепенно станет легче, подвижнее и устойчивее.",
            )
        elif kind == "fu_day4":
            progress = _progress_line(kind)
            test = _test_url()
            await context.bot.send_message(
                chat_id,
                f"{progress}\n\n"
                "🚀 Ты уже познакомился с моим подходом.\n\n"
                "За несколько дней ты попробовал:\n"
                "✅ ежедневную тренировку;\n"
                "✅ дыхательную практику;\n"
                "✅ EG 3D функциональную зарядку.\n\n"
                "Теперь сделай следующий шаг.\n\n"
                "Пройди мой тест «20 движений».\n\n"
                "Он поможет определить, какие ограничения есть именно "
                "у твоего тела, и понять, с чего лучше начать работу "
                "с телом.\n\n"
                "После прохождения ты получишь персональные рекомендации "
                "и план дальнейшей работы.\n\n"
                "👇",
                reply_markup=InlineKeyboardMarkup(
                    [
                        [
                            InlineKeyboardButton(
                                "📋 Пройти тест «20 движений»",
                                url=test,
                            )
                        ]
                    ]
                ),
            )
        else:
            logger.warning("unknown lead drip kind=%s", kind)
            return
    except Exception as exc:
        logger.warning("followup %s failed chat=%s: %s", kind, chat_id, exc)
        return

    if user_id:
        _mark_done(int(user_id), str(kind))


def schedule_lead_followups(
    context: ContextTypes.DEFAULT_TYPE, *, chat_id: int, user_id: int
) -> None:
    """Schedule workout drip. Requires job-queue extra; persists to JSON."""
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
        delay = max(0.0, run_at - now)
        # Skip jobs that are extremely overdue (>2 days) to avoid spam bursts
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
