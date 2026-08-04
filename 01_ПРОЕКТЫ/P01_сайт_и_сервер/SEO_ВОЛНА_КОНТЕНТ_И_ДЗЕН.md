# 🌊 SEO-волна: контент, money hubs и Дзен

> Операционный план: запись в студию → выдача в поиске → стабильный поток статей в Яндекс Дзен. Не плодить 50 thin pages — **подход C**, 5–7 money hubs.

---

## 📋 Свойства

| | |
|---|---|
| **Дата** | 2026-08-04 |
| **Статус** | 🟢 Wave 2 money live · `/ofp` `/pravilo` позже |
| **Хост** | `https://eg.egoshev.ru` |
| **RSS** | `https://eg.egoshev.ru/rss.xml` |
| **KPI главный** | Заявки / запись в студию |
| **KPI вторичный** | Индексация money + стабильный импорт Дзен |
| **Wordstat** | `pending_live` |
| **Связанные** | [SEO_KEYWORD_MAP](./SEO_KEYWORD_MAP.md) · [SEO_AUDIT_REPORT](./SEO_AUDIT_REPORT.md) · [CONTENT_SEO_GUIDE](./CONTENT_SEO_GUIDE.md) · [Яндекс чеклист](./ЯНДЕКС_КАРТЫ_И_ВЕБМАСТЕР_ЧЕКЛИСТ.md) · [Канон домена](./КАНОН_ДОМЕН_eg.egoshev.ru.md) |

> 💡 **Принцип:** vanity traffic без записи = провал. Каждый hub и статья ведут к анкете / боту / лестнице продуктов.

---

## ✅ Wave 1 — уже сделано

| Артефакт | Статус live (04.08.2026) | Заметка |
|---|---|---|
| `/personalnye-trenirovki-moskva` | ✅ HTTP 200 · в sitemap | Главный local money |
| `/mfr-massazh-moskva` | ✅ HTTP 200 · в sitemap | Массаж / МФР / расслабление → студия |
| Meta `/uslugi` + `/online` | ✅ descriptions не пустые | P0-4 аудита закрыт |
| Home title soft | ✅ «персональные тренировки» + PT secondary | PT не primary money |
| Brand-safe hero lead | ✅ (сессия wave 1) | Без cure-adjacent |
| IG в Person sameAs | ✅ | |
| Вебмастер: sitemap + recrawl money | ✅ в очереди / обработано | Регион Москва = pending БД |
| RSS `/rss.xml` | ✅ 200 · **18 item** · `content:encoded` полный текст | Готов к Дзену |
| Zen verification HTML | ✅ 2 файла в `public/` · live 200 | Подтверждение сайта |

> ⚠️ **Я.Бизнес:** у аккаунта `gosheveugene@yandex.ru` карточки нет — HITL в аккаунте, где карта `yandex.ru/maps/-/CTu240~o`.

---

## 🛠️ Wave 2 — money hubs (04.08.2026)

| # | URL | Кластер | Статус | Priority |
|---|---|---|---|---|
| 1 | `/funkcionalnye-trenirovki-moskva` | функционал | ✅ live | P0 |
| 2 | `/mobilnost` | мобильность | ✅ live | P0 |
| 3 | `/osanka` | осанка | ✅ live | P0 |
| 4 | `/ofp` *или* усиление personalnye + blog «сила/здоровье» | сила / здоровье | ⏳ не в этой волне | P1 |
| 5 | `/pravilo` | ПРАВИЛО | ⏳ не в этой волне | P2 |
| — | `/online-trener` | онлайн | backlog | P1+ |
| — | `/biomehanika` | authority | backlog | — |

**Не создавать в Wave 2:** doorway «боль в спине вылечим», clinic pages, anti-gym, 10 синонимов без SERP-check.

### Чеклист сборки одной money page

- [ ] Answer-first 40–90 слов под H1
- [ ] Москва + метро/адрес текстом (NAP)
- [ ] FAQ 3–6 видимых + FAQPage schema
- [ ] Service schema (не MedicalClinic)
- [ ] CTA: `/anketa` (+ 1 online bridge)
- [ ] Internal links: `/uslugi` · 1–2 blog · смежный money
- [ ] Sitemap + Вебмастер переобход
- [ ] Тон: без «врач», медобещаний, anti-gym

---

## ✍️ Blog topic pipeline (из кластеров)

Правило: статья = **spoke**, не конкурирует H1 с money. Один `seoCluster`, один CTA. SoT стиля: [CONTENT_SEO_GUIDE](./CONTENT_SEO_GUIDE.md) · [СТИЛЬ_СТАТЕЙ_БЛОГА](./СТИЛЬ_СТАТЕЙ_БЛОГА.md).

