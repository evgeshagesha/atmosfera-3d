# t-800-scout — Scout Report

**Date:** 2026-08-04  
**Workspace:** `/Users/egoshev/Projects/atmosfera-3d`  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**artifact_surface:** cursor-workspace  
**profile:** producer-pack MVP (skills + 1–2 subagents + 1 command)

**User task context:** Удобный контур продвижения личного бренда Евгения / Атмосфера 3D + запись через сайт (`eg.egoshev.ru` / `anketa`). Курируемый набор паттернов (не mass-download GitHub). Boundary: Dev = Wave2 money pages + VK autopost; T-800 = только `.cursor/` artifacts. HITL: drafts OK, no auto-publish TG/VK/blog. Models: inherit_chat.

**Scout scope:** Cursor docs freshness vs plugin KB; skills/subagents/hooks API break check; gap map vs existing `.cursor/` producer-adjacent artifacts.  
**Artifacts NOT created:** no factory-briefs, no site edits, no agents/skills/commands/rules.

---

## Freshness

| Field | Value |
| --- | --- |
| Plugin KB | `~/.cursor/plugins/local/t-800-agent/knowledge-base/` |
| `last_full_sync` | 2026-07-02 |
| `manifest_age_days` | **33** |
| `status` | **stale** (>30d) |
| `coverage_map.last_synced` | 2026-07-06 |
| `audit-coverage.sh` | Explicit=44 Grouped=0 **Missing=0** |
| `block_factory` | **false** |
| `recommended_research` | **true** |
| `research_mode` | **DEEP** |
| `skills_needed` | **true** |

> 💡 Threshold: >30d → stale + recommend `Task(t-800-maintainer)` (после или параллельно DEEP; не блокирует research/factory). Missing=0 — покрытие URL в карте OK; проблема = возраст raw sync, не дыры coverage map.

---

## Sources checked (2026-08-04)

| URL | Result |
| --- | --- |
| https://cursor.com/changelog | OK — latest **Aug 3** Google Workspace plugins |
| https://cursor.com/docs/models | OK (via models page / models-and-pricing) |
| https://cursor.com/docs/skills.md | OK — frontmatter stable |
| https://cursor.com/docs/hooks.md | OK — events additive; cloud caveats unchanged |
| https://cursor.com/docs/subagents.md | OK — fields stable (+ model params syntax) |
| https://cursor.com/llms.txt | OK — new model pages + plugins + approval-agents |
| https://cursor.com/docs (HTML) | Transient/404 shell on some HTML fetches; **`.md` endpoints OK** |

---

## New findings (post–2026-07-02 sync)

1. **Google Workspace plugins** (changelog **Aug 3**) — Drive/Gmail/Calendar/Docs/Sheets for agents. Optional for HITL SEO copy later; **out of MVP producer pack** unless research finds clear win. Not factory-blocking.
2. **Cursor for iPad + Inbox** (Jul 29) — mobile/review UX; irrelevant to `.cursor/` artifact design.
3. **Cursor Start India** (Jul 28) — pricing/geo only.
4. **Cursor Router** (Jul 22) — Auto Cost/Balance/Intelligence; page `/docs/cursor-router` still **not in manifest** as dedicated URL (prior scout already flagged).
5. **Slack cloud agent** (Jul 17) — plan-before-start, multi-repo — irrelevant to this brief.
6. **Models:** Cursor Models (Grok 4.5, Composer 2.5) vs Other Models; GPT-5.6 Sol/Terra/Luna pages in llms.txt. Intake = `inherit_chat` → no model pin required.
7. **Skills (live `.md`):** dirs `.cursor/skills/`, `.agents/skills/` (+ nested + monorepo scoped); frontmatter `name`, `description`, optional `paths`, `disable-model-invocation`, `metadata`; legacy `globs` fallback. Nested category folders OK. `/migrate-to-skills` still present.
8. **Subagents (live):** `name`, `description`, `model` (`inherit` \| id + `[effort=…,context=…,fast=…]`), `readonly`, `is_background`. No required-field removals.
9. **Hooks (live):** cloud-supported set includes `preToolUse`/`postToolUse`/`subagentStart`/`beforeSubmitPrompt`/`afterAgentResponse`/`stop` etc.; `sessionStart` deferred on cloud. Additive vs prior KB cards (last_synced 2026-07-06).
10. **llms.txt gaps vs manifest:** `plugins`, `approval-agents`, per-model pages, Microsoft Teams/Jira/Notion/GitLab integrations — maintainer queue, not API break.

