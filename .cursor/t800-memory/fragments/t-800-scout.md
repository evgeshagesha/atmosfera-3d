# t-800-scout — Scout Report

**Date:** 2026-07-28  
**Workspace:** `/Users/egoshev/Projects/atmosfera-3d`  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**artifact_surface:** cursor-workspace  
**User task context:** EG video montage pipeline — Telegram ingest → cut/animate (Remotion? ffmpeg?) + optional Syntx/NN; T-800 CREATE skill/agent/command. Artifacts NOT created by scout.

## Freshness

| Field | Value |
| --- | --- |
| `last_full_sync` | 2026-07-02 |
| `manifest_age_days` | 26 |
| `status` | fresh (< 30d) |
| `coverage_map.last_synced` | 2026-07-06 |
| `audit-coverage.sh` | Explicit=44 Grouped=0 **Missing=0** |
| `block_factory` | false |

## Sources checked (2026-07-28)

- https://cursor.com/changelog — OK (latest: Jul 28 Cursor Start India)
- https://cursor.com/docs — transient error page (topic URLs OK)
- https://cursor.com/docs/cloud-agent/automations — OK
- https://cursor.com/docs/skills — OK
- https://cursor.com/docs/hooks — OK
- https://cursor.com/ru/docs/subagents — OK

## New findings (post–2026-07-02 sync)

1. **Cursor Start (India)** (changelog Jul 28): pricing/geo; plugins/MCP/hooks/skills mentioned — **not factory-blocking**.
2. **Cursor Router / Auto modes** (Jul 22): Intelligence / Balance / Cost — not in KB as dedicated URL.
3. **Slack cloud agent** (Jul 17): plan-before-start, multi-repo, cross-channel.
4. **Side chats + transcript search** (3.11 Jul 10) — not in KB.
5. **Cloud agent conversation hooks** (3.11): `beforeSubmitPrompt`, `afterAgentResponse`, `afterAgentThought`, `stop`, `subagentStart`, … — confirmed in live hooks docs; cloud support table present.
6. **Team MCPs in marketplaces** (3.10 Jun 30).
7. **Automations (live 2026-07-28):**
   - Triggers: cron, GitHub/GitLab/Bitbucket Cloud, Slack, **webhook**, Linear, Sentry, PagerDuty
   - Tools: PR/Slack, **MCP**, **Memories** (default on), **Computer use** (default) — can produce screenshots/recordings
   - Repo modes: No repository / single / multi-repo
   - Create via Agents Window, cursor.com/automations, or `/automate`
8. **Skills (live):** `.cursor/skills/` + `.agents/skills/` (+ nested); frontmatter `name`, `description`, optional `paths`, `disable-model-invocation`, `metadata`; scripts/references/assets; built-ins include `/automate`, `/loop`, `/create-skill`, `/create-subagent`, `/migrate-to-skills`
9. **Subagents (live RU):** `.cursor/agents/`; frontmatter `name`, `description`, `model`, `readonly` — unchanged vs prior scout

## Relevance to EG video montage (confirmed Cursor docs only)

| Surface | What docs support | Gap for TG → cut/animate |
| --- | --- | --- |
| **Automations** | **Webhook** → cloud agent; cron; MCP; Computer use (demo recordings); no-repo OK for non-code | **No native Telegram trigger**; media binary ingest not first-party |
| **MCP** | External tools (e.g. existing Telegram MCP in workspace) via stdio/HTTP | Bridge: bot/account → webhook or MCP; secrets out of git |
| **Skills** | Project skills with `scripts/` for ffmpeg/render recipes; `paths` for Remotion trees; `/` invoke | Orchestration skill ≠ invent Remotion again |
| **Agents** | Multi-step isolated montage/review | Prefer skill if single workflow; agent if parallel research + long media context |
| **Commands** | Prefer skills + `disable-model-invocation: true` for explicit `/eg-video-*` | — |
| **Hooks** | `beforeShellExecution` / `subagentStart` for ffmpeg/render gates | Optional quality gates — not required to CREATE |
| **Terminal** | Local agent can run ffmpeg / remotion CLI | Cloud agent needs env + deps configured |

### Workspace already has Remotion surface (scout note, not Cursor docs)

Project already ships remotion skill pack under `.cursor/skills/` and `.agents/skills/`:  
`remotion-best-practices`, `remotion-create`, `remotion-markup` (incl. ffmpeg notes), `remotion-render`, `remotion-captions`, `remotion-saas`, `remotion-docs`, `remotion-upgrade`, `remotion-interactivity`, `remotion-maps`, + `mediabunny`.

→ CREATE should focus on **ingest + orchestration + brand/HITL**, not duplicate Remotion docs skills.  
Syntx / third-party NN video APIs: **not in Cursor docs** — research topic only.

## Subagents / hooks API (criticality)

- Frontmatter confirmed: `name`, `description`, `model`, `readonly`.
- Hooks events include conversation + subagent lifecycle; no removed required fields observed.
- No breaking change vs prior scout → **`block_factory: false`**.

## Recommendations

### Next: `Task(t-800-brain-lead)`

Pass this scout_report. Focus brains (context + cloud + tools + agents):
- Skill vs agent vs command split for: Telegram ingest → cut plan → Remotion/ffmpeg → optional NN
- Reuse existing remotion-* skills; new artifact = pipeline/orchestration + brand/HITL
- Automations webhook + MCP Telegram vs local-only Agent
- Secrets / media paths / no auto-publish pattern (HITL)

### Also: `Task(t-800-research-lead)` — recommended

Topic: Telegram media ingest → agent montage pipelines (webhook bridges, ffmpeg vs Remotion split, Syntx/NN API patterns, Cursor Automations cron/webhook+MCP, skill vs agent for EG Reels/Stories).  
Reason: product design; Cursor has no first-party Telegram/media/Syntx trigger; Remotion pack already in repo.

### Maintainer (non-blocking, soft)

`Task(t-800-maintainer)` soft: deepen automations (Computer use / Memories / webhook), Cursor Router, cloud conversation hooks — age 26d, hits 30d ~Jul 31.

## scout_report YAML

```yaml
scout_report:
  topic: eg-video-montage-pipeline
  manifest_age_days: 26
  status: fresh
  audit_missing: 0
  new_findings:
    - "Cursor Start India (Jul 28) — pricing only"
    - "Automations: webhook + MCP + Computer use confirmed live"
    - "Skills: nested dirs, scripts/, disable-model-invocation; /automate /loop"
    - "Subagents frontmatter unchanged (name/description/model/readonly)"
    - "Workspace already has remotion-* skill pack — do not duplicate"
  media_pipeline_cursor_fit:
    telegram_native_trigger: false
    recommended_bridge: webhook_or_mcp
    remotion_skills_present: true
    syntx_in_cursor_docs: false
  recommended_research: true
  block_factory: false
  next: t-800-brain-lead
```