| Очередь | Тема / угол | seoCluster | Мост (money) | Тон |
|---|---|---|---|---|
| B1 | Почему «просто размяться» не даёт мобильность | studio / mobility | `/mobilnost` | Utility |
| B2 | Осанка: почему «выпрямиться» не держится | course_bnt / posture | `/osanka` | Utility |
| B3 | Напряжение мышц после нагрузки: ткани → движение | rehab_biomechanics | `/mfr-massazh-moskva` | Recovery |
| B4 | Боль в спине и паттерн нагрузки (без диагноза) | rehab_biomechanics | MFR / personalnye | **Осторожно** |
| B5 | Сила после 40–50: функция и долголетие | longevity_movement | `/club` · personalnye | Authority |
| B6 | Функциональный тренинг vs хаос упражнений | studio_moscow | `/funkcionalnye-…` | Commercial bridge |
| B7 | Биомеханика простыми словами | rehab / about | `/about` | Authority |
| B8 | ПравИло: что это за направление студии (факты SoT) | studio / sub-brand | `/pravilo` | Brand · после HITL |

**Частота (практично):** 1–2 сильные статьи / неделя важнее ежедневного шума. Дзен любит регулярность, но качество EG > спам.

---

## 🔗 Internal linking rules

```text
Blog spoke  →  1 money hub  +  1 product (club / baza / dyhanie / anketa)
Money hub   →  /anketa  +  /uslugi  +  1–2 related spokes
/uslugi     →  все money hubs (карточки)
Home        →  max 2–3 money deep-links в контенте + анкета
«Спина»     →  только soft CTA, без medical promises
```

| Запрет линковки | Почему |
|---|---|
| Blog H1 = money H1 verbatim | Каннибализация |
| 5 равносильных CTA в конце статьи | Размытие конверсии |
| YouTube CTA только на `eg.egoshev.ru` там, где SoT = `egoshev.ru` | Dual-domain |

---

## 📰 Дзен — техника и правда про «все статьи»

### Что проверено live (04.08.2026)

| Проверка | Результат |
|---|---|
| `curl` `https://eg.egoshev.ru/rss.xml` | **HTTP 200**, `application/rss+xml` |
| Item count | **18** опубликованных постов |
| Формат | RSS 2.0 + `content:encoded` (**полный HTML**), `enclosure` на cover, atom self-link |
| Verification | `public/zen_*.html` ×2 · live **200** · meta `zen-verification` |
| Источник постов | `getBlogPosts()` — только `published !== false` |

### Последние item'ы в ленте (по порядку RSS)

1. Генетика тела: что действительно можно изменить тренировками  
2. Мужская внешность и привлекательность…  
3. Силовые тренировки после 50…  
4. Кето или углеводы…  
5. Молочные продукты…  
*(далее — остальные из 18)*

### Честно про «все статьи перенеслись»

| Факт | Следствие |
|---|---|
| RSS отдаёт **весь опубликованный блог** (сейчас 18) | Технически архив в ленте есть |
| Дзен **не гарантирует** мгновенный импорт всего архива | Часто тянет пачками / по свежести; старые могут подтянуться позже или частично |
| 11 подписчиков | Канал живой, но **охват = доверие + регулярность**, не магия RSS |
| Полный текст в `content:encoded` | Лучше для полного поста в Дзене, чем анонс-only |
| Картинки | Cover через `enclosure` + `<figure><img>` в encoded — следить, чтобы URL абсолютные (сейчас так) |

### Что сделать, чтобы статьи стабильно текли

| # | Действие | Кто |
|---|---|---|
| 1 | В кабинете Дзена: RSS = `https://eg.egoshev.ru/rss.xml` · статус «подключено / обновляется» | Евгений |
| 2 | После каждой новой статьи на сайте — проверить, что slug в RSS (через 5 мин cache) | Agent / Евгений |
| 3 | В Дзене: «Обновить ленту» / дождаться крола (не спамить кнопкой hourly) | Евгений |
| 4 | Не публиковать в Дзен вручную дубликаты тех же статей (дубль = риск) | Евгений |
| 5 | Старые статьи без обложки / короткого текста — добить cover ≥700px перед ожиданием полного архива | Контент |
| 6 | Мониторинг раз в неделю: число постов на сайте vs в Дзене | Евгений |
| 7 | Если Дзен тянет только анонс — в настройках импорта выбрать полный текст (если есть опция) | Евгений |

