"""
Отправка записей о состоянии (утренние ответы, новые участники) в Google Таблицу.
Используется веб-приложение Google Apps Script: POST с JSON в GOOGLE_SHEETS_WEBHOOK_URL.
"""
import logging
from datetime import datetime
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
import json

import config

logger = logging.getLogger(__name__)


def log_state_to_sheet(
    user_id: int,
    user_name: str,
    message: str,
    record_type: str = "group_message",
) -> None:
    """
    Добавить строку в Google Таблицу (через Apps Script Web App).
    record_type: "new_member_state" — ответ нового участника о состоянии;
                 "group_message" — любое сообщение в группе (в т.ч. ответы на утренний опрос).
    """
    if not config.GOOGLE_SHEETS_WEBHOOK_URL or not config.GOOGLE_SHEETS_WEBHOOK_URL.strip():
        return
    now = datetime.utcnow()
    payload = {
        "date": now.strftime("%Y-%m-%d"),
        "time": now.strftime("%H:%M"),
        "user_id": str(user_id),
        "user_name": (user_name or "").strip()[:200],
        "message": (message or "").strip()[:2000],
        "type": record_type.strip()[:50],
    }
    try:
        req = Request(
            config.GOOGLE_SHEETS_WEBHOOK_URL.strip(),
            data=json.dumps(payload).encode("utf-8"),
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urlopen(req, timeout=10) as resp:
            if resp.status >= 400:
                logger.warning("Google Sheets webhook returned %s", resp.status)
    except (URLError, HTTPError, OSError) as e:
        logger.warning("Failed to log to Google Sheets: %s", e)
