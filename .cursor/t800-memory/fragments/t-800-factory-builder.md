# t-800-factory-builder — eg-news-to-blog-human-editorial-handoff

| Поле | Значение |
|------|----------|
| status | ok |
| stage | builder |
| mode | PATCH |
| date | 2026-07-29 |
| topic | eg-news-to-blog-human-editorial-handoff |

## files_written

1. `.cursor/skills/eg-news-to-blog/SKILL.md`
2. `.cursor/skills/eg-news-to-blog/references/brand-voice.md`
3. `.cursor/skills/eg-news-to-blog/references/draft-schema.md`
4. `.cursor/skills/eg-news-to-blog/references/workflow.md`
5. `.cursor/skills/eg-news-to-blog/references/fewshots.md`
6. `.cursor/skills/eg-news-to-blog/references/seo-clusters.md`
7. `.cursor/skills/eg-news-to-blog/references/tone-bans.md`
8. `.cursor/skills/eg-news-to-blog/assets/draft-frontmatter.template.md`
9. `.cursor/commands/eg-news-to-blog.md`
10. `.cursor/commands/eg-news-approve.md`
11. `.cursor/rules/eg-news-brand-safety.mdc`

## notes

- SoT cited: `СТИЛЬ_СТАТЕЙ_БЛОГА.md`
- Dual HITL hash gates; approve does NOT write blog.json (this PATCH)
- publisher_gap: `publish_blog_social.py` unchanged
- Untouched: feeds.yaml, agents, hooks, MCP, registry, site code

## handoff

next: `t-800-factory-integrator`  
summary: 11 editorial files patched; registry_patch null (workspace .cursor); integrator may skip registry if surface=cursor-workspace.