> ⚠️ **Не обещать:** «подключил RSS → завтра все 18 и 10k просмотров». Обещать: **стабильный канал сайт → RSS → Дзен** + рост через качество и частоту.

### Verification files (код)

| Файл | Назначение |
|---|---|
| `site-next/public/zen_PVE8dA1sFG4ootqNJlb9J2du7Sq9WVljG9l8gNOZmvD2cW7agvDyftzigfsYR4xA.html` | Токен verification |
| `site-next/public/zen_PVE8dA1sFG4ootqNJlb9J2du7Sq9WVijG9I8gNOZmvD2cW7agvDyftzigfsYR4xA.html` | Второй токен (почти близнец; оба live) |

Код RSS: `app/rss.xml/route.ts` + `lib/content/blog-rss.ts` — **битым не выглядит**, правок в этой сессии не делали.

---

## 🖥️ Сайт «идеально под наполнение» — gap vs SEO_AUDIT

| ID / тема | Было в аудите | Сейчас (04.08) | Действие |
|---|---|---|---|
| P0-3 money landings | Нет | **2/7** live | Wave 2: funcional / mobilnost / osanka |
| P0-4 `/uslugi` `/online` empty desc | Пусто | ✅ исправлено | Мониторинг CTR |
| P0-1 home title PT-primary | PT primary | Soft: персоналка + PT | Дальше не раздувать PT |
| P1-2 Club JsonLd | `jsonLd: []` | **всё ещё `[]`** | Backlog schema |
| P1-1 `/personal` legal | Conflict slug | Без изменений (ок) | Не трогать |
| P1-4 FAQPage на money | Нет | На Wave 1 pages — проверить при правке | Wave 2 = обязательно |
| Sitemap | 200 OK | Money ×2 в urlset | Добавлять URL при Wave 2 |
| BreadcrumbList | Нет | Pending | С money Wave 2 |
| Tilda apex | Dual-domain | Канон задокументирован | **Не убирать** Tilda |
| DNS apex kill | — | Запрещено без HITL | Не делать |

**Код в этой сессии:** только документы + аудит; крупных money pages не кодим без HITL Wave 2.

---

## 🖐️ Что руками: Вебмастер / Дзен / Карты

| Площадка | Действие | Статус |
|---|---|---|
| **Вебмастер** | Регион Москва — дождаться БД | 🟡 pending |
| **Вебмастер** | После Wave 2 — переобход новых URL | ☐ |
| **Я.Бизнес** | Найти аккаунт карты · привязать `eg.egoshev.ru` · услуги · фото | ☐ HITL |
| **Карты** | NAP паритет с сайтом | ☐ |
| **Дзен** | Проверить статус RSS · сверить число постов | ☐ HITL |
| **Wordstat** | Ручной прогон seeds из KEYWORD_MAP | ☐ |

---

## 📈 KPI (что смотреть)

| Метрика | Цель | Не цель |
|---|---|---|
| Заявки `/anketa` + бот + звонки | ↑ неделя к неделе | — |
| Запись в студию с money pages | Атрибуция «откуда узнали» | Vanity sessions |
| Индексация money в Яндексе | Все live hubs в индексе | — |
| Дзен: посты = новые статьи сайта (±лаг) | Стабильный импорт | Погоня за 11→1000 без контента |
| CTR сниппетов | Title/desc без пустот | Keyword stuffing |

---

## ✋ HITL — подтверди Wave 2

Ответь коротко:

1. **Делать Wave 2:** `funkcionalnye` + `mobilnost` + `osanka` — ок?  
2. **`/ofp`** в этой волне или отложить?  
3. **`/pravilo`** — отдельная страница на Next или пока только Tilda/лендинг Дениса?  
4. Приоритет сейчас: **студия** / курс / клуб? (рекомендация системы: **студия**)

После «ок» — сборка страниц без ломки home / club / blog.

---

## 🔗 Навигация

[← SEO_KEYWORD_MAP](./SEO_KEYWORD_MAP.md) · [SEO_AUDIT_REPORT](./SEO_AUDIT_REPORT.md) · [CONTENT_SEO_GUIDE](./CONTENT_SEO_GUIDE.md) · [Яндекс чеклист](./ЯНДЕКС_КАРТЫ_И_ВЕБМАСТЕР_ЧЕКЛИСТ.md) · [Журнал решений](../../00_ПУЛЬТ_УПРАВЛЕНИЯ/ЖУРНАЛ_РЕШЕНИЙ.md)
