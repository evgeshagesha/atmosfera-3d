# t-800-brain-lead — Atmosfera client-programs MVP

**Date:** 2026-08-05  
**Progress:** Brain ▸ domains: context+agents → brief ready  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**pack_name:** `atmosfera-client-programs-mvp`  
**Handoff:** → `Task(t-800-factory)` with this brief  
**status:** ok  
**Scope:** client-programs ONLY — **NO** director-rule / eg-director-brand in this factory run

**Sources:** `fragments/t-800-research-lead.md` (DEEP PASS) · `fragments/t-800-prompt-craft.md` (specs OK)

---

## Domains called

| Domain | Agent | Role |
|--------|-------|------|
| context | [brain-context](bb3fd24a-0b42-4bca-804d-c05ff2eb8d52) | skills/commands paths, frontmatter, disable-model-invocation, progressive refs, Cyrillic caveat |
| agents | [brain-agents](e9148af5-6073-439c-857a-dfabee8389dc) | HITL STOP, @/Read SoT, Agent-mode draft-only bans |

Skipped: cloud, dev, admin, security, tools, teya (not in scope).

---

## Architect decision (via brain-lead)

| Option | Verdict |
|--------|---------|
| Architecture A: 1 router skill + 4 refs + thin slash | **ACCEPT** |
| Architecture B: 3 thin skills | **REJECT** (drift) |
| Architecture C: monolith skill | **REJECT** (bloat / Zero-Copy fail) |
| Optional agent | **SKIP** |
| STYLE SPEC as SoT | **REJECT until user «утверждаю»** — cite as draft |
| Director-rule in same factory | **OUT OF SCOPE** |

---

## KB vs research reconcile

| Claim | Verdict |
|-------|---------|
| skill + `disable-model-invocation: true` | **PASS** — slash-only / HITL (mirror eg-news; NOT ambient like producer-studio `false`) |
| thin commands + skill body | **PASS** — workspace precedent; vendor commands page legacy-adjacent |
| Cyrillic `/программа` | **PASS ship** — Latin primary; alias like `/продюсер`; UX unverified in vendor docs |
| `$ARGUMENTS` | **PASS soft** — workspace convention; empty → ask |
| STYLE SPEC draft-cite until «утверждаю» | **PASS** — file header confirms черновик; skill sets `style_spec_status: pending` |
| Zero-Copy 50-programs / TEMPLATE / PDF premium | **PASS** — cite table only |
| Single STOP HITL | **PASS** — lighter than news dual-hash |
| Agent CREATE | **SKIP** |
| Site / VK / Remotion | **BAN** |

---

## brief_for_factory

