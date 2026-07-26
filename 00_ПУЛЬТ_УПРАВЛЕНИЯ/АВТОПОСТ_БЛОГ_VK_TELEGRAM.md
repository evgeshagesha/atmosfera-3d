# 📡 Автопост блога → VK + Telegram

> Как публиковать статьи с `eg.egoshev.ru/blog` в группу Telegram и во «ВКонтакте»  
> Дата: 25.07.2026

---

## Свойства

| | |
|--|--|
| **Блог** | https://eg.egoshev.ru/blog |
| **Скрипт** | `01_ПРОЕКТЫ/P02_бот_telegram/bot/publish_blog_social.py` |
| **Режим сейчас** | Полуавтомат: статья на сайте → команда → TG/VK |
| **Полный автомат** | Cron после проверки (ниже) |

---

## Как это работает

```
Статья в blog.json + картинка
        ↓
Сайт /blog/<slug>
        ↓
python publish_blog_social.py --slug <slug> --telegram --vk
        ↓
Группа Telegram + стена VK
```

> 💡 Канал `@EvgeniiGoshev` лучше оставлять на **approve** (премиум-лента).  
> Группу клуба и VK можно автоматизировать смелее.

---

## 1. Telegram-группа (быстро)

1. Добавь `@EGoshev_bot` в группу **админом** (право писать сообщения / медиа).
2. В `.env` бота на сервере уже есть или добавь:

```env
COMMUNITY_CHAT_ID=-100xxxxxxxxxx
TELEGRAM_BOT_TOKEN=...
```

3. Проверка черновика:

```bash
cd /opt/atmosfera-bot   # или локально в bot/
python publish_blog_social.py \
  --slug trenirovki-dlya-zhenshchin-chto-deystvitelno-vazhno \
  --dry-run --short
```

4. Отправка в группу:

```bash
python publish_blog_social.py \
  --slug trenirovki-dlya-zhenshchin-chto-deystvitelno-vazhno \
  --telegram --short
```

Для канала вместо группы укажи:

```bash
python publish_blog_social.py --slug ... --telegram --chat-id @EvgeniiGoshev --short
```

---

## 2. VK — полноценное подключение

Подробная шпаргалка с картинками-логикой:  
**[VK_ПОДКЛЮЧЕНИЕ_ПОСТИНГ.md](./VK_ПОДКЛЮЧЕНИЕ_ПОСТИНГ.md)** — где взять ID, как сделать ключ, куда вписать.

Коротко:
1. ID сообщества (число из `club123…` / `wall-123…`)
2. Управление → Настройки → Работа с API → ключ (`wall` + `photos`)
3. В `/opt/atmosfera-bot/.env`:

```env
VK_ACCESS_TOKEN=vk1.a....
VK_GROUP_ID=123456789
BLOG_JSON_PATH=/var/www/egoshev.ru/data/blog.json
```

4. Публикация:

```bash
python3 publish_blog_social.py --slug ... --vk --short
```

---

## 3. Полный автомат (когда захочешь)

На сервере cron, например каждый день в 11:00 — **только если** в папке лежит очередь `data/social_queue.json` с slug’ами после твоего OK:

```cron
0 11 * * * cd /opt/atmosfera-bot && ./venv/bin/python publish_blog_social.py --slug "$(cat data/next_slug.txt)" --telegram --vk --short >> /var/log/eg-social.log 2>&1
```

Правило Атмосферы 3D: **сначала статья на сайте → ты смотришь → потом соцсети**.  
Так не будет случайного мусора в ленте.

---

## 4. Готовые посты

| Статья | URL | Slug |
|--------|-----|------|
| Тренировки для женщин | https://eg.egoshev.ru/blog/trenirovki-dlya-zhenshchin-chto-deystvitelno-vazhno | `trenirovki-dlya-zhenshchin-chto-deystvitelno-vazhno` |
| Углеводы и жиры | https://eg.egoshev.ru/blog/chto-pokazyvayut-issledovaniya-ob-uglevodah-i-zhirah | `chto-pokazyvayut-issledovaniya-ob-uglevodah-i-zhirah` |

```bash
python3 publish_blog_social.py \
  --slug chto-pokazyvayut-issledovaniya-ob-uglevodah-i-zhirah \
  --vk --short
```

---

## Чеклист Евгению

- [ ] Бот — админ Telegram-группы  
- [ ] Вписать `COMMUNITY_CHAT_ID` (если ещё нет)  
- [ ] Создать ключ VK API + `VK_GROUP_ID`  
- [ ] Один тестовый `--dry-run`  
- [ ] Первая реальная публикация `--telegram --vk --short`  
- [ ] Решить: канал только вручную / тоже авто

[← Пульт](./ГЛАВНЫЙ_КОНТЕКСТ.md) · [Mini App](./MINI_APP_И_КЛУБ_СЕГОДНЯ.md)
