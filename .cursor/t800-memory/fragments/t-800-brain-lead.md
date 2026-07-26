# t-800-brain-lead — Brief для Factory / Director

**Date:** 2026-07-26  
**Workspace:** `/Users/egoshev/Projects/atmosfera-3d`  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**slug seed:** `eg-knowledge-intake`  
**Progress:** `Brain ▸ domains: context+agents → brief ready`

## Routing summary

| Item | Decision |
| --- | --- |
| Domains called | `t-800-brain-context`, `t-800-brain-agents` (max 2; teya N/A) |
| Research next | **SKIP today** (folder-only) |
| Research tomorrow | **LIGHT** only if designing Skill taxonomy / capture protocol — not DEEP marketplace hunt |
| Factory today | **SKIP** — no Cursor artifacts |
| Soft maintainer | OK later (manifest_age 24d; KB drift soft) |
| New research agents | **FORBIDDEN** |

## Vault status (observed)

PARA vault already exists:

`03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/`

lanes: `00_ВХОДЯЩИЕ_СЫРЬЁ` → `01_EG_OS_БРЕНД` / `02_КЛИЕНТСКИЙ_ПУТЬ` / `03_КОНТЕНТ_СИСТЕМА` / `04…07` / `99_ДАЙДЖЕСТЫ_ДЛЯ_AI`

Keep `90_ВХОДЯЩИЕ/` for mixed dumps; curated empire knowledge stays under `03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/`.

---

```yaml
brief_for_factory:
  target_context:
    workspace: /Users/egoshev/Projects/atmosfera-3d
    memory_path: /Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory
    profile: workspace-cursor
    knowledge_vault_path: null  # optional later → 03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ if marker set
    vault_para: 03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ
  research_brief: null  # SKIP research today (Director: folder-only until tomorrow)
  synthesis_summary: >
    Living EG knowledge vault is a PARA folder problem today, not a Cursor
    artifact problem. Digest workflow (classify→summarize→product seeds) can
    run in Ask + @vault. When the workflow is stable and repeated, ship a Skill
    via factory — not alwaysApply rule, not a new research specialist agent.
  topic: eg-knowledge-intake — living vault + optional digest surface
  authoritative_facts:
    - "Decision: long+isolated+parallel → Subagent; one repeatable scenario → Skill; always-remember standards → Rule; slash → Command. KB: 13-agent-factory/agent-vs-skill-vs-command.md"
    - "Do NOT add Subagent when task <3 steps (Skill), reminder-only (Rule), one-shot slash (Command). KB: scaling-100-plus.md"
    - "alwaysApply bloat is a failure mode — prefer intelligent/globs/manual for PARA standards. KB: 03-kontekst/rules.md + plugin-auditor"
    - "Ask = read-only analysis; Plan → Agent for writing digests to disk. KB: 02-agent-i-rezhimy/"
    - "knowledge_vault_path is OPTIONAL marker; vault content must NOT be copied into agents/skills/KB. Ref: shared/project-memory-contract.md"
    - "Department law: do not invent new Research/Brain agents. Ref: department-orchestration-contract.md"
  official_urls:
    - https://cursor.com/docs/context/rules
    - https://cursor.com/docs/skills
    - https://cursor.com/ru/docs/subagents
    - https://cursor.com/docs/agent/plan-mode
    - https://cursor.com/help/ai-features/ask-mode
    - https://cursor.com/docs/agent/prompting
  recommended_artifact: deferred  # none today; later prefer skill
  artifact_ladder_later:
    today: folder PARA only (already started)
    mode_today: Ask + @03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ for digest in chat
    write_digests: Plan → Agent into 99_ДАЙДЖЕСТЫ_ДЛЯ_AI
    later_v1: skill (classify/summarize/product-seed checklist)
    later_optional: thin intelligent/manual rule for intake taxonomy; optional /command entry
    later_rare: readonly subagent only if long isolated verify/parallel digest
    never: new research/brain specialist agent for intake; alwaysApply mega-rule for digest
  constraints:
    - "TODAY: no factory create of rule/skill/agent/command"
    - "Do not invent new research agents"
    - "Do not clutter 90_ВХОДЯЩИЕ with curated empire masters"
    - "No medical claims in digests/product seeds"
    - "Do not copy vault notes into T-800 agents/skills/knowledge-base"
    - "block_factory:false does not require factory this session"
  stale_warnings:
    - "manifest last_full_sync 2026-07-02; age 24d — fresh (<30); soft maintainer for Cursor Router / side chats / models pools later"
    - "KB cards ~2026-07-02…07-06; decision matrix still authoritative for this routing"
  domains_called:
    - t-800-brain-context
    - t-800-brain-agents
  next_for_director:
    research: SKIP  # today
    research_tomorrow: LIGHT  # only if Skill/capture protocol design needed; else skip again
    research_deep: false  # not needed for PARA folder; marketplace patterns optional later
    factory: SKIP  # today
    soft_maintainer: queue later via /t800-update or Task(t-800-maintainer) — non-blocking
    continue_tomorrow:
      - finish vault indexing / README in EG_ИМПЕРИЯ_ЗНАНИЙ
      - decide if knowledge_vault_path marker needed
      - if digest is daily: Task(t-800-research-lead) LIGHT → prompt-craft → factory Skill
```

## Recommended next (explicit)

1. **Tonight / today:** folder-only — finish PARA under `EG_ИМПЕРИЯ_ЗНАНИЙ`; digest via Ask if needed.  
2. **Research:** **SKIP** now. Tomorrow: **LIGHT** only if building Skill; otherwise stay folder+Ask. **Not DEEP.**  
3. **Factory:** **SKIP** until Skill brief exists.  
4. **Maintainer:** soft queue (Router, side chats, pricing) — after Jul 31 risk window, non-blocking.

---

**Handoff:** parent may skip `Task(t-800-factory)` and `Task(t-800-research-lead)` for this session.
