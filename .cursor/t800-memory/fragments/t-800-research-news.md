# t-800-research-news — DEEP should-channel

**mode:** DEEP should-channel  
**topic:** Cursor Agent Skills / agentskills.io / rules·commands migration / HITL approval gates  
**as_of:** 2026-07-25  
**status:** ok  

## Queries covered
- Cursor Agent Skills 2026 SKILL.md agentskills.io
- Cursor changelog skills commands rules migration
- Anthropic Agent Skills open standard
- AI content human approval gate

## news_items

| title | url | date | relevance | freshness |
|-------|-----|------|-----------|-----------|
| Cursor 2.4: Subagents, Skills, and Image Generation | https://cursor.com/changelog/2-4 | 2026-01-22 | Skills ship in editor+CLI; procedural vs always-on rules; slash invoke | ok (changelog exception) |
| Cursor Agent Skills docs (`/migrate-to-skills`, SKILL.md) | https://cursor.com/docs/skills | 2026 (live docs; aligned 2.4) | Migration matrix rules→skills; `disable-model-invocation`; `paths` | ok |
| Cursor Help: Skills vs Rules + migrate commands | https://cursor.com/help/customization/skills | 2026 (live) | skill vs rule table; `/migrate-to-skills` scope | ok |
| Anthropic Engineering: Equipping agents with Agent Skills | https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills | 2025-10-16 (+ update 2025-12-18) | Progressive disclosure; SKILL.md anatomy; open-standard update | warn/block as sole news; ok as origin timeline |
| VentureBeat: Anthropic opens Agent Skills standard | https://venturebeat.com/technology/anthropic-launches-enterprise-agent-skills-and-opens-the-standard | 2025-12-18 | agentskills.io open standard; Cursor named adopter | warn (>90d, Q4'25) |
| agentskills.io home (open standard) | https://agentskills.io/home | living (repo created ~2025-12-16) | Portable SKILL.md; progressive loading; Cursor listed | warn (undated page → prefer GitHub/VB dates) |
| HITL: When Approvals Matter in 2026 | https://getclaw.sh/blog/human-in-the-loop-ai-agents-approvals-2026 | 2026-05-04 | Content/public msgs = draft-first; tiered approval gates | ok |
| HITL approval gate for agent tool calls (pattern) | https://dreaming.press/posts/human-in-the-loop-approval-gate-agent-tool-calls.html | ~2026 (industry guide) | interrupt/resume; gate consequential actions | warn (confirm exact pub date before verbatim) |

## implications_for_factory (skill vs command vs rule in 2026)

1. **Rule** = always-on / scoped declarative constraints (`alwaysApply: true` or `globs`/`paths` on rules). Do **not** migrate these via `/migrate-to-skills`. Keep brand/safety/governance here.
2. **Skill** = on-demand procedural how-to (`SKILL.md` + optional `scripts/`/`references/`). Default for multi-step workflows factory creates. Agent may auto-select via `description`; progressive load.
3. **Command** (legacy slash) → migrate to skill with `disable-model-invocation: true` so human must type `/name` (HITL-friendly explicit invoke). New work: prefer skill over bare command.
4. **Migration path (Cursor 2.4+):** `/migrate-to-skills` converts (a) dynamic rules without globs, (b) slash commands → skills with `disable-model-invocation: true`. Review output in `.cursor/skills/`.
5. **Portability:** Align factory artifacts to agentskills.io (folder + `SKILL.md` frontmatter). Cursor also reads `.claude/skills/` / `.codex/skills/`.
6. **HITL / content gate:** For publish/send/customer-facing outputs — skill should instruct **draft → human approve → then act**; use `disable-model-invocation: true` or hooks/approvals for irreversible steps. Industry consensus (2026): gate by consequence (money, access, public content), not every tool call.
7. **Should-channel factory note:** Prefer skill for reusable procedures; keep always-apply brand/compliance as rules; treat slash-only flows as skills with model-invocation disabled.

## stale_rejected

