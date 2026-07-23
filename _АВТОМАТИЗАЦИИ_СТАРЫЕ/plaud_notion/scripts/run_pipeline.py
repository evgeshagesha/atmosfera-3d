#!/usr/bin/env python3
"""
Один запуск: обработать inbox_audio (транскрипция + БД + папки) и выгрузить новое в Notion.

Использование:
  1. Положи аудио в inbox_audio/ (см. ниже как «подписать»).
  2. Запусти:  python scripts/run_pipeline.py

Как подписать записи (чтобы автоматически распределялись):
  • Курс: положи файл в  inbox_audio/courses/название_курса/  (например courses/breath/, courses/таз/)
  • Клиент: положи файл в  inbox_audio/clients/имя_клиента/   (например clients/vasya/)
  • Или имя файла: client_имя_2026-03-07_consultation.m4a  или  course_курс_модуль_урок.m4a
"""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def main():
    print("1/2 Обработка inbox_audio (транскрипция → БД → папки) …")
    r1 = subprocess.run([sys.executable, str(ROOT / "scripts" / "process_inbox.py")], cwd=str(ROOT))
    if r1.returncode != 0:
        sys.exit(r1.returncode)
    print("\n2/2 Синхронизация с Notion …")
    r2 = subprocess.run([sys.executable, str(ROOT / "scripts" / "sync_notion.py")], cwd=str(ROOT))
    sys.exit(r2.returncode)


if __name__ == "__main__":
    main()
