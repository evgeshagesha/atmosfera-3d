# t-800-research-clawhub — fragment

> 💡 DEEP ClawHub pass · skill wrapper **eg-anketaplan** · form intake / Next handoff / TG notify / multi-step onboarding  
> scanned_at: 2026-08-08 · hub: https://clawhub.ai/ · rejected_verbatim: true

## Intent

Паттерны для Cursor `SKILL.md` обёртки `eg-anketaplan` (не production page/route).  
Adapt structure only. Reject skills that bake bot tokens or auto-post PII.

## Tabs scanned

| Tab | Result |
|-----|--------|
| home / Featured / Trending listing | reachable (WebFetch) |
| `?tab=new` | reachable; listing overlap with Trending — hub UI may not separate cleanly without auth |
| `?tab=trending` | same listing surface; intent cards found via hub search + card WebFetch |
| Official | not separately fetched; Featured used as Top-adjacent |

## Cards (8 primary)

| # | Name | URL | Category | Relevance |
|---|------|-----|----------|-----------|
| 1 | Client Intake Bot Pro | https://clawhub.ai/kambrosgroup/client-intake-bot-pro | skill | branching questionnaire wizard + routing notify |
| 2 | Form Cro | https://clawhub.ai/alirezarezvani/form-cro | skill | multi-step when 7+ fields; WHEN/WHEN NOT |
| 3 | onboarding-cro | https://clawhub.ai/alirezarezvani/onboarding-cro | skill | progress + checklist multi-step onboarding |
| 4 | HITL Protocol | https://clawhub.ai/rotorstar/hitl-protocol | skill | multi-step wizard forms + approval/confirmation before action |
| 5 | decision-gate | https://clawhub.ai/vaahl-dev/decision-gate | skill | commit-before-fire gate (HITL before deploy/high-stakes) |
| 6 | Session Handoff | https://clawhub.ai/wpank/session-handoff | skill | Dev handoff docs; secrets scanner; paths/next steps |
| 7 | Universal Notify | https://clawhub.ai/josunlp/universal-notify | skill | TG notify pattern — **reject CLI token bake** |
| 8 | client-flow | https://clawhub.ai/ariktulcha/client-flow | skill | ask-missing fields; draft-first email with confirmation |

### Security-adjacent (scanned, pattern-only or REJECT)

| Card | URL | Verdict |
|------|-----|---------|
| Telegram Alerts | https://clawhub.ai/jamierossouw/rho-telegram-alerts | REJECT for skill body: documents `TELEGRAM_BOT_TOKEN` in .env (OK as ops) but skill triggers auto-send alerts — no auto-post lead PII |
| Client Onboarding Automator | https://clawhub.ai/merjua14/client-onboarding-automator | **REJECT**: config JSON embeds `stripe_key: "sk_live_..."`; auto welcome email sequence with credentials |
| Notify Bot | https://clawhub.ai/slk1061569042-lab/notify-bot | REJECT: reads bot tokens from keychain; auto group notify |
| Telegram Compose | https://clawhub.ai/tmchow/telegram-compose | WARN: reads botToken from OpenClaw config to call API — pattern = env-only server-side, never in SKILL.md |
| Fresh Session Handoff | https://clawhub.ai/kisssam6886/resetcontinue | positive: concise handoff without inventing facts |
| Nextjs Expert | https://clawhub.ai/jgarrison929/nextjs-expert | adjacent: App Router conventions — cite Context7/docs channel for API truth, not ClawHub |

## Security flags summary

