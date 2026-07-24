"""Delayed soft follow-ups after lead guide (no hard sell barrage)."""
from __future__ import annotations

import logging

from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ContextTypes

from products import get_page_url, get_prodamus_url, get_tribute_web_url

logger = logging.getLogger(__name__)

CHANNEL_URL = "https://t.me/EvgeniiGoshev"
CHANNEL_NAV_URL = "https://t.me/EvgeniiGoshev/1123"

# seconds after guide delivery
FOLLOWUP_DELAYS = (
    (2 * 3600, "fu_2h"),
    (24 * 3600, "fu_24h"),
    (72 * 3600, "fu_72h"),
)


async def _job_followup(context: ContextTypes.DEFAULT_TYPE) -> None:
    data = context.job.data or {}
    chat_id = data.get("chat_id")
    kind = data.get("kind")
    if not chat_id or not kind:
        return

    try:
        if kind == "fu_2h":
            await context.bot.send_message(
                chat_id,
                "Коротко.\n\n"
                "Если уже открыли гайд — возьмите один блок и сделайте его сегодня. "
                "Не всё сразу. Телу нужна ясность, а не перегруз.\n\n"
                "В канале — ежедневные выжимки и практика:\n"
                f"{CHANNEL_URL}\n"
                f"Навигация: {CHANNEL_NAV_URL}",
            )
            return

        if kind == "fu_24h":
            test = get_page_url("body_test") or "https://egoshev.ru/testik"
            await context.bot.send_message(
                chat_id,
                "Когда гайд уже «лёг» — следующий шаг простой.\n\n"
                "Онлайн-тест тела: 20 движений, персональный план, "
                "разбор от меня за 24–48 часов.\n\n"
                "Это не про диагноз. Это про понятный маршрут: "
                "с чего начать именно вам.",
                reply_markup=InlineKeyboardMarkup(
                    [[InlineKeyboardButton("Пройти тест · 684 ₽", url=test)]]
                ),
            )
            return

        if kind == "fu_72h":
            breath = get_page_url("course_breath_posture") or "https://egoshev.ru/dyhanieosanka"
            club = (
                get_prodamus_url("club")
                or get_tribute_web_url("club")
                or "https://t.me/tribute/app?startapp=s11vY"
            )
            await context.bot.send_message(
                chat_id,
                "Если хотите идти глубже — два спокойных варианта.\n\n"
                "• Дыхание и осанка — если тело просит освободить грудную клетку "
                "и собрать опору.\n"
                "• Клуб — если нужна автоматичность и сопровождение.\n\n"
                "Можно просто остаться в канале и двигаться в своём темпе. "
                "Выбор за вами.",
                reply_markup=InlineKeyboardMarkup(
                    [
                        [InlineKeyboardButton("Дыхание и осанка · 1 990 ₽", url=breath)],
                        [InlineKeyboardButton("Клуб · 1 680 ₽/мес", url=club)],
                        [InlineKeyboardButton("Канал", url=CHANNEL_URL)],
                    ]
                ),
            )
    except Exception as exc:
        logger.warning("followup %s failed chat=%s: %s", kind, chat_id, exc)


def schedule_lead_followups(
    context: ContextTypes.DEFAULT_TYPE, *, chat_id: int, user_id: int
) -> None:
    """Schedule 2h / 24h / 72h soft nudges. Requires job-queue extra."""
    jq = context.application.job_queue
    if jq is None:
        logger.warning("job_queue unavailable — follow-ups not scheduled")
        return

    for delay, kind in FOLLOWUP_DELAYS:
        name = f"lead_{kind}_{user_id}"
        for old in jq.get_jobs_by_name(name):
            old.schedule_removal()
        jq.run_once(
            _job_followup,
            when=delay,
            data={"chat_id": chat_id, "kind": kind, "user_id": user_id},
            name=name,
            chat_id=chat_id,
            user_id=user_id,
        )
    logger.info("Scheduled lead follow-ups for user=%s", user_id)
