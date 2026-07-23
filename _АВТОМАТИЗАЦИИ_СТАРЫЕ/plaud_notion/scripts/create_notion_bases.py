#!/usr/bin/env python3
"""
Создать в Notion страницу «EG Рабочая система» и в ней три базы:
Клиенты, Сессии, Обучение/курсы — с полями под пайплайн (аудио → транскрипт → sync_notion).

Нужно в .env:
  NOTION_TOKEN          — секрет интеграции Notion
  NOTION_PARENT_PAGE_ID  — ID страницы, ВНУТРИ которой создать (например страница в Private или Teamspace).
                          Интеграция должна иметь доступ к этой странице (Share → Invite).

Запуск из корня eg-ecosystem:
  python scripts/create_notion_bases.py
"""

import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def load_env():
    env_file = ROOT / ".env"
    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))


def main():
    load_env()
    token = os.environ.get("NOTION_TOKEN")
    parent_id = os.environ.get("NOTION_PARENT_PAGE_ID")
    if not token:
        print("В .env нужен NOTION_TOKEN (Internal Integration Secret из Notion).")
        return
    if not parent_id:
        print("В .env нужен NOTION_PARENT_PAGE_ID — ID страницы, внутри которой создать папку и базы.")
        print("Как получить: открой в Notion страницу (или создай новую), Share → пригласи интеграцию, скопируй ID из ссылки (32 символа в конце).")
        return

    # Убрать дефисы из ID, если скопировали с дефисами
    parent_id = re.sub(r"-", "", parent_id.strip())
    if len(parent_id) != 32:
        print("NOTION_PARENT_PAGE_ID должен быть 32 символа (буквы и цифры).")
        return

    try:
        from notion_client import Client
    except ImportError:
        print("Установи: pip install notion-client")
        return

    notion = Client(auth=token)

    # 1. Создать страницу «EG Рабочая система»
    try:
        page = notion.pages.create(
            parent={"page_id": parent_id},
            properties={
                "title": {
                    "title": [{"text": {"content": "EG Рабочая система"}}],
                },
            },
        )
        eg_page_id = page["id"]
        print("Создана страница: EG Рабочая система")
    except Exception as e:
        print("Ошибка создания страницы:", e)
        return

    # 2. База «Клиенты»
    try:
        db_clients = notion.databases.create(
            parent={"page_id": eg_page_id},
            title=[{"text": {"content": "Клиенты"}}],
            properties={
                "Имя": {"title": {}},
                "Возраст": {"number": {"format": "number"}},
                "Город": {"rich_text": {}},
                "Telegram": {"url": {}},
                "Телефон": {"phone_number": {}},
                "Запрос": {"rich_text": {}},
                "Жалобы": {"rich_text": {}},
                "Статус": {
                    "select": {
                        "options": [
                            {"name": "Новый", "color": "blue"},
                            {"name": "В работе", "color": "yellow"},
                            {"name": "Пауза", "color": "gray"},
                            {"name": "Завершён", "color": "green"},
                        ]
                    }
                },
                "Дата первой консультации": {"date": {}},
                "Ссылка на папку Drive": {"url": {}},
                "План тренировок": {"rich_text": {}},
                "Домашние задания": {"rich_text": {}},
                "Следующая встреча": {"date": {}},
                "Заметки": {"rich_text": {}},
            },
        )
        db_clients_id = db_clients["id"]
        print("Создана база: Клиенты")
    except Exception as e:
        print("Ошибка базы Клиенты:", e)
        return

    # 3. База «Сессии» (связь с Клиенты)
    try:
        db_sessions = notion.databases.create(
            parent={"page_id": eg_page_id},
            title=[{"text": {"content": "Сессии"}}],
            properties={
                "Клиент": {
                    "relation": {
                        "database_id": db_clients_id,
                        "type": "dual_property",
                        "dual_property": {"synced_property_name": "Сессии"},
                    }
                },
                "Дата": {"date": {}},
                "Тип": {
                    "select": {
                        "options": [
                            {"name": "Консультация", "color": "blue"},
                            {"name": "Диагностика", "color": "orange"},
                            {"name": "Тренировка", "color": "green"},
                            {"name": "Восстановление", "color": "purple"},
                            {"name": "Контроль", "color": "yellow"},
                            {"name": "Follow-up", "color": "gray"},
                        ]
                    }
                },
                "Транскрипт": {"rich_text": {}},
                "Summary": {"rich_text": {}},
                "Что беспокоит сейчас": {"rich_text": {}},
                "Оценка состояния": {"rich_text": {}},
                "Что сделали": {"rich_text": {}},
                "Реакция во время": {"rich_text": {}},
                "Ощущения после": {"rich_text": {}},
                "Рекомендации": {"rich_text": {}},
                "Домашнее задание": {"rich_text": {}},
                "Ссылка на аудио/файл": {"url": {}},
            },
        )
        db_sessions_id = db_sessions["id"]
        print("Создана база: Сессии (связь с Клиенты)")
    except Exception as e:
        print("Ошибка базы Сессии:", e)
        return

    # 4. База «Обучение/курсы»
    try:
        db_courses = notion.databases.create(
            parent={"page_id": eg_page_id},
            title=[{"text": {"content": "Обучение / курсы"}}],
            properties={
                "Название курса": {"title": {}},
                "Модуль": {"rich_text": {}},
                "Урок": {"rich_text": {}},
                "Ссылка на аудио/видео/файл": {"url": {}},
                "Транскрипт": {"rich_text": {}},
                "Конспект": {"rich_text": {}},
                "Ключевые идеи": {"rich_text": {}},
                "Как встроить в EG": {"rich_text": {}},
            },
        )
        db_courses_id = db_courses["id"]
        print("Создана база: Обучение / курсы")
    except Exception as e:
        print("Ошибка базы Обучение/курсы:", e)
        return

    # 5. База «Идеи и заметки»
    try:
        db_ideas = notion.databases.create(
            parent={"page_id": eg_page_id},
            title=[{"text": {"content": "Идеи и заметки"}}],
            properties={
                "Название": {"title": {}},
                "Текст": {"rich_text": {}},
                "Дата": {"date": {}},
                "Категория": {
                    "select": {
                        "options": [
                            {"name": "Идея", "color": "yellow"},
                            {"name": "Заметка", "color": "gray"},
                            {"name": "Для обсуждения", "color": "blue"},
                        ]
                    }
                },
            },
        )
        db_ideas_id = db_ideas["id"]
        print("Создана база: Идеи и заметки")
    except Exception as e:
        print("Ошибка базы Идеи и заметки:", e)
        db_ideas_id = ""

    # Вывести ID для .env
    print("\n--- Скопируй в .env (для sync_notion.py) ---")
    print(f"NOTION_DB_CLIENTS={db_clients_id}")
    print(f"NOTION_DB_SESSIONS={db_sessions_id}")
    print(f"NOTION_DB_COURSES={db_courses_id}")
    if db_ideas_id:
        print(f"NOTION_DB_IDEAS={db_ideas_id}")
    print("\nГотово. В Notion открой страницу «EG Рабочая система» — в ней четыре базы. После этого запускай run_pipeline.py (аудио → транскрипт → сюда).")


if __name__ == "__main__":
    main()
