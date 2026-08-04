# 🗺️ SEO Keyword Map — EG / Атмосфера 3D

> Карта запросов → страницы. Архитектура: **подход C** (5–7 money hubs + authority/blog spokes). Частотность везде **`pending_live`** — цифры не выдумывать.

---

## 📋 Свойства

| | |
|---|---|
| **Дата** | 2026-08-04 |
| **Регион** | Москва (Wordstat regionId **213**) |
| **Частотность** | `pending_live` — без live Wordstat |
| **Подход** | C — service-cluster hub + authority |
| **Wave 1 live** | `/personalnye-trenirovki-moskva` · `/mfr-massazh-moskva` |
| **Wave 2 live** | `/funkcionalnye-trenirovki-moskva` · `/mobilnost` · `/osanka` |
| **KPI** | Запись в студию > vanity traffic |
| **Связанные** | [SEO_AUDIT_REPORT](./SEO_AUDIT_REPORT.md) · [SEO_ВОЛНА](./SEO_ВОЛНА_КОНТЕНТ_И_ДЗЕН.md) · [CONTENT_SEO_GUIDE](./CONTENT_SEO_GUIDE.md) · [SEO_ФУНДАМЕНТ](./SEO_ФУНДАМЕНТ.md) |

> ⚠️ **Важно:** после ручного сбора в [Вордстат](https://wordstat.yandex.ru/) замени `pending_live` на число + дату и пересмотри Priority.

---

## 🎯 Карта 1 экран — слова Евгения → страницы

| Слова / тема Евгения | Куда кладём | Тип | CTA |
|---|---|---|---|
| Массаж, расслабление | `/mfr-massazh-moskva` + blog recovery | money hub live | `/anketa` |
| Функциональные тренировки | `/funkcionalnye-trenirovki-moskva` | money hub Wave 2 | `/anketa` · `/club` |
| Персональные / «все виды тренировок» | `/personalnye-trenirovki-moskva` + хаб `/uslugi` | money hub live + hub | `/anketa` |
| Биомеханика | `/biomehanika` + `/about` | authority | soft → `/anketa` |
| Силовые / здоровье | `/ofp` или soft на personalnye + blog | money / blog | `/anketa` · `/club` |
| ПРАВИЛО (Денис) | `/pravilo` (proposed) · Tilda-лендинг Дениса | money / sub-brand | запись ПравИло / студия |
| Боль в спине | **только blog** (utility) → MFR / personalnye | authority blog | анкета, **не** «вылечим» |
| Осанка | `/osanka` | money hub Wave 2 | `dyhanieosanka` · `/anketa` |
| Мобильность | `/mobilnost` | money hub Wave 2 | `/anketa` · baza |
| Долголетие | blog `longevity_movement` | authority blog | `/club` soft |

> 💡 **PT / «физический терапевт»** — authority (`/about`), **не** primary money URL. На главной — secondary в title, не ядро коммерции.

---

## 📊 Таблица кластеров (операционная)

| Кластер | Intent | Тип страницы | Целевой URL | Priority | Wordstat | CTA |
|---|---|---|---|---|---|---|
| **студия-money** (персоналка) | transactional local | money hub | `/personalnye-trenirovki-moskva` ✅ live | P0 | pending_live | `/anketa` · бот |
| **МФР / массаж** | transactional local | money hub | `/mfr-massazh-moskva` ✅ live | P0 | pending_live | `/anketa` |
| **расслабление** | commercial / problem | money + blog spoke | MFR hub + blog recovery | P1 | pending_live | `/mfr-massazh-moskva` → `/anketa` |
| **функционал** | transactional | money hub | `/funkcionalnye-trenirovki-moskva` proposed | P0 Wave 2 | pending_live | `/anketa` · `/club` |
| **сила / здоровье / ОФП** | commercial | money hub (опц.) | `/ofp` proposed · иначе personalnye + blog | P1–P2 | pending_live | `/anketa` · `/club` |
| **осанка** | transactional / product bridge | money hub | `/osanka` proposed | P0 Wave 2 | pending_live | `egoshev.ru/dyhanieosanka` · `/anketa` |
| **мобильность** | commercial | money hub | `/mobilnost` proposed | P0 Wave 2 | pending_live | `/anketa` · baza |
| **спина** (осторожно!) | informational / problem | **authority blog** (не money «вылечим») | `/blog/...` → MFR / personalnye | P1 blog | pending_live | `/anketa` soft · **без** медобещаний |
| **долголетие** | informational | authority blog | `/blog/...` (`longevity_movement`) | P2 | pending_live | `/club` soft |
| **биомеханика** | informational / expert | authority | `/biomehanika` proposed + `/about` | P1 | pending_live | `/about` · `/anketa` soft |
| **ПРАВИЛО** | transactional / brand | money / sub-brand | `/pravilo` proposed · SoT: отдельный лендинг Дениса | P2 Wave 2+ | pending_live | запись ПравИло / студия |
| **онлайн** | transactional | money hub | `/online-trener` proposed · витрина `/online` | P1 | pending_live | `/club` · anketaplan · baza |
| **PT authority** | expert | authority only | `/about` (**не** money) | P2–P3 | pending_live | soft `/anketa` |

### Статус URL (live check 2026-08-04)

| URL | HTTP | Роль |
|---|---|---|
| `/personalnye-trenirovki-moskva` | 200 | money Wave 1 |
| `/mfr-massazh-moskva` | 200 | money Wave 1 |
| `/funkcionalnye-trenirovki-moskva` | 200 | Wave 2 live |
| `/osanka` | 200 | Wave 2 live |
| `/mobilnost` | 200 | Wave 2 live |
| `/ofp` | — | позже (не Wave 2 P0) |
| `/pravilo` | — | позже (HITL) |
| `/online-trener` | — | Wave 2+ |
| `/biomehanika` | — | authority backlog |
| `/uslugi` | 200 | hub (meta ✅) |
| `/online` | 200 | витрина (meta ✅) |
| `/personal` | 200 | **legal ПДн** — не таргетить «персональный тренер» |

---

## 🏷️ Seeds Wordstat (ручной сбор, регион 213)

Колонки сбора: `phrase | region | count | devices | collected_at | cluster_id | page_target | intent`.

| # | Запрос-seed | Кластер |
|---|---|---|
| 1 | персональный тренер Москва | студия-money |
| 2 | персональные тренировки Москва | студия-money |
| 3 | личный тренер Москва | студия-money |
| 4 | функциональные тренировки Москва | функционал |
| 5 | функциональный тренинг | функционал |
| 6 | мобильность суставов | мобильность |
| 7 | мобилити тренировки | мобильность |
| 8 | осанка тренировки | осанка |
| 9 | коррекция осанки Москва | осанка |
| 10 | массаж Москва | МФР / массаж |
| 11 | МФР Москва | МФР / массаж |
| 12 | миофасциальный релиз Москва | МФР / массаж |
| 13 | расслабляющий массаж Москва | расслабление |
| 14 | силовые тренировки персонально Москва | сила / здоровье |
| 15 | ОФП тренер Москва | сила / здоровье |
| 16 | боль в спине упражнения | спина (blog) |
| 17 | боли в пояснице что делать | спина (blog) |
| 18 | долголетие движение | долголетие |
| 19 | активное долголетие тренировки | долголетие |
| 20 | правИло массаж / правИло практика | ПРАВИЛО |
| 21 | биомеханика движения | биомеханика |
| 22 | онлайн тренер | онлайн |
| 23 | физический терапевт Москва | PT authority |

> ⚠️ «боль в спине» — **utility/authority**, CTA = запись/анкета, язык функции и нагрузки, **не** клиника и **не** «вылечим».

---

## 🧾 Title / H1 / CTA — черновики по кластерам

### студия-money / personal_trainer

| Поле | Черновик |
|---|---|
| **Title** | Персональные тренировки в Москве — Евгений Гошев \| Атмосфера 3D |
| **H1** | Персональные тренировки в Москве: система тела, а не хаос нагрузки |
| **CTA** | Записаться на личный приём → `/anketa` |

### МФР / массаж / расслабление

| Поле | Черновик |
|---|---|
| **Title** | МФР и массаж в Москве — восстановление тканей в системе движения |
| **H1** | МФР и ручная работа: подготовка тканей к качественному движению |
| **CTA** | Запись → `/anketa` · без «снять боль навсегда» |

### функционал

| Поле | Черновик |
|---|---|
| **Title** | Функциональные тренировки в Москве — качество движения и сила |
| **H1** | Функциональные тренировки: сначала паттерн, затем нагрузка |
| **CTA** | Приём → `/anketa` · клуб → `/club` |

### осанка

| Поле | Черновик |
|---|---|
| **Title** | Осанка и тренировки в Москве — настройка тела, не «выровнять навсегда» |
| **H1** | Осанка как система: дыхание, грудной отдел, стопы, контроль |
| **CTA** | Мини-курс → `egoshev.ru/dyhanieosanka` · студия → `/anketa` |

### мобильность

| Поле | Черновик |
|---|---|
| **Title** | Мобильность и подвижность тела — тренировки в Москве |
| **H1** | Мобильность: свобода суставов в связке с контролем и силой |
| **CTA** | Офлайн-разбор → `/anketa` · база → `egoshev.ru/baza` |

### сила / здоровье / ОФП

| Поле | Черновик |
|---|---|
| **Title** | ОФП и силовая база в Москве — через качество движения |
| **H1** | Сила на фундаменте паттерна, не «железо ради железа» |
| **CTA** | `/anketa` · `/club` |

### спина (blog only)

| Поле | Черновик |
|---|---|
| **Title** | Боль в спине и нагрузка: что проверить в системе тела |
| **H1** | Когда спина «кричит» — смотрим паттерн и нагрузку, не ярлык |
| **CTA** | Разобрать офлайн → `/anketa` · ткани → `/mfr-massazh-moskva` |
| **Запрет** | «вылечим», диагноз-ярлык, Physician schema |

### долголетие (blog)

| Поле | Черновик |
|---|---|
| **Title** | Долголетие через движение: сила, мобильность, дисциплина |
| **H1** | Долгая функция тела строится практикой, не чудо-протоколом |
| **CTA** | `/club` soft |

### ПРАВИЛО (sub-brand Денис)

| Поле | Черновик |
|---|---|
| **SoT** | Inbox / master-prompt: суб-бренд **«Атмосфера ПравИло»** — Денис (совладелец): правИло, даосский массаж, звукотерапия тибетскими чашами, дубовые ветки. Отдельная дизайн-система (чёрно-золотой), не серебро EG 3D. |
| **Title (черновик)** | ПравИло и практики восстановления — Атмосфера ПравИло \| студия Москва |
| **H1** | ПравИло: практики состояния и тканей в пространстве студии |
| **CTA** | Запись на направление ПравИло / студия (уточнить канал записи HITL) |
| **Не делать** | Смешивать дизайн с EG 3D; эзотерика вместо физиологии; медобещания |

### биомеханика / PT authority

| Поле | Черновик |
|---|---|
| **Title** | Биомеханика движения — Евгений Гошев \| Атмосфера 3D |
| **H1** | Биомеханика: тело как система |
| **CTA** | `/about` · soft `/anketa` · **не** money «физический терапевт Москва» |

---

## 🔀 Карта конверсии

```text
ЗАПРОС → INTENT → СТРАНИЦА → ANSWER-FIRST + FAQ → CTA → ЗАПИСЬ / ПРОДУКТ
```

| Запрос (пример) | Страница | CTA | Конверсия |
|---|---|---|---|
| персональный тренер Москва | `/personalnye-trenirovki-moskva` | `/anketa` | Студия |
| МФР / массаж Москва | `/mfr-massazh-moskva` | `/anketa` | Студия |
| функциональные тренировки | `/funkcionalnye-trenirovki-moskva` | `/anketa` | Студия |
| коррекция осанки | `/osanka` | dyhanieosanka / anketa | Курс + студия |
| боль в спине | blog → money | soft anketa | Доверие → запись |
| правИло | `/pravilo` | запись ПравИло | Суб-бренд / студия |
| физический терапевт Москва | `/about` | soft | Authority, не clinic |

### Internal linking (правила)

| Откуда | Куда | Зачем |
|---|---|---|
| Blog spoke | 1 money hub + 1 product | Spoke → hub |
| Money hub | `/anketa` + 1 online (club/baza/dyhanie) | Запись + лестница |
| `/uslugi` | все money hubs | Хаб, не thin all-in-one |
| Home | 2–3 money + anketa | Не размывать H1 |
| Blog «спина» | MFR **или** personalnye | Без medical CTA |

---

## 🗂️ Роли страниц (не путать)

| URL | Роль | Не делать |
|---|---|---|
| `/personal` | Legal ПДн | Не таргетить «персональный тренер» |
| `/uslugi` | Hub | Не одна страница на все money-intent |
| `/online` | Витрина | Не путать с `/online-trener` без canonical |
| `/club` | Product retention | JsonLd пока `[]` — backlog |
| `/blog/*` | Authority / utility | Не дублировать H1 money |
| Tilda `egoshev.ru` | Оплаты | Не убирать; dual-domain канон |

---

## 🚫 Запреты SEO-текстов

| Запрещено | Почему |
|---|---|
| «вылечим», «исцеление», «избавим навсегда» | Медобещания |
| Слово «врач» / Physician | Brand safety |
| Anti-gym | Positioning |
| «ТЕБЕ НУЖЕН ТОЛЬКО ТЫ» как CTA-спам | Философия ≠ слоган рекламы |
| Doorway 50 thin pages | Подход C |
| Выдуманный Wordstat | Integrity |

---

## ✅ Чеклист после Wordstat

- [ ] Counts по seeds (регион 213)
- [ ] Обновить колонку Wordstat в таблице кластеров
- [ ] Пересмотреть P0–P3 и Wave 2 order
- [ ] Отсечь тонкие синонимы (doorway)
- [ ] HITL: подтвердить Wave 2 URL list в [SEO_ВОЛНА](./SEO_ВОЛНА_КОНТЕНТ_И_ДЗЕН.md)

---

## 🔗 Навигация

[← SEO_AUDIT_REPORT](./SEO_AUDIT_REPORT.md) · [SEO_ВОЛНА](./SEO_ВОЛНА_КОНТЕНТ_И_ДЗЕН.md) · [CONTENT_SEO_GUIDE](./CONTENT_SEO_GUIDE.md) · [Яндекс чеклист](./ЯНДЕКС_КАРТЫ_И_ВЕБМАСТЕР_ЧЕКЛИСТ.md) · [Канон домена](./КАНОН_ДОМЕН_eg.egoshev.ru.md)
