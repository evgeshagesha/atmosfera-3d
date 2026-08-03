# ✍️ Content SEO Guide — блог EG

> Шаблон и правила SEO для будущих статей `eg.egoshev.ru/blog`. SoT стиля: [СТИЛЬ_СТАТЕЙ_БЛОГА](./СТИЛЬ_СТАТЕЙ_БЛОГА.md). Пайплайн новостей: skill `eg-news-to-blog` (Dual HITL).

---

## 📋 Свойства

| | |
|---|---|
| **Дата** | 2026-08-03 |
| **Домен блога** | `https://eg.egoshev.ru/blog` |
| **CTA-домены** | публичные оплаты / тест часто `egoshev.ru`; лицо бренда `eg.egoshev.ru` |
| **Статус** | 🟢 Рабочий гайд |
| **Связанные** | [SEO_AUDIT_REPORT](./SEO_AUDIT_REPORT.md) · [SEO_KEYWORD_MAP](./SEO_KEYWORD_MAP.md) · [seo-clusters](../../.cursor/skills/eg-news-to-blog/references/seo-clusters.md) |

---

## 🧾 Шаблон будущей статьи (чек-лист)

Заполнять **до** публикации. Черновик всегда с `published: false` явно.

| Поле | Правило | Пример / заметка |
|---|---|---|
| **Title** | Запрос + угол EG; ≤ ~60–70 симв. | `Осанка и дыхание: почему «выпрямиться» не работает — Евгений Гошев` |
| **Description** | 140–160 симв.; польза + без медобещаний | Что происходит → зачем читать → мягкий путь |
| **H1** | = смысл title; один на страницу | Совпадает с `post.title` в рендере |
| **slug** | латиница, дефисы, без даты | `osanka-i-dyhanie-pochemu-vypryamitsya-ne-rabotaet` |
| **intent** | informational / commercial / hybrid | Blog обычно informational → bridge |
| **keys** | 1 primary + 2–3 secondary | Не «про всё сразу» |
| **H2 / H3** | 3–6 H2 по механике; H3 внутри блоков | Хук → механизм → разбор → вывод |
| **FAQ** | 3–5 вопросов (видимый текст) | Для AEO extractability; не ради FAQ stars |
| **internal links** | ≥2: money page + product/club/about | Spoke → hub/money |
| **CTA** | **Один** главный (news/external); author — по SoT | Публичные оплаты → `egoshev.ru/...` |
| **услуга / seoCluster** | один из enum ниже | См. кластеры блога |
| **авторство** | Евгений Гошев | Article author Person |
| **dates** | `publishedAt`, `updatedAt` ISO | При правке — обновить `updatedAt` |
| **OG** | `title`, `description`, `image` ≥700 px | Живое фото, не сток |
| **Article schema** | headline, dates, author, publisher, image | Уже в `blog/[slug]` — поля должны совпадать |
| **Breadcrumb** | Blog → Статья (когда появится schema) | UI + опционально BreadcrumbList |
| **alt** | смысл кадра, без keyword stuffing | `Евгений Гошев — практика дыхания в студии` |
| **related** | 2–3 смежные статьи | В конце или сайдбар (когда будет UI) |

### Минимальный каркас markdown-черновика

```markdown
---
title: ""
description: ""
slug: ""
intent: informational
primary_key: ""
secondary_keys: []
seoCluster: studio_moscow | course_bnt | club_eg | longevity_movement | rehab_biomechanics
cta_url: "https://egoshev.ru/..."
cta_label: ""
published: false
publishedAt: ""
updatedAt: ""
---

# H1

Answer-first 40–90 слов.

## H2 …

### H3 …

## FAQ
### Вопрос 1?
### Вопрос 2?

## Куда дальше
- internal → money page
- один CTA
```

---

## 🗂️ Кластеры блога (приоритет по коммерции)

Согласованы со skill `eg-news-to-blog` / `seo-clusters.md` + money map.

| Приоритет | seoCluster / тема | Коммерческий мост | Примеры углов |
|---|---|---|---|
| **1** | `studio_moscow` | запись / анкета | персоналка, приём, Москва, студия |
| **2** | `rehab_biomechanics` + recovery/MFR | `/mfr-massazh-moskva`, приём | напряжение, ткани, восстановление после нагрузки |
| **3** | `course_bnt` + posture/breathing | `dyhanieosanka`, `baza` | осанка, дыхание, база тела |
| **4** | `club_eg` | `/club` | ритм, 15 мин, дисциплина практики |
| **5** | functional / mobility / ofp (utility) | money functional/mobility/ofp | паттерны, мобильность, ОФП |
| **6** | `longevity_movement` | клуб / база soft | долгая функция через движение |
| **7** | biomechanics / physical_therapist | `/about`, `/biomehanika` | authority; **не** clinic CTA |
| — | yoga / nutrition commercial | **skip** как primary SEO | только если не ложное позиционирование |

