# t-800-research-lead — anketaplan DEEP research_brief

> Generated: 2026-08-08 · Mode: DEEP · status: ok  
> Pipeline: strategist → docs∥github∥vendor → repo-miner(4) → community∥clawhub∥news → synthesizer  
> Workspace: `/Users/egoshev/Projects/atmosfera-3d`  
> memory_path: `.cursor/t800-memory`  
> Next handoff: brain-lead → factory (skill `eg-anketaplan` + Dev site-next)

## Progress

`Research ▸ strategist→7 specialists→synthesis` · coverage **PASS** · confidence **high**

## Local SoT (not a research channel)

| Path | Fact |
|------|------|
| `site-next/lib/notifications/telegram.ts` | `sendMessage` only; `STRATEGY_TG_*` → `TELEGRAM_*`; `not_configured` soft-ok |
| `site-next/app/api/strategy/lead/route.ts` | normalize → honeypot → validate → TG → 400/502/`ok+delivered` |
| `site-next/components/strategy/StrategyFormModal.tsx` | client `fetch` + submitting lock; error keeps form |
| `90_ВХОДЯЩИЕ/anketaplan-source/master-client-intake.html` | 12 гл., LS `egoshev_master_intake_v3`, `#chapter-N`, BMI/BMR, ветки, passport |
| `site-next` package | Next **16.2.10** · React 19 · **no** RHF/Zod yet |
| `/anketa` | components/anketa — **do not touch**; kids-anketa separate |

---

