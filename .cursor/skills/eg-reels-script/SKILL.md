---
name: eg-reels-script
description: |
  Сценарии Reels Атмосфера 3D: хуки (batch), timed grid, retention spine,
  caption с одним CTA→анкета. Только HITL-черновики.
  Use when: /eg-producer reels; нужен сценарий/озвучка/caption Instagram Reels
  в тоне EG; beats→draft после eg-producer-studio brief.
  Do NOT use when: прогрев Stories/Direct (→ eg-warmup); SEO/blog brief
  (→ eg-seo-brief); Remotion/рендер; автопост; viral bait/FOMO; медобещания;
  YouTube CTA на eg.egoshev.ru.
disable-model-invocation: false
---

# eg-reels-script

Craft Reels EG: hook×3 → retention spine → timed grid → caption one-ask CTA.  
**Schema-first.** HITL STOP на beats и черновике. Не Remotion, не автопост.

## Роль

Reels craft operator: структурированные beats → speakable RU script → caption с одним CTA `https://eg.egoshev.ru/anketa`.

## Когда применять

**Triggers:** `/eg-producer reels` · сценарий/озвучка/caption · после studio brief.

**Не применять:** warmup → `eg-warmup`; SEO → `eg-seo-brief`; Remotion; автопост; FOMO/viral bait; медобещания; YouTube CTA на eg.egoshev.ru.

## Что читать

| Файл | Зачем |
|------|--------|
| studio `brief_yaml` | входные constraints |
| `.cursor/rules/atmosfera-3d.mdc` | бренд |
| `.cursor/rules/eg-news-brand-safety.mdc` | bans |
| `references/beat-schema.yaml.md` | schema-first beats |
| `references/hook-patterns.md` | EG-safe hooks ×3 |
| `references/retention-spine.md` | mid-roll / timed grid |
| `references/anti-bait.md` | FOMO / hashtag bans |
| `references/caption-cta.md` | caption + one CTA |

Optional formulas: `90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/30-content-formulas.mdc` (cite, не dump).

## L3 refs

`beat-schema.yaml.md` · `hook-patterns.md` · `retention-spine.md` · `anti-bait.md` · `caption-cta.md`

## Алгоритм

### 1. Load brief

Взять brief из `eg-producer-studio` / parent. Нет brief → запросить или минимальный stub + voice gate.

### 2. Emit beats YAML FIRST

Поля: `hook` · `tension` · `mechanism` · `what_to_do` · `result_feel` · `cta` · `duration_sec[]` · `channel: reels`.  
Хуки — batch из 3 EG-safe options (`hook-patterns.md`). **Не** prose до schema.

### 3. STOP — beats

Показать beats YAML.  
**STOP.** Ждать: «Утверждаю beats».

### 4. Prose script

После OK → RU speakable озвучка по spine + timed grid.

### 5. Caption + one CTA

Caption template + **один** CTA → `https://eg.egoshev.ru/anketa` (`caption-cta.md`).

### 6. Ban scan

`anti-bait.md` + brand bans. Fail → fix или `blocked_ban`.

### 7. Save draft

`published: false` → `90_ВХОДЯЩИЕ/producer-drafts/`.

### 8. STOP — draft

**STOP.** «Утверждаю черновик» → handoff `Task(kontent)` или ready.

## Выход

`beats_yaml` + `script_md_path` + `caption` + `cta` + `ban_scan_ok`

## Связи

| Что | Куда |
|-----|------|
| From | `/eg-producer` · `eg-producer-studio` |
| Polish | `Task(kontent)` |
| Soft CTA | `Task(prodazhi)` |
| Warmup next | `eg-warmup` |

## Запреты

- FOMO / deficit bait · viral bait  
- медобещания / «врач» / «тело мечты»  
- multi-CTA · hashtag spam · 👆  
- auto TG/VK · Remotion code  
- YouTube CTA → `eg.egoshev.ru`  
- prose before schema  
