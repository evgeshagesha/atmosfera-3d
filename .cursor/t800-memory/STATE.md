# STATE — t800-memory

Рабочая память прогона T-800. Путь: `{memory_path}/STATE.md`.  
Контракт: `shared/loop-engineering-contract.md`.

## Last run

- **Когда:** 2026-07-27 21:20
- **Команда:** /t800-start CREATE Phase A · eg-bot-manager-flow
- **Research mode:** SKIP (Director prior + brain brief)
- **Статус:** completed

## In progress

<!-- пусто -->

## Completed

- 2026-07-27 21:20 — `factory`: auditor PASS + gates exit 0; skill eg-bot-manager-flow shipped
- 2026-07-27 21:12 — brain — brief_for_factory eg-bot-manager-flow (Director handoff)
- 2026-07-27 21:12 — factory brief → `factory-briefs/eg-bot-manager-flow.yaml`
- 2026-07-27 20:37 — `factory`: auditor PASS · skill eg-knowledge-outline shipped
- 2026-07-27 — intake — skipped (brief clear)
- 2026-07-27 — scout — done (Director; block_factory=false)

## Blockers / Escalated

<!-- пусто -->

## Lessons

- Workspace skill: registry_patch=null; plugin validate-agents = n/a, не FAIL
- Progressive disclosure: SKILL.md короткий + references (tone / matrices / state-map)
- Phase A ≠ posting / Remotion; handoff to eg-bot-engineer / eg-bot-knowledge
- Description PATCH only on existing agents — no new manager subagent
- Product note BOT_ROADMAP_MVP рядом с skill (честный Phase A/B/C)

## Stop conditions

- Repair budget исчерпан (`max_repair_attempts = 2`)
- Нет machine gate / скрипт недоступен
- Архитектура / бюджежи — нужен человек
- Пользователь сказал стоп

## Gates

| Gate | Результат |
|------|-----------|
| factory-auditor | PASS (ok / ship) |
| prompt-auditor | PASS (score 90) |
| validate-agents | n/a (workspace skill) |
| audit-agent-graph | n/a |
| verify-install | n/a |
| t800_run_gate | EXIT 0 |
| plugin-audit inventory | n/a |
