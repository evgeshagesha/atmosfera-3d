"""Commands: /kurs, /club, /test, /status, lead ТЕЛО, payment confirm, deep links."""
from __future__ import annotations

from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, WebAppInfo
from telegram.ext import ContextTypes

import config
from channel_gate import ask_subscribe, is_channel_subscriber
from orders import find_order, mark_order_used
from products import (
    get_access_url,
    get_invite_url,
    get_lead_delivery,
    get_lead_keyword,
    get_level_file,
    get_level_meta,
    get_page_url,
    get_product,
    get_prodamus_url,
    get_tribute_web_url,
    level_from_score,
    resolve_local_file,
)

CHANNEL_URL = "https://t.me/EvgeniiGoshev"
CHANNEL_NAV_URL = "https://t.me/EvgeniiGoshev/1123"
GUIDE_URL = "https://egoshev.ru/gaid"
MENU_LINKS = [
    ("Тест тела · 684 ₽", "test"),
    ("Дыхание и осанка · 1 990 ₽", "breath"),
    ("Базовая настройка · 9 990 ₽", "baza"),
    ("Клуб · 1 680 ₽/мес", "club"),
    ("Запись в студию", "anketa"),
]


def _pay_or_page_button(label: str, product_id: str) -> InlineKeyboardButton | None:
    pay = get_prodamus_url(product_id)
    if pay:
        return InlineKeyboardButton(label, url=pay)
    page = get_page_url(product_id)
    if page:
        # Tilda pay page is the live checkout for body_test
        suffix = "" if product_id == "body_test" else " (страница)"
        return InlineKeyboardButton(label + suffix, url=page)
    return None


async def send_guide_link(update: Update) -> None:
    """Lead: calm URL button to /gaid (Telegram cannot color buttons gray)."""
    message = _msg(update)
    if not message:
        return
    p = get_product("lead_telo") or {}
    title = p.get("title", "С чего начинать работу с телом")
    bonus = p.get("bonus", "")
    guide = get_page_url("lead_telo") or GUIDE_URL
    lines = [
        f"Ваш гайд «{title}».",
        (f"Бонус: {bonus}." if bonus else ""),
        "",
        "Откройте по кнопке ниже — всё на одной странице.",
    ]
    # URL buttons are always system-styled (blue). No custom gray in Bot API.
    keyboard = InlineKeyboardMarkup(
        [[InlineKeyboardButton("Открыть гайд", url=guide)]]
    )
    await message.reply_text(
        "\n".join(x for x in lines if x is not None and x != ""),
        reply_markup=keyboard,
    )


async def send_channel_invite(update: Update) -> None:
    """After guide: channel value + subscribe + nav pin."""
    message = _msg(update)
    if not message:
        return
    text = (
        "Дальше — канал @EvgeniiGoshev.\n\n"
        "Там регулярно:\n"
        "• выжимки из блога — самое важное за день\n"
        "• разборы тела, дыхания и движения\n"
        "• новости системы и следующие шаги\n\n"
        "В закрепе — навигация по всем направлениям.\n"
        f"{CHANNEL_NAV_URL}"
    )
    keyboard = InlineKeyboardMarkup(
        [
            [InlineKeyboardButton("Подписаться на канал", url=CHANNEL_URL)],
            [InlineKeyboardButton("Открыть навигацию", url=CHANNEL_NAV_URL)],
        ]
    )
    await message.reply_text(text, reply_markup=keyboard)


async def send_funnel_next_steps(update: Update) -> None:
    """Soft ladder: test → breath → baza → club → studio."""
    message = _msg(update)
    if not message:
        return
    test = get_page_url("body_test") or "https://egoshev.ru/testik"
    breath = get_page_url("course_breath_posture") or "https://egoshev.ru/dyhanieosanka"
    baza = get_page_url("course_baza") or "https://egoshev.ru/baza"
    club = get_prodamus_url("club") or get_tribute_web_url("club") or get_page_url("club")
    anketa = get_page_url("studio") or "https://egoshev.ru/anketa"

    text = (
        "Когда будете готовы идти глубже — выберите шаг:\n\n"
        "1) Тест тела — точка входа и персональный план\n"
        "2) Дыхание и осанка\n"
        "3) Базовая настройка тела\n"
        "4) Клуб — регулярность\n"
        "5) Студия в Москве"
    )
    buttons: list[list[InlineKeyboardButton]] = [
        [InlineKeyboardButton("Тест тела · 684 ₽", url=test)],
        [InlineKeyboardButton("Дыхание и осанка · 1 990 ₽", url=breath)],
        [InlineKeyboardButton("Базовая настройка · 9 990 ₽", url=baza)],
    ]
    if club:
        buttons.append([InlineKeyboardButton("Клуб · 1 680 ₽/мес", url=club)])
    buttons.append([InlineKeyboardButton("Запись в студию", url=anketa)])
    await message.reply_text(text, reply_markup=InlineKeyboardMarkup(buttons))


