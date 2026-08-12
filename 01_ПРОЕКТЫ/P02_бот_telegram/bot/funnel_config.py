"""Central URLs for the /start onboarding funnel.

Do not send users straight to https://eg.egoshev.ru/anketaeg from this bot.
The anketa lives inside the channel pin (MAIN_START_POST_URL).
"""
from __future__ import annotations

from products import get_product

CHANNEL_URL = "https://t.me/EvgeniiGoshev"
MAIN_START_POST_URL = "https://t.me/EvgeniiGoshev/1326"
BREATHING_PRACTICE_URL = "https://t.me/EvgeniiGoshev/760"
EG3D_WORKOUT_URL = "https://t.me/EvgeniiGoshev/1299"

# No separate channel workout post in the bot repo (1326 is now the pin).
# Same free training URL as the site result pages (result-config.ts).
FREE_WORKOUT_URL = "https://youtu.be/sDRbfeB7BZM"

# Telegram URL buttons do not fire callbacks — click-based nudges are disabled.
CAN_TRACK_URL_BUTTON_CLICKS = False


def _from_lead(*keys: str, fallback: str) -> str:
    p = get_product("lead_telo") or {}
    for key in keys:
        val = str(p.get(key) or "").strip()
        if val and "ЗАМЕНИ" not in val:
            return val
    return fallback


def channel_url() -> str:
    return CHANNEL_URL


def main_start_post_url() -> str:
    return _from_lead("main_start_post_url", "page_url", fallback=MAIN_START_POST_URL)


def free_workout_url() -> str:
    return _from_lead("workout_url", fallback=FREE_WORKOUT_URL)


def breathing_practice_url() -> str:
    return _from_lead("breath_url", fallback=BREATHING_PRACTICE_URL)


def eg3d_workout_url() -> str:
    return _from_lead("eg3d_url", fallback=EG3D_WORKOUT_URL)
