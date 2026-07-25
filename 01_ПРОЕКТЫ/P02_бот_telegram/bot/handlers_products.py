"""Commands: /kurs, /club, /status, lead keyword ТЕЛО, payment confirm."""
from __future__ import annotations

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update
from telegram.ext import ContextTypes

import config
from orders import find_order, mark_order_used
from products import (
    get_invite_url,
    get_lead_delivery,
    get_lead_keyword,
    get_product,
    get_prodamus_url,
    load_products,
)
from subscriptions import find_by_telegram, is_active


async def cmd_kurs(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    p = get_product("course_baza") or {}
    title = p.get("title", "Базовая настройка тела")
    pay = get_prodamus_url("course_baza")
    site = config.SITE_URL
    lines = [
        f"🎯 **{title}** — {p.get('price_rub', 9990):,} ₽".replace(",", " "),
        p.get("description", ""),
        f"Подробнее: {site}",
    ]
    buttons = []
    if pay:
        buttons.append([InlineKeyboardButton("Оплатить курс", url=pay)])
    buttons.append([InlineKeyboardButton("Страница курса", url=site)])
    await update.message.reply_text(
        "\n".join(x for x in lines if x),
        reply_markup=InlineKeyboardMarkup(buttons) if buttons else None,
        parse_mode="Markdown",
    )


async def cmd_club(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    p = get_product("club") or {}
    title = p.get("title", "Онлайн-клуб")
    pay = get_prodamus_url("club")
    lines = [
        f"🏛 **{title}** — {p.get('price_rub', 1680):,} ₽/мес".replace(",", " "),
        p.get("description", "Закрытая группа · программы · поддержка"),
        "",
        "После оплаты напиши: **оплатил НОМЕР_ЗАКАЗА** — пришлю доступ.",
    ]
    buttons = []
    if pay:
        buttons.append([InlineKeyboardButton("Оформить подписку", url=pay)])
    await update.message.reply_text(
        "\n".join(lines),
        reply_markup=InlineKeyboardMarkup(buttons) if buttons else None,
        parse_mode="Markdown",
    )


async def cmd_status(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    uid = update.effective_user.id
    sub = find_by_telegram(uid)
    if sub and is_active(uid):
        exp = sub.get("expires_at", "—")
        await update.message.reply_text(
            f"✅ Подписка клуба активна.\nДействует до: {exp[:10] if exp else '—'}"
        )
        return
    if sub:
        await update.message.reply_text(
            "⚠️ Подписка не активна. Напиши /club чтобы продлить."
        )
        return
    await update.message.reply_text(
        "Подписка не найдена. Оформи клуб: /club\nКурс: /kurs"
    )


async def try_lead_keyword(update: Update) -> bool:
    """Return True if message was handled as ТЕЛО lead."""
    text = (update.message.text or "").strip()
    keyword = get_lead_keyword()
    if text.upper() != keyword and keyword not in text.upper().split():
        return False
    delivery = get_lead_delivery()
    if delivery and delivery.startswith("http"):
        await update.message.reply_text(
            f"Гайд «Двигательная база»:\n{delivery}\n\n"
            f"Дальше — курс /kurs или клуб /club"
        )
        return True
    await update.message.reply_text(
        "Гайд скоро будет здесь. Пока смотри курс: /kurs"
    )
    return True


async def try_payment_confirm(update: Update) -> bool:
    """Handle «оплатил 12345» in private chat."""
    text = (update.message.text or "").strip()
    low = text.lower()
    if "оплатил" not in low and "оплатила" not in low:
        return False
    parts = text.replace("оплатил", "").replace("оплатила", "").strip().split()
    order_id = parts[0] if parts else ""
    if not order_id:
        await update.message.reply_text("Напиши номер заказа: оплатил 12345")
        return True
    order = find_order(order_id)
    if not order:
        await update.message.reply_text("Заказ не найден. Проверь номер или подожди 1–2 минуты.")
        return True
    product_id = order.get("product_id") or "course_baza"
    invite = get_invite_url(product_id)
    if not invite:
        await update.message.reply_text("Ссылка на группу не настроена. Напиши организатору.")
        return True
    mark_order_used(order_id)
    p = get_product(product_id) or {}
    title = p.get("title", product_id)
    await update.message.reply_text(
        f"✅ Доступ открыт — «{title}»:\n{invite}"
    )
    return True


async def cmd_start_products(update: Update, context: ContextTypes.DEFAULT_TYPE) -> bool:
    """Handle /start kurs|club|telo. Returns True if handled."""
    args = [a.lower() for a in (context.args or [])]
    if not args:
        return False
    arg = args[0]
    if arg in ("kurs", "course", "baza", "course_baza"):
        context.args = []
        await cmd_kurs(update, context)
        return True
    if arg in ("club", "klub"):
        context.args = []
        await cmd_club(update, context)
        return True
    if arg in ("telo", "lead"):
        await try_lead_keyword(update)
        return True
    return False
