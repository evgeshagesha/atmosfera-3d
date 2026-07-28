# t-800-prompt-auditor — eg-news-to-blog PATCH

**status:** ok  
**stage:** prompt_auditor  
**score:** 94  
**date:** 2026-07-29  
**artifacts:** skill `eg-news-to-blog`, commands `eg-news-to-blog` + `eg-news-approve`, rule `eg-news-brand-safety`, refs draft-schema + workflow (spot-check)

## Verdict

PASS → handoff `t-800-factory-auditor`. Critical checklist closed. No Description Trap, no `tools:` frontmatter, dual HITL + publish bans consistent across skill/commands/rule/refs.

## Critical checks (all pass)

| id | result | note |
|----|--------|------|
| description_trap | pass | description = routing + Use when / Do NOT; body = algorithm |
| use_when_do_not | pass | present in skill frontmatter |
| disable_model_invocation | pass | `true` on skill |
| content_mode | pass | author \| external \| mixed operational in skill + schema |
| provenance_claims_gaps | pass | required; unmapped/blocking → status ≠ ok |
| dual_hitl_phrases | pass | Gate1/Gate2 phrases in workflow + approve command |
| published_false | pass | explicit; normalizeBlogPost omit=true documented |
| no_publish_patch | pass | skill/commands never blog.json / TG/VK |
| social_rules | pass | one CTA; no 👆; no hashtag noise |
| no_tools_frontmatter | pass | none |
| progressive_disclosure | pass | SKILL 112L; details in refs; rule 25L |
| rule_brevity | pass | alwaysApply short brand-safety, not full pipeline |

## Warnings (non-blocking)

1. **typo:** `SKILL.md` description line «медpromises» → лучше `медобещания` / `medical promises`.
2. Commands без YAML frontmatter — норма для Cursor slash commands; тонкие роутеры ок.

## Repair budget (optional polish)

| file | fix |
|------|-----|
| `.cursor/skills/eg-news-to-blog/SKILL.md` | frontmatter: `медpromises` → `медобещания` |

## Handoff

```yaml
next: t-800-factory-auditor
summary: >
  Prompt QA PASS (94). Skill+commands+short rule consistent on content_mode,
  provenance/claims/gaps, dual hash HITL phrases, published:false, no blog.json
  in PATCH, social bans. Optional typo only.
```
