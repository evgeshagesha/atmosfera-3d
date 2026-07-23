#!/usr/bin/env python3
"""Локальная SQLite: клиенты, сессии, уроки курсов. Для пайплайна и синка с Notion."""

import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DB_PATH = ROOT / "data" / "db" / "eg_local.db"


def get_conn():
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    return sqlite3.connect(DB_PATH)


def init_db(conn=None):
    close = False
    if conn is None:
        conn = get_conn()
        close = True
    cur = conn.cursor()
    cur.executescript("""
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            slug TEXT UNIQUE NOT NULL,
            name TEXT,
            notion_id TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            client_id INTEGER NOT NULL REFERENCES clients(id),
            session_date TEXT NOT NULL,
            session_type TEXT NOT NULL,
            transcript TEXT,
            summary TEXT,
            notion_id TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS course_lessons (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            course_slug TEXT NOT NULL,
            course_title TEXT,
            module TEXT,
            lesson TEXT,
            transcript TEXT,
            notion_id TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,
            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS idx_sessions_client ON sessions(client_id);
        CREATE INDEX IF NOT EXISTS idx_course_lessons_slug ON course_lessons(course_slug);
    """)
    conn.commit()
    if close:
        conn.close()


def ensure_client(conn, slug: str, name: str | None = None) -> int:
    """Вернуть id клиента по slug; создать запись, если нет."""
    cur = conn.cursor()
    cur.execute("SELECT id FROM clients WHERE slug = ?", (slug,))
    row = cur.fetchone()
    if row:
        return row[0]
    cur.execute(
        "INSERT INTO clients (slug, name) VALUES (?, ?)",
        (slug, name or slug.replace("_", " ").title()),
    )
    conn.commit()
    return cur.lastrowid


def insert_session(conn, client_id: int, session_date: str, session_type: str, transcript: str = "") -> int:
    cur = conn.cursor()
    cur.execute(
        """INSERT INTO sessions (client_id, session_date, session_type, transcript)
           VALUES (?, ?, ?, ?)""",
        (client_id, session_date, session_type, transcript),
    )
    conn.commit()
    return cur.lastrowid


def insert_course_lesson(
    conn, course_slug: str, module: str = "", lesson: str = "", transcript: str = "", course_title: str | None = None
) -> int:
    cur = conn.cursor()
    cur.execute(
        """INSERT INTO course_lessons (course_slug, course_title, module, lesson, transcript)
           VALUES (?, ?, ?, ?, ?)""",
        (course_slug, course_title or course_slug, module, lesson, transcript),
    )
    conn.commit()
    return cur.lastrowid


def get_sessions_without_notion(conn):
    """Сессии, ещё не выгруженные в Notion."""
    cur = conn.cursor()
    cur.execute(
        """SELECT s.id, c.slug as client_slug, c.name, s.session_date, s.session_type, s.transcript, s.summary
           FROM sessions s JOIN clients c ON s.client_id = c.id
           WHERE s.notion_id IS NULL OR s.notion_id = ''"""
    )
    return cur.fetchall()


def get_course_lessons_without_notion(conn):
    """Уроки курсов, ещё не выгруженные в Notion."""
    cur = conn.cursor()
    cur.execute(
        """SELECT id, course_slug, course_title, module, lesson, transcript
           FROM course_lessons
           WHERE notion_id IS NULL OR notion_id = ''"""
    )
    return cur.fetchall()
