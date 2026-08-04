---
name: eg-producer-studio
description: |
  Роутер продюсер-пака Атмосфера 3D: голос, столпы, календарь идей,
  репурпозинг brief → выбор craft-skill. HITL-черновики только.
  Use when: /eg-producer studio|calendar|repurpose; нужен voice gate,
  pillars, недельный план, маршрутизация в reels/warmup/seo.
  Do NOT use when: писать полный Reels-сценарий (→ eg-reels-script);
  прогрев Stories/Direct (→ eg-warmup); SEO money-page (→ eg-seo-brief);
  автопост TG/VK; правка сайта; Remotion; T-800 factory; медобещания.
disable-model-invocation: false
---

# eg-producer-studio

Роутер продюсер-пака EG: voice → pillars → calendar/repurpose brief → route в craft-skill.  
**HITL only.** Skill не публикует, не шлёт TG/VK, не правит сайт.

## Роль

Voice/pillars/calendar/repurpose router для Атмосфера 3D. Zero-Copy: **cite** SoT-пути, не копировать эссе MASTER/ToV в тело.

## Когда применять

**Triggers:** `/eg-producer studio|calendar|repurpose` · voice gate · pillars · недельный план · маршрут в reels/warmup/seo.

**Не применять:** полный Reels-сценарий → `eg-reels-script`; Stories/Direct → `eg-warmup`; SEO money-page → `eg-seo-brief`; автопост; сайт; Remotion; factory; медобещания.

## Что читать

| Файл | Зачем |
|------|--------|
| `.cursor/rules/atmosfera-3d.mdc` | бренд, запреты, тон |
| `.cursor/rules/eg-news-brand-safety.mdc` | content_mode / social bans |
| `00_ПУЛЬТ_УПРАВЛЕНИЯ/ГЛАВНЫЙ_КОНТЕКСТ.md` | лестница, контекст |
| `03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/01_EG_OS_БРЕНД/TRAINING_SYSTEM_POSITIONING_MASTER.md` | ось позиционирования (читать, не paste) |
| `03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/01_EG_OS_БРЕНД/OWNERSHIP_MAP.md` | ownership |
| `references/voice-gate.md` | чеклист голоса vs bans |
| `references/pillars.md` | столпы контента |
| `references/calendar-schema.md` | YAML календаря |
| `references/repurpose-map.md` | source→formats |
| `references/cta-matrix.md` | one-ask CTA rail |

## L3 refs

`references/voice-gate.md` · `pillars.md` · `calendar-schema.md` · `repurpose-map.md` · `cta-matrix.md`

## Алгоритм

### 1. Detect mode

`studio` | `calendar` | `repurpose` — из `/eg-producer` args или запроса.

### 2. Voice gate

Сверить тон EG vs bans (`voice-gate.md` + brand rules). Ban hit → `status: blocked_ban`. Неясный голос → `needs_voice`.

### 3. Emit brief YAML

Структурированный brief: mode, pillar, audience, format, CTA_level, intent, recommended_skill.  
Календарь — по `calendar-schema.md`. Repurpose — по `repurpose-map.md`.

### 4. Route

| Цель | Skill |
|------|--------|
| Reels сценарий | `eg-reels-script` |
| Stories/Direct nurture | `eg-warmup` |
| SEO / money-page brief | `eg-seo-brief` |

Не писать полный сценарий в этом skill.

### 5. STOP — brief

Показать brief YAML + draft path.  
**STOP.** Ждать: «Утверждаю brief».

### 6. Drafts path

Черновики только в `90_ВХОДЯЩИЕ/producer-drafts/`. Явно `published: false`.

## Выход

`brief_yaml` + `recommended_skill` + `draft_path` + `status: ok|needs_voice|blocked_ban`

## Связи

| Что | Куда |
|-----|------|
| Invoke | `/eg-producer` · `/продюсер` |
| Handoff craft | `eg-reels-script` · `eg-warmup` · `eg-seo-brief` |
| После beats | `Task(kontent)` |
| CTA soft | `Task(prodazhi)` |
| Brand | `atmosfera-3d` · `eg-news-brand-safety` |

## Запреты

- автопост TG/VK · publish blog.json · правка сайта  
- медобещания / «врач»-claim / anti-gym / «тело мечты» / FOMO  
- multi-CTA · 👆 · хэштег-шум  
- YouTube CTA → `eg.egoshev.ru`  
- monolith full scripts в studio  
- paste MASTER/ToV эссе (Zero-Copy)  
- Description Trap: pipeline только в body, не в description  
