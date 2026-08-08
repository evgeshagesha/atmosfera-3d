# 🧭 STRATEGY landing — Персональная стратегия тела

> MVP на основном Next.js (`site-next`). URL: **https://eg.egoshev.ru/strategy**  
> Не отдельный статический HTML-проект. Brief HTML в `landing-personal-strategy/` — референс, прод = App Router.

---

## 📋 Свойства

| | |
|---|---|
| **URL** | `/strategy` → `https://eg.egoshev.ru/strategy` |
| **Продукт** | Персональная стратегия тела (временное название) |
| **Цена** | **30 000 ₽** |
| **Формат** | онлайн или очно Москва |
| **CTA** | модалка короткой заявки (hero + ШАГ 4), без оплаты и без длинной анкеты |
| **SoT цена** | `03_РЕСУРСЫ/config/products.yaml` → `personal_body_strategy` |

---

## 🗂 Файлы

| Роль | Путь |
|---|---|
| Страница | `site-next/app/strategy/page.tsx` |
| Стили | `site-next/app/strategy/strategy.css` |
| Тексты / цена / шаги формы | `site-next/lib/strategy/content.ts` |
| Валидация + TG message | `site-next/lib/strategy/lead.ts` |
| UI | `site-next/components/strategy/*` |
| API lead | `site-next/app/api/strategy/lead/route.ts` |
| Hero photo | `site-next/public/strategy/hero-evgeny-v3.webp` |
| Logo EG | `site-next/public/strategy/logo-eg.webp` |
| Notebook | `site-next/public/strategy/plan-notebook.webp` |
| Offer portrait (ШАГ 4) | `site-next/public/strategy/step4-evgeny.webp` |
| Modal | `site-next/components/strategy/StrategyFormModal.tsx` |
| ШАГ 4 | `site-next/components/strategy/StrategyOfferSection.tsx` |

> 💡 Менять название, цену, CTA и вопросы формы — **только** в `lib/strategy/content.ts` (+ синхрон в `products.yaml`).

---

## 🔐 Env (HITL)

Секреты только на сервере / в `.env.local` — **не в git**.

```bash
# Prefer dedicated strategy chat, else reuse contact bot:
STRATEGY_TG_BOT_TOKEN=
STRATEGY_TG_CHAT_ID=

# Fallback (уже используется /api/contact):
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Без токена/chat id API отвечает `{ ok: true, delivered: false }` и пишет заявку в server log — форма не ломается, Telegram не уходит.

**HITL перед продакшен-лидами:** прописать `STRATEGY_TG_*` или `TELEGRAM_*` в `/var/www/egoshev.ru/.env.production.local` → `pm2 restart egoshev`.

---

## 🖼 Фото

Положить / заменить:

```
site-next/public/strategy/hero-evgeny.webp
site-next/public/strategy/hero-evgeny.jpg
```

Исходник референса: `landing-personal-strategy/assets/`.

---

## 🚀 Deploy

```bash
LOCAL="…/site-next"
REMOTE="egoshev-timeweb:/var/www/egoshev.ru"

rsync -az \
  --exclude node_modules \
  --exclude .next \
  --exclude '.env*' \
  --exclude '.git' \
  "$LOCAL/" "$REMOTE/"

ssh egoshev-timeweb 'cd /var/www/egoshev.ru && npm run build && pm2 restart egoshev'
```

### Smoke

```bash
curl -sI https://eg.egoshev.ru/strategy | head -5   # 200
# В браузере: CTA hero / ШАГ 4 открывают модалку; success — полный экран в модалке
# API: POST /api/strategy/lead { name, contact, contactMethod, consent }```

---

## 🛡 Brand safety

- Нет фейковых цифр 300+ / 98% / отзывов из референса
- Нет медобещаний
- «Тебе нужен только ты» — философия в футере, не spam CTA
- Чекбокс ПДн обязателен, по умолчанию **unchecked**
- Honeypot `company_website`

---

## 🔗 Навигация

[Канон домена](./КАНОН_ДОМЕН_eg.egoshev.ru.md) · [products.yaml](../../03_РЕСУРСЫ/config/products.yaml) · [site-next](./site-next/)
