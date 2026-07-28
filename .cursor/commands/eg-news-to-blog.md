# /eg-news-to-blog — редакционный draft + article_hash (HITL STOP)

Тонкий роутер на skill. Готовит черновик по `content_mode`. **STOP** на `article_hash`.  
**Не** пишет `blog.json`, **не** шлёт TG/VK, **не** деплоит.

## Сначала прочитай

1. `.cursor/skills/eg-news-to-blog/SKILL.md`
2. `01_ПРОЕКТЫ/P01_сайт_и_сервер/СТИЛЬ_СТАТЕЙ_БЛОГА.md` (SoT)
3. `references/tone-bans.md`
4. `references/brand-voice.md`
5. `references/draft-schema.md`
6. `references/seo-clusters.md`
7. `references/workflow.md`
8. `references/fewshots.md` (по необходимости)
9. `assets/draft-frontmatter.template.md`

## Маршрут

| Задача | Куда |
|--------|------|
| Draft + hashes STOP | **этот command / skill** |
| Dual hash-gates | `/eg-news-approve` |
| Publisher / blog.json | вне PATCH (publisher_gap) |
| Бот / сайт код | вне скоупа |
| Remotion / T-800 factory | вне скоупа |

## Шаги invoke

1. Follow SKILL.md  
2. Detect `content_mode`: `author` | `external` | `mixed`  
3. Structure SoT + provenance / claim_source_map / evidence_gap  
4. `published: false`; status gate  
5. Показать draft MD + `article_hash` + Gate1-фразу  
6. **STOP** — ждать `Утверждаю статью sha256:…` / `APPROVE DRAFT <hash>`  
7. После Gate1 (через approve): social_preview + `social_hash` → снова STOP  

## Выход

`draft_md_path` + `content_mode` + `article_hash` + `status` + checklist

## Запреты

- не писать `data/blog.json`  
- не слать TG/VK  
- не коммитить / не деплоить  
- не `published: true`  
- не обходить dual HITL
