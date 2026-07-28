---
name: eg-news-to-blog
description: |
  Редакционный пайплайн EG для авторских, внешних и смешанных материалов:
  подготовка статьи, проверка источников и два последовательных HITL.
  Use when: /eg-news-to-blog; подготовка или редактура статьи EG; RSS→rewrite; author text polish.
  Do NOT use when: автопубликация; Mini App; отдельный VK-пайплайн; медобещания / «вылечим»;
  правка сайта или Telegram-бота; publish_blog_social.py; Remotion; T-800 factory; full-text репаблиш.
disable-model-invocation: true
---

# eg-news-to-blog

Редакционный оператор EG: `content_mode` → структура SoT → provenance/claims → **два HITL по hash** → STOP.  
Skill **никогда** не пишет `blog.json`, не шлёт TG/VK, не деплоит.

## Роль

Human editorial operator EG: подготовить черновик статьи и social preview; остановиться на hash-gates.

## Когда применять

**Triggers:** `/eg-news-to-blog` · редактура авторского текста · RSS→rewrite · polish author copy.

**Не применять:** автопубликация; Mini App; отдельный VK-пайплайн; «вылечим»; правка сайта/бота; `publish_blog_social.py`; Remotion; T-800 factory; full-text репаблиш.

## Что читать

| Файл | Зачем |
|------|--------|
| `01_ПРОЕКТЫ/P01_сайт_и_сервер/СТИЛЬ_СТАТЕЙ_БЛОГА.md` | **SoT** структуры, режимов, CTA, SEO |
| `references/tone-bans.md` | запреты тона / social |
| `references/brand-voice.md` | author / external / mixed |
| `references/draft-schema.md` | frontmatter, hashes, evidence |
| `references/seo-clusters.md` | cluster → CTA |
| `references/workflow.md` | state machine + dual HITL |
| `references/fewshots.md` | good/bad по режимам |
| `assets/draft-frontmatter.template.md` | шаблон черновика |
| `references/feeds.yaml` | allowlist (только external ingest) |

Детали schema/workflow — в references; SKILL держит маршрут коротким.

## Алгоритм

### 1. Detect `content_mode`

| Mode | Действие |
|------|----------|
| `author` | preserve голос EG; только структура, пунктуация, OCR; факт-правки → `evidence_gap` |
| `external` | независимый RU rewrite + cite (title, URL, date); **нет** verbatim full-text |
| `mixed` | provenance на каждый смысловой блок; факт vs интерпретация EG |

### 2. Structure (SoT)

Хук → механизм → разбор (H2) → источник → вывод → CTA.  
Признаки человеческого текста — SoT + `brand-voice.md`.

### 3. Provenance + claims + gaps

Обязательны: `provenance`, `sections[].origin`, `claim_source_map`, `evidence_gap`.  
Unmapped claim **или** open blocking gap → `status` ≠ `ok`.

### 4. Status gate

`ok` \| `refuse_medical` \| `needs_source` \| `needs_human_clinical_review` \| `blocked_evidence`  
Черновик: **`published: false`** явно.

### 5. `article_hash` → STOP

Канонический hash полей статьи (`draft-schema.md`). Показать draft + hash + gate-фразу.  
**STOP.** Не social, не approve, не publish.

### 6. После Gate1 → `social_preview` + `social_hash` → STOP

Один CTA; без 👆 и хэштег-шума. Второй STOP до Gate2.

### 7. NEVER publish from skill

Нет `blog.json` / TG send / VK / deploy. Publisher: отдельный контур (`publish_blog_social.py` — gap, не этот skill).

## Approve (только `/eg-news-approve`)

Dual hash-gates: статья → social.  
**Этот skill не пишет `blog.json`.** Approve-команда в текущем PATCH — только verify hashes / state; запись publisher — вне скоупа.

## Выход

`draft_md_path` + `content_mode` + `article_hash` (+ позже `social_hash`) + `status` + checklist

## Связи

| Что | Куда |
|-----|------|
| Invoke | `/eg-news-to-blog` |
| Dual HITL | `/eg-news-approve` |
| Brand safety | rule `eg-news-brand-safety` |
| SoT | `СТИЛЬ_СТАТЕЙ_БЛОГА.md` |

## Запреты

- медобещания / диагнозы / «вылечим» / секретный метод  
- rewrite голоса author «как будто лучше»  
- auto-publish blog / TG / VK  
- `published: true` из skill  
- claim без источника при `status: ok`  
- social: multi-CTA, 👆, хэштег-шум  

## Как вызвать

- Slash: `/eg-news-to-blog` → draft + `article_hash` STOP  
- Approve: `/eg-news-approve` (только после hash-фраз человека)  
- Не ambient: `disable-model-invocation: true`
