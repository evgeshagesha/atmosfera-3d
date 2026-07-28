"""
Bot for closed Telegram community: answers from knowledge_base + OpenAI,
gives assignments, can analyze recent chat.
"""
import logging
from collections import defaultdict
from pathlib import Path

from telegram import (
    Update,
    InlineKeyboardButton,
    InlineKeyboardMarkup,
    MenuButtonWebApp,
    WebAppInfo,
)
from telegram.ext import (
    Application,
    CallbackQueryHandler,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    TypeHandler,
    filters,
)
from openai import OpenAI

import config
from load_knowledge import load_knowledge_base
from group_history import load_group_history, save_group_history
from google_sheets_log import log_state_to_sheet
from courses import (
    load_courses,
    get_prodamus_link,
    get_invite_link,
    get_catalog_url,
    find_course_in_text,
    find_order,
    mark_order_used,
)
from user_state import (
    get_funnel_user,
    set_funnel_user,
    update_funnel_state,
    mark_invite_sent,
    VALID_COURSE_IDS,
    S_DIALOGUE_1,
    S_DIALOGUE_2,
    S_PAYMENT_LINK_SENT,
)
from handlers_products import (
    cmd_start_products,
    cmd_kurs,
    cmd_club,
    cmd_test,
    cmd_breath,
    cmd_anketa,
    cmd_menu,
    cmd_status,
    cmd_level,
    cmd_levelscore,
    on_subscribe_check,
    try_lead_keyword,
    try_payment_confirm,
)
from vk_channel_bridge import ChannelToVkBridge, VkDeliveryStore, VkWallClient

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
# httpx logs full Telegram Bot API URLs, which contain the bot token.
logging.getLogger("httpx").setLevel(logging.WARNING)
logger = logging.getLogger(__name__)

# Recent messages per chat (for /analiz and group context)
recent_messages: dict[int, list[dict]] = defaultdict(list)
MAX_RECENT = getattr(config, "MAX_RECENT_MESSAGES", 30)
MAX_RECENT_COMMUNITY = 150  # в группе храним больше для контекста утренних постов

# Ожидаем ответ о состоянии от новых участников (user_id -> True)
new_member_pending_state: set[int] = set()


# Полноценный системный промпт бота: роль, правила, стиль. Ниже к нему добавляется загруженная база знаний.
BOT_SYSTEM_PROMPT = """Ты — голос Евгения Гошева и эксперт сообщества EVOLUTION GO (EG). Общаешься в Telegram-боте от первого лица как тренер и специалист по движению, дыханию, биомеханике и телесным практикам.

РОЛЬ И ЛИЧНОСТЬ:
- Ты эксперт: биомеханика, функциональные тренировки, МФР, дыхание, осанка, реабилитация. Опираешься на западные исследования и практику. Не ставишь диагнозы — даёшь рекомендации в формате wellness.
- Тон: уверенный, спокойный, тёплый, по-человечески. Без шаблонов, воды и высокомерия. Простые слова при точности. На «ты». Без сленга и пафоса.
- Ты не «бот» и не «ассистент» — ты представляешь Евгения и его систему EVOLUTION GO. Отвечаешь так, как ответил бы он: кратко, по делу, с опорой на философию и этапы системы (диагностика → релиз/дыхание → сборка → нагрузка).

ПРАВИЛА ОТВЕТОВ:
- Отвечай на любое сообщение: привет, вопрос, жалоба, просьба. Не требуй команд типа /start — реагируй на обычный текст. Всегда опирайся на базу знаний ниже; не выдумывай факты и протоколы, которых там нет.
- Длина: обычно 2–5 предложений. Развёрнутый ответ — только если человек задал сложный вопрос. Без списков из десяти пунктов, если не попросили.
- Когда пишут про самочувствие, усталость, боль или «делал/не делал тренировку»: поддерживай и дай короткий корректив на сегодня по этапам EG (релиз и дыхание перед нагрузкой). Примеры: усталость/нет времени → лёгкий день, дыхание, одна точка МФР; боль → МФР + дыхание, без нагрузки; делал, всё ок → поддержать; плохо → дыхание, минимум нагрузки. Корректив — 1–2 предложения.
- Задания и советы: только конкретные, выполнимые, из базы знаний. С указанием что делать, при необходимости — время/повторения. Без общих фраз вроде «занимайся регулярно».
- Если вопрос вне темы (политика, быт и т.п.): вежливо верни в тему движения, дыхания, тела или предложи написать в личку организатору.
- Не придумывай курсы, цены, даты мероприятий — только то, что есть в базе знаний или что можно логично вывести из философии EG.

ЯЗЫК: только русский. Без кавычек вокруг всего ответа и без подписи «С уважением, бот» и т.п."""


