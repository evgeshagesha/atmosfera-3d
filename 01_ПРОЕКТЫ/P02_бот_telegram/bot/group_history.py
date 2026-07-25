"""
Сохранение и загрузка истории сообщений группы в файл.
Используется для контекста утренних постов и ответов в группе.
"""
import json
from pathlib import Path

import config

HISTORY_FILE = config.BASE_DIR / "data" / "group_chat_history.json"
MAX_STORED = 150  # сколько последних сообщений хранить в файле


def _ensure_data_dir() -> None:
    HISTORY_FILE.parent.mkdir(parents=True, exist_ok=True)


def load_group_history(chat_id: int) -> list[dict]:
    """Загрузить историю сообщений группы из файла."""
    if not HISTORY_FILE.exists():
        return []
    try:
        data = json.loads(HISTORY_FILE.read_text(encoding="utf-8"))
        key = str(chat_id)
        return data.get(key, [])[-MAX_STORED:]
    except Exception:
        return []


def save_group_history(chat_id: int, messages: list[dict]) -> None:
    """Сохранить историю сообщений группы в файл (последние MAX_STORED)."""
    _ensure_data_dir()
    to_save = messages[-MAX_STORED:]
    try:
        data = {}
        if HISTORY_FILE.exists():
            data = json.loads(HISTORY_FILE.read_text(encoding="utf-8"))
        data[str(chat_id)] = to_save
        HISTORY_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=0), encoding="utf-8")
    except Exception:
        pass
