"""
Генерация поста для канала @EvgeniiGoshev в стиле Евгения.
Темы: здоровье, движение, дыхание, питание, мифы, исследования (PubMed).
Запуск: python generate_channel_post.py [тема]
Без темы — тема выбирается из списка (можно передать номер или ключевое слово).
Опционально: если в .env заданы CHANNEL_ID и TELEGRAM_BOT_TOKEN и бот — админ канала, пост можно отправить в канал (флаг --post).
"""
import argparse
import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
BASE_DIR = Path(__file__).resolve().parent
KNOWLEDGE_DIR = BASE_DIR / "knowledge_base"

BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
CHANNEL_ID = os.getenv("CHANNEL_ID", "")  # @EvgeniiGoshev или -100xxxxxxxxxx

# Темы: здоровье, питание, фитнес, нутрициология, оздоровление без таблеток, дыхание, телесные практики, анатомия, спортивная медицина, травмы, реабилитация, физиотерапия, функциональные тренировки, закаливание, развенчание мифов. Опора на западные/американские исследования.
TOPICS = [
    "почему при достаточной мышечной массе можно есть свободнее: полгода–год базы, потом жизнь без вечной диеты (мышцы = печка, больше тратишь в покое)",
    "дыхание и нервная система, стресс, 4-7-8",
    "МФР и боль, почему 20 секунд не работают",
    "осанка и походка, компенсации",
    "порядок тренировки: диагностика → релиз → сборка → сила",
    "развенчание мифа: растяжка или разминка (что говорит наука)",
    "развенчание мифа про витамины или добавки (научный подход vs интернет-мифы)",
    "питание для восстановления и тренировок (нутрициология, без таблеток)",
    "почему болит спина при тренировках: биомеханика и реабилитация",
    "вывод из западного исследования (метаанализ) — движение, дыхание или физиотерапия",
    "утренний ритуал: 5–10 минут на тело (дыхание, МФР, осанка)",
    "таз и поясница: одна мысль и один совет из практики",
    "функциональные тренировки vs изолированные: когда что эффективнее",
    "травмы и реабилитация: почему сначала диагностика, потом нагрузка",
    "закаливание и адаптивность тела: что говорит физиология",
    "оздоровление без медикаментов: дыхание, движение, восстановление НС",
    "анатомия и биомеханика: почему порядок работы с телом важен",
    "один популярный миф в фитнесе или нутрициологии — и научный взгляд",
]

# Смешанный стиль: EVOLUTION GO + научный подход + элементы Соколовского (заголовок-крючок, разбор темы, призыв) и Кармацкого (структура, списки, тёплое обращение, польза).
STYLE = """
Стиль поста для канала Евгения Гошева (@EvgeniiGoshev). ОБЯЗАТЕЛЬНО соблюдай:
- Тон: уверенный, спокойный, профессиональный. Экспертность без высокомерия. От первого лица. Показывай профессионализм и глубину подхода.
- Философия — EVOLUTION GO SYSTEM: тело как интегрированная система (нервная система, дыхание, ОДА, восстановление). Порядок: диагностика → восстановление НС (МФР, дыхание) → коррекция и сборка ОДА → только потом силовая нагрузка. Опирайся на эти идеи, когда тема связана с тренировками или болью.
- Ниша постов: здоровье, питание, фитнес, нутрициология, оздоровление без таблеток; дыхательные и телесные практики; анатомия, биомеханика; спортивная медицина, травмы, реабилитация, физиотерапия; функциональные тренировки, закаливание. Научный подход, не медицина — wellness.
- Элементы стиля (референсы: Соколовский @sokolay, Кармацкий @karmatsky_timofey): (1) Заголовок-крючок в первой строке — короткая ёмкая фраза или вопрос, которая цепляет. (2) Разбор темы по делу: можно структурировать списками (– пункт; – пункт), «давайте разберёмся», «вот что важно». (3) Тёплое обращение уместно: «друзья», «если хочешь» — без панибратства. (4) В конце — один чёткий призыв: запись в шапке, личка, клуб egoshev.ru; можно «сохраняй и пользуйся» или «если разобрать свою ситуацию — пиши в личку».
- Мифы: развенчивать мифы (витамины, добавки, растяжка, разминка и т.д.) — опираясь на западные/американские исследования, спокойно и по делу.
- Исследования: один-два факта из PubMed/метаанализов/учебников, потом практический вывод.
- Язык: простые слова при точности. На «ты». Живой, но достойный.
- Структура: крючок → 2–4 абзаца (можно со списками) → один призыв в конце.
- Объём: примерно 15 предложений (12–18). Развёрнуто раскрыть тему, дать ценность.
- Эмодзи: сдержанно (1–2 на пост), только по смыслу. Можно использовать для структуры (📌 ❗️) умеренно.
- Без клише и медицинских обещаний. Оздоровление через движение, дыхание, питание, образ жизни — без таблеток и рекламы БАДов.
"""


