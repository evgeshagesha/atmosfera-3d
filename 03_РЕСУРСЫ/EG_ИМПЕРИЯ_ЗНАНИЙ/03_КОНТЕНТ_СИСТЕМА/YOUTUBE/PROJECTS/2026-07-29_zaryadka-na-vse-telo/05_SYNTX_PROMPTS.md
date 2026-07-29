# 🧩 SYNTX-промты: мобильность и контроль таза
> Максимум три смысловые сцены по 2–5 секунд. Генерировать только после rough cut и только если реального кадра недостаточно.

## 📋 Свойства

| Поле | Значение |
|---|---|
| **Project ID** | `2026-07-29_zaryadka-na-vse-telo` |
| **Статус** | `PROMPTS_READY_AFTER_ROUGH_CUT` |
| **Лимит сцен** | 3 |
| **Лимит кредитов** | Назначить после low-res tests |
| **Коммерческая лицензия** | `VERIFY BEFORE USE` |
| **Approval state** | `NOT_REVIEWED` |

## 🧩 Обязательные поля проекта

| Поле | Ответ |
|---|---|
| Папка output | `05_ASSETS/AI/` |
| Визуальный стиль | graphite · matte anatomical miniature · bone/silver textures · silver thread · soft side light · macro · shallow depth · subtle film grain |
| Исключить | neon · cartoon · horror · gore · glossy clinic · cheap fitness · fake medical certainty · copied branding |
| Приоритет | real footage → собственная схема → AI |
| Рекомендация | Не генерировать до утверждения структуры rough cut |

> ⚠️ Эти сцены — условные визуальные модели, не медицинская визуализация и не доказательство причины симптомов.

## 🎞️ Scene S01 — шарнир и компенсация

- **goal:** показать, что доступный диапазон бедра может влиять на распределение движения, без диагноза.
- **duration:** `3–4 sec`
- **exact line:** «Подвижность бедра — только одна часть общей картины».
- **placement:** новый контекст поверх вырезки source 00:12–00:22.
- **composition:** условная анатомическая миниатюра таза в центре; шаровидная головка бедра движется внутри впадины; соседняя пояснично-тазовая конструкция реагирует минимально.
- **movement:** медленная дуга бедра; при ограничении дуги мягкое перераспределение движения выше, без красных зон и повреждений.
- **camera:** slow macro push-in, 16:9.
- **light:** soft controlled side light on dark graphite.
- **constraints:** anatomical relationships plausible but deliberately illustrative; no pathology, no labels.
- **final prompt:** `Premium dark documentary macro shot of an illustrative matte anatomical pelvis miniature, femoral head moving gently as a sphere within the hip socket, a limited arc subtly redistributing motion toward the adjacent pelvis and ribcage structure, graphite background, bone and brushed silver materials, soft side light, shallow depth of field, restrained cinematic movement, educational metaphor, anatomically plausible but visibly illustrative, no diagnosis, 16:9, 4 seconds`
- **negative prompt:** `medical diagnosis, pathology, inflammation glow, red pain area, x-ray, surgery, exact clinical claim, distorted pelvis, impossible joint motion, extra bones, neon, cartoon, horror, gore, glossy futuristic clinic, visual overload, text, logo, watermark, BIOMACHINE branding`
- **model / settings:** `VERIFY BEFORE USE`
- **output:** `20260729_mobilnost-taza_S01_v01.ext`
- **anatomy QA:** `OPEN — review by Evgeny before use`

## 🎞️ Scene S02 — серебряная нить системы

