# Деплой бота на Timeweb VPS

> Сайт остаётся на **Tilda**. Timeweb = бот + webhook + cron черновиков.

---

## 1. Что ставим

| Сервис | Команда | Порт |
|--------|---------|------|
| Telegram-бот | `python bot.py` | — |
| Prodamus webhook | `gunicorn webhook_prodamus:app` | 8765 → nginx 443 |

---

## 2. Залить файлы

SFTP / файловый менеджер Timeweb:

```
/home/ЛОГИН/atmosfera-bot/   ← содержимое bot/
```

Не заливать: `.env`, `venv/`, `data/*.json` с прод-данными с чужой машины вслепую.

Скопируй также на сервер (или symlink) актуальный `products.yaml`:
`atmosfera-3d/03_РЕСУРСЫ/config/products.yaml` → рядом с ботом или обнови путь.

---

## 3. Установка

```bash
cd ~/atmosfera-bot
python3 -m venv venv
./venv/bin/pip install -r requirements.txt
cp .env.example .env
nano .env
mkdir -p data/drafts data/published output/pdf
```

---

## 4. systemd

Скопируй `deploy/eg-community-bot.service` и `deploy/eg-webhook-prodamus.service`, замени `USER`.

```bash
sudo systemctl enable --now eg-community-bot eg-webhook-prodamus
sudo systemctl status eg-community-bot eg-webhook-prodamus
```

---

## 5. Nginx + SSL

Поддомен `bot.egoshev.ru` → `127.0.0.1:8765`.

Prodamus:
- `https://bot.egoshev.ru/webhook`
- `https://bot.egoshev.ru/webhook/subscription`

Проверка: `curl https://bot.egoshev.ru/health`

---

## 6. Cron (черновики, НЕ publish)

```
0 8 * * 1,4 cd ~/atmosfera-bot && ./venv/bin/python news_fetcher.py && ./venv/bin/python content_pipeline.py
```

Публикация — вручную / через Cursor после approve. См. [РЕДАКЦИЯ_КАНАЛА.md](./РЕДАКЦИЯ_КАНАЛА.md).

---

## 7. Права Telegram

1. Новый бот в BotFather  
2. Menu Button → `https://egoshev.ru/tree`  
3. Бот — админ `@EvgeniiGoshev`  
4. Бот добавлен в клуб (для invite), контент не постит  

---

## Чеклист перед продом

- [ ] `.env` заполнен  
- [ ] `products.yaml` / `products.json` — ссылки Prodamus  
- [ ] Тестовая оплата → webhook → `data/orders.json`  
- [ ] Тестовый draft → approve → пост в канал  
- [ ] Бэкап включён  

---

[← P02 README](../README.md)
