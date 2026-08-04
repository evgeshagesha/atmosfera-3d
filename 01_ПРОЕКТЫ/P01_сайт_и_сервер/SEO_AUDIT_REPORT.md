# 🔍 SEO Audit Report — EG / Атмосфера 3D

> Аудит SEO / AEO / GEO для `eg.egoshev.ru` + Tilda `egoshev.ru`. Архитектура: **подход C — Service-cluster hub + authority**. Код сайта в этом прогоне **не менялся**.

---

## 📋 Свойства

| | |
|---|---|
| **Дата** | 2026-08-03 |
| **Хосты** | Next: `https://eg.egoshev.ru` · оплаты/Tilda: `https://egoshev.ru` |
| **Подход** | C — Service-cluster hub + authority |
| **Источники** | research_brief (DEEP) · site_inventory (агент 94f8c544) · live curl |
| **Wordstat** | `pending_live` — частоты **не выдуманы** |
| **Статус** | 🟢 Wave 1 частично закрыт (04.08) · Wave 2 → [SEO_ВОЛНА](./SEO_ВОЛНА_КОНТЕНТ_И_ДЗЕН.md) |
| **Связанные** | [SEO_KEYWORD_MAP](./SEO_KEYWORD_MAP.md) · [SEO_ВОЛНА](./SEO_ВОЛНА_КОНТЕНТ_И_ДЗЕН.md) · [CONTENT_SEO_GUIDE](./CONTENT_SEO_GUIDE.md) · [SEO_ФУНДАМЕНТ](./SEO_ФУНДАМЕНТ.md) · [СТИЛЬ_СТАТЕЙ_БЛОГА](./СТИЛЬ_СТАТЕЙ_БЛОГА.md) |

---

## ✅ Что уже ок

| Слой | Факт |
|---|---|
| **ProfessionalService** | Home `@graph`: Person + ProfessionalService / HealthAndBeautyBusiness / LocalBusiness + WebSite |
| **Club meta** | Brand-safe description (осанка, мобильность, сила; без медобещаний) |
| **Blog Article** | Schema `Article` на `/blog/[slug]`; author Person; publisher «Атмосфера 3D» |
| **RSS** | `/rss.xml` (Дзен), atom self-link, в root `alternates.types` |
| **Favicon EG** | `favicon.ico`, `icon.png`, `apple-icon.png` + public PNG |
| **robots.txt** | allow `/`; disallow `/admin`, `/api/admin`; sitemap указан |
| **Canonical / OG** | `buildPageMetadata`; OG website/article; `locale: ru_RU` |
| **Sitemap (live)** | `curl` 2026-08-03 → **HTTP 200**, валидный `urlset` (home, blog, kids, about, anketa, club, baza…) |
| **Kids** | `/kids` + Service schema |
| **Yandex** | verification + Metrika |
| **JsonLd host** | rewrite `egoshev.ru` → `eg.egoshev.ru` в `JsonLd.tsx` |
| **Продуктовая лестница** | CTA на главной → тест / дыхание / база / клуб / kids / консультация (цены cite `products.yaml`) |

> 💡 **Подсказка:** `SEO_ФУНДАМЕНТ.md` частично устарел (там ещё «LocalBusiness» как единственный тип) — фактический graph уже ProfessionalService+.

---

## 🚨 Проблемы P0–P3

### P0 — критично для коммерции / бренда

| ID | Проблема | Доказательство | Риск |
|---|---|---|---|
| P0-1 | Title главной: **физический терапевт** как primary | Live: `Евгений Гошев — физический терапевт \| Атмосфера 3D \| Москва` | Expert-кластер вместо money-intent; конфликт с позиционированием «PT = authority, не money-primary» |
| P0-2 | Hero brand-risk | H1: «Верните телу свободу движения» + cure-adjacent формулировки в hero-блоках (боль / «здоровым на годы») | Бан медобещаний / overpromise |
| P0-3 | Нет money service landings | Нет dedicated URL под PT / функционал / МФР / осанку / мобильность / ОФП / онлайн-тренер | Конкуренты закрывают SERP; EG сидит на hub без spokes |
| P0-4 | `/uslugi` и `/online` — пустые description | site_inventory: desc **пусто**; H1 `/online` со склейкой-опечаткой | Слабый сниппет, низкий CTR |

### P1 — сильные gaps

