# t-800-factory — CREATE atmosfera-client-programs-mvp (RETRY SHIP)

**Date:** 2026-08-05  
**Progress:** Factory ▸ RETRY closeout → prompt-auditor → auditor PASS · SHIP  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**status:** ok  
**pack:** atmosfera-client-programs-mvp  
**artifact_surface:** cursor-workspace  
**retry:** prior PING timeouts (9778d45d, 10da2173) — artifacts already complete; re-audit + gates

---

## Pipeline (RETRY)

| Stage | Agent | Result |
|-------|-------|--------|
| discover | factory lead | partial→complete: 8/8 on disk |
| architect | (prior) | ok — Architecture A |
| companions | hooks / mcp / scripts | SKIP |
| builder | (prior) | ok — no rewrite needed |
| integrator | (prior) | ok — AGENTS.md +1 |
| prompt-auditor | [869ce7ba](869ce7ba-46d4-4e73-bc9c-cce235cfbd18) | **ok** — 11/11 critical |
| auditor | [e1e22cad](e1e22cad-7f68-441d-b420-e2abd7130a02) | **PASS** / ship |
| gate | `t800_run_gate.py --strict-create --factory-brief` | **PASS** |
| gate | `t800_factory_bypass_gate.py` | **PASS** |

## Artifacts

| Kind | Path |
|------|------|
| skill | `.cursor/skills/eg-client-programs/SKILL.md` (`disable-model-invocation: true`) |
| ref | `.cursor/skills/eg-client-programs/references/post-session.md` |
| ref | `.cursor/skills/eg-client-programs/references/monthly-plan.md` |
| ref | `.cursor/skills/eg-client-programs/references/long-term.md` |
| ref | `.cursor/skills/eg-client-programs/references/bans-checklist.md` |
| command | `.cursor/commands/eg-programma.md` |
| alias | `.cursor/commands/программа.md` |
| scaffold | `90_ВХОДЯЩИЕ/program-drafts/.gitkeep` |

## Skip

agent · rule · hook · MCP · director-rule · PDF · site · VK · Remotion · registry (workspace)

## How to use

1. `/eg-programma post-session|monthly|long-term` (Latin primary)  
2. Alias: `/программа`  
3. Draft → `90_ВХОДЯЩИЕ/program-drafts/` → STOP «Утверждаю черновик»  
4. **Reload Window** после CREATE  

## Invariants

- STYLE SPEC cite as draft (`style_spec_status: pending`) until user «утверждаю»  
- Type1 ≠ «Персональная программа на 30 дней»; no sets/reps overload; Type3 skeleton  
- Zero-Copy cite vault SoT; no auto-send  
