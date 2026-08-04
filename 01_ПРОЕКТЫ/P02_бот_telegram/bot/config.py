"""Config from environment."""
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
KIE_API_KEY = os.getenv("KIE_API_KEY", "")
COMMUNITY_CHAT_ID = os.getenv("COMMUNITY_CHAT_ID")  # optional: club group -100...
CHANNEL_ID = os.getenv("CHANNEL_ID", "@EvgeniiGoshev")  # public channel username or -100...
VK_BRIDGE_ENABLED = os.getenv("VK_BRIDGE_ENABLED", "0") == "1"
VK_ACCESS_TOKEN = os.getenv("VK_ACCESS_TOKEN", "")
# Optional user-admin token for video.save / shortVideo.create (community token fails).
VK_USER_ACCESS_TOKEN = os.getenv("VK_USER_ACCESS_TOKEN", "")
VK_GROUP_ID = os.getenv("VK_GROUP_ID", "")
VK_API_VERSION = os.getenv("VK_API_VERSION", "5.199")
VK_ALBUM_SETTLE_SECONDS = float(os.getenv("VK_ALBUM_SETTLE_SECONDS", "3"))
# Optional media paths (text/photo wall stays on when VK_BRIDGE_ENABLED=1).
VK_BRIDGE_VIDEO = os.getenv("VK_BRIDGE_VIDEO", "0") == "1"
VK_BRIDGE_CLIPS = os.getenv("VK_BRIDGE_CLIPS", "0") == "1"
VK_BRIDGE_STORIES = os.getenv("VK_BRIDGE_STORIES", "0") == "1"
# Co-author mention in post text (official VK co-author API for clips is not public).
# Confirmed personal page of Evgeniy: screen_name=egoshev1, id=424816541
# (vk.ru/egoshev is a different account — do not use as default).
VK_COAUTHOR_USER_ID = os.getenv("VK_COAUTHOR_USER_ID", "")
VK_COAUTHOR_SCREEN_NAME = os.getenv("VK_COAUTHOR_SCREEN_NAME", "")
VK_COAUTHOR_LABEL = os.getenv("VK_COAUTHOR_LABEL", "Евгений Гошев")
# Gate lead/level PDF until user is subscribed to CHANNEL_ID (1=on, 0=off)
REQUIRE_CHANNEL_SUB = os.getenv("REQUIRE_CHANNEL_SUB", "1")
ADMIN_TELEGRAM_IDS = [
    x.strip()
    for x in os.getenv("ADMIN_TELEGRAM_IDS", "").split(",")
    if x.strip()
]
# For funnel: "Через сутки зайди на сайт"
SITE_URL = os.getenv("SITE_URL", "https://egoshev.ru/baza")
ONLINE_CLUB_URL = os.getenv("ONLINE_CLUB_URL", "https://eg.egoshev.ru/club")
# Telegram Mini App (HTTPS required)
MINI_APP_URL = os.getenv("MINI_APP_URL", "https://eg.egoshev.ru/app")

# Куда слать логи состояния (утренние ответы, новые участники) — URL веб-приложения Google Apps Script
GOOGLE_SHEETS_WEBHOOK_URL = os.getenv("GOOGLE_SHEETS_WEBHOOK_URL", "")
# Ссылка на тест для новых участников (по умолчанию — сообщение в группе)
NEW_MEMBER_TEST_LINK = os.getenv("NEW_MEMBER_TEST_LINK", "https://t.me/c/2348800665/1894")

PRODAMUS_SECRET = os.getenv("PRODAMUS_SECRET", "")
WEBHOOK_BASE_URL = os.getenv("WEBHOOK_BASE_URL", "https://bot.egoshev.ru")

# Path to knowledge base (instructions for the bot)
BASE_DIR = Path(__file__).resolve().parent
KNOWLEDGE_BASE_DIR = BASE_DIR / "knowledge_base"
VK_BRIDGE_DB_PATH = Path(
    os.getenv("VK_BRIDGE_DB_PATH", str(BASE_DIR / "data" / "vk_bridge.sqlite3"))
)

# Max recent messages to keep for "analyze" context (per chat)
MAX_RECENT_MESSAGES = 30
