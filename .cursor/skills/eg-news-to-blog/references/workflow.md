# Workflow — eg-news-to-blog dual HITL

SoT: `01_ПРОЕКТЫ/P01_сайт_и_сервер/СТИЛЬ_СТАТЕЙ_БЛОГА.md`

## State machine

```text
ARTICLE_DRAFT
    → (human Gate1: article_hash)
ARTICLE_APPROVED
    → (operator: social_preview + social_hash)
SOCIAL_DRAFT
    → (human Gate2: social_hash)
READY_FOR_PUBLISHER
    → (вне этого PATCH: publisher / admin)
```

| State | Что готово | Что запрещено |
|-------|------------|---------------|
| `ARTICLE_DRAFT` | draft MD + `article_hash` | social approve, publish |
| `ARTICLE_APPROVED` | Gate1 verified | publish; social без нового hash |
| `SOCIAL_DRAFT` | `social_preview` + `social_hash` | Gate2 без match |
| `READY_FOR_PUBLISHER` | оба hash OK | skill/approve **не** пишут blog.json в этом PATCH |

## Gate phrases (точный match hash)

**Gate1 (статья):**

- `Утверждаю статью sha256:<article_hash>`
- или `APPROVE DRAFT <article_hash>`

**Gate2 (social):**

- `Утверждаю social sha256:<social_hash>`
- или `APPROVE SOCIAL <social_hash>`

Отказ: mismatch hash · wrong order · `status ≠ ok` · open blocking `evidence_gap` · unmapped claim.

## Commands

| Command | Делает | Не делает |
|---------|--------|-----------|
| `/eg-news-to-blog` | detect mode → draft + provenance/claims → `article_hash` → **STOP** | `blog.json`, TG/VK send, deploy, auto Gate |
| `/eg-news-approve` | dual hash-gates only → state advance | rewrite с нуля; `blog.json` (этот PATCH); `published: true`; auto TG/VK |

После Gate1 команда approve может **разблокировать** шаг social (оператор готовит preview через to-blog или тот же сеанс) — но запись сайта/соцсетей не выполняется.

## publisher_gap

`01_ПРОЕКТЫ/P02_бот_telegram/bot/publish_blog_social.py` **не** патчится в этом прогоне.  
Hash-binding — policy-level до отдельного PATCH (eg-bot-engineer).  
`READY_FOR_PUBLISHER` = dry-run handoff: пути draft + hashes + note «publisher gap».

## Checklist (показать пользователю)

### Статья
- [ ] `content_mode` верный (author / external / mixed)  
- [ ] author: голос сохранён; external: rewrite+cite; mixed: provenance по блокам  
- [ ] SoT-структура: хук → механизм → разбор → источник → вывод → CTA  
- [ ] `provenance`, `sections[].origin`, `claim_source_map`, `evidence_gap` заполнены  
- [ ] нет unmapped claims / open blocking gaps  
- [ ] нет медобещаний / диагнозов / «вылечим»  
- [ ] `published: false` явно  
- [ ] `status: ok`  
- [ ] `article_hash` показан; ждать Gate1-фразу  

### Social (после Gate1)
- [ ] один CTA; без 👆; без хэштег-шума  
- [ ] `social_hash` привязан к `article_hash`  
- [ ] ждать Gate2-фразу  
- [ ] **не** send TG/VK из approve  

## Пути артефактов

| Артефакт | Куда |
|----------|------|
| Digest (external) | `90_ВХОДЯЩИЕ/eg-news-digest/` |
| Draft MD | `90_ВХОДЯЩИЕ/eg-news-drafts/` |
| Blog JSON | только будущий publisher / admin — **не** этот PATCH |
| Outbound site RSS | `/rss.xml` (не путать с inbound feeds) |

## Fail soft

- medical risk → `refuse_medical`, STOP  
- missing source → `needs_source`  
- blocking evidence → `blocked_evidence`  
- hash mismatch → refuse Gate, вернуться к draft
