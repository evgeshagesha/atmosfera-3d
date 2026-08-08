# t-800-brain-lead — eg-anketaplan

**Date:** 2026-08-08  
**Progress:** Brain ▸ domains: context+security → brief ready  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**pack_name:** `eg-anketaplan`  
**Handoff:** → `Task(t-800-factory)` with this brief  
**status:** ok  
**Scope:** skill `eg-anketaplan` (+ thin slash) ONLY — **NO** production site-next codegen in factory

**Sources:** `fragments/t-800-research-lead.md` · `fragments/t-800-research-synthesizer.md` · domain brains context+security

---

## Domains called

| Domain | Agent | Role |
|--------|-------|------|
| context | [brain-context](02907721-bd2c-4b14-bed3-95bf6d644d36) | skill path, frontmatter, disable-model-invocation, progressive refs, Zero-Copy, slash companion, handoff≠bot-engineer |
| security | [brain-security](d5531fba-bb50-489c-8c48-be219d97bfff) | TELEGRAM_* reuse, secrets, Idempotency day-1, PII LS, both-or-502 |

Skipped: agents, cloud, dev, admin, tools, teya (skill+site-notify; Cursor SDK/Cloud/Teams N/A; agents not needed beyond HITL already in context precedents).

---

## Open questions → brain defaults (brand/ops-safe)

| # | Question | Decision | Why |
|---|----------|----------|-----|
| 1 | `TELEGRAM_*` vs `ANKETAPLAN_TG_*` | **Reuse** `STRATEGY_TG_*` → `TELEGRAM_*` chain in `telegram.ts` | Least VPS friction; matches strategy/lead; isolate chat later only if ops needs separate inbox |
| 2 | RHF day-1? | **Zod day-1; RHF SKIP** | Research: Zod preferred; site-next has neither; controlled state ports neon cleanly; add RHF later if DX pain |
| 3 | Idempotency-Key? | **Client submitting lock day-1** | No durable store on Timeweb yet; both-or-502 + lock enough for v1; optional server key later |
| 4 | Success UX | **In-place passport / success state** (same page) | HTML SoT parity; no `/anketaplan/success` route day-1 |
| 5 | next@16.2.11+ | **Recommend hard-gate before production enable** (Dev note; not skill blocker) | Jul 2026 custom-server SSRF patch |
| 6 | nginx body | **Recommend 1–2MB** for JSON+txt dump (Dev note) | Passport dump not photo mega-upload |

---

## KB vs research reconcile

| Claim | Verdict |
|-------|---------|
| Artifact = skill HITL/ops + Dev handoff | **PASS** — not HTML forge; not subagent |
| `disable-model-invocation: true` | **PASS** — HITL slash-like (eg-news / client-programs) |
| Thin `/eg-anketaplan` command | **PASS** — HITL precedent |
| Progressive `references/*` | **PASS** — keep SKILL.md thin |
| Handoff → Dev/site-next, not eg-bot-engineer | **PASS** — P01 Next vs P02 Python bot |
| Reuse TELEGRAM_* / STRATEGY_TG_* | **PASS** — security + local SoT |
| No ANKETAPLAN_TG_* day-1 | **PASS** |
| Zod day-1 / RHF optional SKIP | **PASS** — research hybrid selective B |
| Client lock; no Idempotency store day-1 | **PASS** — security default |
| In-place success | **PASS** — UI parity |
| both-or-502 for msg+doc | **PASS** |
| Zero-Copy prices / brand bans | **PASS** — cite SoT only |
| Do not touch `/anketa` | **PASS** — hard constraint |
| Timeweb eg.egoshev.ru only | **PASS** — not Vercel domain |
| Skills not in agents-registry calls/calledBy | **PASS** — handoff table in body only |
| Skill frontmatter model/readonly | **N/A** — those fields are for subagents |

---

## brief_for_factory