async def send_body_test_offer(update: Update) -> None:
    """Offer online body test 684 ₽ → page_url (testik) for payment."""
    message = _msg(update)
    if not message:
        return
    p = get_product("body_test") or {}
    title = p.get("title", "Онлайн-тест тела")
    price = p.get("price_rub", 684)
    desc = p.get("description", "20 движений · персональный план · разбор 24–48 ч")
    pay_url = get_prodamus_url("body_test") or get_page_url("body_test")
    lines = [
        f"Следующий шаг — **{title}** ({price} ₽).",
        "",
        desc,
        "",
        "Оплатите на странице ниже. После оплаты откроется доступ к самому тесту. "
        "Я разбираю результат вручную за 24–48 часов и даю маршрут "
        "(дыхание / курс / клуб / студия).",
    ]
    buttons: list[list[InlineKeyboardButton]] = []
    if pay_url:
        buttons.append([InlineKeyboardButton("Оплатить тест · 684 ₽", url=pay_url)])
    else:
        lines.append("")
        lines.append("_Страница оплаты ещё не настроена — напишите Евгению._")
    buttons.append([InlineKeyboardButton("Канал Евгения", url=CHANNEL_URL)])
    await message.reply_text(
        "\n".join(lines),
        reply_markup=InlineKeyboardMarkup(buttons) if buttons else None,
        parse_mode="Markdown",
    )


def _msg(update: Update):
    return update.effective_message


async def deliver_lead_guide(update: Update) -> bool:
    """Send guide as URL button → https://egoshev.ru/gaid."""
    message = _msg(update)
    if not message:
        return False
    guide = get_page_url("lead_telo") or GUIDE_URL
    await message.reply_text(
        "Ваш гайд — откройте по кнопке:",
        reply_markup=InlineKeyboardMarkup(
            [[InlineKeyboardButton("Открыть гайд", url=guide)]]
        ),
    )
    return True


async def flow_telo(
    update: Update, context: ContextTypes.DEFAULT_TYPE | None = None
) -> None:
    """After Start from Instagram: ask channel sub → then guide link only."""
    message = _msg(update)
    user = update.effective_user
    if not message or not user or context is None:
        return

    # No "Привет, я бот Атмосфера 3D" — ChatPlace already welcomed them.
    if not await is_channel_subscriber(context, user.id):
        await ask_subscribe(message, callback_data="subok:telo", what="гайд")
        return

    await deliver_lead_guide(update)


