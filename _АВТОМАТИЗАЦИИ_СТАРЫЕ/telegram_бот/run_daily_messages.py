"""
Ежедневная рассылка: 15 дожимающих сообщений каждому пользователю из списка.
Запускать по cron раз в день, например: 0 9 * * * cd /path/to/eg-community-bot && python run_daily_messages.py

Список пользователей берётся из daily_messages_list.json (добавляются после выдачи доступа в группу).
Сообщения генерирует AI (цепляющие, короткие). Позже можно заменить на свои тексты из knowledge_base.
"""
import asyncio
import json
import logging
from pathlib import Path
from datetime import date

from openai import OpenAI
from telegram import Bot

import config
from user_state import get_daily_list

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DAILY_LIST_FILE = config.BASE_DIR / "daily_messages_list.json"
KNOWLEDGE_DIR = config.BASE_DIR / "knowledge_base"


def load_knowledge() -> str:
    parts = []
    for ext in ("*.md", "*.txt"):
        for f in sorted(KNOWLEDGE_DIR.glob(ext)):
            try:
                parts.append(f.read_text(encoding="utf-8").strip())
            except Exception:
                pass
    return "\n\n".join(parts)[:4000] if parts else ""


def generate_fifteen_messages(course_id: str, course_title: str) -> list[str]:
    client = OpenAI(api_key=config.OPENAI_API_KEY) if config.OPENAI_API_KEY else None
    if not client:
        return [_placeholder_msg(i) for i in range(15)]
    knowledge = load_knowledge()
    prompt = (
        f"Сгенерируй ровно 15 коротких дожимающих сообщений для человека, который купил курс «{course_title}» (тема: движение, тело, практики). "
        "Каждое сообщение — одна строка, цепляющее, мотивирующее, без пафоса. По-русски. "
        "Формат ответа: строго 15 строк, по одному сообщению на строку, без нумерации и буллетов."
    )
    if knowledge:
        prompt += f"\nКонтекст сообщества:\n{knowledge[:2000]}"
    try:
        r = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=800,
        )
        text = (r.choices[0].message.content or "").strip()
        lines = [s.strip() for s in text.split("\n") if s.strip()][:15]
        while len(lines) < 15:
            lines.append(_placeholder_msg(len(lines)))
        return lines[:15]
    except Exception as e:
        logger.exception("OpenAI error in daily messages")
        return [_placeholder_msg(i) for i in range(15)]


def _placeholder_msg(n: int) -> str:
    msgs = [
        "Не забывай про маленький шаг сегодня — он уже ведёт к результату.",
        "Как твоё тело сегодня? Даже 5 минут практики считаются.",
        "Проверь: ты дышишь полной грудью или зажимаешься?",
        "Осанка — это не только спина. Это настрой всего дня.",
        "Один осознанный вдох может изменить состояние. Попробуй прямо сейчас.",
        "Движение не ради движения. Ради того, чтобы чувствовать себя живым.",
        "Что бы ты сделал для тела сегодня, если бы было только 10 минут?",
        "Напоминание: ты уже в пути. Каждый день — часть пути.",
        "Таз, дыхание, стопы — всё связано. Одно тянет за собой другое.",
        "Сегодня не про идеал. Сегодня про один шаг.",
        "Твоя практика ждёт. Даже короткая сессия лучше нуля.",
        "Вопрос на сегодня: где в теле ты чувствуешь напряжение?",
        "Поддержка: ты не один. Сообщество с тобой.",
        "Завтра начнётся с того, что ты сделаешь сегодня.",
        "Удачи на пути. Мы рядом.",
    ]
    return msgs[n % len(msgs)]


async def run() -> None:
    if not config.BOT_TOKEN:
        logger.error("TELEGRAM_BOT_TOKEN not set")
        return
    bot = Bot(token=config.BOT_TOKEN)
    courses = {}
    if (config.BASE_DIR / "courses_links.json").exists():
        try:
            courses = json.loads((config.BASE_DIR / "courses_links.json").read_text(encoding="utf-8"))
        except Exception:
            pass
    today = date.today()
    for entry in get_daily_list():
        user_id = entry.get("user_id")
        course_id = entry.get("course_id", "bundle")
        start_s = entry.get("start_date", "")
        if not user_id or not start_s:
            continue
        try:
            start_date = date.fromisoformat(start_s)
        except ValueError:
            continue
        # Рассылаем начиная со следующего дня после выдачи доступа (в день оплаты — только «через сутки зайди на сайт»)
        if (today - start_date).days < 1:
            continue
        course_title = courses.get(course_id, {}).get("title", course_id)
        messages = generate_fifteen_messages(course_id, course_title)
        for i, msg in enumerate(messages):
            try:
                await bot.send_message(chat_id=int(user_id), text=msg)
                await asyncio.sleep(90)  # ~1.5 мин между сообщениями, 15 сообщений ≈ 22 мин
            except Exception as e:
                logger.warning("Send to %s failed: %s", user_id, e)
        logger.info("Sent 15 daily messages to user %s", user_id)


if __name__ == "__main__":
    asyncio.run(run())
