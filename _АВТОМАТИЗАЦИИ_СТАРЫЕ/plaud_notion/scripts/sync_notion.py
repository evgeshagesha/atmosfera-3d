#!/usr/bin/env python3
"""
Синхронизация SQLite → Notion API: новые сессии и уроки курсов попадают в базы Notion.

Переменные окружения (.env):
  NOTION_TOKEN, NOTION_DB_CLIENTS, NOTION_DB_SESSIONS, NOTION_DB_COURSES

Запуск из корня eg-ecosystem:
  python scripts/sync_notion.py
"""

import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DB_PATH = ROOT / "data" / "db" / "eg_local.db"

# Маппинг тип сессии → название в Notion (Select)
def rich_text_blocks(content: str, max_len: int = 2000):
    """Notion rich_text — не более max_len символов на блок."""
    if not content:
        return []
    out = []
    while content:
        out.append({"text": {"content": content[:max_len]}})
        content = content[max_len:]
    return out


SESSION_TYPE_TO_NOTION = {
    "consultation": "Консультация",
    "diagnostics": "Диагностика",
    "training": "Тренировка",
    "recovery": "Восстановление",
    "control": "Контроль",
    "followup": "Follow-up",
}


def load_env():
    env_file = ROOT / ".env"
    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def get_notion_env():
    load_env()
    keys = ("NOTION_TOKEN", "NOTION_DB_CLIENTS", "NOTION_DB_SESSIONS", "NOTION_DB_COURSES")
    env = {k: os.environ.get(k) for k in keys}
    missing = [k for k, v in env.items() if not v]
    if missing:
        print("Задайте в .env:", ", ".join(missing))
        return {}
    return env


def main():
    env = get_notion_env()
    if not env:
        return
    if not DB_PATH.exists():
        print("БД не найдена. Сначала: python scripts/process_inbox.py")
        return

    try:
        from notion_client import Client
    except ImportError:
        print("Установите: pip install notion-client")
        return

    import sqlite3
    notion = Client(auth=env["NOTION_TOKEN"])
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row

    # ——— Клиенты: создать в Notion, если ещё нет; запомнить notion_id ———
    cur = conn.cursor()
    cur.execute("SELECT id, slug, name, notion_id FROM clients WHERE notion_id IS NULL OR notion_id = ''")
    for row in cur.fetchall():
        slug, name = row["slug"], row["name"] or row["slug"].replace("_", " ").title()
        try:
            page = notion.pages.create(
                parent={"database_id": env["NOTION_DB_CLIENTS"]},
                properties={
                    "Имя": {"title": [{"text": {"content": name[:2000]}}]},
                },
            )
            conn.execute("UPDATE clients SET notion_id = ? WHERE id = ?", (page["id"], row["id"]))
            conn.commit()
            print(f"Клиент в Notion: {name}")
        except Exception as e:
            print(f"Ошибка клиент {name}: {e}")

    # ——— Сессии: без notion_id → создать страницу в базе Сессии ———
    cur.execute("""
        SELECT s.id, s.session_date, s.session_type, s.transcript, s.summary, c.notion_id as client_notion_id
        FROM sessions s JOIN clients c ON s.client_id = c.id
        WHERE s.notion_id IS NULL OR s.notion_id = ''
    """)
    for row in cur.fetchall():
        if not row["client_notion_id"]:
            continue
        session_type_name = SESSION_TYPE_TO_NOTION.get(row["session_type"].lower(), "Консультация")
        props = {
            "Клиент": {"relation": [{"id": row["client_notion_id"]}]},
            "Дата": {"date": {"start": row["session_date"]}},
            "Тип": {"select": {"name": session_type_name}},
        }
        if row["transcript"]:
            props["Транскрипт"] = {"rich_text": rich_text_blocks(row["transcript"] or "")}
        if row["summary"]:
            props["Summary"] = {"rich_text": rich_text_blocks(row["summary"] or "")}
        try:
            page = notion.pages.create(
                parent={"database_id": env["NOTION_DB_SESSIONS"]},
                properties=props,
            )
            conn.execute("UPDATE sessions SET notion_id = ? WHERE id = ?", (page["id"], row["id"]))
            conn.commit()
            print(f"Сессия в Notion: {row['session_date']} {session_type_name}")
        except Exception as e:
            print(f"Ошибка сессия {row['id']}: {e}")

    # ——— Уроки курсов: без notion_id → создать в базе Обучение/курсы ———
    cur.execute("""
        SELECT id, course_slug, course_title, module, lesson, transcript
        FROM course_lessons
        WHERE notion_id IS NULL OR notion_id = ''
    """)
    for row in cur.fetchall():
        title = f"{row['course_title'] or row['course_slug']} — {row['module']} / {row['lesson']}"
        props = {
            "Название курса": {"title": [{"text": {"content": title[:2000]}}]},
        }
        if row["module"]:
            props["Модуль"] = {"rich_text": rich_text_blocks(str(row["module"]))}
        if row["lesson"]:
            props["Урок"] = {"rich_text": rich_text_blocks(str(row["lesson"]))}
        if row["transcript"]:
            props["Транскрипт"] = {"rich_text": rich_text_blocks(row["transcript"] or "")}
        try:
            page = notion.pages.create(
                parent={"database_id": env["NOTION_DB_COURSES"]},
                properties=props,
            )
            conn.execute("UPDATE course_lessons SET notion_id = ? WHERE id = ?", (page["id"], row["id"]))
            conn.commit()
            print(f"Урок в Notion: {title[:60]}…")
        except Exception as e:
            print(f"Ошибка урок {row['id']}: {e}")

    conn.close()
    print("Синк с Notion завершён.")


if __name__ == "__main__":
    main()