async def cmd_kurs(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    p = get_product("course_baza") or {}
    title = p.get("title", "Базовая настройка тела")
    pay = get_prodamus_url("course_baza")
    page = get_page_url("course_baza") or config.SITE_URL
    lines = [
        f"**{title}** — {p.get('price_rub', 9990):,} ₽".replace(",", " "),
        p.get("description", ""),
        f"Подробнее: {page}",
    ]
    buttons: list[list[InlineKeyboardButton]] = []
    if pay:
        buttons.append([InlineKeyboardButton("Оплатить курс", url=pay)])
    if page:
        buttons.append([InlineKeyboardButton("Страница курса", url=page)])
    await update.message.reply_text(
        "\n".join(x for x in lines if x),
        reply_markup=InlineKeyboardMarkup(buttons) if buttons else None,
        parse_mode="Markdown",
    )


async def cmd_breath(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    p = get_product("course_breath_posture") or {}
    title = p.get("title", "Дыхание и осанка")
    pay = get_prodamus_url("course_breath_posture")
    page = get_page_url("course_breath_posture")
    lines = [
        f"**{title}** — {p.get('price_rub', 1990):,} ₽".replace(",", " "),
        p.get("description", ""),
        "",
        "Оплата и доступ — на странице курса (Tilda Members).",
    ]
    buttons: list[list[InlineKeyboardButton]] = []
    url = pay or page
    if url:
        buttons.append([InlineKeyboardButton("Открыть курс · 1 990 ₽", url=url)])
    await update.message.reply_text(
        "\n".join(x for x in lines if x),
        reply_markup=InlineKeyboardMarkup(buttons) if buttons else None,
        parse_mode="Markdown",
    )


async def cmd_club(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    p = get_product("club") or {}
    title = p.get("title", "Онлайн-клуб")
    tg_pay = get_prodamus_url("club")  # tribute_url (Telegram)
    web_pay = get_tribute_web_url("club")
    lines = [
        f"**{title}** — {p.get('price_rub', 1680):,} ₽/мес".replace(",", " "),
        p.get("description", "Закрытая группа · программы · поддержка"),
        "",
        "Оплата через Tribute. После оплаты откроется доступ в клуб.",
    ]
    buttons: list[list[InlineKeyboardButton]] = []
    if tg_pay:
        buttons.append([InlineKeyboardButton("Оформить в Telegram", url=tg_pay)])
    if web_pay:
        buttons.append([InlineKeyboardButton("Оплатить в браузере", url=web_pay)])
    page = get_page_url("club")
    if page:
        buttons.append([InlineKeyboardButton("Страница клуба", url=page)])
    await update.message.reply_text(
        "\n".join(lines),
        reply_markup=InlineKeyboardMarkup(buttons) if buttons else None,
        parse_mode="Markdown",
    )


async def cmd_test(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await send_body_test_offer(update)


async def cmd_anketa(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    p = get_product("studio") or {}
    page = get_page_url("studio") or "https://egoshev.ru/anketa"
    maps = (p.get("maps_url") or "").strip()
    lines = [
        "Личная работа в студии «Атмосфера 3D» (Москва).",
        "Заполните короткую анкету — свяжусь с форматом и слотом.",
        "",
        f"Анкета: {page}",
    ]
    if maps:
        lines.append(f"Карта: {maps}")
    buttons = [[InlineKeyboardButton("Заполнить анкету", url=page)]]
    if maps:
        buttons.append([InlineKeyboardButton("Студия на карте", url=maps)])
    await update.message.reply_text(
        "\n".join(lines),
        reply_markup=InlineKeyboardMarkup(buttons),
    )


async def cmd_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Menu: Mini App catalog + direct product links."""
    lines = [
        "Каталог Атмосфера 3D.",
        "",
        "Откройте Mini App или выберите ссылку ниже.",
    ]
    buttons: list[list[InlineKeyboardButton]] = []
    mini = (getattr(config, "MINI_APP_URL", "") or "").strip()
    if mini:
        buttons.append(
            [
                InlineKeyboardButton(
                    "Открыть каталог",
                    web_app=WebAppInfo(url=mini),
                )
            ]
        )
    mapping = {
        "test": "body_test",
        "breath": "course_breath_posture",
        "baza": "course_baza",
        "club": "club",
        "anketa": "studio",
    }
    for label, key in MENU_LINKS:
        pid = mapping[key]
        btn = _pay_or_page_button(label, pid)
        if btn:
            buttons.append([btn])
    buttons.append([InlineKeyboardButton("Канал", url=CHANNEL_URL)])
    await update.message.reply_text(
        "\n".join(lines),
        reply_markup=InlineKeyboardMarkup(buttons) if buttons else None,
    )


async def cmd_status(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    from subscriptions import find_by_telegram, is_active

    uid = update.effective_user.id
    sub = find_by_telegram(uid)
    if sub and is_active(uid):
        exp = sub.get("expires_at", "—")
        await update.message.reply_text(
            f"Подписка клуба активна.\nДействует до: {exp[:10] if exp else '—'}"
        )
        return
    if sub:
        await update.message.reply_text(
            "Подписка не активна. Напишите /club чтобы продлить."
        )
        return
    await update.message.reply_text(
        "Подписка не найдена. Клуб: /club\nКурс: /kurs\nТест: /test"
    )


async def try_lead_keyword(
    update: Update, context: ContextTypes.DEFAULT_TYPE
) -> bool:
    """Return True if message was handled as ТЕЛО lead."""
    text = (update.message.text or "").strip()
    keyword = get_lead_keyword()
    upper = text.upper()
    if upper != keyword and keyword not in upper.split():
        return False
    await flow_telo(update, context)
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
        await update.message.reply_text("Напишите номер заказа: оплатил 12345")
        return True
    order = find_order(order_id)
    if not order:
        await update.message.reply_text(
            "Заказ не найден. Проверьте номер или подождите 1–2 минуты после оплаты."
        )
        return True
    product_id = order.get("product_id") or "course_baza"

    if product_id == "body_test":
        mark_order_used(order_id)
        access = (
            get_access_url("body_test")
            or "https://egoshev.ru/testresult"
        )
        await update.message.reply_text(
            "Оплата теста подтверждена.\n\n"
            f"Ваш доступ к тесту:\n{access}\n\n"
            "Пройдите тест. Когда увидите свой уровень — напишите боту:\n"
            "/level1 · /level2 · /level3\n"
            "или /levelscore 42 (ваш балл) — пришлю PDF гайд в личку.\n\n"
            "Разбор маршрута A–E — по запросу за 24–48 часов."
        )
        return True

    invite = get_invite_url(product_id)
    if not invite:
        await update.message.reply_text(
            "Ссылка на доступ ещё не настроена. Напишите организатору — "
            "оплата уже в системе."
        )
        return True
    mark_order_used(order_id)
    p = get_product(product_id) or {}
    title = p.get("title", product_id)
    await update.message.reply_text(f"Доступ открыт — «{title}»:\n{invite}")
    return True


async def send_next_offer_after_level(update: Update, level: int) -> None:
    """Soft CTA after level PDF — one primary + menu."""
    message = _msg(update)
    if not message:
        return
    meta = get_level_meta(level) or {}
    next_code = meta.get("next_offer") or meta.get("next_product") or "course_breath_posture"
    buttons: list[list[InlineKeyboardButton]] = []

    if next_code == "course_breath_posture" or level == 1:
        url = get_prodamus_url("course_breath_posture") or get_page_url("course_breath_posture")
        if url:
            buttons.append([InlineKeyboardButton("Дыхание и осанка · 1 990 ₽", url=url)])
    if next_code == "course_baza" or level == 2:
        url = get_prodamus_url("course_baza") or get_page_url("course_baza")
        if url:
            buttons.append([InlineKeyboardButton("Базовая настройка · 9 990 ₽", url=url)])
    if next_code == "club" or level == 3:
        tg = get_prodamus_url("club")
        if tg:
            buttons.append([InlineKeyboardButton("Клуб · 1 680 ₽/мес", url=tg)])

    # Always offer full menu path
    page_test = get_page_url("body_test")
    if page_test and level == 0:
        buttons.append([InlineKeyboardButton("Тест тела", url=page_test)])

    await message.reply_text(
        "Когда будете готовы идти дальше — выберите следующий шаг. "
        "Или напишите /menu.",
        reply_markup=InlineKeyboardMarkup(buttons) if buttons else None,
    )


async def deliver_level_pdf(
    update: Update,
    level: int,
    context: ContextTypes.DEFAULT_TYPE | None = None,
) -> bool:
    """Send level PDF to private chat. Returns True if file sent."""
    message = _msg(update)
    user = update.effective_user
    if not message:
        return False

    if context is not None and user is not None:
        ok = await is_channel_subscriber(context, user.id)
        if not ok:
            await ask_subscribe(
                message,
                callback_data=f"subok:level:{level}",
                what="гайд вашего уровня",
            )
            return False

    meta = get_level_meta(level)
    if not meta:
        await message.reply_text("Уровень не найден. Доступны: /level1 /level2 /level3")
        return False

    title = meta.get("title", f"Уровень {level}")
    summary = meta.get("summary", "")
    await message.reply_text(
        f"Ваш результат: **{title}**\n"
        + (f"{summary}\n" if summary else "")
        + "\nОтправляю персональный гайд PDF.",
        parse_mode="Markdown",
    )

    path = get_level_file(level)
    if path is None:
        page = (meta.get("page_url") or "").strip()
        if page:
            await message.reply_text(f"Файл пока на сайте:\n{page}")
            await send_next_offer_after_level(update, level)
            return False
        await message.reply_text("PDF ещё не загружен на сервер бота. Напишите Евгению.")
        return False

    with path.open("rb") as fh:
        await message.reply_document(
            document=fh,
            filename=f"EG_Uroven_{level}.pdf",
            caption=f"{title} · Атмосфера 3D",
        )
    await send_next_offer_after_level(update, level)
    return True


async def cmd_level(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """ /level1 /level2 /level3 or /level 2 """
    text = (update.message.text or "").strip().lower()
    level: int | None = None
    if text.startswith("/level1"):
        level = 1
    elif text.startswith("/level2"):
        level = 2
    elif text.startswith("/level3"):
        level = 3
    elif context.args:
        try:
            level = int(context.args[0])
        except ValueError:
            level = None
    if level not in (1, 2, 3):
        await update.message.reply_text(
            "Напишите /level1, /level2 или /level3 — пришлю гайд вашего уровня.\n"
            "Либо: /levelscore 42 — подберу уровень по баллам."
        )
        return
    await deliver_level_pdf(update, level, context)


async def cmd_levelscore(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """ /levelscore 42 — map score to level and send PDF."""
    if not context.args:
        await update.message.reply_text("Пример: /levelscore 42")
        return
    try:
        score = int(context.args[0])
    except ValueError:
        await update.message.reply_text("Балл — число. Пример: /levelscore 42")
        return
    level = level_from_score(score)
    await update.message.reply_text(f"По баллу {score}/60 → уровень {level}.")
    await deliver_level_pdf(update, level, context)


async def on_subscribe_check(
    update: Update, context: ContextTypes.DEFAULT_TYPE
) -> None:
    """Callback: subok:telo | subok:level:1|2|3 after user claims subscription."""
    query = update.callback_query
    if not query or not query.data:
        return
    await query.answer()
    data = query.data
    user = update.effective_user
    if not user:
        return

    ok = await is_channel_subscriber(context, user.id)
    if not ok:
        if query.message:
            await query.message.reply_text(
                "Пока не вижу подписку. Откройте канал, нажмите «Подписаться», "
                "подождите пару секунд и снова нажмите «Я подписался».",
                reply_markup=query.message.reply_markup,
            )
        return

    if data == "subok:telo":
        await flow_telo(update, context)
        return
    if data.startswith("subok:level:"):
        try:
            level = int(data.rsplit(":", 1)[-1])
        except ValueError:
            return
        if level in (1, 2, 3):
            await deliver_level_pdf(update, level, context)


async def cmd_start_products(update: Update, context: ContextTypes.DEFAULT_TYPE) -> bool:
    """Handle /start telo|test|kurs|breath|baza|club|anketa|menu|level1..3. Returns True if handled."""
    args = [a.lower() for a in (context.args or [])]
    if not args:
        return False
    arg = args[0]
    if arg in ("telo", "lead", "gaid", "guide", "гайд"):
        await flow_telo(update, context)
        return True
    if arg in ("test", "testik", "body_test"):
        await send_body_test_offer(update)
        return True
    if arg in ("level1", "lvl1", "uroven1"):
        await deliver_level_pdf(update, 1, context)
        return True
    if arg in ("level2", "lvl2", "uroven2"):
        await deliver_level_pdf(update, 2, context)
        return True
    if arg in ("level3", "lvl3", "uroven3"):
        await deliver_level_pdf(update, 3, context)
        return True
    if arg in ("kurs", "course", "baza", "course_baza"):
        context.args = []
        await cmd_kurs(update, context)
        return True
    if arg in ("breath", "dyhanie", "course_breath_posture"):
        context.args = []
        await cmd_breath(update, context)
        return True
    if arg in ("club", "klub"):
        context.args = []
        await cmd_club(update, context)
        return True
    if arg in ("anketa", "studio", "zapis"):
        context.args = []
        await cmd_anketa(update, context)
        return True
    if arg in ("menu", "uslugi", "services"):
        context.args = []
        await cmd_menu(update, context)
        return True
    return False
