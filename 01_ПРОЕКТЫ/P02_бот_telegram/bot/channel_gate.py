"""Gate: channel subscription required before lead guide."""
from __future__ import annotations

import logging

from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ContextTypes

import config

logger = logging.getLogger(__name__)

CHANNEL_URL = "https://t.me/EvgeniiGoshev"
_MEMBER_OK = frozenset({"member", "administrator", "creator", "restricted"})


def require_channel_sub() -> bool:
    raw = (getattr(config, "REQUIRE_CHANNEL_SUB", "1") or "1").strip().lower()
    return raw not in ("0", "false", "no", "off")


async def is_channel_subscriber(
    context: ContextTypes.DEFAULT_TYPE, user_id: int
) -> bool:
    if not require_channel_sub():
        return True
    channel = (config.CHANNEL_ID or "").strip()
    if not channel:
        logger.warning("CHANNEL_ID empty — skipping subscription check")
        return True
    try:
        member = await context.bot.get_chat_member(chat_id=channel, user_id=user_id)
        return member.status in _MEMBER_OK
    except Exception as exc:
        logger.warning("get_chat_member failed user=%s: %s", user_id, exc)
        return False


def subscribe_keyboard(callback_data: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [InlineKeyboardButton("Подписаться на канал", url=CHANNEL_URL)],
            [
                InlineKeyboardButton(
                    "Я подписался — открыть гайд", callback_data=callback_data
                )
            ],
        ]
    )


async def ask_subscribe(message, *, callback_data: str, what: str = "гайд") -> None:
    text = (
        "Сейчас выдам <b>{what}</b> — один короткий шаг.\n\n"
        "1) Нажмите «Подписаться на канал»\n"
        "2) Подпишитесь\n"
        "3) Вернитесь сюда и нажмите\n"
        "<b>«Я подписался — открыть гайд»</b>\n\n"
        "После этого сразу пришлю ссылку."
    ).format(what=what)
    await message.reply_text(
        text,
        reply_markup=subscribe_keyboard(callback_data),
        parse_mode="HTML",
    )
