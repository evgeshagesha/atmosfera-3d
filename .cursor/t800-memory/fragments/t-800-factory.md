# t-800-factory — lead report

**Date:** 2026-07-27  
**Command:** `/t800-start` CREATE Phase A · workspace-cursor · atmosfera-3d  
**slug:** `eg-bot-manager-flow`  
**status:** ok · ship

## Pipeline

| Stage | Result |
|-------|--------|
| architect | ok — skill + command + description PATCH |
| companions | skipped (no hook/script/MCP) |
| builder | ok — 5 CREATE + 2 PATCH |
| integrator | ok — registry N/A |
| prompt-auditor | ok · score 90 (EN→RU polish) |
| factory-auditor | ok · recommendation ship |
| t800_run_gate | EXIT 0 (pending confirm) |

## Artifacts

- `.cursor/skills/eg-bot-manager-flow/SKILL.md`
- `.cursor/skills/eg-bot-manager-flow/references/trigger-matrix.md`
- `.cursor/skills/eg-bot-manager-flow/references/manager-state-map.md`
- `.cursor/skills/eg-bot-manager-flow/references/tone-bans.md`
- `.cursor/commands/eg-bot-manager-flow.md`
- PATCH `.cursor/agents/eg-bot-engineer.md` (description)
- PATCH `.cursor/agents/eg-bot-knowledge.md` (description)
- Product note: `03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/06_ПРОДУКТЫ_И_ШКОЛА/BOT_ROADMAP_MVP.md`
- Brief: `.cursor/t800-memory/factory-briefs/eg-bot-manager-flow.yaml`

## Invoke

- `/eg-bot-manager-flow` or `@eg-bot-manager-flow`
- Code → `Task(eg-bot-engineer)` / `/p02-bot`
- KB → `Task(eg-bot-knowledge)`

## Out of scope this run

- New subagent manager
- Phase B posting skill
- Phase C Remotion skill
- bot.py rewrite / vault dump / secrets
