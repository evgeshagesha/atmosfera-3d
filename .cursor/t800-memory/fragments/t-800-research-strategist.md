# t-800-research-strategist — anketaplan Next.js port

> Generated: 2026-08-08 · Mode: DEEP · Intent: mix (skill wrapper + Dev handoff)  
> Workspace: `/Users/egoshev/Projects/atmosfera-3d`  
> memory_path: `.cursor/t800-memory`

## Probe notes (strategist only — not findings)

- Local SoT already exists: `site-next/app/api/strategy/lead/route.ts` + `lib/notifications/telegram.ts` (**sendMessage only** — no `sendDocument` yet). Compare is **local**, not a research channel.
- Source monolith: `90_ВХОДЯЩИЕ/anketaplan-source/master-client-intake.html` — 12 chapters, branches, pain cards, BMI/BMR, `localStorage` key `egoshev_master_intake_v3`, passport summary.
- `/anketa` must stay untouched; new route `/anketaplan` on same Next app → Timeweb `eg.egoshev.ru`.
- Probe GitHub: strong candidates for miner — `63r6o/shadcn-nextjs-multistep-form-example` (Context+localStorage+Zod+ssr:false), `SametAydinhan/multi-step-form-nextjs` (RHF+Zod), Zustand-persist wizards as runner-up pattern.
- Probe docs: Route Handler preferred over Server Actions for large JSON + TG file attach + explicit status codes; Vercel body limits ≠ Timeweb Node/PM2 (self-host more forgiving, still need size cap).

---