| ID | Проблема | Доказательство |
|---|---|---|
| P1-1 | `/personal` = **юр. согласие ПДн**, не услуга | Conflict slug vs кластер `personal_trainer` |
| P1-2 | Club без JsonLd | `club.json` → `jsonLd: []` |
| P1-3 | sameAs без Instagram | Person: TG / VK / YT / Wikipedia; **нет** `@egoshev1`, канала, бота |
| P1-4 | Нет BreadcrumbList / FAQPage на money | FAQ есть в UI клуба, но не как extractable AEO на услугах |
| P1-5 | Service pages без schema | uslugi / online / anketa / baza без Service/Offer |

### P2 — техника / гигиена

| ID | Проблема | Статус 2026-08-03 |
|---|---|---|
| P2-1 | Sitemap HTTP 500 (в research) | **Не подтверждено live:** `curl -sI https://eg.egoshev.ru/sitemap.xml` → **200 OK**. Оставить мониторинг; не чинить «вслепую» |
| P2-2 | `manifest.json` home title drift | Устаревший title vs live `data/index.json` |
| P2-3 | Article sameAs только `t.me/EGoshev` | Узкий граф автора |
| P2-4 | Нет `telephone` в schema | Слабее local pack / NAP |
| P2-5 | Publisher Organization без logo | Article schema неполный |

### P3 — бэклог

| ID | Проблема |
|---|---|
| P3-1 | Tilda payment URLs без единой canonical/noindex map |
| P3-2 | `/gaid` title слабый (`гайд`) |
| P3-3 | About: визуальный title без явного `<h1>` |
| P3-4 | Kids-anketa / app уже noindex — ок, не трогать |

---

## 🏗️ Архитектура страниц (подход C)

### Создать (money + authority)

| URL-hint | Кластер | Роль | Зачем |
|---|---|---|---|
| `/personalnye-trenirovki-moskva` | personal_trainer | money | Главный local money (не `/personal`!) |
| `/funkcionalnye-trenirovki-moskva` | functional | money | Коммерция + бренд-fit |
| `/mfr-massazh-moskva` | mfr_massage | money | Дифференциация vs сети МФР |
| `/osanka` | posture | money | Мост к курсу «Дыхание и осанка» + студия |
| `/mobilnost` | mobility | money | Спрос; конкуренты equipment-thin |
| `/ofp` | ofp | money | Спортсмены / база |
| `/online-trener` | online | money | Лестница: клуб / консультация / база |
| `/biomehanika` + усилить `/about` | biomechanics + physical_therapist | authority | Экспертность без money-PT |

### Объединить / перестроить

| Действие | Логика |
|---|---|
| `/uslugi` → **хаб** | Карточки-ссылки на money pages; не одна страница «обо всём» |
| `/online` ↔ `/online-trener` | Canonical/merge **или** чёткое: product-витрина vs SEO-landing |
| Blog → spokes | Internal links на money; не дублировать H1-intent landing |
| Tilda `egoshev.ru` (оплаты) | `noindex` + canonical на Next product/service (после карты URL) |

### Не создавать

- Йога / нутрициология commercial landings
- Money-primary «физический терапевт Москва»
- Clinic / реабилитация / «врач» pages
- Thin doorways 10+ под синонимы без SERP-cluster check
- Cure-promise «вылечим боли в спине»
- Doorway-страницы «анти-зал»

---

## 🥊 Конкуренты (кратко)

| Кластер | Пример | Слабость конкурента → окно EG |
|---|---|---|
| Биомеханика | moscowbiomechanics.ru | Generic H1, medical-adjacent claims |
| Персоналка | hidefitness, personalapp, shevelevgym, anatomyclub, fitts | Много сегментов / anti-club / зоопарк направлений |
| Функционал / мобильность | bodyhacker, pmp, flowrow, endorfin Stick | H1 без метода; HIIT/ккал; equipment-угол |
| МФР | airfit, tsfitness, topstretching | Hype %, «без боли», мед-ярлыки |
| Не копировать | medmove, podhodstudio | Clinic / врач в ядре |

> 💡 **Выигрыш EG:** ось оценка → ткани → дыхание → движение → сила + личный бренд + локальные service pages **без** clinic-mimic и **без** anti-gym.

---

## 🧠 AEO / GEO — обязательные блоки