### Criticality for factory APIs

- No removed required subagent / skills / hooks fields.
- New hooks/plugins are additive.
- → **`block_factory: false`**

---

## Skills needed? **YES**

Intake already targets several producer skills. Gap vs existing workspace:

| Existing | Role | Scout note |
| --- | --- | --- |
| `.cursor/agents/kontent.md` | IG/TG/Reels content | Thin agent — candidate **EXTEND** or skill-backed |
| `.cursor/agents/prodazhi.md` | Direct / anketa / objections | Thin agent — CTA → `/anketa` align |
| `eg-news-to-blog` skill + commands | News→blog HITL | Reuse brand-safety / dual HITL patterns; **do not** invent TG/VK autopost |
| Remotion / Mediabunny skills | Video render | Out of producer MVP unless research scopes video pack |
| `eg-knowledge-outline`, `eg-bot-*` | Method / bot | Adjacent; not core promo loop |

**Missing for goal:** curated producer skills (promo calendar / channel pack / SEO copy HITL / booking CTA rail) + 1 command orchestration + 1–2 subagents — without touching site Wave2 or VK autopost code.

---

## Research handoff (parent → research-lead DEEP)

```yaml
research_brief_hints:
  mode: DEEP
  goal: curated producer MVP patterns (not mass GitHub download)
  surfaces:
    - skills (several)
    - subagents: 1-2
    - command: 1
  constraints:
    - readonly: mixed_HITL  # drafts OK; no auto-publish TG/VK/blog
    - boundary: T-800 owns .cursor/ only; Dev owns Wave2 money pages + VK autopost
    - CTA_rail: brand promo → site booking (eg.egoshev.ru / anketa)
    - reuse: kontent, prodazhi, eg-news-to-blog HITL patterns
  compare:
    - skill-first vs agent-first for producer loop
    - EXTEND kontent/prodazhi vs CREATE thin new pair
    - ClawHub/community patterns for personal-brand promo packs (curated ≤N)
  out_of_scope:
    - site-next money page code
    - VK/TG autopost implementation
    - mass-clone GitHub skill dumps
```

**Next for parent:** `Task(t-800-research-lead)` with this scout_report + intake_brief.  
**Deferred:** `Task(t-800-maintainer)` for KB sync (stale 33d) — after DEEP or parallel, not blocking factory start once brain returns.  
**Factory:** not yet — await research → prompt-craft? → brain-lead → factory.

---

## scout_report (machine)

```yaml
scout_report:
  date: "2026-08-04"
  workspace: "/Users/egoshev/Projects/atmosfera-3d"
  memory_path: "/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory"
  intake_ref: producer-pack-MVP
  manifest_age_days: 33
  last_full_sync: "2026-07-02"
  status: stale
  audit_coverage:
    explicit: 44
    grouped: 0
    missing: 0
  skills_needed: true
  new_findings:
    - "Aug 3 Google Workspace plugins (Drive/Gmail/Calendar/Docs/Sheets) — optional later HITL"
    - "Jul 29 iPad + Inbox — ignore for artifact design"
    - "Cursor Router /docs/cursor-router still absent as dedicated manifest URL"
    - "Skills/subagents/hooks APIs stable; model params [effort=,context=,fast=] documented"
    - "llms.txt lists plugins, approval-agents, new model pages — maintainer queue"
    - "Existing kontent+prodazhi thin agents; no producer skill pack yet"
  api_break: false
  block_factory: false
  recommended_research: true
  research_mode: DEEP
  recommend_maintainer: true
  next_for_parent: t-800-research-lead
  fragment: "fragments/t-800-scout.md"
```