```yaml
status: ok
search_plan:
  topic: "Port monolithic master-client-intake.html → Next.js App Router+TS page /anketaplan on site-next (eg.egoshev.ru/Timeweb); TG submit API with .txt attach; skill wrapper eg-anketaplan + Dev handoff (no production code in research)"
  intent_artifact: mix
  mode: deep
  product_constraints:
    preserve_ui:
      - white neon glow
      - 12 chapters + progress
      - chips, scales, conditional branches (kids/women/men/sport)
      - pain zone cards
      - auto age/BMI/BMR/calories
      - localStorage persist/restore
      - final passport summary
    api:
      - "POST /api/submit OR /api/anketaplan/submit"
      - server-only TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
      - short TG message + .txt attachment
      - anti double-submit, validation, size limit, consent
      - UX states: sending|sent|error; retry without data loss
    do_not_touch: ["/anketa"]
    source: "90_ВХОДЯЩИЕ/anketaplan-source/master-client-intake.html"
    deploy_target: "Timeweb VPS eg.egoshev.ru (NOT separate Vercel domain)"
    local_compare_not_channel:
      paths:
        - "01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next/app/api/strategy/lead/route.ts"
        - "01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next/lib/notifications/telegram.ts"
        - "01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next/components/strategy/*"
        - "01_ПРОЕКТЫ/P01_сайт_и_сервер/КАНОН_ДОМЕН_eg.egoshev.ru.md"
      note: "Research-lead/synthesizer MUST compare TG pattern locally; do not invent a 'local' channel id."

  expected_sources_total: "≥10 dated (DEEP minima ≥8); target 12–16 across channels"
  expected_repo_mines: 2

  channels:
    - id: docs
      priority: must
      specialist: t-800-research-docs
      why: "Official Next.js App Router truth for Route Handlers, request.formData/json, Client Components, forms UX (pending/error), body limits — Context7 required by brief."
      sites_or_hubs:
        - "Context7 → /vercel/next.js"
        - "https://nextjs.org/docs"
      queries:
        - "App Router Route Handlers POST request.json request.formData"
        - "Next.js forms Client Components useActionState vs fetch Route Handler"
        - "body size limits serverActions vs route handlers Node runtime"
        - "dynamic ssr false localStorage client-only patterns"
        - "NextResponse JSON status 400 413 429 502"
      context7:
        library_hint: "/vercel/next.js"
        max_queries: 5
        focus:
          - "Route Handlers"
          - "mutating data / forms"
          - "Client Components"
          - "File conventions app router"
      expected_source_count: 4
      notes_for_specialist: |
        Prefer Context7 over blog spam. Extract: when Route Handler vs Server Action;
        how to return typed JSON errors; Node runtime for Telegram fetch + Buffer/Blob;
        any guidance on large POST payloads. Flag Next version drift vs site-next package.json.
        Output docs_brief with URLs/dates for synthesizer.

    - id: github
      priority: must
      specialist: t-800-research-github
      why: "Find multi-step wizard + localStorage + Zod/RHF patterns and Telegram Bot sendDocument examples adaptable to site-next."
      sites_or_hubs:
        - "github.com"
        - "https://github.com/search"
      queries:
        - "Next.js App Router multi-step form TypeScript localStorage"
        - "react-hook-form zod wizard App Router"
        - "shadcn multistep form nextjs localStorage"
        - "Telegram Bot API sendDocument Node.js FormData typescript"
        - "Next.js route handler telegram notification file attachment"
        - "anti double submit idempotency form Next.js"
      expected_source_count: 6
      notes_for_specialist: |
        Rank by: App Router fit, TS, localStorage persist, step validation, license clarity.
        Seed shortlist (probe 2026-08-08 — verify stars/activity before promoting):
        top_repos_candidates:
          - owner_repo: "63r6o/shadcn-nextjs-multistep-form-example"
            why: "Context + localStorage + per-step Zod + next/dynamic ssr:false — closest to 12-chapter persist"
          - owner_repo: "SametAydinhan/multi-step-form-nextjs"
            why: "RHF + Zod multi-step App Router baseline"
          - pattern_alt: "Zustand persist wizard (e.g. benjaminshoemaker/vibecode_spec_generator) — only if Context approach looks fragile for 12 chapters"
        Also surface ≥2 repos showing Telegram sendDocument / multipart upload from Node.
        Hand OFF top 2–3 repos to repo-miner with explicit mine goals (see repo-miner notes).
        Do NOT deep-mine in this channel — shallow ranking + metadata only.

    - id: repo-miner
      priority: must
      specialist: t-800-research-repo-miner
      why: "DEEP minima ≥2 deep-mines; extract concrete file-level patterns for wizard state, validation, submit UX, TG attach."
      sites_or_hubs:
        - "github.com (clone-free: WebFetch raw / tree)"
      queries: []  # uses top_repos from github specialist
      expected_source_count: 2
      notes_for_specialist: |
        Mine exactly ≥2 repos from github shortlist. Preferred pair:
        1) 63r6o/shadcn-nextjs-multistep-form-example — extract: layout dynamic import, context persist key, step schema pick, clear-after-success.
        2) Best Telegram sendDocument / Next route-handler TG example from github ranking (if none quality, mine a Node Bot API example + separately note adaptation).
        Mine goals checklist:
          - chapter/step navigation + URL hash or query
          - localStorage hydrate without SSR crash
          - per-step required validation
          - submit pending/success/error + retry preserving draft
          - server: validation, size limit, env-only secrets
          - Telegram: sendMessage + sendDocument (.txt) multipart
          - double-submit guard (client lock + optional server idempotency key)
        Output: file paths, snippets citations (short), adaptation bullets for site-next (NOT copy-paste wholesale).
        Forbidden: clone unless user asked; no production code write.

    - id: vendor-docs
      priority: must
      specialist: t-800-research-vendor-docs
      why: "Telegram Bot API is the delivery contract (message + document). Cursor skill docs needed because intent includes eg-anketaplan skill wrapper. Vercel form/README patterns only as ADAPT source for Timeweb — not deploy target."
      sites_or_hubs:
        - "https://core.telegram.org/bots/api"
        - "https://cursor.com/docs"
        - "https://nextjs.org/docs (cross-check only)"
        - "Vercel docs / template READMEs (forms, env, deploy) — adapt language only"
      queries:
        - "Telegram Bot API sendMessage sendDocument multipart/form-data caption limits"
        - "Telegram Bot API file size limits document"
        - "Cursor Agent skills SKILL.md structure tools"
        - "Vercel Next.js form submission env secrets README patterns adapt self-host"
      expected_source_count: 4
      notes_for_specialist: |
        MUST fetch Telegram Bot API rows for sendMessage + sendDocument (limits, caption, parse_mode HTML).
        Cursor docs: skill frontmatter / when to wrap Dev handoff — idea_seeds for prompt-craft later.
        Vercel: extract env naming, form→API checklist from README/templates; rewrite deploy steps to Timeweb
        (PM2 `egoshev`, nginx, eg.egoshev.ru) per КАНОН_ДОМЕН — do not recommend new Vercel project.
        SKIP OpenAI/Claude/Gemini cookbooks — not a prompting/multi-model task (open_question only if skill needs multi-model).
        Output vendor_docs_brief + idea_seeds[] for skill wrapper boundaries (HITL, no auto-publish secrets).

    - id: community
      priority: should
      specialist: t-800-research-community
      why: "Live pitfalls: SSR localStorage, multi-step UX abandonment, double-submit, TG attachment failures, self-host vs serverless body limits."
      sites_or_hubs:
        - "reddit.com/r/nextjs"
        - "reddit.com/r/reactjs"
        - "news.ycombinator.com"
        - "habr.com"
        - "stackoverflow.com"
      queries:
        - "Next.js App Router localStorage multi-step form SSR hydration"
        - "prevent double form submit React fetch pending"
        - "Telegram bot sendDocument from Next.js API route"
        - "self-hosted Next.js vs Vercel body size limit form"
        - "wizard form 10+ steps UX validation progress"
      expected_source_count: 3
      notes_for_specialist: |
        Prefer 2024–2026 posts with concrete failure modes. Capture: hydration mismatch fixes,
        idempotency patterns, UX for long health intakes (consent, privacy tone — no medical claims).
        RU Habr OK if Next/self-host relevant.

    - id: clawhub
      priority: should
      specialist: t-800-research-clawhub
      why: "Intent includes skill wrapper eg-anketaplan — mine marketplace patterns for form/intake/HITL skills; do not copy verbatim."
      sites_or_hubs:
        - "https://clawhub.ai/"
      queries:
        - "form intake questionnaire wizard"
        - "Next.js handoff skill"
        - "Telegram notify skill"
        - "multi-step onboarding"
      expected_source_count: 3
      notes_for_specialist: |
        Scan Top/Trending/New. Extract structure/security narrative only.
        Reject skills that embed bot tokens or auto-post PII.
        adaptation_plan → Cursor SKILL.md boundaries: when to invoke, paths to site-next,
        forbid touching /anketa, forbid committing secrets, HITL before deploy.
        rejected_verbatim: true always.

    - id: news
      priority: nice
      specialist: t-800-research-news
      why: "Catch breaking Next.js form/body-limit / App Router changes that would invalidate patterns; low priority vs docs+github."
      sites_or_hubs:
        - "https://nextjs.org/blog"
        - "https://github.com/vercel/next.js/releases"
        - "HN / tech blogs (selective)"
      queries:
        - "Next.js 15 16 proxyClientMaxBodySize serverActions bodySizeLimit"
        - "App Router forms breaking changes 2025 2026"
      expected_source_count: 2
      notes_for_specialist: |
        Only include if dated change affects Route Handler POST or Client form patterns.
        Map implications to Timeweb Node runtime (often different from Vercel limits).

  compare_axes:
    - "architecture_fit_site_next"   # App Router + existing lib/notifications/telegram.ts extensibility
    - "ui_parity_risk"              # monolith CSS/JS → React without losing neon/branches/pain cards
    - "state_persistence"           # localStorage key strategy, SSR safety, retry without data loss
    - "telegram_delivery"           # sendMessage+sendDocument, secrets server-only, failure modes
    - "security_privacy"            # consent, size limit, anti double-submit, no token leakage, PII in TG
    - "deploy_timeweb_fit"          # same domain path /anketaplan; env on VPS; no Vercel split
    - "do_not_touch_anketa"         # isolation from existing /anketa
    - "skill_vs_dev_boundary"       # what eg-anketaplan skill owns vs what Dev implements in site-next
    - "freshness"                   # dated sources ≥8
    - "completeness"                # covers UI port + API + TG + deploy + skill handoff

  skip_channels:
    - id: vendor-docs-openai-claude-gemini-cookbooks
      why: "Not a multi-model prompting task; skill is thin wrapper + Dev handoff. Cursor docs + Telegram API suffice for vendor-docs must."
    - id: kie-grs-image-video
      why: "No media generation; chapter 11 explicitly says files not uploaded on page."
    - id: vercel-as-deploy-target
      why: "Product constraint: ship on Timeweb eg.egoshev.ru inside existing site-next — Vercel README only for pattern adaptation."
    - id: context7-always-on-other-libs
      why: "No signal for RHF/Zod/Zustand as mandatory deps yet — decide in synthesis; Context7 only Next.js unless github forces a library."
    - id: local-as-channel
      why: "strategy/telegram compare is workspace SoT for synthesizer/lead — not WebSearch/WebFetch channel."

  open_questions:
    - "Exact API path: /api/submit vs /api/anketaplan/submit (prefer namespaced to avoid colliding with future globals)?"
    - "Reuse TELEGRAM_* env vs dedicated ANKETAPLAN_TG_* (strategy already has STRATEGY_TG_* fallbacks)?"
    - "Extend lib/notifications/telegram.ts with sendDocument vs one-off in anketaplan route?"
    - "Client architecture: single Client page (closest to monolith) vs multi-route wizard — UI parity vs maintainability?"
    - "Zod/RHF adoption vs porting vanilla serialize/validateChapter — skill may recommend one; Dev chooses under time pressure?"
    - "Max .txt / JSON payload size policy for Timeweb nginx + Node (set explicit MB)?"
    - "After successful send: clear localStorage immediately or keep until user confirms (retry UX)?"
    - "Skill scope: only research/handoff checklist, or also codegen prompts for components?"

  specialist_fanout_order:
    - "docs (Context7 Next) ∥ github ∥ vendor-docs (Telegram+Cursor+Vercel-adapt)"
    - "repo-miner (after github top_repos)"
    - "community ∥ clawhub"
    - "news (nice, if budget)"
    - "synthesizer (must compare ≥2 families: e.g. Context+localStorage wizard vs RHF+Zustand; Route Handler+TG extend vs Server Action)"

  synthesizer_hints:
    recommended_comparison_families:
      - "A: Port as one heavy Client Component + CSS module/global neon (max UI parity)"
      - "B: Multi-step RHF+Zod+Context/Zustand (max maintainability)"
      - "C: API — extend existing telegram.ts + mirror strategy/lead validation/honeypot patterns"
    must_produce:
      - "one recommended_approach"
      - "merge_plan (UI from A + API from C + state bits from B)"
      - "adaptation_plan for Timeweb path eg.egoshev.ru/anketaplan"
      - "skill_boundary for eg-anketaplan (HITL, paths, bans)"
      - "explicit note: research delivers plan/patterns only — no production code"
    local_inputs_required:
      - "Read strategy lead route + telegram.ts before ranking TG approach"
      - "Skim master-client-intake.html chapter/branch/localStorage contracts"
      - "Confirm /anketa isolation"

  coverage_expectations:
    strategist: pass
    github_shallow: must
    repo_mines: "≥2"
    context7_docs: must
    vendor_docs: must
    community: should
    clawhub: should
    news: nice
    sources_count_target: "12-16"
    verdict_gate: "fail if <8 dated sources OR <2 mines OR missing Context7 OR missing Telegram API facts"
```

## Progress for lead

1. Strategist complete — `search_plan` ready for fan-out.
2. Next: parallel `docs` + `github` + `vendor-docs`; then `repo-miner` on github `top_repos`.
3. Local strategy/TG compare = synthesizer input, not a channel.