```yaml
research_brief:
  mode: deep
  topic: "Port master-client-intake.html → Next App Router+TS /anketaplan on site-next (eg.egoshev.ru/Timeweb); TG submit + .txt; skill eg-anketaplan + Dev handoff"
  status: ok
  search_plan:
    must: [docs, github, repo-miner, vendor-docs]
    should: [community, clawhub]
    nice: [news]
    skip: [vercel-as-deploy-target, always-on-other-libs, local-as-channel]
  synthesis:
    compared:
      - A: "Heavy Client + neon CSS (UI parity)"
      - B: "RHF+Zod multi-step (maintainability / LS)"
      - C: "Extend telegram.ts + mirror strategy/lead (API)"
    recommended_approach: >
      Hybrid A∪B∪C — Neon client island on /anketaplan (A) + SSR-safe localStorage,
      chapter gates, clear-on-delivered, submitting lock from B (Zod preferred;
      RHF optional day-1) + POST /api/anketaplan/submit and telegram.ts
      sendDocument mirroring strategy/lead (C). Skill eg-anketaplan = HITL/ops
      + Dev handoff only — no production codegen in skill.
    rationale: >
      UI parity forces A; delivery/security/Timeweb force C; persistence and
      chapter gates need selective B — not full multi-route RHF. Pure A/B/C
      each fail ≥1 axis; hybrid covers all without touching /anketa or Vercel domain.
    merge_plan: >
      Factory builds skill eg-anketaplan (WHEN/DO NOT, cite site-next paths, HITL,
      Dev handoff checklist, forbid secrets & /anketa). Dev implements in site-next:
      (1) thin RSC page app/anketaplan/page.tsx + CSS module neon port;
      (2) one heavy 'use client' island (chapters/chips/scales/branches/pain/BMI/BMR/passport);
      (3) LS key egoshev_master_intake_v3 + currentChapter + optional #chapter-N;
      hydrate after mount; (4) per-chapter Zod + full schema before POST;
      (5) app/api/anketaplan/submit/route.ts = normalize→honeypot→consent/size/validate→
      short sendMessage then sendDocument(.txt+filename)→400/502/ok+delivered;
      (6) extend lib/notifications/telegram.ts with FormData sendDocument (no new SDK);
      (7) client lock + sending|sent|error + retry keeps draft; clear LS only on delivered;
      (8) Timeweb smoke on eg.egoshev.ru/anketaplan — Vercel README = adapt patterns only.
    adaptation_plan: >
      Ship inside existing site-next on Timeweb (PM2 egoshev + nginx + eg.egoshev.ru).
      Do NOT create a separate Vercel project/domain. Rewrite any user-TZ Vercel README
      steps to: VPS .env (TELEGRAM_* server-only), nginx client_max_body_size,
      next build + pm2 restart, smoke TG message+.txt. Prefer next@16.2.11+ before
      enable (Jul 2026 custom-server SSRF). Align proxyClientMaxBodySize if proxy.ts
      buffers Route Handlers. HTML-escape TG summary; caption ≤1024; ch11 no uploads on page.

  recommended_architecture:
    page: "Thin RSC shell (metadata/canonical) + one heavy Client Component island"
    not: "RSC-per-chapter OR multi-route /anketaplan/stepN (hurts neon UI parity)"
    styles: "CSS Modules (or colocated anketaplan.css) porting monolith neon tokens/glow"
    state: "Controlled form state + SSR-safe LS hydrate (BBEDERRAR pattern); Zod chapter gates"
    deps_day1: "Zod preferred; RHF optional (site-next has neither today)"

  api_route_shape:
    path: "POST /api/anketaplan/submit"  # namespaced; avoid bare /api/submit collision
    mirror: "app/api/strategy/lead/route.ts"
    flow:
      - "request.json() → normalize"
      - "honeypot → pretend ok"
      - "consent required"
      - "size limit (app guard; nginx align)"
      - "server validation (Zod)"
      - "anti double-submit: client lock + optional Idempotency-Key"
      - "sendTelegramMessage(short HTML summary)"
      - "sendTelegramDocument(.txt Buffer/Blob + filename + caption)"
      - "both fail → 502; not_configured → soft delivered:false like strategy"
    telegram_extend:
      file: "lib/notifications/telegram.ts"
      add: "sendTelegramDocument via multipart FormData; MUST pass filename 3rd arg"
      no: "grammY / node-telegram-bot-api dependency for one-shot notify"
    client_ux: "sending | sent | error; retry without clearing LS until delivered"

  port_method:
    source: "90_ВХОДЯЩИЕ/anketaplan-source/master-client-intake.html"
    preserve:
      - "white neon glow / chips / scales / 12 chapters / progress"
      - "conditional branches kids/women/men/sport"
      - "pain zone cards; age/BMI/BMR/calories"
      - "localStorage egoshev_master_intake_v3; passport summary"
      - "hash #chapter-N deep-link"
    technique: >
      Extract CSS→module; rewrite vanilla JS→React client island; keep serialize/
      validateChapter/branches/calculateBody/build passport semantics; wire FORM_CONFIG
      endpoint → /api/anketaplan/submit. Do not iframe or dangerouslySetInnerHTML the
      whole monolith if avoidable (hydration/security); controlled port preferred.

  skill_boundary:
    slug: eg-anketaplan
    does: "HITL clarify, path citations, Dev handoff, deploy checklist, TG pattern cite"
    does_not: "bake tokens; auto-post PII; touch /anketa; full production codegen; Vercel domain"

  risks:
    - "LS hydrate flash / chapter jump if read during SSR"
    - "Partial TG success (msg ok, doc fail) — enforce both-or-502"
    - "PII in localStorage drafts; no analytics on same key"
    - "proxyClientMaxBodySize silent truncate (~10MB) on self-host"
    - "FormData without filename → TG rejects/odd name"
    - "Accidental edits to /anketa or components/anketa"
    - "Scope creep: full RHF day-1 vs under-validation if Zod deferred"
    - "site-next on 16.2.10; Jul 2026 patch line prefers 16.2.11+ for custom server"
    - "Skill→prod without HITL / secrets in handoff"

  open_questions:
    - "ANKETAPLAN_TG_* overrides vs reuse STRATEGY_TG_*/TELEGRAM_* only?"
    - "Controlled+Zod-only vs add react-hook-form day-1?"
    - "In-place success UI vs /anketaplan/success?"
    - "Server Idempotency-Key or client lock enough for v1?"
    - "Hard-gate next@16.2.11+ before production enable?"
    - "Explicit MB cap for nginx (recommend 1–2MB JSON passport)?"

  recommended_artifact: skill
  artifact_surface: cursor-workspace
  artifact_note: "skill eg-anketaplan (HITL/handoff) + Dev implements pages in site-next — mix intent"

  sources:
    - { id: 1, channel: docs, url: "Context7 /vercel/next.js Route Handlers + forms", date: "2026-08-08", freshness: ok }
    - { id: 2, channel: docs, url: "https://nextjs.org/docs/app/guides/forms", date: "2026-07-28", freshness: ok }
    - { id: 3, channel: docs, url: "https://nextjs.org/docs/app/guides/environment-variables", date: "2026-03-03", freshness: ok }
    - { id: 4, channel: vendor, url: "https://core.telegram.org/bots/api", date: "2026-07-14", freshness: ok }
    - { id: 5, channel: vendor, url: "https://core.telegram.org/bots/features", date: "2026-08-08", freshness: ok }
    - { id: 6, channel: vendor, url: "https://cursor.com/docs/context/skills", date: "2026-08-08", freshness: ok }
    - { id: 7, channel: vendor, url: "https://agentskills.io/specification", date: "2026-08-08", freshness: ok }
    - { id: 8, channel: vendor, url: "https://vercel.com/docs/projects/environment-variables", date: "2026-06-16", freshness: ok, note: "adapt-only→Timeweb" }
    - { id: 9, channel: github, url: "https://github.com/BBEDERRAR/social-support-app", date: "2026-06-25", freshness: ok }
    - { id: 10, channel: github, url: "https://github.com/63r6o/shadcn-nextjs-multistep-form-example", date: "2024-11-05", freshness: warn }
    - { id: 11, channel: github, url: "https://github.com/jilimb0/TGWrapper", date: "2026-07-20", freshness: ok }
    - { id: 12, channel: github, url: "https://github.com/yagop/node-telegram-bot-api", date: "2026-07-14", freshness: ok }
    - { id: 13, channel: community, url: "https://stackoverflow.com/questions/78223440", date: "2024-03-26", freshness: ok }
    - { id: 14, channel: community, url: "https://stackoverflow.com/questions/77902231", date: "2024-01-29", freshness: ok }
    - { id: 15, channel: community, url: "https://habr.com/ru/articles/879174/", date: "2025-02-04", freshness: ok }
    - { id: 16, channel: community, url: "https://habr.com/ru/companies/yoomoney/articles/991712/", date: "2026-02-02", freshness: ok }
    - { id: 17, channel: news, url: "https://nextjs.org/blog/july-2026-security-release", date: "2026-07-20", freshness: ok }
    - { id: 18, channel: clawhub, url: "https://clawhub.ai/alirezarezvani/form-cro", date: "2026-08-08", freshness: ok }

  github:
    top_repos: [BBEDERRAR/social-support-app, 63r6o/shadcn-nextjs-multistep-form-example, jilimb0/TGWrapper, yagop/node-telegram-bot-api]
  repo_mines:
    count: 4
    primary_client: BBEDERRAR/social-support-app
    primary_tg_semantics: yagop/node-telegram-bot-api
    primary_tg_formdata: jilimb0/TGWrapper
  community: { findings: 6, pitfalls: [hydration, double-submit, body-limits, tg-multipart, long-wizard-ux] }
  clawhub: { skill_slug_target: eg-anketaplan, rejected_verbatim: true, reject_token_bake: true }
  vendor_docs: { telegram_sendDocument: required, cursor_skills: required, vercel: adapt_only }
  docs: { next: "16.2.10", transport: "Route Handler + client fetch", client_island: true }
  news: { patch_hint: "16.2.11+ custom-server SSRF Jul 2026", proxy_body: "silent truncate default 10MB" }

  coverage_matrix:
    strategist: pass
    synthesizer: pass
    github_shallow: pass
    repo_mines: pass  # 4 ≥ 2
    community: pass
    clawhub: pass
    vendor_docs: pass
    context7_docs: pass
    news: pass
    sources_count: 18
    dated_sources_ok: 17  # ≥8; 63r6o warn but counted with fresher BBEDERRAR
    verdict: pass

  stale_rejected: []
  confidence: high
  explicit_vercel_note: >
    User TZ may mention Vercel README — treat as pattern source only.
    Production URL is https://eg.egoshev.ru/anketaplan on Timeweb inside site-next.
```

## Specialist fragments

- `fragments/t-800-research-strategist.md`
- `fragments/t-800-research-docs.md`
- `fragments/t-800-research-github.md`
- `fragments/t-800-research-vendor-docs.md`
- `fragments/t-800-research-repo-miner.md`
- `fragments/t-800-research-community.md`
- `fragments/t-800-research-clawhub.md`
- `fragments/t-800-research-news.md`
- `fragments/t-800-research-synthesizer.md`
