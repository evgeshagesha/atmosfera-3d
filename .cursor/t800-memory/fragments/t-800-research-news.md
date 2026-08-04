# t-800-research-news — Producer pack (should channel)

**Date:** 2026-08-04  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Intent:** DEEP news/changelog pass for Atmosfera producer MVP (HITL SEO/scripts; skills + 1–2 agents + 1 command)  
**Scout baseline:** Aug 4 scout already checked Cursor changelog thru **Aug 3 Google Workspace** → confirm deltas only; **do NOT re-block factory**

---

## Delta vs scout (Google Workspace)

| Check | Result |
| --- | --- |
| Latest on `cursor.com/changelog` | Still **Aug 3, 2026** Google Workspace plugins |
| Newer than scout? | **No** (as of 2026-08-04) |
| Factory impact | **None** — additive plugins; optional later for Docs/Sheets SEO drafts |
| Action | Confirm only; keep scout `block_factory: false` |

---

## news_findings (machine)

```yaml
status: ok
channel: should
scout_delta:
  google_workspace_aug3: confirmed_no_newer
  reblock_factory: false
prefer_freshness_days: 60
news_findings:
  - source: changelog
    url: "https://cursor.com/changelog/google-workspace-plugins"
    published: "2026-08-03"
    freshness: ok
    claim: "Official Google Workspace plugins: Drive, Gmail, Calendar, Docs, Sheets for agents (read/write/act)."
    impact_for_cursor: "Optional Wave2+ for HITL SEO copy in Docs/Sheets; NOT producer MVP. No API break for skills/agents/commands."
    producer_mvp: ignore_v1
  - source: hn
    url: "https://news.ycombinator.com/item?id=49139845"
    published: "2026-08-02"
    freshness: ok
    claim: "Ask HN: skills ≈ progressive-disclosure markdown workflows (name/description always-on; body on trigger) — not a new Cursor API."
    impact_for_cursor: "Reinforces skill-first producer pack + lean SKILL.md descriptions with trigger keywords (SEO/scripts/HITL)."
    producer_mvp: adopt_pattern
  - source: changelog
    url: "https://cursor.com/changelog"
    published: "2026-07-29"
    freshness: ok
    claim: "Cursor for iPad + Inbox + full PR review on mobile."
    impact_for_cursor: "UX only; irrelevant to .cursor/ producer artifacts."
    producer_mvp: ignore_v1
  - source: changelog
    url: "https://cursor.com/changelog"
    published: "2026-07-28"
    freshness: ok
    claim: "Cursor Start India plan; mentions plugins/MCP/hooks/skills as product surface."
    impact_for_cursor: "Pricing/geo only; confirms skills remain first-class customization."
    producer_mvp: ignore_v1
  - source: changelog
    url: "https://cursor.com/changelog"
    published: "2026-07-22"
    freshness: ok
    claim: "Auto mode powered by Cursor Router (Cost/Balance/Intelligence)."
    impact_for_cursor: "Intake inherit_chat OK; no model pin required for MVP skills/agents."
    producer_mvp: ignore_v1
  - source: changelog
    url: "https://cursor.com/changelog"
    published: "2026-07-17"
    freshness: ok
    claim: "Slack cloud agent: plan-before-start, multi-repo, cross-channel."
    impact_for_cursor: "Out of producer MVP; do not design promo pack around Slack automations."
    producer_mvp: ignore_v1
  - source: changelog
    url: "https://cursor.com/changelog/customize"
    published: "2026-06-22"
    freshness: ok
    claim: "Customize page unifies plugins, skills, MCPs, subagents, rules, commands, hooks (user/team/workspace) + marketplace leaderboard."
    impact_for_cursor: "Ship workspace-scoped .cursor/ skills+agents+command; discoverability via Customize is product UX, not a new file format."
    producer_mvp: adopt_surface
  - source: changelog
    url: "https://cursor.com/changelog/06-18-26"
    published: "2026-06-18"
    freshness: ok
    claim: "Automations improvements: /automate skill, Slack emoji + GitHub triggers, computer use for cloud agents."
    impact_for_cursor: "Always-on / auto-publish adjacent — CONFLICTS with HITL no-auto-publish TG/VK/blog. Ignore for v1."
    producer_mvp: ignore_v1
  - source: hn
    url: "https://news.ycombinator.com/item?id=47475832"
    published: "2026-03-22"
    freshness: warn
    claim: "Skills converging as unit of agent knowledge (SKILL.md + optional scripts/refs); distribution still early."
    impact_for_cursor: "Supports curated tiny skills over mass GitHub download — aligns scout handoff."
    producer_mvp: adopt_pattern_stale_warning
  - source: blog
    url: "https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills"
    published: "2025-10-16"
    freshness: block
    claim: "Anthropic Agent Skills intro; open-standard update noted 2025-12-18."
    impact_for_cursor: "Baseline format (name+description progressive disclosure) already mirrored in Cursor skills docs — do not treat as breaking 2026 news."
    producer_mvp: baseline_only
  - source: other
    url: "https://agentskills.io/specification"
    published: "living-doc"
    freshness: warn
    claim: "Open Agent Skills spec: required name/description; optional license/compatibility/metadata/allowed-tools; progressive disclosure; SKILL.md <500 lines ideal."
    impact_for_cursor: "Align producer SKILL.md with Cursor frontmatter + keep descriptions trigger-rich; optional open-spec fields only if Cursor supports."
    producer_mvp: adopt_format_guardrails
  - source: other
    url: "https://github.com/chelsea-hq/marketing-hub-kit"
    published: "undated"
    freshness: block
    claim: "Marketing Hub Kit: approval-first drafts, brand memory, content packs — community pattern (not verified date)."
    impact_for_cursor: "Pattern only for research synthesizer: HITL approval gates before publish — matches Atmosfera dual-HITL. Do not mass-clone."
    producer_mvp: pattern_signal_only
  - source: other
    url: "https://github.com/tanishaio/creator-studio-skill"
    published: "undated"
    freshness: block
    claim: "Creator Studio skill: voice-setup, reel scripts, captions, calendar, trends via slash flows."
    impact_for_cursor: "Useful MVP shape for scripts/SEO content skills; curate patterns, do not wholesale install."
    producer_mvp: pattern_signal_only
  - source: changelog
    url: "https://cursor.com/changelog/2-4"
    published: "2026-01-22"
    freshness: block
    claim: "Cursor 2.4 introduced Subagents + Agent Skills (SKILL.md) + image gen."
    impact_for_cursor: "Historical baseline already in scout/docs; not a 60d news delta."
    producer_mvp: baseline_only

mvp_relevance:
  take:
    - "Skill-first producer pack with rich description triggers (SEO copy, scripts, HITL)"
    - "Workspace .cursor/ skills + 1–2 subagents + 1 command; Customize is install UX only"
    - "HITL drafts / approval gates (mirror marketing-hub approval-first; reuse eg-news-to-blog dual HITL)"
    - "Progressive disclosure: lean SKILL.md + references/ for brand/SEO matrices"
  ignore_v1:
    - "Google Workspace Docs/Sheets/Gmail plugins (optional later)"
    - "Cursor Automations / /automate / Slack emoji triggers / always-on agents"
    - "iPad / Inbox / India Start / Router / Slack multi-repo"
    - "Mass-download creator-studio / marketing-studio / Remotion full pipelines"
    - "Auto-publish TG/VK/blog or Gmail send without human gate"
  do_not_reblock_factory: true

sources_with_dates_ok_or_warn: 9
sources_block_or_undated: 5
```

---

## Relevance summary (producer MVP)

**What matters now**

1. **Skills remain the unit** — Customize (Jun 22) + HN (Aug 2) confirm skill-first packaging; no schema break vs scout.
2. **HITL > Automations** — Jun 18 Automations are the anti-pattern for Atmosfera brand safety (no auto-publish).
3. **Google Workspace (Aug 3)** — confirmed; delta = none; defer Docs/Sheets SEO drafts to post-MVP.
4. **Open Agent Skills format** — use as guardrail (name/description, progressive disclosure); Cursor frontmatter supersedes where they diverge.

**Ignore for v1**

- Workspace plugins, Automations, mobile, pricing, Slack cloud, mass marketing skill repos, Remotion marketing-studio pipelines.

**Factory**

- News channel does **not** set `block_factory`. Scout already `false`.