def load_knowledge() -> str:
    parts = []
    for ext in ("*.md", "*.txt"):
        for f in sorted(KNOWLEDGE_DIR.glob(ext)):
            try:
                parts.append(f.read_text(encoding="utf-8").strip())
            except Exception:
                pass
    return "\n\n".join(parts)[:5000] if parts else ""


def generate_post(topic: str, use_pubmed: bool = False) -> str:
    client = OpenAI(api_key=OPENAI_API_KEY) if OPENAI_API_KEY else None
    if not client:
        return f"[Пост на тему: {topic}]\n\nДобавь OPENAI_API_KEY в .env для генерации."
    knowledge = load_knowledge()
    prompt = (
        f"Напиши один пост для Telegram-канала. Тема: {topic}. "
        "От первого лица (автор — эксперт по биомеханике, движению, дыханию, нутрициологии, оздоровлению без таблеток). "
        "Формат: крючок в первой строке, несколько коротких абзацев, развёрнуто раскрой тему. Объём: примерно 15 предложений (не меньше 12, не больше 18). В конце — одна конкретная рекомендация или приглашение (запись в шапке, личка, клуб egoshev.ru). "
        "Опирайся на западные/американские исследования и научный подход. Если тема про миф — спокойно развенчай миф, опираясь на данные. "
        "Только текст поста, без кавычек и без подписи. По-русски."
    )
    if use_pubmed:
        prompt += " Обязательно включи один-два вывода из исследований/метаанализа (западные источники, PubMed) и практический вывод."
    prompt += "\n\n" + STYLE
    if knowledge:
        prompt += f"\nКонтекст системы автора (философия, база книг по анатомии/биомеханике/физиологии):\n{knowledge[:4000]}"
    try:
        r = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=1200,
        )
        return (r.choices[0].message.content or "").strip().strip('"')
    except Exception as e:
        return f"Ошибка генерации: {e}"


def post_to_channel(text: str) -> bool:
    if not BOT_TOKEN or not CHANNEL_ID:
        return False
    import asyncio
    from telegram import Bot
    async def _send():
        bot = Bot(token=BOT_TOKEN)
        await bot.send_message(chat_id=CHANNEL_ID, text=text)
    try:
        asyncio.run(_send())
        return True
    except Exception as e:
        print("Ошибка отправки в канал:", e, file=sys.stderr)
        return False


def main():
    parser = argparse.ArgumentParser(description="Generate channel post for @EvgeniiGoshev")
    parser.add_argument("topic", nargs="?", default=None, help="Topic or number 0–%d from list" % (len(TOPICS) - 1))
    parser.add_argument("--pubmed", action="store_true", help="Include research/meta-analysis angle")
    parser.add_argument("--post", action="store_true", help="Post to channel (need CHANNEL_ID, bot as admin)")
    args = parser.parse_args()

    topic = args.topic
    use_pubmed = args.pubmed
    if topic is None:
        # Ротация по дню года — каждый день новая тема при запуске по cron
        from datetime import datetime
        day_num = datetime.now().timetuple().tm_yday
        topic = TOPICS[day_num % len(TOPICS)]
        use_pubmed = use_pubmed or (day_num % 4 == 0)  # каждый 4-й день — с оттенком исследований
    elif topic.isdigit() and 0 <= int(topic) < len(TOPICS):
        topic = TOPICS[int(topic)]

    text = generate_post(topic, use_pubmed=use_pubmed)
    print(text)
    print("\n---")

    if args.post:
        if post_to_channel(text):
            print("Отправлено в канал.")
        else:
            print("Не удалось отправить. Проверь CHANNEL_ID и что бот — админ канала.")
    else:
        # Save draft
        draft_dir = BASE_DIR / "channel_drafts"
        draft_dir.mkdir(exist_ok=True)
        from datetime import datetime
        f = draft_dir / f"post_{datetime.now().strftime('%Y%m%d_%H%M')}.txt"
        f.write_text(text, encoding="utf-8")
        print(f"Черновик сохранён: {f}")


if __name__ == "__main__":
    main()
