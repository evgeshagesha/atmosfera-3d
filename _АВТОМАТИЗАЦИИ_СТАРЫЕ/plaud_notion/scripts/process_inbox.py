#!/usr/bin/env python3
"""
Пайплайн: загружаешь аудио → подписываешь папкой или именем → транскрипция → SQLite → Notion.

Два способа «подписать»:
1. По папкам (удобнее): положи файл в inbox_audio/courses/название_курса/ или inbox_audio/clients/имя/
   — папка и есть подписка; имя файла может быть любым (lesson1.m4a, 2026-03-07.m4a).
2. По имени файла: client_имя_2026-03-07_consultation.m4a или course_курс_модуль_урок.m4a

Запуск из корня eg-ecosystem:
  python scripts/process_inbox.py
  python scripts/process_inbox.py --no-transcribe   # только разнести по папкам и БД (если транскрипт уже есть)
"""

import argparse
import os
import re
import shutil
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INBOX = ROOT / "inbox_audio"
PROCESSED_CLIENTS = ROOT / "processed" / "clients"
PROCESSED_COURSES = ROOT / "processed" / "courses"
TRANSCRIPTS_CLIENTS = ROOT / "data" / "transcripts" / "clients"
TRANSCRIPTS_COURSES = ROOT / "data" / "transcripts" / "courses"
DB_PATH = ROOT / "data" / "db" / "eg_local.db"

SESSION_TYPES = ("consultation", "diagnostics", "training", "recovery", "control", "followup")
AUDIO_EXT = (".m4a", ".mp3", ".opus", ".wav", ".webm", ".m4b")

CLIENT_PATTERN = re.compile(
    r"^client_(.+?)_(\d{4}-\d{2}-\d{2})_(%s)\.[a-zA-Z0-9]+$" % "|".join(SESSION_TYPES),
    re.I,
)
COURSE_PATTERN = re.compile(r"^course_(.+?)_(.+?)_(.+?)\.[a-zA-Z0-9]+$", re.I)


def ensure_dirs():
    for d in (
        INBOX,
        PROCESSED_CLIENTS,
        PROCESSED_COURSES,
        TRANSCRIPTS_CLIENTS,
        TRANSCRIPTS_COURSES,
        DB_PATH.parent,
    ):
        d.mkdir(parents=True, exist_ok=True)


def parse_filename(name: str) -> dict | None:
    m = CLIENT_PATTERN.match(name)
    if m:
        return {
            "type": "client",
            "slug": m.group(1).lower().replace(" ", "_"),
            "date": m.group(2),
            "session_type": m.group(3).lower(),
        }
    m = COURSE_PATTERN.match(name)
    if m:
        return {
            "type": "course",
            "slug": m.group(1).lower().replace(" ", "_"),
            "course_module": m.group(2),
            "course_lesson": m.group(3),
        }
    return None


def transcribe_audio(audio_path: Path, language: str = "ru") -> str:
    """Транскрибировать один файл. Возвращает текст или пустую строку при ошибке."""
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        try:
            import whisper
            model = whisper.load_model(os.environ.get("WHISPER_MODEL", "base"))
            r = model.transcribe(str(audio_path), language=language, fp16=False)
            return (r.get("text") or "").strip()
        except ImportError:
            print("  Установите: pip install faster-whisper   или   pip install openai-whisper")
            return ""
    model = WhisperModel(
        os.environ.get("WHISPER_MODEL", "base"),
        device=os.environ.get("WHISPER_DEVICE", "cpu"),
        compute_type="int8",
    )
    segments, _ = model.transcribe(str(audio_path), language=language)
    return " ".join(s.text for s in segments).strip()