```yaml
brief_for_factory:
  pack_name: atmosfera-client-programs-mvp
  target_context:
    workspace: /Users/egoshev/Projects/atmosfera-3d
    memory_path: /Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory
    artifact_surface: cursor-workspace
    target_plugin: null
    knowledge_vault_path: null
    ui_language: ru
  research_brief:
    ref: fragments/t-800-research-lead.md
    coverage_verdict: pass
    confidence: high
    sources_count: 22
  prompt_craft:
    ref: fragments/t-800-prompt-craft.md
    status: ok
  synthesis_summary: >
    CREATE one thin router skill eg-client-programs with progressive disclosure
    references (post-session, monthly-plan, long-term, bans-checklist), thin slash
    /eg-programma + Cyrillic alias /программа, HITL drafts to
    90_ВХОДЯЩИЕ/program-drafts/. Agent SKIP. Zero-Copy cite vault SoT;
    STYLE SPEC draft-gated until user «утверждаю». No PDF render, no site/VK/Remotion,
    no director-rule in this run.
  topic: "EG Atmosfera 3D client programs → skill + commands MVP"
  recommended_artifact: mix  # skill + commands (+ scaffold); agent skip
  action: CREATE
  domains_called:
    - t-800-brain-context
    - t-800-brain-agents

  create_artifacts:
    - kind: skill
      name: eg-client-programs
      path: .cursor/skills/eg-client-programs/SKILL.md
      frontmatter:
        name: eg-client-programs
        disable-model-invocation: true
        # description: Use when / Do NOT from prompt-craft; no Description Trap
      body: thin router — detect type → Read SoT + L3 ref + bans → draft → STOP
    - kind: skill_refs
      paths:
        - .cursor/skills/eg-client-programs/references/post-session.md
        - .cursor/skills/eg-client-programs/references/monthly-plan.md
        - .cursor/skills/eg-client-programs/references/long-term.md
        - .cursor/skills/eg-client-programs/references/bans-checklist.md
      note: L3 outlines per prompt-craft §2; one-level deep from SKILL.md
    - kind: command
      name: eg-programma
      path: .cursor/commands/eg-programma.md
      role: primary thin slash router → skill
      args: "post-session|monthly|long-term; empty→ask"
    - kind: command_alias
      name: программа
      path: .cursor/commands/программа.md
      role: Cyrillic alias of eg-programma; no duplicated logic; Latin primary
    - kind: scaffold
      path: 90_ВХОДЯЩИЕ/program-drafts/.gitkeep
      note: HITL drafts; PII never commit

  skip_artifacts:
    - agent
    - rule
    - hook
    - director-rule / eg-director-brand
    - client PDF generation
    - site / VK / Remotion pipelines

  cite_sot_zero_copy:
    - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/50-programs.mdc
    - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/programs/TEMPLATE-program.md
    - 03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/05_МЕТОДИКА_И_ПРАКТИКА/EG_CLIENT_PROGRAMS_STYLE_SPEC.md  # DRAFT until «утверждаю»
    - EG_PDF_PREMIUM_STYLE_SYSTEM.md  # cite-only outside repo
    - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/10-voice-and-language.mdc
    - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/20-products-prices.mdc
    - 90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/40-design-system.mdc
    - 03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/02_КЛИЕНТСКИЙ_ПУТЬ/HOME_AND_FREE_EQUIPMENT_FUNNEL.md
    - 90_ВХОДЯЩИЕ/CURSOR PROMPT ATMOSFERA 3D.md#§14

  precedents_mirror:
    - .cursor/skills/eg-producer-studio/SKILL.md  # thin + refs (but disable=false — do NOT copy that flag)
    - .cursor/commands/eg-producer.md
    - .cursor/commands/продюсер.md
    - .cursor/skills/eg-news-to-blog/SKILL.md  # disable-model-invocation true + HITL

  hitl:
    draft_path: 90_ВХОДЯЩИЕ/program-drafts/
    stop_phrase: "Утверждаю черновик"
    dual_hash: false
    auto_send: false
    draft_yaml_meta:
      - doc_type
      - "hitl: draft"
      - citations[]
      - refused_claims[]
      - "style_spec_status: pending|approved"

  product_boundary:
    - "Type1 post-session ≠ product «Персональная программа на 30 дней»"
    - "No full sets/reps protocol in post-session"
    - "Type3 = skeleton only (no PDF visual canon v1)"
    - "Services block from 20-products"

  style_spec_gate: >
    Cite EG_CLIENT_PROGRAMS_STYLE_SPEC.md as draft only. Do not promote to SoT.
    Do not block markdown drafts on pending status — allow draft-cited outlines;
    set style_spec_status: pending until user «утверждаю».
    File header (2026-08-05): «Не использовать как SoT, пока Евгений не скажет утверждаю».

  authoritative_facts:
    - "Skill path: `.cursor/skills/<name>/SKILL.md`; required frontmatter name+description; optional disable-model-invocation, paths, metadata — https://cursor.com/docs/skills"
    - "disable-model-invocation: true → explicit invoke only (slash); required for this pack"
    - "Progressive disclosure: thin SKILL + references/ one level deep — Cursor skills docs"
    - "Description Trap: description = routing only; body = algorithm — shared/prompt-craft-contract.md"
    - "Commands: `.cursor/commands/<name>.md`; thin router → skill; plugin/deeplinks still recognize commands/"
    - "Cyrillic slash: not in official docs; ship alias with Latin primary (local /продюсер precedent)"
    - "$ARGUMENTS: workspace convention only; fail soft if empty → ask"
    - "HITL STOP «Утверждаю …» is project gate, not Cursor API; single gate for this pack"
    - "Agent mode can write files — bans must be explicit in skill (no auto-send/publish)"
    - "Do NOT put agent 5-field schema (model/readonly/tools) on skill frontmatter"
    - "Decision: Command=slash; Skill=workflow; Agent=SKIP; Rule=out of this run"

  official_urls:
    - https://cursor.com/docs/skills
    - https://cursor.com/help/customization/skills
    - https://cursor.com/docs/agent/prompting
    - https://cursor.com/docs/agent/plan-mode
    - https://cursor.com/docs/reference/plugins
    - https://cursor.com/docs/reference/deeplinks
    - https://cursor.com/docs/subagents
    - https://agentskills.io

  constraints:
    - "CREATE only listed artifacts; agent/rule/hook SKIP"
    - "NO director-rule / eg-director-brand in this factory run"
    - "NO site code, VK pipeline, Remotion"
    - "NO client PDF generation / no embed EG_PDF_PREMIUM CSS/HTML"
    - "NO verbatim 50-programs or STYLE SPEC essays in SKILL.md"
    - "NO promote STYLE SPEC to SoT before user «утверждаю»"
    - "disable-model-invocation: true on skill"
    - "Latin /eg-programma primary; /программа alias-only"
    - "Brand bans: диагнозы; вылечим/исцеление/избавим навсегда; physician-claim «врач»; секретный/революционный; тело мечты"
    - "PII drafts not for git commit"
    - "After builder: Task(t-800-prompt-auditor) then factory-auditor"
    - "Mirror prompt-craft body_outlines; do not invent new architecture"

  open_questions_resolved:
    - {q: "STYLE SPEC draft vs hard-block", a: "draft-cited markdown ALLOWED; style_spec_status pending; hard-block only medical/product bans"}
    - {q: "Cyrillic /программа", a: "SHIP alias; Latin primary; verify UX post-CREATE"}
    - {q: "EG_КЛИЕНТЫ/", a: "defer; keep program-drafts/ for v1"}
    - {q: "Type3 PDF canon", a: "defer; long-term.md skeleton only"}

  stale_warnings:
    - "Plugin KB manifest pages last_synced ~2026-07-02 (~34d > 30) — prefer live official URLs for skills frontmatter"
    - "KB skills.md incomplete vs current docs (paths/references/disable-model-invocation) — use https://cursor.com/docs/skills"
    - "cursor.com/docs/agent/chat/commands redirects to Skills help — dedicated Commands reference retired; thin .cursor/commands still valid workspace pattern"
    - "$ARGUMENTS not in current official docs"
    - "HITL/draft-only not in T-800 KB — copy eg-producer / eg-news patterns"
    - "STOP/quote-ground = project convention, not Cursor API"

  factory_handoff:
    next: "Task(t-800-factory)"
    pack_name: atmosfera-client-programs-mvp
    prompt_craft_ref: fragments/t-800-prompt-craft.md
    research_ref: fragments/t-800-research-lead.md
```

---

## Progress line (parent)

`Brain ▸ domains: context+agents → brief ready` · pack **atmosfera-client-programs-mvp** · → `Task(t-800-factory)`
