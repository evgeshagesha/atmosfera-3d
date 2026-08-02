"""Gate: channel subscription required before lead guide."""
from __future__ import annotations

import html
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
        # Fail closed: ask to subscribe again rather than silently unlock the guide.
        logger.warning("get_chat_member failed user=%s channel=%s: %s", user_id, channel, exc)
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


def subscribe_guide_text(what: str = "гайд") -> str:
    safe = html.escape((what or "гайд").strip() or "гайд")
    return (
        "Сейчас выдам <b>{what}</b> — один короткий шаг.\n\n"
        "1) Нажмите «Подписаться на канал»\n"
        "2) Подпишитесь на канал Евгения\n"
        "3) Вернитесь сюда и нажмите\n"
        "<b>«Я подписался — открыть гайд»</b>\n\n"
        "После этого сразу пришлю ссылку."
    ).format(what=safe)


async def ask_subscribe(message, *, callback_data: str, what: str = "гайд") -> None:
    await message.reply_text(
        subscribe_guide_text(what),
        reply_markup=subscribe_keyboard(callback_data),
        parse_mode="HTML",
    )


async def send_subscribe_prompt(
    *,
    context: ContextTypes.DEFAULT_TYPE,
    chat_id: int,
    callback_data: str,
    what: str = "гайд",
    reply_to_message=None,
) -> None:
    """Send subscribe guide; prefer reply, fall back to direct send."""
    text = subscribe_guide_text(what)
    markup = subscribe_keyboard(callback_data)
    if reply_to_message is not None:
        try:
            await reply_to_message.reply_text(
                text, reply_markup=markup, parse_mode="HTML"
            )
            return
        except Exception as exc:
            logger.warning("ask_subscribe reply failed chat=%s: %s", chat_id, exc)
    await context.bot.send_message(
        chat_id=chat_id,
        text=text,
        reply_markup=markup,
        parse_mode="HTML",
    )