def scan_inbox() -> list[tuple[Path, dict]]:
    """Собрать все аудио: из корня inbox (по имени) и из подпапок courses/*, clients/*."""
    ensure_dirs()
    if not INBOX.exists():
        return []
    result = []

    # 1) Файлы в корне inbox — по конвенции имён
    for f in INBOX.iterdir():
        if f.is_file() and f.suffix.lower() in AUDIO_EXT:
            parsed = parse_filename(f.name)
            if parsed:
                result.append((f, parsed))

    # 2) Подпапки inbox_audio/courses/<slug>/ — любой аудиофайл = урок этого курса
    courses_dir = INBOX / "courses"
    if courses_dir.is_dir():
        for course_dir in courses_dir.iterdir():
            if not course_dir.is_dir():
                continue
            slug = course_dir.name.lower().replace(" ", "_")
            for f in course_dir.iterdir():
                if f.is_file() and f.suffix.lower() in AUDIO_EXT:
                    stem = f.stem
                    # модуль/урок из имени файла (lesson1, module2_lesson3) или по умолчанию
                    if "_" in stem:
                        parts = stem.split("_", 1)
                        module, lesson = parts[0], parts[1] if len(parts) > 1 else stem
                    else:
                        module, lesson = "Модуль 1", stem or "Урок"
                    result.append(
                        (
                            f,
                            {
                                "type": "course",
                                "slug": slug,
                                "course_module": module,
                                "course_lesson": lesson,
                            },
                        )
                    )

    # 3) Подпапки inbox_audio/clients/<slug>/ — любой аудиофайл = сессия; дата из имени или сегодня
    clients_dir = INBOX / "clients"
    if clients_dir.is_dir():
        for client_dir in clients_dir.iterdir():
            if not client_dir.is_dir():
                continue
            slug = client_dir.name.lower().replace(" ", "_")
            for f in client_dir.iterdir():
                if f.is_file() and f.suffix.lower() in AUDIO_EXT:
                    stem = f.stem
                    # попытка даты из имени YYYY-MM-DD
                    date_match = re.search(r"(\d{4}-\d{2}-\d{2})", stem)
                    session_date = date_match.group(1) if date_match else datetime.now().strftime("%Y-%m-%d")
                    session_type = "consultation"
                    for st in SESSION_TYPES:
                        if st in stem.lower():
                            session_type = st
                            break
                    result.append(
                        (
                            f,
                            {
                                "type": "client",
                                "slug": slug,
                                "date": session_date,
                                "session_type": session_type,
                            },
                        )
                    )

    return result


def main():
    parser = argparse.ArgumentParser(description="Обработка inbox_audio: транскрипция и раскладка в БД и папки.")
    parser.add_argument("--no-transcribe", action="store_true", help="Не вызывать Whisper (только разнести по БД/папкам)")
    parser.add_argument("--dry-run", action="store_true", help="Только показать, что будет обработано")
    args = parser.parse_args()

    items = scan_inbox()
    if not items:
        print("В inbox_audio/ нет файлов для обработки.")
        print("Подпиши записи одним из способов:")
        print("  • Положи в inbox_audio/courses/название_курса/  — любой аудиофайл станет уроком этого курса")
        print("  • Положи в inbox_audio/clients/имя_клиента/     — любой аудиофайл станет сессией этого клиента")
        print("  • Или назови файл: client_имя_2026-03-07_consultation.m4a  или  course_курс_модуль_урок.m4a")
        return

    print(f"Найдено файлов: {len(items)}")
    if args.dry_run:
        for path, parsed in items:
            print(f"  {path} → {parsed}")
        return

    from db import get_conn, init_db, ensure_client, insert_session, insert_course_lesson

    init_db()
    conn = get_conn()

    for path, parsed in items:
        print(f"Обрабатываю: {path.name} …")
        transcript = ""
        if not args.no_transcribe:
            transcript = transcribe_audio(path)
            if transcript:
                print(f"  Транскрипт: {len(transcript)} символов")
            else:
                print("  Транскрипт пуст (проверь Whisper)")

        if parsed["type"] == "client":
            client_id = ensure_client(conn, parsed["slug"])
            insert_session(
                conn,
                client_id,
                parsed["date"],
                parsed["session_type"],
                transcript,
            )
            dest_dir = PROCESSED_CLIENTS / parsed["slug"]
            dest_dir.mkdir(parents=True, exist_ok=True)
            dest = dest_dir / f"{parsed['date']}_{parsed['session_type']}{path.suffix}"
            if transcript:
                (TRANSCRIPTS_CLIENTS / parsed["slug"]).mkdir(parents=True, exist_ok=True)
                (TRANSCRIPTS_CLIENTS / parsed["slug"] / f"{parsed['date']}_{parsed['session_type']}.txt").write_text(
                    transcript, encoding="utf-8"
                )
        else:
            insert_course_lesson(
                conn,
                parsed["slug"],
                parsed.get("course_module", ""),
                parsed.get("course_lesson", ""),
                transcript,
            )
            dest_dir = PROCESSED_COURSES / parsed["slug"]
            dest_dir.mkdir(parents=True, exist_ok=True)
            dest = dest_dir / path.name
            if transcript:
                (TRANSCRIPTS_COURSES / parsed["slug"]).mkdir(parents=True, exist_ok=True)
                (TRANSCRIPTS_COURSES / parsed["slug"] / f"{path.stem}.txt").write_text(transcript, encoding="utf-8")

        if path.resolve() != dest.resolve():
            shutil.move(str(path), str(dest))
            print(f"  Перенесён в {dest.relative_to(ROOT)}")

    conn.close()
    print("Готово. Дальше: python scripts/sync_notion.py — выгрузить в Notion.")


if __name__ == "__main__":
    main()
