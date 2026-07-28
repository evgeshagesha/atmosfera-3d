# /eg-news-approve — dual hash-gates ONLY (этот PATCH)

Только после явных Gate-фраз человека и пути draft из `/eg-news-to-blog`.  
**Этот PATCH не пишет `blog.json`.** Не шлёт TG/VK. Не деплоит.

## Предусловие

- Указан `draft_md_path`  
- `status: ok`  
- нет open blocking `evidence_gap` / unmapped claims  
- Правильная фраза Gate с **точным** hash  

Иначе — отказать и вернуть к `/eg-news-to-blog`.

## Сначала прочитай

1. `.cursor/skills/eg-news-to-blog/SKILL.md` (Approve)  
2. `references/draft-schema.md` (canonicalization + payloads)  
3. `references/workflow.md` (state machine)  
4. `references/tone-bans.md`  
5. SoT: `01_ПРОЕКТЫ/P01_сайт_и_сервер/СТИЛЬ_СТАТЕЙ_БЛОГА.md`

## Алгоритм — dual hash-gates

### Gate1 → ARTICLE_APPROVED

1. Recompute `article_hash` (UTF-8, NFC, LF, sorted compact JSON; exclude approvals/secrets/timestamps)  
2. Сверить с фразой: `Утверждаю статью sha256:…` / `APPROVE DRAFT <article_hash>`  
3. Match → state `ARTICLE_APPROVED`; разблокировать social_preview  
4. Mismatch / wrong order / `status ≠ ok` → **refuse**

### Gate2 → READY_FOR_PUBLISHER

1. Убедиться, что Gate1 уже пройден  
2. Recompute `social_hash` от payload: `article_hash`, `channel`, `text`, `cta_text`, `cta_url`  
3. Сверить: `Утверждаю social sha256:…` / `APPROVE SOCIAL <social_hash>`  
4. Match → `READY_FOR_PUBLISHER`  
5. Иначе → **refuse**

### После Gate2 (dry-run handoff)

Сообщить: draft path, оба hash, state `READY_FOR_PUBLISHER`.  
**publisher_gap:** `publish_blog_social.py` не патчился; запись сайта/соцсетей — отдельный контур.  
**Не** append в `blog.json`. **Не** MCP/send. **Не** deploy.

## Запреты

- запуск без Gate-фразы / с чужим hash  
- запись `blog.json` (этот PATCH)  
- auto Telegram / VK send  
- `published: true` / force live  
- Gate2 до Gate1  
- rewrite с нуля (это `/eg-news-to-blog`)  
- production deploy
