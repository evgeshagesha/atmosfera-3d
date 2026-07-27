"""Delayed soft follow-ups after lead guide (EG niche, no spam barrage).

Best-practice shape (adapted for Атмосфера 3D):
  T+0   — guide delivered (elsewhere)
  T+2h  — one tip, no hard sell
  T+24h — value + soft check-in
  T+48h — next step: body test
  T+4d  — flagship course 9 990
  T+7d  — club + calm close
"""
from __future__ import annotations

import logging

from telegram import InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ContextTypes

from products import get_page_url, get_prodamus_url, get_tribute_web_url

logger = logging.getLogger(__name__)

CHANNEL_URL = "https://t.me/EvgeniiGoshev"
CHANNEL_NAV_URL = "https://t.me/EvgeniiGoshev/1123"
CLUB_PAGE = "https://eg.egoshev.ru/club"
CLUB_PRICE_LABEL = "1 758 ₽/мес"

# seconds after guide delivery
FOLLOWUP_DELAYS = (
    (2 * 3600, "fu_2h"),
    (24 * 3600, "fu_24h"),
    (48 * 3600, "fu_48h"),
    (4 * 24 * 3600, "fu_4d"),
    (7 * 24 * 3600, "fu_7d"),
)


def _club_url() -> str:
    return (
        get_prodamus_url("club")
        or get_tribute_web_url("club")
        or get_page_url("club")
        or CLUB_PAGE
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
                "Если гайд уже открыли — возьмите один блок и сделайте его сегодня. "
                "Не всё сразу. Телу нужна ясность, а не перегруз.\n\n"
                "В канале каждый день — практика и выжимки:\n"
                f"{CHANNEL_URL}",
            )
            return

        if kind == "fu_24h":
            await context.bot.send_message(
                chat_id,
                "Один вопрос без давления.\n\n"
                "Что сейчас сильнее откликается: скованность, осанка, дыхание "
                "или просто «не знаю, с чего начать»?\n\n"
                "Можете ответить одним словом — или просто остаться в канале "
                "и двигаться в своём темпе.\n"
                f"Навигация по каналу: {CHANNEL_NAV_URL}",
            )
            return

        if kind == "fu_48h":
            test = get_page_url("body_test") or "https://egoshev.ru/testik"
            await context.bot.send_message(
                chat_id,
                "Когда гайд уже «лёг», следующий шаг простой.\n\n"
                "Онлайн-тест тела: 20 движений → персональный план → "
                "разбор от меня за 24–48 часов.\n\n"
                "Это не диагноз. Это понятный маршрут: с чего начать именно вам.",
                reply_markup=InlineKeyboardMarkup(
                    [[InlineKeyboardButton("Пройти тест · 684 ₽", url=test)]]
                ),
            )
            return

        if kind == "fu_4d":
            baza = get_page_url("course_baza") or "https://egoshev.ru/baza"
            await context.bot.send_message(
                chat_id,
                "Если хотите систему целиком — есть основная программа.\n\n"
                "«Базовая настройка тела» — пошаговая работа: "
                "дыхание → опора → качество движения → сила.\n\n"
                "Сначала фундамент. Потом нагрузка.",
                reply_markup=InlineKeyboardMarkup(
                    [
                        [
                            InlineKeyboardButton(
                                "Базовая настройка · 9 990 ₽", url=baza
                            )
                        ]
                    ]
                ),
            )
            return

        if kind == "fu_7d":
            club = _club_url()
            await context.bot.send_message(
                chat_id,
                "Если нужна регулярность и живое сопровождение — есть клуб.\n\n"
                "Клуб Атмосфера 3D: практика, поддержка, движение в системе.\n\n"
                "Можно просто остаться в канале. Выбор за вами. "
                "Я на связи, когда будете готовы.",
                reply_markup=InlineKeyboardMarkup(
                    [
                        [
                            InlineKeyboardButton(
                                f"Клуб · {CLUB_PRICE_LABEL}", url=club
                            )
                        ],
                        [InlineKeyboardButton("Страница клуба", url=CLUB_PAGE)],
                        [InlineKeyboardButton("Канал", url=CHANNEL_URL)],
                    ]
                ),
            )
    except Exception as exc:
        logger.warning("followup %s failed chat=%s: %s", kind, chat_id, exc)


def schedule_lead_followups(
    context: ContextTypes.DEFAULT_TYPE, *, chat_id: int, user_id: int
) -> None:
    """Schedule soft nudges after guide. Requires job-queue extra."""
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
    logger.info("Scheduled %s lead follow-ups for user=%s", len(FOLLOWUP_DELAYS), user_id)
