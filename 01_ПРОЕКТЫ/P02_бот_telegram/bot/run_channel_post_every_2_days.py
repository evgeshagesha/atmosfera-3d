#!/usr/bin/env python3
"""
Автопостинг в канал @EvgeniiGoshev раз в 2 дня.
Запускать по cron, например: 0 10 1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31 * * *
Или проще: 0 10 */2 * * (каждые 2 дня в 10:00).

Требования: в .env заданы TELEGRAM_BOT_TOKEN, CHANNEL_ID=@EvgeniiGoshev, OPENAI_API_KEY.
Бот должен быть добавлен в канал как администратор с правом «Публикация сообщений».
"""
import os
import subprocess
import sys
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()
BASE_DIR = Path(__file__).resolve().parent

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
CHANNEL_ID = os.getenv("CHANNEL_ID", "").strip()


def main() -> None:
    if not BOT_TOKEN or not CHANNEL_ID:
        print("TELEGRAM_BOT_TOKEN и CHANNEL_ID должны быть заданы в .env", file=sys.stderr)
        sys.exit(1)
    # Ротация по дню: нечётный день месяца — пост (условно «каждые 2 дня» при запуске по cron 0 10 */2 * *)
    # При cron "0 10 */2 * *" скрипт запускается 1,3,5,7... числа — как раз раз в 2 дня
    script = BASE_DIR / "generate_channel_post.py"
    if not script.exists():
        print(f"Не найден {script}", file=sys.stderr)
        sys.exit(1)
    result = subprocess.run(
        [sys.executable, str(script), "--post"],
        cwd=str(BASE_DIR),
        capture_output=True,
        text=True,
        timeout=120,
    )
    print(result.stdout or "")
    if result.stderr:
        print(result.stderr, file=sys.stderr)
    if result.returncode != 0:
        sys.exit(result.returncode)


if __name__ == "__main__":
    main()