- **goal:** показать связь опоры, таза и грудной клетки как двигательную метафору.
- **duration:** `2–3 sec`
- **exact line:** «Сравните, где легче сохранить опору, дыхание и контроль таза».
- **placement:** перед итоговым CTA.
- **composition:** абстрактная мужская фигура без лица; стопа, таз и рёбра соединены одной тонкой серебряной нитью.
- **movement:** нить мягко натягивается снизу вверх при переносе веса; никаких магических эффектов.
- **camera:** slow lateral macro, 16:9.
- **light:** graphite, matte, cyan only as tiny endpoint accent.
- **constraints:** metaphor, not fascia map; no implication of a single anatomical chain causing symptoms.
- **final prompt:** `Premium restrained documentary visual metaphor, faceless matte male movement miniature on a graphite stage, one thin silver thread connecting foot support to pelvis and ribcage, the thread responds subtly during a slow weight shift, realistic gravity, soft side light, shallow depth of field, bone and brushed metal textures, minimal cyan accent at one endpoint, calm high-end wellness aesthetic, metaphorical not clinical, 16:9, 3 seconds`
- **negative prompt:** `literal fascia anatomy, magical energy, glowing meridians, diagnosis, pain markers, neon cyberpunk, cartoon, horror, gore, distorted body, extra limbs, text, logo, watermark, copied branding`
- **model / settings:** `VERIFY BEFORE USE`
- **output:** `20260729_mobilnost-taza_S02_v01.ext`
- **anatomy QA:** `OPEN`

## 🎞️ Scene S03 — контроль таза под нагрузкой

- **goal:** пояснить cue для моста/планки: движение прекращается до потери контроля.
- **duration:** `3–5 sec`
- **exact line:** «Качество положения важнее времени».
- **placement:** глава сегментарной планки около source 09:46–10:03.
- **composition:** матовая условная фигура в планке сбоку; таз и грудная клетка представлены двумя нейтральными блоками.
- **movement:** фигура выходит в устойчивую линию; начинает слегка терять положение и спокойно опускается, без красного «ошибочного» креста.
- **camera:** fixed side profile.
- **light:** dark graphite, soft rim, subtle grain.
- **constraints:** educational movement schematic; no perfect universal spinal alignment claim.
- **final prompt:** `Side-profile premium movement schematic of a matte male figure entering a controlled forearm plank, pelvis and ribcage represented by two subtle neutral orientation blocks, the figure reaches a stable position then calmly stops and lowers as control begins to change, graphite studio, soft rim light, restrained documentary style, anatomically plausible, no universal perfect posture claim, 16:9, 4 seconds`
- **negative prompt:** `red error cross, pain glow, medical claim, rigid perfect spine, distorted anatomy, extra limbs, impossible movement, neon, cartoon, horror, gore, gym commercial, text, logo, watermark`
- **model / settings:** `VERIFY BEFORE USE`
- **output:** `20260729_mobilnost-taza_S03_v01.ext`
- **anatomy QA:** `OPEN`

## 🧪 Реестр генераций

| Сцена | Нужна после rough cut? | Low-res | Выбор | Лицензия | Финал | Статус |
|---|---|---|---|---|---|---|
| S01 | Решить по ясности VO |  |  | VERIFY |  | HOLD |
| S02 | Скорее optional |  |  | VERIFY |  | HOLD |
| S03 | Только если cue не читается |  |  | VERIFY |  | HOLD |

## ⛔ STOP-GATE

- [x] У каждой сцены есть точная реплика, goal, duration и negative prompt.
- [x] Не более трёх сцен.
- [x] Указана анатомическая неопределённость.
- [ ] Rough cut показал реальную необходимость каждой сцены.
- [ ] Low-res tests проверены Евгением.
- [ ] Коммерческая лицензия и текущие модели SYNTX проверены.
- [ ] Финальный рендер утверждён.

## ✅ Утверждение

| Сцена | Решение | Кто | Дата | Комментарий |
|---|---|---|---|---|
| S01 | `APPROVE / REVISE / SKIP` | Евгений |  |  |
| S02 | `APPROVE / REVISE / SKIP` | Евгений |  |  |
| S03 | `APPROVE / REVISE / SKIP` | Евгений |  |  |

---

[← Монтажный бриф](./04_EDITING_BRIEF.md) · [SYNTX workflow](../../05_SYNTX_WORKFLOW.md)
