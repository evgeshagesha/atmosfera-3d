# t-800-factory-auditor — eg-bot-manager-flow

**stage:** auditor  
**status:** ok  
**recommendation:** ship  
**date:** 2026-07-27  
**slug:** eg-bot-manager-flow  
**artifact_surface:** cursor-workspace

## Prior gates

| Stage | Status |
|-------|--------|
| architect | ok |
| builder | ok |
| integrator | ok, `registry_patch: null` |
| prompt-auditor | ok, score 90, pass (EN phrase fixed to RU) |

## Must-verify

| # | Check | Result |
|---|-------|--------|
| 1 | No new subagent | PASS — no `eg-bot-manager*` / sales agent; only description PATCH |
| 2 | No Phase B posting / Remotion skill this run | PASS — only CREATE `eg-bot-manager-flow`; remotion-* pre-existing |
| 3 | Skill Use when / Do NOT, cite paths, no bot.py dump | PASS — FM + body; cites user_state/followups/bot.py/KB; no code dump |
| 4 | Handoff engineer \| knowledge \| manager-flow \| remotion | PASS — skill + command tables |
| 5 | registry_patch null | PASS — workspace skill; integrator correct |
| 6 | No secrets / .env | PASS — grep clean on skill + command |
| 7 | Agent patches description-only | PASS — git diff FM only; bodies intact |

## Artifacts

CREATE (present):
- `.cursor/skills/eg-bot-manager-flow/SKILL.md` (106 lines)
- `references/trigger-matrix.md`
- `references/manager-state-map.md`
- `references/tone-bans.md`
- `.cursor/commands/eg-bot-manager-flow.md`

PATCH description-only:
- `.cursor/agents/eg-bot-engineer.md` (+ Do NOT → eg-bot-manager-flow)
- `.cursor/agents/eg-bot-knowledge.md` (+ Use/Do NOT boundary; RU fix)

Product note (lead, non-Cursor):
- `03_РЕСУРСЫ/.../BOT_ROADMAP_MVP.md` — present

## Machine gates

```yaml
prompt_auditor: pass   # fragment score 90
validate_agents: pass  # plugin registry 43 agents — n/a to workspace skill ship
audit_agent_graph: pass  # plugin graph OK — n/a to workspace skill ship
verify_install: skip   # workspace skill, no plugin install
```

Workspace skill: validate/graph not required to fail ship; both still pass on plugin.

## Findings

**critical:** []

**warnings (non-blocking):**
1. Skill body keeps EN section headers (`Code context`, `Workflow`) — readable, not Description Trap
2. Workspace agents still lack full Cursor FM 5 fields (`model`/`readonly`/`is_background`) — pre-existing, out of PATCH scope

## Report

```yaml
status: ok
stage: auditor
recommendation: ship
artifacts_ok: true
ralph_wiggum_risk: false
findings:
  critical: []
  warnings:
    - EN section headers in skill body (non-blocking)
    - workspace agents missing optional FM fields (pre-existing)
passed:
  - prompt-auditor
  - no-new-subagent
  - no-phase-b-remotion-create
  - skill-use-when-do-not
  - handoff-routing
  - registry_patch_null
  - no-secrets
  - description-only-agent-patches
machine_gates:
  validate_agents: pass
  audit_agent_graph: pass
  verify_install: skip
```