| Блок | Что сделать |
|---|---|
| **Who** | «Кто»: Евгений Гошев — системная работа с телом / биомеханика (**не** «врач»). Person JSON-LD на `/about`; sameAs + IG |
| **What** | Answer-first 40–90 слов под H1; Service schema на money; 1 primary intent / URL |
| **FAQ** | Visible FAQ 3–6 + FAQPage для extractability (**не** ради Google FAQ stars — deprecated May 2026) |
| **Where** | Москва + адрес/метро текстом; `areaServed`; LocalBusiness: HealthClub / SportsActivityLocation (**не** MedicalClinic) |
| **NAP** | Паритет: сайт ↔ Я.Бизнес ↔ GBP ↔ 2ГИС |
| **How to book** | Явный блок записи: студия / бот / анкета; лестница тест → дыхание → база → клуб → приём |
| **Also** | Текстовые отзывы; hybrid-intent («сколько длится», «кому подходит») без anti-gym; **не** строить AEO на llms.txt hacks |

---

## 🧭 UX / CRO — путь записи

```text
Reels / поиск / Maps
        ↓
  Money page / home / club
        ↓
  Answer-first + proof + FAQ
        ↓
  CTA: анкета / бот / тест 684 ₽
        ↓
  Студия (офлайн)  |  Онлайн-лестница (дыхание → база → клуб)
```

| Точка | CTA сейчас | Усиление после money pages |
|---|---|---|
| Hero `/` | Анкета + тест `#online` | H1/title под money-intent; soft CTA без cure |
| `#online` | 6 карточек продуктов | Internal links с money pages на те же офферы |
| `/uslugi` | Tilda HTML | Хаб → money → анкета |
| Club | Tribute `#tariff` | JsonLd Offer + FAQ + soft CTA |
| Blog | CTA-шаблон SoT | 1 primary CTA + link на релевантный money |

Цены **не менять** — cite `03_РЕСУРСЫ/config/products.yaml`.

---

## 📸 Instagram — best name / bio

| | Рекомендация |
|---|---|
| **Best name** | `Евгений Гошев · Движение Москва` |
| **Alt (brand-first)** | `Евгений Гошев · Атмосфера 3D · Москва` |
| **Best bio** | Функциональный тренинг и биомеханика движения. / Сначала база и качество паттерна — затем нагрузка. / Студия Атмосфера 3D, Москва. / Написать / записаться ↓ |
| **Почему** | Name = имя + ниша + гео; bio без «врач», без anti-gym, без «ТЕБЕ НУЖЕН ТОЛЬКО ТЫ» как CTA; один CTA |

Другие варианты name/bio — в research_brief; внедрять после подтверждения.

---

## 📍 Локальное SEO — Яндекс.Бизнес

| Шаг | Действие |
|---|---|
| 1 | Карточка организации: NAP = сайт (ул. Вятская, 27с12, Москва) |
| 2 | Рубрика: фитнес / персональные тренировки / студия движения (**не** клиника) |
| 3 | Фото студии, услуги, часы, телефон |
| 4 | Ссылка на сайт `eg.egoshev.ru` + Я.Карты |
| 5 | Паритет с 2ГИС / GBP |
| 6 | Регион сайта «Москва» в Яндекс.Вебмастере |
| 7 | Отзывы: просить текстовые; отвечать в тоне EG |

> ⚠️ **Важно:** не позиционировать карточку как медцентр / «врач».

---

## 📊 Wordstat — `pending_live`