| item | reason |
|------|--------|
| Pre-2025 “Cursor rules only” tutorials treating rules as the sole customization surface | Superseded by Skills (2.4, Jan 2026) + open standard |
| Undated Medium/SEO “complete skills guide” posts without publish date | freshness: block for verbatim; use only if cross-checked against cursor.com docs |
| Claims that slash commands are already removed | Contradicted: still supported; migrate recommended; no sunset date in official changelog |
| Year-old “always put workflows in alwaysApply rules” advice | Anti-pattern vs progressive disclosure / context cost |
| Medical/cure marketing copy as skill content | Out of brand scope (not news-stale; policy reject) |

## sources

```yaml
sources:
  - url: "https://cursor.com/changelog/2-4"
    published_or_updated: "2026-01-22"
    freshness: ok
    takeaway: "Skills + subagents shipped; skills for procedural how-to vs always-on rules"
  - url: "https://cursor.com/docs/skills"
    published_or_updated: "2026-01+"
    freshness: ok
    takeaway: "/migrate-to-skills; SKILL.md fields; built-in create-skill; cross-load Claude/Codex dirs"
  - url: "https://cursor.com/help/customization/skills"
    published_or_updated: "2026-01+"
    freshness: ok
    takeaway: "Rules vs Skills table; migrate commands"
  - url: "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
    published_or_updated: "2025-10-16"
    freshness: warn
    takeaway: "Origin of Agent Skills; progressive disclosure; Dec 18 2025 open-standard update note"
  - url: "https://venturebeat.com/technology/anthropic-launches-enterprise-agent-skills-and-opens-the-standard"
    published_or_updated: "2025-12-18"
    freshness: warn
    takeaway: "agentskills.io open standard; Cursor named among adopters"
  - url: "https://agentskills.io/home"
    published_or_updated: "2025-12+"
    freshness: warn
    takeaway: "Canonical open format; Cursor listed"
  - url: "https://getclaw.sh/blog/human-in-the-loop-ai-agents-approvals-2026"
    published_or_updated: "2026-05-04"
    freshness: ok
    takeaway: "Public/customer content draft-first; tiered approval by consequence"
```

## confidence

**0.82** — Primary Cursor changelog + docs + Anthropic/VentureBeat cross-check solid for skills/migration. HITL content-gate pattern strong for 2026 industry guides; weaker as Cursor-product-specific (rely on Cursor sandbox approvals + skill design, not a single Cursor “content gate” product feature).

## news_findings (machine)

```yaml
status: ok
news_findings:
  - source: changelog
    url: "https://cursor.com/changelog/2-4"
    published: "2026-01-22"
    freshness: ok
    claim: "Cursor 2.4 adds Agent Skills (SKILL.md) in editor and CLI; better for procedural how-to than always-on rules; slash menu invoke."
    impact_for_cursor: "Factory should emit skills for workflows; keep always-on constraints as rules."
  - source: blog
    url: "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
    published: "2025-10-16"
    freshness: warn
    claim: "Agent Skills = folders with SKILL.md + progressive disclosure; open standard update Dec 18 2025."
    impact_for_cursor: "Align SKILL.md to agentskills.io for portability across Cursor/Claude/Codex."
  - source: other
    url: "https://venturebeat.com/technology/anthropic-launches-enterprise-agent-skills-and-opens-the-standard"
    published: "2025-12-18"
    freshness: warn
    claim: "Anthropic published Agent Skills as independent open standard at agentskills.io; Cursor listed as adopter."
    impact_for_cursor: "Treat skills as ecosystem format, not Cursor-only proprietary."
  - source: other
    url: "https://cursor.com/docs/skills"
    published: "2026-01-22"
    freshness: ok
    claim: "/migrate-to-skills converts dynamic rules (no globs) and slash commands (→ disable-model-invocation: true); alwaysApply/globs rules stay."
    impact_for_cursor: "Migration playbook for T-800 fix/factory when upgrading rule/command packs."
  - source: other
    url: "https://getclaw.sh/blog/human-in-the-loop-ai-agents-approvals-2026"
    published: "2026-05-04"
    freshness: ok
    claim: "Public/customer-facing messages should be draft-first until correction rate is low; gate by consequence not by every action."
    impact_for_cursor: "Content/publish skills need explicit human approval step; prefer disable-model-invocation or ask-question before send."
```
