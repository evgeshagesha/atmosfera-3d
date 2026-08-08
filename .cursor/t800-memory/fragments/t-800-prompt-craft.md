# t-800-prompt-craft — eg-anketaplan skill

> Generated: 2026-08-08 · status: **ok**  
> Artifact: **skill** `eg-anketaplan` · vendor: **cursor**  
> memory_path: `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
> Source: `fragments/t-800-research-lead.md` DEEP PASS (anketaplan)  
> Handoff: → factory-builder (SKILL.md only) → prompt-auditor  
> **NOT done:** production Write of `.cursor/skills/**` (factory) · site-next codegen (Dev)

---

## pack_meta

```yaml
pack_meta:
  name: eg-anketaplan
  architecture: thin_skill_plus_refs  # SKILL.md + optional references/
  path: .cursor/skills/eg-anketaplan/SKILL.md
  hitl: true  # checklist / clarify / Dev handoff — no auto-submit PII
  skill_boundary_from_research:
    does: "HITL clarify, path citations, Dev handoff, deploy smoke checklist, TG pattern cite"
    does_not: "bake tokens; auto-post PII; touch /anketa; full production codegen; Vercel domain"
  ui_language: ru
  brand: "Атмосфера 3D"
  never:
    - medical_promises
    - bake_TELEGRAM_secrets
    - touch_anketa_route  # /anketa + components/anketa
    - production_codegen_in_skill
    - vercel_new_project
    - auto_post_client_PII
    - copy_price_tables  # Zero-Copy → 20-products-prices.mdc
  cite_sot:
    - site-next/app/anketaplan/  # target page (Dev)
    - site-next/app/api/anketaplan/submit/  # target API (Dev)
    - site-next/lib/notifications/telegram.ts
    - site-next/app/api/strategy/lead/route.ts  # mirror pattern
    - 90_ВХОДЯЩИЕ/anketaplan-source/master-client-intake.html
    - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/20-products-prices.mdc
    - .cursor/rules/atmosfera-3d.mdc
  precedent:
    - .cursor/skills/eg-bot-manager-flow/SKILL.md  # cite-only + handoff
    - .cursor/skills/eg-client-programs/SKILL.md  # HITL + progressive disclosure
```

---

## prompt_spec

```yaml
status: ok
prompt_spec:
  artifact: skill
  action: CREATE
  vendor: cursor
  idea_seeds_used:
    - id: progressive_disclosure_skill
      url: https://cursor.com/docs/context/skills
      pattern: "Short description = discovery; body = workflow; heavy TG/deploy tables → references/"
    - id: agentskills_boundaries
      url: https://agentskills.io/specification
      pattern: "When/Do NOT in description; skill ≠ app; handoff code out of skill"
    - id: telegram_sendDocument_limits
      url: https://core.telegram.org/bots/api
      pattern: "Cite sendMessage≤4096 + sendDocument+filename + caption≤1024; no token in client"
  path: .cursor/skills/eg-anketaplan/SKILL.md
  references_suggested:
    - .cursor/skills/eg-anketaplan/references/sot-paths.md
    - .cursor/skills/eg-anketaplan/references/telegram-contract.md
    - .cursor/skills/eg-anketaplan/references/dev-handoff-checklist.md
  frontmatter:
    # Skill frontmatter — NOT agent 5-field set (no model/readonly/is_background)
    name: eg-anketaplan
    description: |
      HITL-чеклист и Dev-handoff для месячного плана после покупки консультации:
      SoT `/anketaplan`, source HTML, API submit, Telegram ops (Атмосфера 3D).
      Use when: anketaplan · анкета плана · месячный план после консультации ·
      intake master-client · TG submit .txt · smoke eg.egoshev.ru/anketaplan ·
      handoff Dev site-next.
      Do NOT use when: правка production Next-кода внутри skill (→ Dev/site-next);
      трогать `/anketa` / kids-anketa; бот P02 / Prodamus; eg-client-programs
      (текст программы); eg-producer / Remotion; Vercel-проект; секреты TELEGRAM_*;
      медобещания; Zero-Copy — не копировать цены в skill.
    # omit disable-model-invocation → agent may auto-match on anketaplan keywords
  body_outline:
    - "Роль: HITL-навигатор intake месячного плана; не генератор Next-приложения"
    - "Что читать (cite only): master-client HTML; strategy/lead mirror; telegram.ts; 20-products-prices; atmosfera-3d.mdc"
    - "Алгоритм: (1) уточнить цель HITL 1–3 Q (2) сверить SoT-пути (3) бренд/бан-чек (4) Dev handoff checklist (5) deploy smoke Timeweb (6) STOP — код пишет Dev"
    - "Выход: YAML handoff_pack { goal, sot_paths[], bans[], open_questions[], smoke[] } + ссылки на references/"
    - "Связи: calledBy user|/eg-anketaplan; handoff Dev site-next; не Task(factory) из skill body"
    - "Запреты: secrets; /anketa; codegen app/**; Vercel domain; auto-TG PII; медобещания; price dump"
  skelton_sections_for_builder:
    - "# eg-anketaplan"
    - "## Роль"
    - "## Когда применять / Не применять"
    - "## SoT paths (cite only) — table"
    - "## Workflow HITL (numbered)"
    - "## Dev handoff (what Dev builds — cite research merge_plan, no full code)"
    - "## Brand & bans"
    - "## Выход"
    - "## Запреты"
  craft_notes_for_builder:
    - "Keep SKILL.md ≤ ~120 lines; push TG limits + deploy smoke to references/"
    - "Dev handoff = checklist bullets from research merge_plan steps 1–8 — NOT paste full page code"
    - "Mirror tone/structure of eg-bot-manager-flow (RU, tables, handoff matrix)"
    - "LS key cite: egoshev_master_intake_v3; API: POST /api/anketaplan/submit; prod: https://eg.egoshev.ru/anketaplan"
    - "Open questions from research → leave as HITL clarify list, do not invent answers"
    - "Anti Description Trap: description = routing only; algorithm stays in body"
  anti_patterns_avoided:
    - "Description Trap (full Next architecture in description)"
    - "Skill as production codegen / iframe of master HTML"
    - "tools: in frontmatter (N/A for skill; still no agent-style tools field)"
    - "Baking TELEGRAM_* or NEXT_PUBLIC_ tokens"
    - "Confusing /anketa with /anketaplan"
    - "Vercel-as-deploy-target instructions"
    - "Copying price tables into skill (Zero-Copy)"
    - "Medical promises / diagnosis language"
```

---

## Builder one-liner

`CREATE` `.cursor/skills/eg-anketaplan/SKILL.md` (+ 3 thin `references/*`) from `prompt_spec` above · then `Task(t-800-prompt-auditor)`.

---

## QA preflight (for prompt-auditor)

| Check | Expect |
|-------|--------|
| artifact | skill |
| description | Use when + Do NOT present |
| Description Trap | fail if Next island/API pasted into description |
| secrets | none |
| /anketa | explicitly Do NOT |
| handoff | Dev/site-next explicit |
| frontmatter | name + description only (skill) |
