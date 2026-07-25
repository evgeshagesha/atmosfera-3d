# ARCHITECTURE — техническая архитектура

---

## Рекомендуемый стек

| Слой | Технология | Почему |
|------|------------|--------|
| Сайт | **Tilda** | Живой SEO, Members, не ломаем прод |
| Курс | Tilda Members + Kinescope | Уже есть |
| Бот | Python + python-telegram-bot | База в P02 |
| API / webhook | Flask или FastAPI + gunicorn | Prodamus |
| БД | SQLite → PostgreSQL | MVP → рост |
| Оплата | Prodamus | Чеки, подписки |
| Сервер | Timeweb VPS | Бот 24/7, cron |
| Конфиг | `products.yaml` | Один источник цен |
| Канал | draft → approve → publish | Премиум |

### Альтернатива (не рекомендуем как основу)

No-code (Salebot/BotHelp + Tilda) — быстрее старт, слабее контроль и vendor lock-in.

---

## Схема

```
Instagram / Сайт / Канал
        ↓
  Telegram-бот (Timeweb)
        ↓
  Prodamus ←→ webhook API
        ↓
  SQLite/PostgreSQL
        ↓
  Выдача: гайд / Members / invite клуба
        ↓
  Канал (approve) · Уведомления админу
```

---

## Разделение ответственности

| Компонент | Где |
|-----------|-----|
| Лендинги, SEO | Tilda |
| Бот, webhook, подписки, тест-статусы | Timeweb |
| Уроки курса | Members + Kinescope |
| Контент клуба | Евгений вручную |
| Черновики канала / PDF | Timeweb jobs + approve |

---

## Сервер (минимум)

- VPS 1–2 vCPU, 2 GB RAM  
- Python 3.11+  
- Nginx + SSL (`bot.egoshev.ru` для webhook)  
- systemd: `bot` + `webhook`  
- cron: news/drafts (без auto-publish в MVP)

---

## Обновления и бэкапы

- Ежедневный dump БД  
- Экспорт Tilda перед крупными правками  
- Правки продакшена — только после бэкапа  
- Тестовый поддомен: `eg.egoshev.ru` при экспериментах  

---

## Код проекта

| Путь | Назначение |
|------|------------|
| `01_ПРОЕКТЫ/P02_бот_telegram/bot/` | Новый бот |
| `_АВТОМАТИЗАЦИИ_СТАРЫЕ/telegram_бот/` | Архив (не production) |
| `03_РЕСУРСЫ/config/products.yaml` | Цены и продукты |
