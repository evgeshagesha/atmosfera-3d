"""Persistent /start onboarding flags (JSON). Does not replace funnel_users.json."""
from __future__ import annotations

import json
import logging
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import config

logger = logging.getLogger(__name__)

STATE_FILE = config.BASE_DIR / "data" / "onboarding_state.json"

_DEFAULTS: dict[str, Any] = {
    "started_at": None,
    "subscription_verified": False,
    "main_post_clicked": False,
    "day1_sent": False,
    "day2_sent": False,
    "day3_sent": False,
    "day4_sent": False,
    "day5_sent": False,
    "final_nudge_sent": False,
    "drip_active": False,
    "onboarding_sequence_completed": False,
}


def _load() -> dict[str, Any]:
    if not STATE_FILE.exists():
        return {}
    try:
        data = json.loads(STATE_FILE.read_text(encoding="utf-8"))
        return data if isinstance(data, dict) else {}
    except Exception as exc:
        logger.warning("onboarding state load failed: %s", exc)
        return {}


def _save(data: dict[str, Any]) -> None:
    try:
        STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
        STATE_FILE.write_text(
            json.dumps(data, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
    except Exception as exc:
        logger.warning("onboarding state save failed: %s", exc)


def get_state(user_id: int) -> dict[str, Any]:
    raw = _load().get(str(user_id)) or {}
    out = dict(_DEFAULTS)
    if isinstance(raw, dict):
        out.update(raw)
    out["telegram_user_id"] = int(user_id)
    return out


def update_state(user_id: int, **fields: Any) -> dict[str, Any]:
    data = _load()
    key = str(user_id)
    current = dict(_DEFAULTS)
    if isinstance(data.get(key), dict):
        current.update(data[key])
    if not current.get("started_at"):
        current["started_at"] = datetime.now(timezone.utc).isoformat()
    current.update(fields)
    current["telegram_user_id"] = int(user_id)
    current["updated_at"] = datetime.now(timezone.utc).isoformat()
    data[key] = current
    _save(data)
    return current


def is_completed(user_id: int) -> bool:
    return bool(get_state(user_id).get("onboarding_sequence_completed"))


def is_drip_active(user_id: int) -> bool:
    st = get_state(user_id)
    return bool(st.get("drip_active")) and not bool(
        st.get("onboarding_sequence_completed")
    )
