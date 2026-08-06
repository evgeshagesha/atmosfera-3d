# 🧭 Лендинг MVP — Персональная стратегия тела

> Премиальный тёмный лендинг-заявка (30 000 ₽). Сегодня: hero + шапка + benefits + 12-шаговая форма → Telegram.  
> Длинные секции — placeholder. Без фейковых отзывов, %, гарантий и медобещаний.

---

## 📋 Свойства

| | |
|---|---|
| **Продукт** | Персональная стратегия тела (рабочее название) |
| **Цена** | 30 000 ₽ |
| **Формат** | Онлайн или очно в Москве |
| **CTA** | Короткая заявка (не мгновенная оплата) |
| **Стек** | Vanilla HTML / CSS / JS + Node `api/server.js` |
| **Политика ПДн** | Живая страница: [`/policy`](https://eg.egoshev.ru/policy) (не `/privacy`) |
| **Обновлено** | 2026-08-06 |

---

## 🏗 Выбор архитектуры

### Что нашли в проекте

| Слой | Путь / факт |
|---|---|
| Next-сайт | `../site-next/` → `eg.egoshev.ru` |
| Telegram уже есть | `site-next/app/api/contact` + `lib/notifications/telegram.ts` (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`) |
| Политика | `site-next/app/policy` → `/policy` |
| `/anketaplan` | 404 / путаница с другой анкетой — **не** этот продукт |
| `products.yaml` | Есть `personal_online` за **20 000 ₽**; продукта **30 000 ₽** нет |

### Решение на сегодня: **standalone vanilla**

Папка: `01_ПРОЕКТЫ/P01_сайт_и_сервер/landing-personal-strategy/`

**Почему не Next-роут сразу**

1. Бриф и scout: чистый HTML быстрее и безопаснее для «сегодня».
2. Не трогаем `home` / `club` / Tilda-миграцию.
3. Секреты Telegram всё равно только на сервере (`api/server.js` + `.env`).
4. Позже можно встроить в Next (`/personalnaya-strategiya-tela` + reuse `sendTelegramMessage`) без смены контента — тексты в `content.js` / `config.js`.

**Почему не PHP:** на Timeweb лицо сайта уже Node/Next; локальный Node-сервер один в один с паттерном `/api/contact`.

---

## 📁 Структура файлов

```
landing-personal-strategy/
├── index.html          # разметка, SEO, schema
├── styles.css          # премиум-тёмная тема, CSS vars
├── script.js           # модалка, 12 шагов, analytics stub
├── content.js          # ВСЕ тексты (название, hero, форма, placeholders)
├── config.js           # цена, URL, endpoint, публичный Telegram
├── package.json
├── .env.example
├── .gitignore
├── README.md
├── assets/
│   ├── hero-evgeny.webp
│   ├── hero-evgeny.jpg
│   └── visual-reference.png   # референс дизайна (не для продакшена обязательно)
└── api/
    └── server.js       # статика + POST /api/lead → Telegram
```

---

## ▶️ Локальный запуск

1. Перейдите в папку:
   ```bash
   cd "01_ПРОЕКТЫ/P01_сайт_и_сервер/landing-personal-strategy"
   ```
2. Скопируйте окружение:
   ```bash
   cp .env.example .env
   ```
3. Заполните в `.env`:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
4. Запустите:
   ```bash
   npm start
   ```
5. Откройте: [http://127.0.0.1:4177/](http://127.0.0.1:4177/)

> Без токена форма всё равно отвечает `ok: true`, а текст заявки пишется в консоль сервера (`delivered: false`). Удобно для UI-теста.

---

## 🔑 Что настроить вручную (Евгений)

### 1) Telegram-бот и Chat ID

1. Откройте [@BotFather](https://t.me/BotFather) → `/newbot` (или используйте существующего служебного бота для заявок).
2. Скопируйте **Bot Token** → в `.env` как `TELEGRAM_BOT_TOKEN`.
3. Напишите боту любое сообщение (бот должен уметь писать вам).
4. Узнайте Chat ID (личный или группа):
   - удобный способ: открыть `https://api.telegram.org/bot<TOKEN>/getUpdates` после сообщения боту;
   - или использовать @userinfobot / аналог для своего id.
5. Вставьте id в `.env` как `TELEGRAM_CHAT_ID`.
6. Перезапустите `npm start`.

**Важно:** токен не класть в `config.js`, HTML, Stories, Notion, git.

### 2) Проверка формы

1. Откройте лендинг → «Подать заявку» / hero CTA.
2. Пройдите 12 шагов (на шаге контактов — Telegram или телефон).
3. Отметьте согласие ПДн → «Отправить заявку».
4. Успех: экран «Заявка отправлена» в модалке.
5. В Telegram должно прийти сообщение «Новая заявка — персональная стратегия тела».

Тест API без UI:

```bash
curl -s -X POST http://127.0.0.1:4177/api/lead \
  -H 'Content-Type: application/json' \
  -d '{
    "name":"Тест","age":"35","city":"Москва",
    "occupation":"Офисная работа","concerns":"Скованность",
    "goal":"Персональный план","training":"Время от времени",
    "limits":"Нет","motivation":"Хочу систему на месяц",
    "startWhen":"В ближайшие дни","readiness":"Готов уточнить детали",
    "telegram":"@test","phone":"","consent":true,
    "honeypot":"","sourcePage":"manual-curl","pageUrl":"http://local/test",
    "utm":{},"priceRub":30000
  }'
```

### 3) HITL: `products.yaml`

В SoT (`03_РЕСУРСЫ/config/products.yaml`) **нет** продукта 30 000 ₽ «Персональная стратегия тела».  
Есть соседний `personal_online` = **20 000 ₽ / 2 ч** и `/anketaplan`.

**Не добавлял** новый продукт в yaml без вашего OK.  
Когда подтвердите — HITL-запись примерно:

```yaml
personal_body_strategy:
  code: personal_body_strategy
  name: "Персональная стратегия тела"
  price_rub: 30000
  status: draft   # или confirmed после утверждения
  page_url: "https://eg.egoshev.ru/personalnaya-strategiya-tela"
  requires_form: true
  note: "Отдельно от personal_online 20k и от месячного плана 15k"
```

Не путать с «персональной программой 15 000 ₽/мес» из старых документов.

---

## ✏️ Где менять контент

| Что | Файл | Ключ |
|---|---|---|
| Название продукта | `content.js` | `hero.titleLine*`, `seo.title` |
| Цена (текст) | `content.js` + `config.js` | `hero.priceLine`, `priceLabel` / `priceRub` |
| Кнопки | `content.js` | `hero.primaryCta`, `header.cta`, `form.*` |
| Шаги формы | `content.js` | `form.steps` (ровно 12) |
| Фото | `assets/hero-evgeny.webp` (+ jpg fallback) | путь в `config.js` → `heroImage` |
| Публичный Telegram | `config.js` | `telegramPublicUrl` |
| Endpoint | `config.js` | `leadEndpoint` |
| Canonical / OG | `index.html` + `config.js` | `canonicalUrl` |

Философия бренда: **Движение. Дыхание. Дисциплина.**  
Фраза **«Тебе нужен только ты»** — в футере / бренде, **не** как spam-CTA.

---

## 🔐 Что нельзя публиковать

- `.env` с токенами
- `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` в клиентском JS
- сырые медицинские детали клиентов вне Telegram/CRM
- фейковые отзывы, «98%», «300+ клиентов», гарантии результата

---

## 🚀 Деплой (позже / осторожно)

### Вариант A — локально + README (сегодня)

Рабочий локальный сервер. Live URL пока нет.

### Вариант B — отдельный процесс на Timeweb

1. Скопировать папку на VPS.
2. `cp .env.example .env` и заполнить токены (можно те же, что у `site-next` contact-формы).
3. `npm start` под systemd / pm2 на порту (например 4177).
4. Nginx: `location /personalnaya-strategiya-tela/` → proxy/static этой папки; `location /api/lead` → Node.

### Вариант C — встроить в Next (рекомендуется для одного хоста)

1. Страница `site-next/app/personalnaya-strategiya-tela/` (статический HTML как kids-anketa **или** React).
2. Route `app/api/lead/route.ts` — копия логики + `sendTelegramMessage` из `lib/notifications/telegram.ts`.
3. Env уже есть в `site-next/.env.local`.
4. Деплой обычным пайплайном Next — **не** трогая home/club без нужды.

Ссылка политики в форме: **https://eg.egoshev.ru/policy**  
(Отдельное согласие: https://eg.egoshev.ru/personal)

---

## 📐 Что уже есть в MVP

1. Структура проекта  
2. Адаптивная страница (safe-area, dvh, reduced-motion)  
3. Шапка + hero + цена + secondary → `#process`  
4. Benefits ×5  
5. Placeholders: `#problem` `#result` `#process` `#inside` `#expert` `#price` `#faq`  
6. Модалка 12 шагов: прогресс, назад, Escape, lock scroll, honeypot, ПДн  
7. `POST /api/lead` → Telegram  
8. Success-state  
9. SEO + Schema без рейтингов  
10. Analytics stub: `hero_cta_click`, `application_open`, `application_step_complete`, `application_submit`, `application_success`, `application_error`  

---

## ➕ Как добавить следующий блок лендинга

1. Найдите секцию в `index.html` / `#placeholders-root` (`content.js` → `placeholders`).
2. Замените placeholder на полноценный markup **или** расширьте `content.js` и рендер в `script.js`.
3. Стили — в `styles.css` (те же CSS vars).
4. Не выдумывайте отзывы/цифры; тексты — HITL с Евгением.

---

## 🧭 Live URL

Пока: **только локально** → `http://127.0.0.1:4177/`  
После деплоя B/C: планируемый путь `https://eg.egoshev.ru/personalnaya-strategiya-tela`
