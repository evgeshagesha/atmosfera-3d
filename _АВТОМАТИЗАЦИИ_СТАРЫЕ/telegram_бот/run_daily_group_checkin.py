"""
Ежедневное сообщение-опрос в группу (онлайн-сообщество): самочувствие, тренировки.
Сообщение генерирует OpenAI в стиле тренера и философии из knowledge_base.
Запускать по cron раз в день утром (например в 9:00):
0 9 * * * cd /path/to/eg-community-bot && /path/to/venv/bin/python run_daily_group_checkin.py
"""
import asyncio
import os

from dotenv import load_dotenv
from openai import OpenAI
from telegram import Bot

import config
from load_knowledge import load_knowledge_base
from group_history import load_group_history

load_dotenv()
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
COMMUNITY_CHAT_ID = os.getenv("COMMUNITY_CHAT_ID", "")


def generate_checkin_message() -> str:
    """Одно утреннее сообщение для группы: от лица тренера, с учётом философии и последних сообщений в чате."""
    fallback = (
        "Доброе утро! 👋 Как настроение и самочувствие? "
        "Кто делал вчера тренировку — напишите пару слов. Кто не делал — не страшно, напишите что помешало или как себя чувствуете. По ответам подскажу что лучше сделать сегодня."
    )
    if not OPENAI_API_KEY:
        return fallback
    knowledge = load_knowledge_base(config.KNOWLEDGE_BASE_DIR)
    system = (
        "Ты — тренер и эксперт в закрытом Telegram-чате оздоровительного сообщества. "
        "Говоришь от первого лица, как тренер: тепло, по-человечески, без официоза. "
        "Опираешься на философию и подход из базы знаний (EVOLUTION GO: диагностика, дыхание, МФР, сборка, потом нагрузка; тело как система; без таблеток). "
        "Один короткий пост (2–4 предложения) для утра: спросить про самочувствие и делали ли вчера тренировку; пригласить написать пару слов; сказать что по ответам подскажешь что лучше сделать сегодня. "
        "Если в контексте есть недавние темы (боль, усталость, вопросы) — можно мягко откликнуться. Только текст сообщения, без кавычек и без подписи. По-русски."
    )
    user_content = "Напиши утреннее сообщение-опрос для группы сейчас."
    if knowledge:
        user_content += f"\n\nБаза знаний (философия, стиль, темы сообщества):\n{knowledge[:3000]}"
    # контекст из последних сообщений в группе
    if COMMUNITY_CHAT_ID:
        try:
            cid = int(COMMUNITY_CHAT_ID)
            history = load_group_history(cid)
            if history:
                lines = []
                for m in history[-40:]:
                    role = "участник" if m.get("role") == "user" else "тренер"
                    lines.append(f"[{role}]: {m.get('content', '')[:180]}")
                user_content += f"\n\nПоследние сообщения в чате (для контекста):\n" + "\n".join(lines)
        except (ValueError, TypeError):
            pass
    try:
        client = OpenAI(api_key=OPENAI_API_KEY)
        r = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user_content},
            ],
            max_tokens=300,
        )
        text = (r.choices[0].message.content or "").strip().strip('"')
        return text if text else fallback
    except Exception:
        return fallback


async def main() -> None:
    if not BOT_TOKEN or not COMMUNITY_CHAT_ID:
        print("TELEGRAM_BOT_TOKEN and COMMUNITY_CHAT_ID must be set in .env")
        return
    msg = generate_checkin_message()
    bot = Bot(token=BOT_TOKEN)
    try:
        await bot.send_message(chat_id=int(COMMUNITY_CHAT_ID), text=msg)
        print("Group check-in sent.")
    except Exception as e:
        print("Failed to send:", e)


if __name__ == "__main__":
    asyncio.run(main())
