# t-800-scout — Scout Report

**Date:** 2026-07-26  
**Workspace:** `/Users/egoshev/Projects/atmosfera-3d`  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**profile:** workspace-cursor  
**User task context:** EG OS + Content System + Customer Journey master docs → living KB / knowledge-intake folder (+ optional agents/skills for training-material digestion). Agents/skills NOT created by scout.

## Freshness

| Field | Value |
| --- | --- |
| `last_full_sync` | 2026-07-02 |
| `manifest_age_days` | 24 |
| `status` | fresh (< 30d) |
| `coverage_map.last_synced` | 2026-07-06 |
| `audit-coverage.sh` | Explicit=44 Grouped=0 **Missing=0** |
| `block_factory` | false |

## Sources checked (2026-07-26)

- https://cursor.com/changelog — OK
- https://cursor.com/docs — transient error page (fallback: topic URLs)
- https://cursor.com/docs/hooks — OK
- https://cursor.com/ru/docs/subagents — OK
- https://cursor.com/docs/models-and-pricing — OK
- https://cursor.com/docs/cloud-agent/automations — OK

## New findings (post–2026-07-02 sync)

1. **Cursor Router / Auto modes** (changelog Jul 22): Intelligence / Balance / Cost; Teams default on; admin allow/block lists; Grok 4.5 as price-efficient route. New docs URL likely `https://cursor.com/docs/cursor-router` — **not in manifest / KB cards**.
2. **Slack cloud agent** (Jul 17): plan-before-start, multi-repo environments, cross-channel read/post.
3. **Side chats + transcript search** (3.11 Jul 10): `/side`, `/btw`; Agents Window Cmd+K search — **not in KB**.
4. **Cloud conversation hooks** (Jul 10): `beforeSubmitPrompt`, `afterAgentResponse`, `afterAgentThought`, `stop`, `subagentStart` — present in live docs; partially listed in `13-agent-factory/hooks-and-scripts.md`; full cloud matrix + `sessionStart` cloud caveat should be re-synced.
5. **Models/pricing drift**: pools Cursor Models (Grok 4.5, Composer 2.5) vs Other Models; Claude Opus 5 / Fable 5 / Sonnet 5; GPT-5.6 Sol/Terra/Luna — pricing card stale vs live page.
6. **Automations surface growth**: Sentry + PagerDuty triggers, Bitbucket Cloud, Memories tool, Computer use — **no KB hits** for Sentry/PagerDuty/Bitbucket/Cursor Router/side chat.

## Subagents / hooks API (criticality)

- Frontmatter still: `name`, `description`, `model`, `readonly`, `is_background`.
- `model` supports params: `claude-opus-5[effort=high,context=300k]`.
- Hooks taxonomy unchanged in structure; cloud support matrix refined (no `sessionStart` on cloud).
- **No breaking change → `block_factory: false`.**

## Project signals (atmosfera-3d / EG)

- PARA already has `90_ВХОДЯЩИЕ/` (mixed: club-export + master prompts) and thin `03_РЕСУРСЫ/`.
- Need dedicated **knowledge-intake** lane for EG OS / Content System / Customer Journey packages — separate from club HTML dumps and from curated `03_РЕСУРСЫ`.
- Goal: later analyze what sells → spawn products (Authority/Utility/Proof/Offer Bridge).

## Recommendations

### Next: `Task(t-800-brain-lead)`

Pass this scout_report. Ask brains (context + agents + tools as needed) for:
- PARA placement of knowledge-intake vs `90_ВХОДЯЩИЕ` vs `03_РЕСУРСЫ`
- Rule vs skill vs agent surface for intake + digestion
- Readonly constraints for training-material analysts

### Also: `Task(t-800-research-lead)` — LIGHT→DEEP if strategist expands

Topic: living knowledge vault + training-material digestion patterns (Notion/PARA capture routers, Cursor rules/skills for classify→summarize→product-seed).  
Reason: product-system design, not Cursor API break; marketplace patterns useful for factory brief.

### Maintainer (non-blocking)

`Task(t-800-maintainer)` or `/t800-update` queue: Cursor Router, side chats, models pools, automations Sentry/PagerDuty — before age hits 30d (~Jul 31).

### Factory brief seed (for parent → factory, NOT scout)

```yaml
slug: eg-knowledge-intake
goal: >
  Dedicated folder + optional skill/agent for EG master docs & training
  materials → classify, summarize, extract product/content seeds.
surface: cursor-workspace (atmosfera-3d)
avoid: inventing medical claims; cluttering 90_ВХОДЯЩИЕ with untyped dumps
optional_artifacts:
  - rule or capture protocol for intake taxonomy
  - skill: classify/summarize training pack
  - agent (readonly): digest learning material → product hypotheses
```

## scout_report YAML

```yaml
scout_report:
  memory_path: /Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory
  manifest_age_days: 24
  status: fresh
  audit_coverage:
    explicit: 44
    missing: 0
  new_findings:
    - Cursor Router Auto Cost/Balance/Intelligence (Jul 22) — missing from KB
    - Side chats + transcript search (Jul 10) — missing from KB
    - Slack multi-repo / plan-first (Jul 17)
    - Models pool + Claude 5 / GPT-5.6 / Grok 4.5 pricing drift
    - Automations: Sentry, PagerDuty, Bitbucket, Memories — KB gaps
  recommended_research: true
  recommended_maintainer: true  # soft; age < 30 but changelog drift high
  block_factory: false
  next:
    - t-800-brain-lead
    - t-800-research-lead  # knowledge-intake / PARA / digest patterns
  user_task_hint: eg-knowledge-intake folder + optional digest agents/skills
```
