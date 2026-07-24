"""Club subscription lookup (minimal stub until Tribute webhook is wired)."""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

SUBS_FILE = Path(__file__).resolve().parent / "subscriptions.json"


def _load() -> list[dict[str, Any]]:
    if not SUBS_FILE.exists():
        return []
    try:
        data = json.loads(SUBS_FILE.read_text(encoding="utf-8"))
        return data if isinstance(data, list) else []
    except (json.JSONDecodeError, OSError):
        return []


def find_by_telegram(telegram_id: int) -> dict[str, Any] | None:
    tid = str(telegram_id)
    for row in _load():
        if str(row.get("telegram_id")) == tid:
            return row
    return None


def is_active(telegram_id: int) -> bool:
    sub = find_by_telegram(telegram_id)
    if not sub:
        return False
    return bool(sub.get("active"))