def get_system_prompt() -> str:
    knowledge = load_knowledge_base(config.KNOWLEDGE_BASE_DIR)
    out = BOT_SYSTEM_PROMPT
    if knowledge:
        out += "\n\n--- БАЗА ЗНАНИЙ (философия, этапы, темы, формат заданий). Используй при каждом ответе. ---\n\n" + knowledge
    return out


def get_openai_client() -> OpenAI | None:
    if not config.OPENAI_API_KEY:
        return None
    return OpenAI(api_key=config.OPENAI_API_KEY)


def store_message(chat_id: int, role: str, text: str) -> None:
    recent_messages[chat_id].append({"role": role, "content": text})
    limit = MAX_RECENT_COMMUNITY if (config.COMMUNITY_CHAT_ID and str(chat_id) == str(config.COMMUNITY_CHAT_ID)) else MAX_RECENT
    if len(recent_messages[chat_id]) > limit:
        recent_messages[chat_id] = recent_messages[chat_id][-limit:]
    # сохраняем историю группы в файл для утренних постов и после перезапуска
    if config.COMMUNITY_CHAT_ID and str(chat_id) == str(config.COMMUNITY_CHAT_ID):
        save_group_history(chat_id, recent_messages[chat_id])


async def openai_reply(user_message: str, extra_system: str = "") -> str:
    client = get_openai_client()
    if not client:
        return "Не настроен OPENAI_API_KEY. Добавь ключ в .env"
    system = get_system_prompt()
    if extra_system:
        system += "\n\n" + extra_system
    try:
        r = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user_message},
            ],
            max_tokens=800,
        )
        return (r.choices[0].message.content or "").strip()
    except Exception as e:
        logger.exception("OpenAI error")
        err = str(e)
        if "429" in err or "quota" in err.lower() or "insufficient_quota" in err.lower():
            return (
                "Сейчас не могу ответить: исчерпан лимит запросов к AI. "
                "Организатору нужно пополнить баланс на platform.openai.com (Billing). Попробуй позже."
            )
        return f"Ошибка при запросе к AI: {e}"


# Разные приветствия под каждый курс (можно менять тексты)
WELCOME_BY_COURSE = {
    "breath": None,   # None = общее приветствие ниже; иначе — свой текст для «Дыхание»
    "posture": None,
    "pelvis": None,
    "knees": None,
    "walk": None,
    "bundle": None,
}


async def _funnel_welcome(course_id: str, course_title: str) -> str:
    custom = WELCOME_BY_COURSE.get(course_id)
    if custom:
        return custom
    return (
        f"Привет! Ты выбрал курс «{course_title}». "
        "Рад, что тебе интересна эта тема. Ниже — кнопки: оплатить этот курс или посмотреть все курсы."
    )


async def _funnel_ask_question(course_id: str, course_title: str, step: int, prev_answers: list[str]) -> str:
    client = get_openai_client()
    if not client:
        return "Расскажи в двух словах: что для тебя сейчас важнее всего в этой теме?"
    knowledge = load_knowledge_base(config.KNOWLEDGE_BASE_DIR)
    prompt = (
        f"Человек интересуется курсом «{course_title}» (id: {course_id}). "
        f"Ты задаёшь ему один короткий вопрос по теме курса (цели, опыт, запрос). "
        f"Вопрос один, по-русски, дружелюбно. Без нумерации и кавычек."
    )
    if step == 2 and prev_answers:
        prompt += f" Он уже ответил: {prev_answers[0][:150]}"
    try:
        r = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150,
        )
        return (r.choices[0].message.content or "").strip() or "Что тебя больше всего привлекает в этом курсе?"
    except Exception:
        return "Что для тебя самое важное в этой теме?"


