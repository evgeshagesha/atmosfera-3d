# t-800-factory — Atmosfera 3D producer pack

**Date:** 2026-08-04  
**status:** ok  
**pack:** atmosfera-producer-mvp  
**mode:** CREATE + EXTEND  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`

## Pipeline

| Stage | Status |
|-------|--------|
| architect | ok |
| companions (hooks/scripts/mcp) | skipped (none) |
| builder | ok |
| integrator | ok (27/27) |
| prompt-auditor | ok (3 WARN non-blocking) |
| factory-auditor | ok |
| t800_run_gate | PASS exit 0 |

## Artifacts

### CREATE
- `.cursor/skills/eg-producer-studio/` (+ 5 refs)
- `.cursor/skills/eg-reels-script/` (+ 5 refs)
- `.cursor/skills/eg-warmup/` (+ 4 refs)
- `.cursor/skills/eg-seo-brief/` (+ 4 refs)
- `.cursor/commands/eg-producer.md`
- `.cursor/commands/продюсер.md`
- `90_ВХОДЯЩИЕ/producer-drafts/.gitkeep`

### EXTEND
- `.cursor/agents/kontent.md`
- `.cursor/agents/prodazhi.md`

### Integrator note
- `AGENTS.md` +1 line (`/eg-producer` → `producer-drafts/`)

## Gates
- `python3 scripts/t800_run_gate.py --memory-path …` → **PASS**
- repair_attempts: 0

## How to use
`/eg-producer` (alias `/продюсер`) → studio brief STOP → craft skill STOP → `Task(kontent)` STOP → `Task(prodazhi)` CTA anketa → Ready. Drafts: `90_ВХОДЯЩИЕ/producer-drafts/`.

## Next for user
Reload Window. Optional polish W1–W3 later.
