# 🧒 Атмосфера 3D Kids Camp — точка входа

> Страница и анкета собраны локально в новом чёрно-серебряном стиле. Ждут фото и деплой.

| | |
|---|---|
| **Маршрут** | `/kids` · анкета `/kids-anketa` |
| **Бренд** | Атмосфера 3D Kids Camp |
| **Стиль** | чёрный / графит / серебро · Montserrat + Manrope |
| **Сырьё (28.07)** | `kids-staging/tilda-2026-07-28/` + `90_ВХОДЯЩИЕ/kids-landing-2026-07-28/` |
| **Статус** | 🟢 локально · 🟡 не задеплоено |

---

## 📁 Файлы

| Файл | Роль |
|------|------|
| `site-next/app/kids/page.tsx` | лендинг, metadata, JSON-LD |
| `site-next/app/kids/kids-body.html` | разметка |
| `site-next/app/kids/kids.css` | стили `#a3d-kids` |
| `site-next/public/kids/script.js` | цены, форматы, CTA → `/kids-anketa` |
| `site-next/app/kids-anketa/page.tsx` | анкета (noindex) |
| `site-next/app/kids-anketa/anketa-body.html` | форма |
| `site-next/app/kids-anketa/anketa.css` | стили `#eg-anketa` |
| `site-next/public/kids/anketa.js` | шаги, валидация, отправка в Telegram `@EGoshev` |

Цены — только в `PROGRAMS` внутри `public/kids/script.js` (15 000 / 17 000 ₽).

---

## 🔒 Изоляция

Стили scoped через `#a3d-kids` / `#eg-anketa`. Главная, клуб и `layout.tsx` не тронуты.
В sitemap добавлен только `/kids` (анкета — noindex, в sitemap не нужна).

---

## 🔗 Связка лендинг → анкета

Кнопки «Заполнить анкету» ведут на `/kids-anketa?format=weekday|weekend|general`.
Анкета сама отмечает нужный радио-формат. Отправка — текст в Telegram Евгению.

---

## 🚧 До публикации

| Что | Приоритет |
|-----|-----------|
| Фото / видео в слоты `.k-photo` | 🔴 |
| OG-картинка | 🟡 |
| Юридические ссылки в подвале | 🟡 |
| Деплой + Яндекс.Вебмастер `/kids` | после фото |

Съёмка детей: со спины / сбоку, без крупных планов лиц, не сток.

Связь с Product System: P60 EG KIDS Movement Camp.