async def cmd_start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Instagram → Start: subscribe check → guide. No bot intro menu."""
    from handlers_products import flow_telo

    user_id = update.effective_user.id
    args = context.args or []

    # Deep links: test / kurs / club / menu / … (not the lead guide)
    if args and await cmd_start_products(update, context):
        return

    # Legacy course deep links from site
    if args and args[0].lower() in VALID_COURSE_IDS:
        course_id = args[0].lower()
        courses = load_courses()
        course_title = courses.get(course_id, {}).get("title", course_id)
        set_funnel_user(user_id, course_id, S_PAYMENT_LINK_SENT, dialogue_answers=[])
        welcome = await _funnel_welcome(course_id, course_title)
        await update.message.reply_text(welcome)
        pay_url = get_prodamus_link(course_id)
        catalog_url = get_catalog_url()
        buttons = []
        if pay_url:
            buttons.append([InlineKeyboardButton(f"Оплатить курс «{course_title}»", url=pay_url)])
        buttons.append([InlineKeyboardButton("Все курсы — выбрать другой", url=catalog_url)])
        await update.message.reply_text(
            "Выбери действие:",
            reply_markup=InlineKeyboardMarkup(buttons),
        )
        return

    # Plain /start or /start telo — lead funnel only (ChatPlace entry)
    await flow_telo(update, context)


async def cmd_zadanie(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.chat.send_action("typing")
    prompt = (
        "Придумай одно конкретное задание для участников закрытого сообщества на сегодня (или на ближайшее время). "
        "Задание должно быть: по теме сообщества (движение, дыхание, МФР, осанка, тело как система), "
        "чётким и понятным (что именно сделать, сколько по времени/повторений если уместно), "
        "выполнимым без сложного инвентаря и продуктивным для практики. "
        "Опирайся на философию и этапы из базы знаний (диагностика → дыхание/релиз → сборка → нагрузка). "
        "Выдай только текст задания, без нумерации и лишних пояснений."
    )
    text = await openai_reply(
        prompt,
        extra_system="Ты даёшь только текст одного задания: конкретно, понятно, продуктивно. Без кавычек и подписи.",
    )
    await update.message.reply_text(text or "Не удалось сгенерировать задание.")


async def welcome_new_members(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Приветствие новых участников: привет, вопрос о состоянии, ссылка на тест 20."""
    if not update.message or not update.message.new_chat_members:
        return
    if config.COMMUNITY_CHAT_ID and str(update.effective_chat.id) != str(config.COMMUNITY_CHAT_ID):
        return
    test_link = (config.NEW_MEMBER_TEST_LINK or "").strip() or "https://t.me/c/2348800665/1894"
    for user in update.message.new_chat_members:
        if user.is_bot:
            continue
        name = user.first_name or "Участник"
        new_member_pending_state.add(user.id)
        welcome_text = (
            f"Привет, {name}! Рады видеть в сообществе 👋\n\n"
            "Как самочувствие? Напиши в чат пару слов о состоянии — сохраню и потом смогу подсказать по программе.\n\n"
            "Обязательно пройди тест из закреплённого сообщения — он помогает понять, с чего начать:\n"
            f"Тест 20 — {test_link}"
        )
        await update.message.reply_text(welcome_text)


