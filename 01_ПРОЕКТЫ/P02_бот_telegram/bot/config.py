"""Config from environment."""
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
KIE_API_KEY = os.getenv("KIE_API_KEY", "")
COMMUNITY_CHAT_ID = os.getenv("COMMUNITY_CHAT_ID")  # optional: restrict bot to this chat only
# For funnel: "Через сутки зайди на сайт"
SITE_URL = os.getenv("SITE_URL", "https://course.egoshev.ru")
ONLINE_CLUB_URL = os.getenv("ONLINE_CLUB_URL", "https://egoshev.ru")  # онлайн-клуб

# Куда слать логи состояния (утренние ответы, новые участники) — URL веб-приложения Google Apps Script
GOOGLE_SHEETS_WEBHOOK_URL = os.getenv("GOOGLE_SHEETS_WEBHOOK_URL", "")
# Ссылка на тест для новых участников (по умолчанию — сообщение в группе)
NEW_MEMBER_TEST_LINK = os.getenv("NEW_MEMBER_TEST_LINK", "https://t.me/c/2348800665/1894")

# Path to knowledge base (instructions for the bot)
BASE_DIR = Path(__file__).resolve().parent
KNOWLEDGE_BASE_DIR = BASE_DIR / "knowledge_base"

# Max recent messages to keep for "analyze" context (per chat)
MAX_RECENT_MESSAGES = 30
