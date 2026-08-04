---
name: eg-warmup
description: |
  Прогрев HITL: последовательность Reels→Stories→Direct (nurture) для
  Атмосфера 3D. Черновики касаний + soft bridge к анкете.
  Use when: /eg-producer warmup; серия Stories после Reels; директ-прогрев
  до заявки; nurture 3–7 касаний без автопоста.
  Do NOT use when: полный Reels-сценарий с нуля (→ eg-reels-script);
  SEO (→ eg-seo-brief); авторассылка TG/VK; давление/дефицит; медобещания;
  правки бота (→ eg-bot-*).
disable-model-invocation: false
---

# eg-warmup

Nurture sequence drafter: Reels→Stories→Direct→anketa.  
HITL map + drafts. Без автоотправки, без давления на каждом касании.

## Роль

Собрать touch map и черновики касаний с CTA levels `none` | `curiosity` | `soft_ask`. Финальный soft CTA → `https://eg.egoshev.ru/anketa`.

## Когда применять

**Triggers:** `/eg-producer warmup` · Stories после Reels · Direct nurture 3–7 касаний.

**Не применять:** полный Reels с нуля → `eg-reels-script`; SEO → `eg-seo-brief`; авторассылка; FOMO; медобещания; бот-код → `eg-bot-*`.

## Что читать

| Файл | Зачем |
|------|--------|
| studio brief (+ reels draft if any) | вход |
| `.cursor/rules/atmosfera-3d.mdc` | бренд |
| `.cursor/rules/eg-news-brand-safety.mdc` | bans |
| `references/touch-map.md` | YAML sequence |
| `references/stories-beats.md` | Stories templates |
| `references/direct-soft.md` | Direct frames |
| `references/ladder-bridge.md` | продукт soft bridge |

## L3 refs

`touch-map.md` · `stories-beats.md` · `direct-soft.md` · `ladder-bridge.md`

## Алгоритм

### 1. Goal + audience stage

Цель nurture + стадия (cold / warm / ready).

### 2. Emit touch YAML

Поля: `day` · `channel` · `beat` · `CTA_level` (`touch-map.md`).

### 3. STOP — map

Показать map.  
**STOP.** Ждать: «Утверждаю brief» (map = brief-equivalent).

### 4. Draft touches

Каждое касание — RU draft (`stories-beats` / `direct-soft`).

### 5. Soft CTA rail

Один soft CTA→anketa **в конце** последовательности; не hard close на каждом touch.

### 6. Ban scan

Нет spam cadence · FOMO timers · medical · multi-product dump.

### 7. Save

`published: false` → `90_ВХОДЯЩИЕ/producer-drafts/`.

### 8. STOP

Ждать утверждения черновика / handoff `Task(kontent)` · `Task(prodazhi)`.

## CTA levels

| Level | Использование |
|-------|----------------|
| `none` | доверие / наблюдение |
| `curiosity` | интерес без URL-давления |
| `soft_ask` | один CTA anketa |

## Выход

`touch_map_yaml` + `drafts_dir` + `final_cta` + `status`

## Связи

| Что | Куда |
|-----|------|
| Invoke | `/eg-producer` |
| Polish | `Task(kontent)` |
| Objections / Direct | `Task(prodazhi)` |
| Reels source | `eg-reels-script` |

## Запреты

- auto-send TG/VK · spam cadence  
- medical · FOMO timers · multi-product dump  
- multi-CTA · hard close каждый touch  
- bot code edits  