async def cmd_link(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Send Prodamus link for a course. Usage: /link or /link breath."""
    args = (context.args or [])
    courses = load_courses()
    if not courses:
        await update.message.reply_text(
            "Ссылки на курсы пока не настроены. Заполни файл courses_links.json в проекте бота."
        )
        return
    if args:
        course_id = args[0].lower()
        if course_id not in courses:
            names = ", ".join(courses.keys())
            await update.message.reply_text(f"Курс не найден. Доступны: {names}")
            return
        url = get_prodamus_link(course_id)
        if url:
            title = courses[course_id].get("title", course_id)
            await update.message.reply_text(f"Курс «{title}» — оплата:\n{url}")
        else:
            await update.message.reply_text(f"Ссылка на курс «{courses[course_id].get('title', course_id)}» ещё не добавлена.")
    else:
        lines = ["Ссылки на курсы (оплата через Prodamus):"]
        for cid, c in courses.items():
            url = get_prodamus_link(cid)
            if url:
                lines.append(f"• {c.get('title', cid)}: {url}")
        if len(lines) == 1:
            await update.message.reply_text("Нет ни одной ссылки. Заполни prodamus_url в courses_links.json")
        else:
            await update.message.reply_text("\n".join(lines))


async def cmd_access(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Give invite link after payment. Usage: /access ORDER_ID."""
    order_id = " ".join(context.args or []).strip() if context.args else ""
    if not order_id:
        await update.message.reply_text(
            "Напиши номер заказа после оплаты, например: /access 12345\n"
            "Или просто: доступ 12345"
        )
        return
    order = find_order(order_id)
    if not order:
        await update.message.reply_text(
            "Заказ не найден или уже использован. Проверь номер заказа или напиши организатору."
        )
        return
    product_id = order.get("product_id") or order.get("course_id")
    if not product_id:
        await update.message.reply_text("По этому заказу не определён курс. Напиши организатору.")
        return
    invite = get_invite_link(product_id)
    if not invite:
        await update.message.reply_text("Ссылка на группу для этого курса не настроена. Напиши организатору.")
        return
    mark_order_used(order_id)
    courses = load_courses()
    title = courses.get(product_id, {}).get("title", product_id)
    await update.message.reply_text(
        f"Доступ открыт. Переходи в группу по курсу «{title}»:\n{invite}"
    )


async def cmd_analiz(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    chat_id = update.effective_chat.id
    history = recent_messages.get(chat_id, [])
    if not history:
        await update.message.reply_text(
            "Пока мало сообщений в чате. Пообщайтесь ещё — потом нажми /analiz снова."
        )
        return
    await update.message.chat.send_action("typing")
    lines = []
    for m in history[-25:]:
        role = "участник" if m["role"] == "user" else "бот"
        lines.append(f"[{role}]: {m['content'][:200]}")
    chat_log = "\n".join(lines)
    prompt = (
        "Ниже — последние сообщения в чате закрытого сообщества. Сделай краткий разбор: "
        "о чём говорят, какой настрой, есть ли вопросы без ответа. В конце дай 1–2 конкретных предложения: "
        "что можно сделать дальше (задание, тему для обсуждения, напоминание). Пиши по-русски, кратко."
        f"\n\n--- Сообщения ---\n{chat_log}"
    )
    text = await openai_reply(prompt)
    await update.message.reply_text(text or "Не удалось сделать разбор.")


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message or not update.message.text:
        return
    chat_id = update.effective_chat.id
    user_id = update.effective_user.id
    text = update.message.text.strip()
    user_name = update.effective_user.first_name or "Участник"
    is_private = update.effective_chat.type == "private"

    # In private chat: funnel (from site button) or "get course link" / "get access"
    if is_private:
        if await try_lead_keyword(update, context):
            return
        if await try_payment_confirm(update):
            return

        funnel = get_funnel_user(user_id)
        if funnel:
            course_id = funnel.get("course_id", "bundle")
            state = funnel.get("state", "")
            courses = load_courses()
            course_title = courses.get(course_id, {}).get("title", course_id)

            # After payment: user writes "оплатил 12345" or "оплатил"
            if state == S_PAYMENT_LINK_SENT and "оплатил" in text.lower():
                parts = text.replace("оплатил", "").replace("оплатила", "").strip().split()
                order_id = (parts[0] if parts else "").strip()
                if not order_id:
                    await update.message.reply_text(
                        "Напиши номер заказа из письма после оплаты, например: оплатил 12345"
                    )
                    return
                order = find_order(order_id)
                if not order:
                    await update.message.reply_text("Заказ не найден. Проверь номер или напиши организатору.")
                    return
                product_id = order.get("product_id") or order.get("course_id") or course_id
                invite = get_invite_link(product_id)
                if not invite:
                    await update.message.reply_text("Ссылка на группу не настроена. Напиши организатору.")
                    return
                mark_order_used(order_id)
                mark_invite_sent(user_id)
                await update.message.reply_text(
                    f"Удачи на курсе! 🎯\n\nВот доступ в закрытую группу по курсу «{courses.get(product_id, {}).get('title', product_id)}»:\n{invite}"
                )
                await update.message.reply_text(
                    f"Через сутки ровно зайди на сайт и вступи в мой онлайн-клуб — там продолжение и поддержка:\n{config.ONLINE_CLUB_URL}\n\nКаждый день буду присылать тебе короткие сообщения с поддержкой и напоминаниями."
                )
                return

            if state == S_DIALOGUE_1:
                answers = funnel.get("dialogue_answers") or []
                answers.append(text[:500])
                update_funnel_state(user_id, S_DIALOGUE_2, dialogue_answers=answers)
                await update.message.chat.send_action("typing")
                second_q = await _funnel_ask_question(course_id, course_title, 2, answers)
                await update.message.reply_text(second_q)
                return
            if state == S_DIALOGUE_2:
                answers = funnel.get("dialogue_answers") or []
                answers.append(text[:500])
                update_funnel_state(user_id, S_PAYMENT_LINK_SENT, dialogue_answers=answers)
                url = get_prodamus_link(course_id)
                if url:
                    await update.message.reply_text(
                        f"Спасибо за ответы! Вот ссылка на оплату курса «{course_title}»:\n{url}\n\n"
                        "После оплаты напиши сюда «оплатил» и номер заказа из письма — пришлю доступ в закрытую группу."
                    )
                else:
                    await update.message.reply_text(
                        f"Ссылка на оплату курса «{course_title}» пока не добавлена. Напиши организатору или /link."
                    )
                return

        # Not in funnel: "доступ 12345" or "дай ссылку на курс"
        t = text.lower()
        if "доступ" in t:
            parts = text.replace("получить", "").replace("доступ", "").strip().split()
            order_id = (parts[0] if parts else "").strip()
            if order_id:
                order = find_order(order_id)
                if order:
                    product_id = order.get("product_id") or order.get("course_id")
                    invite = get_invite_link(product_id) if product_id else None
                    if invite:
                        mark_order_used(order_id)
                        courses = load_courses()
                        title = courses.get(product_id, {}).get("title", product_id)
                        await update.message.reply_text(
                            f"Доступ открыт. Переходи в группу «{title}»:\n{invite}"
                        )
                        return
                    await update.message.reply_text("По заказу не определён курс. Напиши организатору.")
                    return
                await update.message.reply_text("Заказ не найден. Проверь номер или напиши организатору.")
                return
        course_id = find_course_in_text(text)
        if course_id:
            url = get_prodamus_link(course_id)
            if url:
                courses = load_courses()
                title = courses.get(course_id, {}).get("title", course_id)
                await update.message.reply_text(f"Курс «{title}» — оплата:\n{url}")
                return
            await update.message.reply_text("Ссылка на этот курс пока не добавлена. Напиши /link для списка.")
            return

        # Любое другое сообщение в личке (привет, вопрос и т.д.) — отвечаем с учётом философии и базы знаний, без слэшей
        await update.message.chat.send_action("typing")
        reply = await openai_reply(f"Сообщение в личку от {user_name}: {text}")
        if reply:
            await update.message.reply_text(reply)
        return

    # Restrict to community chat if configured (for group messages)
    if config.COMMUNITY_CHAT_ID and str(chat_id) != str(config.COMMUNITY_CHAT_ID):
        return

    # Сохраняем ответы о состоянии в Google Таблицу (новые участники + все сообщения для утренних опросов)
    is_new_member_reply = user_id in new_member_pending_state
    record_type = "new_member_state" if is_new_member_reply else "group_message"
    log_state_to_sheet(user_id, user_name, text, record_type=record_type)
    if is_new_member_reply:
        new_member_pending_state.discard(user_id)
        await update.message.reply_text("Спасибо, записал! Пройди тест по ссылке выше — по результатам подберём программу.")
        store_message(chat_id, "user", f"{user_name}: {text}")
        return

    store_message(chat_id, "user", f"{user_name}: {text}")

    # Don't reply to bot's own messages
    if update.message.from_user and update.message.from_user.is_bot:
        return

    await update.message.chat.send_action("typing")
    reply = await openai_reply(f"Сообщение от {user_name} в чате сообщества:\n\n{text}")
    if reply:
        store_message(chat_id, "assistant", reply)
        await update.message.reply_text(reply)


def main() -> None:
    if not config.BOT_TOKEN:
        logger.error("TELEGRAM_BOT_TOKEN not set. Copy .env.example to .env and fill in.")
        return
    # загружаем сохранённую историю группы для контекста и /analiz
    if config.COMMUNITY_CHAT_ID:
        try:
            cid = int(config.COMMUNITY_CHAT_ID)
            loaded = load_group_history(cid)
            if loaded:
                recent_messages[cid] = loaded
                logger.info("Loaded %d group messages from history.", len(loaded))
        except (ValueError, TypeError):
            pass
    async def _post_init(application: Application) -> None:
        """Menu button opens Mini App (HTTPS catalog)."""
        url = (getattr(config, "MINI_APP_URL", "") or "").strip()
        if not url:
            return
        try:
            await application.bot.set_chat_menu_button(
                menu_button=MenuButtonWebApp(
                    text="Каталог",
                    web_app=WebAppInfo(url=url),
                )
            )
            logger.info("Menu button → Mini App %s", url)
        except Exception as exc:
            logger.warning("set_chat_menu_button failed: %s", exc)

    app = Application.builder().token(config.BOT_TOKEN).post_init(_post_init).build()
    if config.VK_BRIDGE_ENABLED:
        if not config.VK_ACCESS_TOKEN or not config.VK_GROUP_ID:
            logger.error(
                "VK bridge disabled: VK_ACCESS_TOKEN and VK_GROUP_ID are required."
            )
        elif not config.CHANNEL_ID:
            logger.error("VK bridge disabled: CHANNEL_ID is required.")
        else:
            vk_bridge = ChannelToVkBridge(
                channel_id=config.CHANNEL_ID,
                publisher=VkWallClient(
                    access_token=config.VK_ACCESS_TOKEN,
                    group_id=config.VK_GROUP_ID,
                    api_version=config.VK_API_VERSION,
                ),
                store=VkDeliveryStore(config.VK_BRIDGE_DB_PATH),
                album_settle_seconds=config.VK_ALBUM_SETTLE_SECONDS,
            )
            # Separate handler group: observe only new channel_post updates without
            # taking updates away from the bot's existing command/message handlers.
            app.add_handler(TypeHandler(Update, vk_bridge.handle_update), group=-1)
            logger.info(
                "VK bridge enabled: %s → VK group %s",
                config.CHANNEL_ID,
                config.VK_GROUP_ID,
            )
    app.add_handler(CommandHandler("start", cmd_start))
    app.add_handler(CommandHandler("test", cmd_test))
    app.add_handler(CommandHandler("kurs", cmd_kurs))
    app.add_handler(CommandHandler("breath", cmd_breath))
    app.add_handler(CommandHandler("club", cmd_club))
    app.add_handler(CommandHandler("anketa", cmd_anketa))
    app.add_handler(CommandHandler("menu", cmd_menu))
    app.add_handler(CommandHandler("status", cmd_status))
    app.add_handler(CommandHandler("level", cmd_level))
    app.add_handler(CommandHandler("level1", cmd_level))
    app.add_handler(CommandHandler("level2", cmd_level))
    app.add_handler(CommandHandler("level3", cmd_level))
    app.add_handler(CommandHandler("levelscore", cmd_levelscore))
    app.add_handler(
        CallbackQueryHandler(on_subscribe_check, pattern=r"^subok:")
    )
    app.add_handler(CommandHandler("zadanie", cmd_zadanie))
    app.add_handler(CommandHandler("link", cmd_link))
    app.add_handler(CommandHandler("access", cmd_access))
    app.add_handler(CommandHandler("analiz", cmd_analiz))
    app.add_handler(
        MessageHandler(filters.StatusUpdate.NEW_CHAT_MEMBERS, welcome_new_members)
    )
    app.add_handler(
        MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message)
    )
    logger.info("Bot starting...")
    app.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == "__main__":
    main()
