# Fragment — t-800-factory-architect

**Topic:** eg-news-to-blog-human-editorial-handoff  
**As of:** 2026-07-29  
**Статус:** PASS  
**Агент:** t-800-factory-architect  
**Этап:** architect  
**mode:** PATCH  

---

## Сделано

- Решено: **artifact_type = skill** (+ companions command×2 + rule). NO new agent.
- Прочитаны fix-pack, factory-brief, SoT `СТИЛЬ_СТАТЕЙ_БЛОГА.md`, текущие 11 файлов scope.
- Спроектирован PATCH: `content_mode` author|external|mixed, provenance/claims/gaps, dual hash-bound HITL, skill never writes `blog.json`.
- `registry_patch: null` (workspace skill, unchanged).
- Publisher gap зафиксирован: `publish_blog_social.py` не в scope — policy-only.

## Артефакты (planned PATCH only)

- `.cursor/skills/eg-news-to-blog/SKILL.md`
- `.cursor/skills/eg-news-to-blog/references/{brand-voice,draft-schema,workflow,fewshots,seo-clusters,tone-bans}.md`
- `.cursor/skills/eg-news-to-blog/assets/draft-frontmatter.template.md`
- `.cursor/commands/eg-news-to-blog.md`
- `.cursor/commands/eg-news-approve.md`
- `.cursor/rules/eg-news-brand-safety.mdc`

## Explicitly unchanged

- `references/feeds.yaml`
- `publish_blog_social.py`
- agents / hooks / MCP / registry / site code / TG→VK bridge

## Handoff

```yaml
status: ok
stage: architect
mode: PATCH
handoff:
  summary: "PATCH-спека готова: editorial modes + dual HITL hashes; builder правит только listed files"
  next: t-800-factory-builder
registry_patch: null
```

## kb_usage

- `shared/fix-pipeline-contract.md`
- `shared/t-800-factory-contract.md`
- `shared/t-800-work-report-contract.md`
- SoT: `01_ПРОЕКТЫ/P01_сайт_и_сервер/СТИЛЬ_СТАТЕЙ_БЛОГА.md`

## Блокеры

- (пусто) — publisher gap = documented deferral, not architect BLOCKER