> ⚠️ Частотности **не выдуманы**. Нужна ручная проверка: [Яндекс Вордстат](https://wordstat.yandex.ru/) · регион **Москва (213)**.

### Seeds для ручной проверки

| # | Запрос-seed | Кластер |
|---|---|---|
| 1 | персональный тренер Москва | personal_trainer |
| 2 | персональные тренировки Москва | personal_trainer |
| 3 | личный тренер Москва | personal_trainer |
| 4 | функциональные тренировки Москва | functional |
| 5 | функциональный тренинг | functional |
| 6 | мобильность суставов | mobility |
| 7 | мобилити тренировки | mobility |
| 8 | осанка тренировки | posture |
| 9 | коррекция осанки Москва | posture |
| 10 | массаж Москва | mfr_massage |
| 11 | МФР Москва | mfr_massage |
| 12 | миофасциальный релиз Москва | mfr_massage |
| 13 | ОФП тренер | ofp |
| 14 | онлайн тренер | online |
| 15 | онлайн персональные тренировки | online |
| 16 | биомеханика движения | biomechanics |
| 17 | физический терапевт Москва | physical_therapist |
| 18 | дыхание и осанка | breathing |
| 19 | снять мышечное напряжение | recovery |
| 20 | восстановление после тренировок | recovery |

Колонки сбора: `phrase | region | count | devices | collected_at | cluster_id | page_target | intent`.  
После сбора → обновить [SEO_KEYWORD_MAP](./SEO_KEYWORD_MAP.md) (заменить `pending_live`).

---

## 🗓️ Приоритеты реализации (после подтверждения Евгения)

Порядок **гипотезы до Wordstat** (не объёмы — логика выручки):

| # | Действие | Тип |
|---|---|---|
| 1 | Переписать title/H1 home (PT → authority; money в title secondary или на money pages) | Meta / brand |
| 2 | Hero: убрать cure-adjacent; язык функции / мобильности / системы | Brand |
| 3 | NAP + Я.Бизнес / Maps parity | Local |
| 4 | Meta description `/uslugi` + `/online` (quick win) | Meta |
| 5 | Создать 5–7 money pages (см. блок «Жду подтверждения») | Content / architecture |
| 6 | Club JsonLd + IG в sameAs + telephone | Schema |
| 7 | AEO-блоки (answer-first + FAQ) на money | AEO |
| 8 | Tilda canonical/noindex map | Tech |
| 9 | Live Wordstat → переранжировать KEYWORD_MAP | Data |
| 10 | Blog spokes по [CONTENT_SEO_GUIDE](./CONTENT_SEO_GUIDE.md) | Content |

> 💡 Код site-next в этом коммите **не трогаем**. Реализация — отдельным прогоном после «ок».

---

## 🚫 Запреты бренда (SEO-тексты)

| Запрещено | Почему |
|---|---|
| «вылечим», «исцеление», «избавим навсегда» | Медобещания |
| «секретный / революционный метод» | Инфостиль |
| Слово «врач» / Physician schema | Brand safety |
| Anti-gym / «зал вреден» | Positioning ban |
| «без тренажёров» = «без оборудования» | Ложное упрощение |
| «ТЕБЕ НУЖЕН ТОЛЬКО ТЫ» как CTA-спам | Философия ≠ рекламный слоган |
| Clinic / медцентр mimic | Не наш контур |
| YouTube CTA → `eg.egoshev.ru` как единственный домен там, где SoT требует `egoshev.ru` | Dual-domain правила контента |
| Выдуманные Wordstat-цифры | Integrity |

---

## 📎 Краткая карта текущего сайта (inventory)

| Route | SEO-роль сейчас | Gap |
|---|---|---|
| `/` | Face + ProfessionalService | Title/H1 risk |
| `/club` | Strong product landing | No JsonLd |
| `/blog` + articles | Authority + RSS | Weak internal → money |
| `/uslugi` | Weak hub | Empty desc; no spokes |
| `/online` | Weak | Empty desc; H1 typo |
| `/personal` | **Legal** | Slug conflict |
| `/about` | Bio | Strengthen authority H1 |
| `/anketa` `/baza` `/gaid` | Conversion / product | Meta gaps |
| `/kids` | OK + Service | Separate contour |

---

## ✋ Жду подтверждения

**Обновление 04.08.2026:** Wave 1 (personalnye + mfr + meta uslugi/online) **уже live**. Операционный план: [SEO_ВОЛНА_КОНТЕНТ_И_ДЗЕН](./SEO_ВОЛНА_КОНТЕНТ_И_ДЗЕН.md).

### Wave 2 — подтвердить перед кодом

1. **`/funkcionalnye-trenirovki-moskva`**  
2. **`/mobilnost`**  
3. **`/osanka`**  
4. Опц.: **`/ofp`** · **`/pravilo`** (суб-бренд Дениса) · **`/online-trener`**

Параллельно руками:
- [x] Meta `/uslugi` + `/online` (wave 1)
- [ ] Club JsonLd (всё ещё `[]`)
- [ ] Я.Бизнес NAP (аккаунт карты)
- [ ] Ручной Wordstat по seeds
- [ ] Дзен: сверить число постов vs RSS (18)

**Ответь:** Wave 2 список ок? Приоритет — студия / курс / клуб?

---

## 🔗 Навигация

[← SEO_KEYWORD_MAP](./SEO_KEYWORD_MAP.md) · [SEO_ВОЛНА](./SEO_ВОЛНА_КОНТЕНТ_И_ДЗЕН.md) · [CONTENT_SEO_GUIDE](./CONTENT_SEO_GUIDE.md) · [SEO_ФУНДАМЕНТ](./SEO_ФУНДАМЕНТ.md) · [СТИЛЬ_СТАТЕЙ_БЛОГА](./СТИЛЬ_СТАТЕЙ_БЛОГА.md) · [ГЛАВНЫЙ_КОНТЕКСТ](../../00_ПУЛЬТ_УПРАВЛЕНИЯ/ГЛАВНЫЙ_КОНТЕКСТ.md)
