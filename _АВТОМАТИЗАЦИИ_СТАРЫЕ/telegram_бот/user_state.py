"""User state for funnel: from site button -> welcome -> dialogue -> payment -> invite -> daily messages."""
import json
from pathlib import Path
from datetime import datetime, date

import config

STATE_FILE = config.BASE_DIR / "funnel_users.json"
DAILY_LIST_FILE = config.BASE_DIR / "daily_messages_list.json"

VALID_COURSE_IDS = ("breath", "posture", "pelvis", "knees", "walk", "bundle")
# Funnel states
S_WELCOME = "welcome_sent"
S_DIALOGUE_1 = "dialogue_1"
S_DIALOGUE_2 = "dialogue_2"
S_PAYMENT_LINK_SENT = "payment_link_sent"
S_INVITE_SENT = "invite_sent"


def _load() -> dict:
    if not STATE_FILE.exists():
        return {}
    try:
        return json.loads(STATE_FILE.read_text(encoding="utf-8"))
    except Exception:
        return {}


def _save(data: dict) -> None:
    STATE_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")


def get_funnel_user(user_id: int) -> dict | None:
    data = _load()
    u = data.get(str(user_id))
    if u and u.get("state") != S_INVITE_SENT:
        return u
    return None


def set_funnel_user(user_id: int, course_id: str, state: str, **kwargs) -> None:
    data = _load()
    key = str(user_id)
    data[key] = data.get(key, {})
    data[key].update({
        "course_id": course_id,
        "state": state,
        "updated": datetime.now().isoformat(),
        **kwargs,
    })
    _save(data)


def update_funnel_state(user_id: int, state: str, **kwargs) -> None:
    data = _load()
    key = str(user_id)
    if key not in data:
        return
    data[key]["state"] = state
    data[key]["updated"] = datetime.now().isoformat()
    for k, v in kwargs.items():
        data[key][k] = v
    _save(data)


def mark_invite_sent(user_id: int) -> None:
    update_funnel_state(user_id, S_INVITE_SENT)
    # Add to daily messages list (start from tomorrow)
    if not DAILY_LIST_FILE.exists():
        DAILY_LIST_FILE.write_text("[]", encoding="utf-8")
    try:
        lst = json.loads(DAILY_LIST_FILE.read_text(encoding="utf-8"))
    except Exception:
        lst = []
    if str(user_id) not in [x.get("user_id") for x in lst]:
        lst.append({
            "user_id": str(user_id),
            "course_id": _load().get(str(user_id), {}).get("course_id", "bundle"),
            "start_date": (date.today()).isoformat(),
            "added_at": datetime.now().isoformat(),
        })
        DAILY_LIST_FILE.write_text(json.dumps(lst, ensure_ascii=False, indent=2), encoding="utf-8")


def get_daily_list() -> list[dict]:
    if not DAILY_LIST_FILE.exists():
        return []
    try:
        return json.loads(DAILY_LIST_FILE.read_text(encoding="utf-8"))
    except Exception:
        return []