| Card | Flags |
|------|-------|
| Client Intake Bot Pro | **HIGH if copied as-is**: auto-responses, nurture sequences, SMS/email of prospect answers (PII); scoring OK as design pattern only |
| Form Cro / onboarding-cro | low: marketing CRO copy; adapt WHEN/DO NOT + multi-step threshold only |
| HITL Protocol | med: webhook/callback transport; default_action approve-on-timeout — **EG: never auto-approve deploy or TG send**; opaque tokens = good pattern |
| decision-gate | positive: absence blocks action; no PII in `action_id`; adapt as HITL checklist before deploy |
| Session Handoff | positive: validate no secrets; NEVER credentials in handoff |
| Universal Notify | **CRITICAL reject**: `--bot-token BOT:TOK` in skill examples; adapt = cite env vars only, never paste tokens |
| client-flow | med: can send email if skill configured — skill says «with user confirmation» / draft fallback = keep |
| Onboarding Automator | **REJECT**: live Stripe key placeholder in published skill config |

## Patterns to adapt (NOT copy)

1. **WHEN / DO NOT frontmatter** (Form Cro, onboarding-cro) — explicit invoke vs sibling routes/skills.
2. **Branching multi-step wizard** (Intake Bot Pro) — question types + conditional branches; EG: keep wizard in site-next UI, skill only wraps ops/HITL.
3. **7+ fields → multi-step** (Form Cro) — master intake already 12 chapters → progress indicator required.
4. **HITL before irreversible** (HITL Protocol confirmation + decision-gate) — deploy / enable TG notify / change production env = human approve first; no timeout→approve.
5. **Ask-missing critical fields** (client-flow) — skill clarifier before codegen; don't invent lead schema.
6. **Handoff to Dev** (Session Handoff) — state / paths / decisions / next steps / secret-scan; chainable milestones.
7. **Notify channel abstraction** (Universal Notify idea only) — single server helper; credentials only in VPS/.env; skill forbids writing tokens.
8. **Draft-first outbound** (client-flow email) — never auto-post full intake PII to TG from Cursor skill; production notify = site-next Route Handler only after HITL deploy.

## clawhub_brief → eg-anketaplan SKILL.md

```yaml
clawhub_brief:
  skill_slug: eg-anketaplan
  rejected_verbatim: true
  when:
    - "Port / design / review master client intake wizard as /anketaplan on site-next"
    - "HITL ops wrapper: clarify steps, handoff to Dev, checklist before deploy"
    - "Wire Telegram submit (sendMessage + sendDocument) via existing site-next notification lib — cite paths, do not invent tokens"
    - "Multi-step onboarding UX: progress, branches, localStorage draft, final POST"
  do_not:
    - "Touch or refactor /anketa (leave alone)"
    - "Bake TELEGRAM_BOT_TOKEN / chat id / Stripe keys into SKILL.md, examples, or commits"
    - "Auto-post lead PII to Telegram / email / CRM from the Cursor skill"
    - "Deploy to Timeweb / enable production route without explicit human HITL approve"
    - "Copy ClawHub skill bodies verbatim"
    - "Medical diagnosis / «вылечим» language in intake copy"
    - "Use Server Action as primary Telegram BFF (prefer Route Handler — see research-docs)"
  site_next_paths:
    app_root: "01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next"
    new_route: "app/.../anketaplan (page) — exact folder per architect; public path /anketaplan"
    submit_api: "app/api/.../submit or /api/anketaplan/submit — POST Route Handler nodejs"
    telegram_lib: "lib/notifications/telegram.ts"
    strategy_ref: "app/api/strategy/lead/route.ts + components/strategy/* (pattern only)"
    source_html: "90_ВХОДЯЩИЕ/anketaplan-source/master-client-intake.html"
  forbid_routes:
    - "/anketa"
  forbid_secrets:
    - "No bot tokens in skill, handoff, or git"
    - "Env only on Timeweb VPS; never echo tokens in chat artifacts"
    - "Reject Universal Notify CLI --bot-token style examples"
  hitl_before_deploy:
    gate: "confirmation | decision-gate pattern"
    required_checks:
      - "Human approved production enable of /anketaplan"
      - "Secrets present in env (not in repo) — verified by human, not agent paste"
      - "Isolation verified: /anketa unchanged"
      - "No auto nurture / auto email of intake answers from skill"
      - "Double-submit / body-size / error statuses reviewed (400/413/429/502)"
    default_on_timeout: abort  # never approve
  adapt_from_clawhub:
    - pattern: "WHEN/DO NOT + multi-step threshold"
      from: form-cro / onboarding-cro
    - pattern: "branching intake phases (capture → qualify → notify)"
      from: client-intake-bot-pro
      strip: "auto nurture, SMS, score→auto-email"
    - pattern: "HTTP 202-style human confirmation before irreversible"
      from: hitl-protocol
      map: "Cursor chat approve before deploy / before enabling TG"
    - pattern: "commit record before action fires"
      from: decision-gate
    - pattern: "handoff: state, paths, decisions, next steps, secret scan"
      from: session-handoff
    - pattern: "draft outbound + user confirmation"
      from: client-flow
```

