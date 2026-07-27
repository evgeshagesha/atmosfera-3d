# t-800-prompt-auditor — eg-bot-manager-flow

**stage:** prompt_auditor  
**status:** ok  
**score:** 90  
**recommendation:** pass  
**date:** 2026-07-27

## Scope

- skill: `.cursor/skills/eg-bot-manager-flow/SKILL.md` (+ references)
- command: `.cursor/commands/eg-bot-manager-flow.md`
- agent description patches: `eg-bot-engineer.md`, `eg-bot-knowledge.md`

## Critical checklist

| Check | Result |
|-------|--------|
| Vague description | PASS — routing-specific |
| Description Trap | PASS — description ≠ full body |
| `tools:` in agent FM | PASS — absent |
| Use when / Do NOT | PASS — skill + both agents |
| name ≠ filename | PASS |
| Prompt > 150 lines | PASS — SKILL 106 lines |

## Brief constraints

Phase A only · no new subagent · handoff engineer/knowledge/remotion · no med promises · no bot.py rewrite · registry_patch null — all reflected.

## Findings

**critical:** none

**warnings (non-blocking):**
1. `eg-bot-knowledge` description ends with English: `this agent = KB texts only`
2. Patched agents still lack full Cursor FM 5 fields (`model`/`readonly`/`is_background`) — pre-existing, out of description-patch scope
3. Skill body mixes RU + EN section headers (`Code context`, `Workflow`) — readable, not a trap

## must_fix

[]

## Gate

Ship to `t-800-factory-auditor`.
