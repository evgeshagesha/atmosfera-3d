# Fix Pack: eg-news-to-blog-human-editorial-handoff

> Контракт: `shared/fix-pipeline-contract.md`  
> Mode: PATCH · surface: cursor-workspace

## goal

Сделать skill/commands/rule `eg-news-to-blog` человеческим редакционным пайплайном: `content_mode` author|external|mixed, provenance + claim_source_map + evidence_gap, два hash-bound HITL (статья → social preview), без автопубликации и без нового VK skill.

## surface

`cursor-workspace`

plugin_root:

```text
(empty — workspace .cursor/)
```

## files

- `.cursor/skills/eg-news-to-blog/SKILL.md`
- `.cursor/skills/eg-news-to-blog/references/brand-voice.md`
- `.cursor/skills/eg-news-to-blog/references/draft-schema.md`
- `.cursor/skills/eg-news-to-blog/references/workflow.md`
- `.cursor/skills/eg-news-to-blog/references/fewshots.md`
- `.cursor/skills/eg-news-to-blog/references/seo-clusters.md`
- `.cursor/skills/eg-news-to-blog/references/tone-bans.md`
- `.cursor/skills/eg-news-to-blog/assets/draft-frontmatter.template.md`
- `.cursor/commands/eg-news-to-blog.md`
- `.cursor/commands/eg-news-approve.md`
- `.cursor/rules/eg-news-brand-safety.mdc`

## changes

1. **SKILL.md** — content_mode ветки; SoT → `СТИЛЬ_СТАТЕЙ_БЛОГА.md`; provenance/claims/gaps; article_hash + social_hash STOP; skill never writes blog.json / never publishes.
2. **draft-schema.md + template** — новые обязательные поля схемы; `published: false` explicit; hash fields.
3. **workflow.md** — state machine ARTICLE_DRAFT → ARTICLE_APPROVED → SOCIAL_DRAFT → READY_FOR_PUBLISHER; dual HITL; dry-run note.
4. **brand-voice / tone-bans / seo-clusters / fewshots** — author preserve; external rewrite; mixed provenance; no finger emoji/hashtags; one CTA social.
5. **commands** — thin router + approve hash gates.
6. **rule** — short alwaysApply: modes + dual HITL + no skill publish.

## constraints

- Не трогать файлы вне `files`
- **НЕ** править `publish_blog_social.py` в этом прогоне (policy handoff only; gap в отчёте)
- Не трогать `feeds.yaml`, agents, hooks, MCP, registry, site code, TG→VK bridge
- Не создавать новый VK skill / Mini App
- research_mode: skip (LIGHT уже на Director)
- registry_patch: null

## research_mode

`skip`

## success_criteria

- [ ] Изменения только в listed files
- [ ] Все invariants из brief_for_factory выполнены в текстах артефактов
- [ ] prompt-auditor + factory-auditor PASS
- [ ] `python3 scripts/t800_run_gate.py --memory-path …` exit 0 (когда применимо)
- [ ] Acceptance checklist задокументирован; publisher gap отмечен