> 💡 Статья = **spoke**. Money page = **hub**. Не дублировать H1 money-landing в блоге.

---

## 📐 Правила написания

### Делать

- Один главный ключ + естественные синонимы
- Логика: что происходит → почему → что делать → результат/путь
- 1–2 гео-якоря максимум (Москва / студия) — без спама в каждом абзаце
- Fact vs мнение; для исследований — title, URL, date / PMID
- Internal link на релевантный money URL из [SEO_KEYWORD_MAP](./SEO_KEYWORD_MAP.md)
- Для публичных офферов оплаты/теста — CTA на **`egoshev.ru`**, где так заведено в SoT

### Не делать

| Запрет | Почему |
|---|---|
| Keyword stuffing / «Москва» в каждом предложении | Спам, GEO-риск |
| Слово «врач» / Physician-claim | Brand ban |
| «вылечим», «исцеление», «избавим навсегда», «секретный метод», «тело мечты» | Медобещания / инфостиль |
| Anti-gym / «зал вреден» | Positioning ban |
| «без тренажёров» = «без оборудования» | Ложный месседж |
| Verbatim full-text чужих статей | Copyright + editorial |
| Multi-CTA каталог в новостной статье | SoT: один главный CTA |
| Автопубликация `blog.json` / TG из skill | Dual HITL only |
| Диагноз-ярлык как заголовок | Клинический риск |

---

## 🔄 Связь с `eg-news-to-blog` (Dual HITL)

```text
content_mode (author | external | mixed)
        ↓
структура SoT + provenance / claims
        ↓
status gate (ok | needs_source | …)
        ↓
article_hash  →  STOP  (Gate 1 — фраза в workflow)
        ↓
social_preview + social_hash  →  STOP  (Gate 2)
        ↓
человек: approve → отдельный publisher (не skill)
```

| Правило | Факт |
|---|---|
| Skill **не** пишет `blog.json` | Только черновик + hashes |
| Skill **не** шлёт TG/VK | Social = preview |
| `published: false` | Всегда явно в черновике |
| Blocking `evidence_gap` | `status` ≠ ok → нельзя approve |
| External | Rewrite своими словами + cite |
| Author | Preserve голос; не «улучшать» смысл |
| SEO этого гайда | Применять на этапе структуры **до** Gate 1 |

SoT пайплайна: skill `.cursor/skills/eg-news-to-blog/` · стиль: [СТИЛЬ_СТАТЕЙ_БЛОГА](./СТИЛЬ_СТАТЕЙ_БЛОГА.md).

---

## 🧱 Рекомендуемые H2 для money-adjacent статей

| Intent | H2-каркас |
|---|---|
| Utility (упражнения / осанка) | Миф → механизм → 3–5 принципов → ошибка → путь в систему |
| Recovery / напряжение | Что чувствует человек → ткани/паттерн → что помогает → чего не обещаем → следующий шаг |
| Functional / mobility | Зачем качество паттерна → прогрессия → кому подходит → связь со студией/клубом |
| Authority / биомеханика | Термин простыми словами → система тела → чем EG отличается → soft CTA |

---

## ✅ Pre-publish SEO checklist

- [ ] Title / H1 / slug согласованы
- [ ] Description заполнен, без банов
- [ ] Один `seoCluster`, один primary CTA
- [ ] ≥2 internal links (money + product/about)
- [ ] FAQ 3–5 (если hybrid/AEO-цель)
- [ ] OG image + alt
- [ ] `published: false` до approve
- [ ] Dual HITL пройден (если через eg-news)
- [ ] Не конкурирует H1 с существующим/планируемым money URL

---

## 🔗 Навигация

[← SEO_AUDIT_REPORT](./SEO_AUDIT_REPORT.md) · [SEO_KEYWORD_MAP](./SEO_KEYWORD_MAP.md) · [СТИЛЬ_СТАТЕЙ_БЛОГА](./СТИЛЬ_СТАТЕЙ_БЛОГА.md) · [ГЛАВНЫЙ_КОНТЕКСТ](../../00_ПУЛЬТ_УПРАВЛЕНИЯ/ГЛАВНЫЙ_КОНТЕКСТ.md)