```yaml
brief_for_factory:
  pack_name: eg-anketaplan
  target_context:
    workspace: /Users/egoshev/Projects/atmosfera-3d
    memory_path: /Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory
    artifact_surface: cursor-workspace
    target_plugin: null
    knowledge_vault_path: null
    ui_language: ru
    site_root: 01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next
  research_brief:
    ref: fragments/t-800-research-lead.md
    synthesis_ref: fragments/t-800-research-synthesizer.md
    coverage_verdict: pass
    confidence: high
  prompt_craft:
    ref: null
    note: "If prompt-craft fragment missing for this pack, factory prompt-auditor uses this brain brief + clawhub when/do-not patterns"
  synthesis_summary: >
    Hybrid A∪B∪C: thin RSC /anketaplan + one neon client island from
    master-client-intake.html; POST /api/anketaplan/submit mirroring strategy/lead;
    extend telegram.ts sendDocument; skill eg-anketaplan = HITL/ops + Dev handoff
    only — Dev builds site-next AFTER factory. Defaults: reuse TELEGRAM_/STRATEGY_TG_,
    Zod day-1 without RHF, client submit-lock, in-place success, both-or-502.
  topic: "eg-anketaplan skill + Dev handoff for /anketaplan on eg.egoshev.ru"
  authoritative_facts:
    - "Skill path: .cursor/skills/eg-anketaplan/SKILL.md; name must match folder"
    - "disable-model-invocation: true (slash/HITL, not ambient)"
    - "Thin companion command: .cursor/commands/eg-anketaplan.md → read SKILL + refs"
    - "Progressive refs: dev-handoff-checklist, cite-paths, hitl-gates, tone-bans"
    - "No agents-registry calls/calledBy for skills — Handoff table in SKILL body"
    - "Handoff primary: Dev / main Agent → site-next; NOT eg-bot-engineer"
    - "Route: eg.egoshev.ru/anketaplan on Timeweb site-next — NOT separate Vercel"
    - "Do NOT touch /anketa or components/anketa"
    - "API: POST /api/anketaplan/submit; honeypot; server Zod; sendMessage then sendDocument(.txt+filename); both-or-502"
    - "telegram.ts: extend sendTelegramDocument; env STRATEGY_TG_* → TELEGRAM_*; never NEXT_PUBLIC_*"
    - "LS key egoshev_master_intake_v3; clear only on delivered:true (and honeypot soft-ok)"
    - "Zod day-1; RHF SKIP day-1; controlled React state for neon parity"
    - "Success UX: in-place (passport/success state), no /success route day-1"
    - "Idempotency: client submitting lock day-1; no server Idempotency-Key store day-1"
    - "Zero-Copy: cite products/prices SoT — never embed price tables in skill"
    - "Brand bans: вылечим / исцеление / избавим навсегда / секретный·революционный / тело мечты / диагноз-ярлык; never «врач»"
  official_urls:
    - "https://cursor.com/docs/skills"
    - "https://cursor.com/docs/context/rules"
    - "https://cursor.com/docs/agent/security"
    - "https://core.telegram.org/bots/api"
  recommended_artifact: skill
  companion_artifacts:
    - type: command
      path: .cursor/commands/eg-anketaplan.md
      role: thin slash router to skill
  naming:
    skill: eg-anketaplan
    command: eg-anketaplan
    route_cite: /anketaplan
    api_cite: /api/anketaplan/submit
  subagent_fields:
    # N/A for skill — do NOT invent on SKILL.md
    readonly: N/A
    model: N/A
    is_background: N/A
  calls_graph:
    # Skills: body handoff only (not agents-registry)
    skill_handoff:
      primary: "Dev / site-next Agent (implement Hybrid A∪B∪C)"
      not:
        - eg-bot-engineer
        - eg-bot-knowledge
        - remotion-*
        - eg-news-to-blog
        - eg-producer-*
      pairsWith: []  # do not invent site agent
    factory_creates:
      - .cursor/skills/eg-anketaplan/SKILL.md
      - .cursor/skills/eg-anketaplan/references/dev-handoff-checklist.md
      - .cursor/skills/eg-anketaplan/references/cite-paths.md
      - .cursor/skills/eg-anketaplan/references/hitl-gates.md
      - .cursor/skills/eg-anketaplan/references/tone-bans.md
      - .cursor/commands/eg-anketaplan.md
    factory_does_not_create:
      - site-next/app/anketaplan/**
      - site-next/app/api/anketaplan/**
      - production edits to telegram.ts (cite only in skill; Dev implements)
  architecture_for_dev_handoff_cite:
    page: "app/anketaplan/page.tsx thin RSC + one heavy client island"
    styles: "CSS Modules from master-client-intake.html neon"
    state: "controlled + LS egoshev_master_intake_v3 + currentChapter + #chapter-N; hydrate after mount"
    validation: "Zod per-chapter + full schema before POST; RHF optional later"
    api: "POST /api/anketaplan/submit mirror strategy/lead"
    telegram: "sendMessage then sendDocument FormData+filename; both-or-502; not_configured soft like lead"
    success_ux: "in-place"
    idempotency: "client lock day-1"
    env: "STRATEGY_TG_* | TELEGRAM_* server-only; no ANKETAPLAN_TG_* day-1"
    deploy: "Timeweb eg.egoshev.ru; pm2 restart after env; recommend next@16.2.11+ before enable"
    ch11: "no file upload from page — text summary in .txt only"
  zero_copy_cite_only:
    - "03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/01_EG_OS_БРЕНД/OWNERSHIP_MAP.md"
    - "03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/01_EG_OS_БРЕНД/TRAINING_SYSTEM_POSITIONING_MASTER.md"
    - "03_РЕСУРСЫ/config/products.yaml"
    - "00_ПУЛЬТ_УПРАВЛЕНИЯ/ГЛАВНЫЙ_КОНТЕКСТ.md"
    - "90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/20-products-prices.mdc"
    - "90_ВХОДЯЩИЕ/anketaplan-source/master-client-intake.html"
    - "01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next/lib/notifications/telegram.ts"
    - "01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next/app/api/strategy/lead/route.ts"
    - "01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next/components/strategy/StrategyFormModal.tsx"
  constraints:
    - "Factory CREATE skill (+ thin command + references) ONLY — no production HTML/TSX as done"
    - "Main chat / non-factory MUST NOT Write skills/commands — Task(t-800-factory) only"
    - "Do NOT touch /anketa"
    - "Do NOT bake TELEGRAM_* / tokens / NEXT_PUBLIC secrets into skill or examples"
    - "Do NOT auto-send PII to TG/email/CRM from skill"
    - "HITL STOP before deploy / enable TG / production route"
    - "Do NOT assume Vercel as deploy target"
    - "Do NOT add grammY / node-telegram-bot-api for one-shot notify"
    - "Do NOT use Server Action as primary TG BFF"
    - "Zero-Copy: no price/product essays in skill body"
    - "Brand bans in skill + tone-bans ref (med claims, physician-claim, cheap fitness spam)"
    - "YouTube/content: never eg.egoshev.ru as CTA domain confusion — route is intentional product page on eg.egoshev.ru/anketaplan"
  decisions_locked:
    telegram_env: reuse_STRATEGY_TG_then_TELEGRAM
    rhf_day1: skip
    zod_day1: required
    idempotency: client_lock_day1
    success_ux: in_place
    anketaplan_tg_isolation: deferred
  stale_warnings:
    - "KB manifest pages last_synced ~2026-07-02 (>30d from 2026-08-08) — prefer live cursor.com/docs/skills + agent/security"
    - "telegram.ts currently sendMessage only — sendDocument is Dev extension after skill"
    - "prompt-craft fragment for this pack may be absent — use brain when/do-not"
  domains_called:
    - context
    - security
```

---

## Progress note for Director

`Brain ▸ domains: context+security → brief ready` → next `Task(t-800-factory)` with pack `eg-anketaplan`.