## Recommended Cursor adaptations

- Skill role = **HITL/ops wrapper + Dev handoff**, not full OpenClaw onboarding automator.
- Implementation lives in **site-next**; skill cites paths and checklists.
- Reuse `lib/notifications/telegram.ts`; extend for `sendDocument` in Dev handoff — skill does not call Telegram API.
- localStorage draft key strategy from source HTML (`egoshev_master_intake_v3`) — client island only (research-docs).
- Frontmatter discipline: clear `Use when` / `Do NOT use when`; link sibling eg-bot-* if manager flow, not this skill.

## Rejected (do NOT copy)

- Verbatim SKILL.md / intake scripts / nurture day-0..30 sequences
- Config blocks with `sk_live_`, `--bot-token`, hardcoded chat ids
- Auto-email / auto-Telegram of full questionnaire answers from agent
- Scrape PII into handoff files committed to git
- Jailbreak / «ignore previous» — none observed on selected cards; still scan on install
- Trading Telegram Alerts skill as template for lead intake notify

## Freshness

```yaml
sources:
  - url: "https://clawhub.ai/"
    published_or_updated: "2026-08-08"
    freshness: ok
    takeaway: "Hub live; Top/Trending/New listing reachable."
  - url: "https://clawhub.ai/kambrosgroup/client-intake-bot-pro"
    published_or_updated: "unknown"
    freshness: warn
    takeaway: "Branching intake + notify routing; strip auto-PII."
    stale_warning: "Card absolute publish date not on page."
  - url: "https://clawhub.ai/alirezarezvani/form-cro"
    published_or_updated: "unknown"
    freshness: warn
    takeaway: "WHEN/DO NOT + multi-step for long forms."
  - url: "https://clawhub.ai/rotorstar/hitl-protocol"
    published_or_updated: "unknown"
    freshness: warn
    takeaway: "Confirmation gate; multi-step wizard forms; no timeout-approve for EG."
  - url: "https://clawhub.ai/vaahl-dev/decision-gate"
    published_or_updated: "unknown"
    freshness: warn
    takeaway: "Pre-commit decision before high-stakes action."
  - url: "https://clawhub.ai/wpank/session-handoff"
    published_or_updated: "unknown"
    freshness: warn
    takeaway: "Handoff scaffold + secret validation."
  - url: "https://clawhub.ai/josunlp/universal-notify"
    published_or_updated: "unknown"
    freshness: warn
    takeaway: "Reject token-in-CLI pattern; env-only notify."
  - url: "https://clawhub.ai/ariktulcha/client-flow"
    published_or_updated: "unknown"
    freshness: warn
    takeaway: "Ask-missing + draft-with-confirmation."
adaptation_notes: |
  Map marketplace patterns to Cursor SKILL.md frontmatter (when/do-not),
  cite site-next paths, forbid /anketa and secrets, require HITL before deploy.
  Do not install OpenClaw skills into vault; adapt narrative only.
  Cross-check with t-800-research-docs (Next Route Handler) + research-github (wizard/TG).
```

## Status

`status: ok` · source_count: 8 primary + 6 adjacent · rejected_verbatim: true · channel: should (DEEP)
