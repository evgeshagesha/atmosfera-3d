# Fragment — t-800-factory (PATCH)

**Topic:** eg-news-to-blog-human-editorial-handoff  
**As of:** 2026-07-29  
**mode:** PATCH  
**status:** ok · ship  
**surface:** cursor-workspace  
**registry_patch:** null

## Pipeline

architect → builder → integrator → prompt-auditor (94) → auditor → t800_run_gate EXIT 0

## Files changed (11)

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

## Untouched (explicit)

- `feeds.yaml`
- `publish_blog_social.py` (**publisher_gap**)
- TG→VK bridge, agents, hooks, MCP, registry, site code

## Decision

`ship` — dual HITL policy in Cursor artifacts; machine hash enforcement in publisher deferred.
