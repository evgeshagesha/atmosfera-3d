# Draft schema — eg-news-to-blog (editorial + dual HITL)

## Цель

Черновик MD/YAML → human dual HITL (article → social) → позже publisher / сайт.  
Skill и `/eg-news-approve` (этот PATCH) **не** пишут `blog.json`.

SoT стиля: `01_ПРОЕКТЫ/P01_сайт_и_сервер/СТИЛЬ_СТАТЕЙ_БЛОГА.md`  
Types (когда publisher пишет сайт): `blog-types.ts`, `article-blocks.ts`

## CRITICAL: published default

```ts
published: raw.published !== false
```

Omit `published` → **true** (`normalizeBlogPost`).  
Любой draft **обязан** явно ставить `published: false`.

## Frontmatter

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `content_mode` | enum | yes | `author` \| `external` \| `mixed` |
| `status` | enum | yes | `ok` \| `refuse_medical` \| `needs_source` \| `needs_human_clinical_review` \| `blocked_evidence` |
| `id` | string | yes | обычно = slug |
| `slug` | string | yes | `[a-z0-9]+(?:-[a-z0-9]+)*`, ≤64 |
| `title` | string | yes | RU |
| `excerpt` | string | yes | ≤220 chars ideal |
| `image` | string | no | живое фото EG; default site if empty |
| `category` | string | no | узкая RU-тема |
| `published` | boolean | **yes** | always `false` until human flips in admin |
| `publishedAt` | ISO string | yes | draft timestamp ok |
| `updatedAt` | ISO string | yes | |
| `seoCluster` | enum | yes | see seo-clusters.md |
| `citations` | array | yes | `{ title, url, date?, feed_id? }` — external/mixed; author может быть `[]` |
| `source_url` | string | cond | обязателен для `external`; для `mixed` — primary external URL |
| `cta` | string | yes | soft Offer Bridge (статья) |
| `provenance` | object | yes | см. ниже |
| `sections` | array | yes | `{ id, heading?, origin }` |
| `claim_source_map` | array | yes | каждый claim → source |
| `evidence_gap` | array | yes | gaps; blocking → status ≠ ok |
| `article_hash` | string | yes* | sha256 hex после canonicalize (*после сборки тела) |
| `social_preview` | object | no* | после Gate1 (*обязателен перед Gate2) |
| `social_hash` | string | no* | после social_preview |
| `approvals` | object | no | **исключён из hashes** |

### provenance

```yaml
provenance:
  author_blocks: []      # section ids / ranges — голос EG
  external_blocks: []    # section ids — факты/источник
  notes: ""              # кратко: что сохранено / что rewrite
```

### sections[].origin

`author` \| `external` \| `eg_interpretation` \| `mixed`

### claim_source_map

```yaml
claim_source_map:
  - claim: "краткая формулировка факта"
    source_url: "https://…"
    source_title: "…"
    date: "YYYY-MM-DD"
    section_id: "mechanism"
```

Unmapped claim → **blocking** → `status` cannot be `ok` (обычно `blocked_evidence` / `needs_source`).

### evidence_gap

```yaml
evidence_gap:
  - id: "gap-1"
    description: "…"
    blocking: true   # true → status ≠ ok
    resolution: ""   # пусто пока open
```

Open `blocking: true` → `status` cannot be `ok`.

## Body → ContentBlock[] (для будущего publisher)

| MD pattern | ContentBlock |
|------------|--------------|
| paragraph | `{ type: "text", value }` |
| `##` / `###` | `{ type: "heading", level: 2\|3, value }` |
| `-` / `1.` list | `{ type: "list", ordered, items[] }` |
| `>` quote | `{ type: "quote", value }` |
| image | `{ type: "image", url, alt? }` — sparingly |

Структура тела (SoT): хук · механизм · разбор · источник · вывод · CTA.  
Cite: paragraph с title + URL (не копипаст статьи).

## article_hash payload

Поля **в hash** (только эти):

`content_mode`, `title`, `excerpt`, `category`, `body`, `provenance`, `sections`, `claim_source_map`, `evidence_gap`, `citations`, `cta`

**Исключить:** `approvals`, secrets, `publishedAt` / `updatedAt` / любые timestamps, `article_hash`, `social_*`, `id`/`slug` опционально вне payload (slug не в hash-списке architect — не включать).

## social_preview + social_hash

```yaml
social_preview:
  channel: telegram   # telegram | vk_note — preview only
  text: "…"
  cta_text: "…"
  cta_url: "https://…"
```

**social_hash payload:** `article_hash`, `channel`, `text`, `cta_text`, `cta_url`

Правила social: **один** CTA; без 👆; без хэштег-шума.

## approvals (не в hash)

```yaml
approvals:
  article:
    phrase: ""
    hash: ""
    at: ""
  social:
    phrase: ""
    hash: ""
    at: ""
```

## Canonicalization

1. UTF-8  
2. Unicode NFC  
3. LF (`\n`)  
4. Compact JSON, keys sorted recursively (JCS-like)  
5. Exclude secrets / `approvals` / timestamps  

`article_hash` / `social_hash` = `sha256(canonical_bytes).hexdigest`

## Blocking → status

| Условие | status |
|---------|--------|
| медобещание / клиника | `refuse_medical` / `needs_human_clinical_review` |
| нет URL внешнего факта | `needs_source` |
| unmapped claim или open blocking gap | `blocked_evidence` (или `needs_source`) |
| всё закрыто, bans clean | `ok` |

`status ≠ ok` → Gate1/Gate2 отказать.

## Target BlogPost shape (будущий publisher — не этот PATCH)

```json
{
  "id": "slug",
  "slug": "slug",
  "title": "…",
  "excerpt": "…",
  "image": "/assets/…",
  "category": "…",
  "content": [],
  "published": false,
  "publishedAt": "ISO",
  "updatedAt": "ISO"
}
```

## Template

`assets/draft-frontmatter.template.md`
