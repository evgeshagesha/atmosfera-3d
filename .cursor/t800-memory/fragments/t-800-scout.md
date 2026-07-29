# t-800-scout — Scout Report

**Date:** 2026-07-29  
**Workspace:** `/Users/egoshev/Projects/atmosfera-3d`  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**artifact_surface:** cursor-workspace  
**profile:** workspace-cursor  

**User task context:** Full strategic EG OS update — training system positioning («сильное и мобильное тело без зависимости от тренажёров»). Not a new brand fork. Must unify biomechanics + PT + natural movement + mobility + breath + strength + free equipment + funnel + all channels.  
**Scout scope:** Cursor docs freshness vs plugin KB; features for brand SoT (rules/skills); duplication risks for EG OS docs.  
**Artifacts NOT created:** no factory-briefs, no vault edits, no agents/skills/commands/rules.

---

## Freshness

| Field | Value |
| --- | --- |
| Plugin KB | `~/.cursor/plugins/local/t-800-agent/knowledge-base/` |
| `last_full_sync` | 2026-07-02 |
| `manifest_age_days` | **27** |
| `status` | **fresh** (< 30d threshold) — aging toward stale |
| `coverage_map.last_synced` | 2026-07-06 |
| `audit-coverage.sh` | Explicit=44 Grouped=0 **Missing=0** |
| `block_factory` | **false** |
| `recommended_research` | **true** |
| `research_mode` | **DEEP** |

> 💡 Threshold: >30d → stale + `Task(t-800-maintainer)`. At 27d still fresh, but changelog has material deltas since sync → recommend maintainer sync **after** this EG OS strategic pass (or in parallel if bandwidth).

---

## Sources checked (2026-07-29)

| URL | Result |
| --- | --- |
| https://cursor.com/changelog | OK — latest Jul 28 Cursor Start (India) |
| https://cursor.com/docs | Transient error page (topic URLs OK) |
| https://cursor.com/docs/models | Transient error (redirect/alias); use models-and-pricing |
| https://cursor.com/docs/models-and-pricing | OK |
| https://cursor.com/docs/cursor-router | OK — **new page**, not in manifest |
| https://cursor.com/docs/hooks | OK |
| https://cursor.com/docs/skills | OK |
| https://cursor.com/ru/docs/subagents | OK |
| https://cursor.com/ru/docs/rules | (covered by coverage map; not re-fetched this run) |

---

## New findings (post–2026-07-02 sync)

1. **Cursor Start (India)** (changelog Jul 28) — pricing/geo; mentions plugins/MCP/hooks/skills. Not factory-blocking. Irrelevant to EG OS content work.
2. **Cursor Router** (Jul 22 + live `/docs/cursor-router`) — Auto modes Cost / Balance / Intelligence; Teams/Enterprise; SDK `auto-smart` + `optimize_for`. **Missing from manifest** as dedicated URL.
3. **Slack cloud agent** (Jul 17) — plan-before-start, multi-repo, cross-channel.
4. **Side chats + transcript search** (3.11 Jul 10) — `/side`, `/btw`; Agents Window search. Useful for parallel strategy exploration without polluting main thread.
5. **Cloud conversation hooks** (3.11) — confirmed live: `beforeSubmitPrompt`, `afterAgentResponse`, `afterAgentThought`, `stop`, `subagentStart` / `subagentStop`, etc. Cloud support table present; `sessionStart` deferred on cloud.
6. **Team MCPs in marketplaces** (3.10 Jun 30).
7. **Models pool naming** — Cursor Models (Grok 4.5, Composer 2.5) vs Other Models; Start plan = Cursor Models only.
8. **Skills (live):** `.cursor/skills/` + `.agents/skills/` (+ nested + path-scoped); frontmatter `name`, `description`, optional `paths`, `disable-model-invocation`, `metadata`; `/migrate-to-skills` for dynamic rules → skills.
9. **Subagents (live RU):** frontmatter `name`, `description`, `model` (`inherit` | id + `[effort=…]`), `readonly`, `is_background`. No breaking field removals vs prior scout.

### Criticality for factory APIs

- No removed required subagent/skills/hooks fields observed.
- New hooks are additive; cloud caveats documented.
- → **`block_factory: false`**

---

## Cursor features relevant to brand SoT (EG OS)

For a **strategic EG OS update** (positioning + unified method + funnel + channels), Cursor surfaces that matter:

| Surface | Role for brand SoT | Scout guidance |
| --- | --- | --- |
| **Rules** (`.cursor/rules/`, alwaysApply / globs) | Hard brand constraints: no med-claims, tone, PARA, «не новый бренд-форк» | Prefer **one** SoT rule pointing at vault masters — avoid cloning EG OS prose into alwaysApply |
| **Skills** (`paths`, progressive refs) | Domain workflows: content packs, offer templates, channel adapters | Skill loads method **on demand**; put long EG OS in `references/`, not SKILL body |
| **Subagents** | Readonly research / auditor vs write integrator | Brand/method brains stay readonly; writers update vault under HITL |
| **Hooks** | Optional gates on medical/forbidden phrases at edit/prompt | Useful later; **not** required to start EG OS doc unify |
| **User rules vs project rules** | User already has heavy EG identity rules globally | Risk: **triple SoT** (user rules + workspace rules + vault EG_OS_*) — research must map single source of truth |
| **Side chat** | Strategy tangents without derailing main unify thread | Operational tip, not an artifact |
| **`/migrate-to-skills`** | If alwaysApply bloat grows from EG OS copy | Consider after inventory — do not migrate blindly mid-strategy |

