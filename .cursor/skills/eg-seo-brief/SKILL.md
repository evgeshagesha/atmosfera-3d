---
name: eg-seo-brief
description: |
  SEO-brief и money/blog copy-черновики EG в Cursor (HITL). Без правок
  кода сайта Wave2. CTA→анкета / продуктовая лестница.
  Use when: /eg-producer seo; бриф страницы/статьи; H1–H2 outline;
  meta title/description draft; cluster→CTA map.
  Do NOT use when: правка Next/site кода; publish blog.json; RSS news
  pipeline (→ eg-news-to-blog); Remotion; автопост; медобещания;
  verbatim full-text rewrite чужих статей без cite.
disable-model-invocation: false
---

# eg-seo-brief

SEO brief + on-page copy draft operator (**Cursor-only**).  
HITL brief → optional copy. **Нет** правок сайта / blog.json / TG/VK.

## Роль

Собрать SEO brief YAML и опциональный RU copy-draft с одним CTA → anketa / лестница.

## Когда применять

**Triggers:** `/eg-producer seo` · H1–H2 outline · meta drafts · cluster→CTA.

**Не применять:** Next/site code; publish `blog.json`; RSS news → `eg-news-to-blog`; Remotion; автопост; медобещания; verbatim full-text без cite.

## Что читать

| Файл | Зачем |
|------|--------|
| `01_ПРОЕКТЫ/P01_сайт_и_сервер/СТИЛЬ_СТАТЕЙ_БЛОГА.md` | SoT структура |
| `01_ПРОЕКТЫ/P01_сайт_и_сервер/SEO_KEYWORD_MAP.md` | keywords (cite) |
| `01_ПРОЕКТЫ/P01_сайт_и_сервер/SEO_ФУНДАМЕНТ.md` | фундамент |
| `.cursor/skills/eg-news-to-blog/references/seo-clusters.md` | cluster pattern |
| `.cursor/rules/atmosfera-3d.mdc` | бренд |
| `.cursor/rules/eg-news-brand-safety.mdc` | bans |
| `references/brief-schema.md` | YAML fields |
| `references/cluster-cta.md` | cluster→CTA |
| `references/meta-limits.md` | meta lengths |
| `references/bans-seo.md` | SEO bans |

## L3 refs

`brief-schema.md` · `cluster-cta.md` · `meta-limits.md` · `bans-seo.md`

## Алгоритм

### 1. Intent + cluster

Определить search intent + `seoCluster` (`cluster-cta.md` / eg-news seo-clusters).

### 2. Brief YAML

Поля: `slug` · `H1` · `H2[]` · `intent` · `proof` · `CTA` (`brief-schema.md`).

### 3. STOP — brief

**STOP.** Ждать: «Утверждаю brief».

### 4. Optional copy draft

Секции RU по SoT. Не keyword stuffing.

### 5. published: false

Явно в frontmatter черновика.

### 6. Save

→ `90_ВХОДЯЩИЕ/producer-drafts/`.

### 7. STOP — no site write

Не трогать Wave2 / Next / `blog.json`.

## Overlap

Social/blog **news** path → `eg-news-to-blog` (dual HITL). Не дублировать news pipeline здесь.

## Выход

`seo_brief_yaml` + `optional_draft_md` + `cta` + `status`

## Связи

| Что | Куда |
|-----|------|
| Invoke | `/eg-producer` |
| News editorial | `eg-news-to-blog` |
| Site implement | Wave2 Dev — **вне** pack |
| Polish | `Task(kontent)` optional |

## Запреты

- site/Next edits · blog.json · TG/VK  
- medical SEO bait · keyword stuffing  
- multi-CTA · verbatim full-text без cite  
- YouTube CTA → eg.egoshev.ru  
