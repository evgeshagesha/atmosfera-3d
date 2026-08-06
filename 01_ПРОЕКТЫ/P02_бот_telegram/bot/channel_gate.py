"""Gate: channel subscription required before lead workout."""
from __future__ import annotations

import html
import logging

from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ContextTypes

import config

logger = logging.getLogger(__name__)

CHANNEL_URL = "https://t.me/EvgeniiGoshev"
_MEMBER_OK = frozenset({"member", "administrator", "creator", "restricted"})

WORKOUT_SUBSCRIBE_TEXT = (
    "💪 <b>Отличное решение!</b>\n\n"
    "Ты сделал первый шаг к здоровому и сильному телу.\n\n"
    "Теперь осталось открыть бесплатную тренировку, "
    "которую можно выполнять каждый день.\n\n"
    "Всего 8–10 минут в день помогут:\n"
    "• снять напряжение;\n"
    "• улучшить подвижность суставов;\n"
    "• почувствовать лёгкость во всём теле;\n"
    "• зарядиться энергией на весь день.\n\n"
    "👇\n"
    "Чтобы получить тренировку:\n"
    "1. Нажмите «Подписаться на канал».\n"
    "2. Подпишитесь.\n"
    "3. Вернитесь сюда.\n"
    "4. Нажмите кнопку\n"
    "«Забрать тренировку»."
)


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
        # Fail closed: ask to subscribe again rather than silently unlock.
        logger.warning(
            "get_chat_member failed user=%s channel=%s: %s", user_id, channel, exc
        )
        return False


def subscribe_keyboard(callback_data: str) -> InlineKeyboardMarkup:
    """Lead workout gate: subscribe URL + claim callback."""
    return InlineKeyboardMarkup(
        [
            [InlineKeyboardButton("Подписаться на канал", url=CHANNEL_URL)],
            [
                InlineKeyboardButton(
                    "Забрать тренировку", callback_data=callback_data
                )
            ],
        ]
    )


def subscribe_level_keyboard(callback_data: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [InlineKeyboardButton("Подписаться на канал", url=CHANNEL_URL)],
            [InlineKeyboardButton("Я подписался", callback_data=callback_data)],
        ]
    )


def subscribe_workout_text() -> str:
    return WORKOUT_SUBSCRIBE_TEXT


def subscribe_guide_text(what: str = "тренировку") -> str:
    """Legacy helper for level PDF gate (not the lead workout screen)."""
    safe = html.escape((what or "тренировку").strip() or "тренировку")
    return (
        "Сейчас выдам <b>{what}</b> — один короткий шаг.\n\n"
        "1) Нажмите «Подписаться на канал»\n"
        "2) Подпишитесь на канал Евгения\n"
        "3) Вернитесь сюда и нажмите\n"
        "<b>«Я подписался»</b>\n\n"
        "После этого сразу пришлю ссылку."
    ).format(what=safe)


async def ask_subscribe(message, *, callback_data: str, what: str = "тренировку") -> None:
    is_level = "level" in (callback_data or "")
    text = subscribe_guide_text(what) if is_level else subscribe_workout_text()
    markup = (
        subscribe_level_keyboard(callback_data)
        if is_level
        else subscribe_keyboard(callback_data)
    )
    await message.reply_text(text, reply_markup=markup, parse_mode="HTML")


async def send_subscribe_prompt(
    *,
    context: ContextTypes.DEFAULT_TYPE,
    chat_id: int,
    callback_data: str,
    what: str = "тренировку",
    reply_to_message=None,
) -> None:
    """Send subscribe screen; prefer reply, fall back to direct send."""
    is_level = "level" in (callback_data or "") or (
        what and "уровн" in what.lower()
    )
    text = subscribe_guide_text(what) if is_level else subscribe_workout_text()
    markup = (
        subscribe_level_keyboard(callback_data)
        if is_level
        else subscribe_keyboard(callback_data)
    )
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