**Not relevant to this task:** Cursor Start India pricing, Team marketplace MCPs, Slack multi-repo (unless EG ops uses Slack agents).

---

## EG OS duplication risks (HIGH — business, not Cursor API)

Existing vault corpus (do **not** fork; unify):

| Location | Risk |
| --- | --- |
| `03_РЕСУРСЫ/.../EG_OS_MASTER_UPDATED_v3.0/.../EG_OS_MASTER_UPDATED_v3.0.md` | Already covers mobility, strength, breath, offers, funnel notes («не противопоставляем силу и мобильность») |
| `99_ДАЙДЖЕСТЫ_ДЛЯ_AI/_extracted/EG_OS_*` | Extracted Brand Foundation / Content Strategy / Content System — parallel copies |
| `00_ПУЛЬТ_УПРАВЛЕНИЯ/ГЛАВНЫЙ_КОНТЕКСТ.md` + AGENTS.md + `.cursor/rules/atmosfera-3d.mdc` | Operational SoT layers |
| Global user rules (EG System / Atmosfera) | Overlap with vault EG OS — can fight or duplicate positioning |

**Positioning angle in task:** «сильное и мобильное тело без зависимости от тренажёров» — likely an **evolution/sharpening** of existing EG OS language, not a new brand.  

**Risks if DEEP research / factory / writers ignore inventory:**
1. New `EG_OS_v4` / `TRAINING_SYSTEM_NEW` sibling → PARA chaos  
2. Conflicting CTAs across Instagram / TG / site / YouTube  
3. Cursor rules that restate vault → context bloat + drift  
4. Splitting biomechanics / PT / natural movement into separate “brands”

**Mitigation (for brain-lead + research):** inventory → single canonical master → update-in-place → channel adapters as thin layers → rules only enforce constraints + pointer.

---

## Coverage / maintainer notes

- `audit-coverage.sh`: **Missing=0** (no WARN on Missing > 3).
- Manifest gap vs live docs: **`https://cursor.com/docs/cursor-router`** not listed; changelog features (side chats, Slack multi-repo) lack dedicated KB cards.
- Recommend `Task(t-800-maintainer)` when EG OS strategic work pauses — sync raw pages + coverage map; not a blocker for research/brain now.

---

## Recommendations

### Next: `Task(t-800-brain-lead)` with this scout_report

Focus domains: **context** (rules/skills SoT), **agents** (readonly vs write), optionally **security** (no med-claims gates).

Pass constraints:
- Not a brand fork
- Unify method + free equipment + funnel + all channels
- Do not edit EG vault until research + brain agree on SoT path
- No factory artifacts in this phase unless later CREATE is scoped

### Next: `Task(t-800-research-lead)` — **`research_mode: DEEP`**

Why DEEP:
- Multi-source corpus already in vault + global rules + channel systems (YouTube pack, content routers)
- Need comparison: existing EG OS language vs proposed positioning; market/method references for free-equipment strength+mobility without inventing a fork
- Synthesizer must pick **one** update path (patch master vs thin addendum)

Coverage hints for strategist (not a fixed site list): vault EG_OS masters, PRODUCT/CONTENT routers, positioning/tone files, community/vendor only if method packaging patterns help — avoid spawning new Cursor factory agents for content strategy.

### Explicit non-actions this scout

- No factory-brief / no agents|skills|commands|rules writes  
- No EG vault edits  
- `block_factory: false` — factory may run later **only** if CREATE is for Cursor tooling around SoT, not for inventing parallel EG OS docs

---

## scout_report (machine)

```yaml
scout_report:
  date: "2026-07-29"
  task: "EG OS strategic update — training positioning (strong+mobile, no machine dependency)"
  manifest_age_days: 27
  status: fresh
  last_full_sync: "2026-07-02"
  audit_coverage:
    explicit: 44
    grouped: 0
    missing: 0
  new_findings:
    - "Cursor Router docs live; Auto Cost/Balance/Intelligence (Teams/Enterprise)"
    - "Changelog Jul 10–28: side chats, cloud conversation hooks, Slack multi-repo, Cursor Start India"
    - "Skills paths + migrate-to-skills; subagent frontmatter stable (name/description/model/readonly/is_background)"
    - "docs root + /docs/models transient errors; models-and-pricing OK"
  cursor_features_for_brand_sot:
    - rules_pointer_not_prose_clone
    - skills_with_paths_and_references
    - readonly_subagents_for_brand_audit
    - optional_hooks_for_medclaim_gates
    - side_chat_for_strategy_tangents
  eg_os_duplication_risk: high
  eg_os_existing_masters:
    - "EG_OS_MASTER_UPDATED_v3.0.md"
    - "99_ДАЙДЖЕСТЫ_ДЛЯ_AI/_extracted/EG_OS_*"
    - "workspace + user rules overlap"
  recommended_research: true
  research_mode: DEEP
  recommended_next:
    - "Task(t-800-brain-lead)"
    - "Task(t-800-research-lead) DEEP"
    - "Task(t-800-maintainer) soon (manifest→30d; add cursor-router URL)"
  block_factory: false
  blockers: []
  warnings:
    - "Manifest 27d — sync soon; not blocking"
    - "Do not create parallel EG OS brand docs"
    - "Triple SoT risk: user rules + project rules + vault"
```
