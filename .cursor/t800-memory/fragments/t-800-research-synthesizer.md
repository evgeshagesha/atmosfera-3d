# t-800-research-synthesizer — anketaplan Next.js port

**Date:** 2026-08-08  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**topic:** Port `master-client-intake.html` → `/anketaplan` on site-next (Timeweb `eg.egoshev.ru`) + skill `eg-anketaplan`  
**status:** ok  
**needs_more_sources:** false  
**confidence:** high

> 💡 DEEP synthesis · ≥2 source families · no production code · no factory files

---

## Families compared

| Family | Core bet | Primary sources |
|--------|----------|-----------------|
| **A** One heavy Client Component + neon CSS modules | Max UI parity with HTML monolith | Source HTML SoT · community progress UX · docs client island |
| **B** Multi-step RHF+Zod+Context/Zustand | Max maintainability / schema gates | BBEDERRAR · 63r6o · natdexterra (Zustand runner-up) · madebyankur/use-safe-submit |
| **C** Extend `telegram.ts` + mirror `strategy/lead` | API/delivery + spam/ops contract | Local SoT · TG vendor · TGWrapper/yagop patterns · docs RH+fetch |

**Filtered / blocked for verbatim:** 63r6o freshness `block` (patterns only); ClawHub token-bake / auto-notify skills; new bot SDK deps; Vercel domain as deploy target; Server Action as primary TG BFF.

---

## Axis scorecard

| Axis | A (UI island) | B (RHF+Zod wizard) | C (API mirror) | Winner for hybrid |
|------|---------------|--------------------|----------------|-------------------|
| architecture_fit_site_next | strong (matches StrategyFormModal client fetch) | medium (RHF/Zod not in package.json yet) | **strong** (extend existing lib/route pattern) | A+C primary; B selective |
| ui_parity_risk | **win** (12-ch neon, chips, pain cards, BMI/BMR) | lose if `/stepN` routes | n/a | **A** |
| state_persistence | ok if LS ported carefully | **win** (SSR-safe LS, clear-on-ok, chapter gates) | n/a | **B patterns** |
| telegram_delivery | n/a | n/a | **win** (sendMessage+sendDocument FormData+filename) | **C** |
| security_privacy | medium (client holds draft PII in LS) | better with server Zod re-validate | **win** (honeypot, server-only env, 400/502) | **C + B server Zod** |
| deploy_timeweb_fit | ok | ok | **win** (VPS env, nginx body, no NEXT_PUBLIC tokens) | **C** |
| do_not_touch_anketa | ok if new `/anketaplan` only | ok | ok | all if route isolated |
| skill_vs_dev_boundary | weak alone | weak alone | ok with clawhub when/do-not | **skill wraps A+B+C** |
| freshness | source HTML live | mixed (63r6o block; BBEDERRAR ok) | TG+docs ok; news patch 16.2.11+ | ok with adaptation |
| completeness | UI+calc+branches | state+validation UX | delivery+ops | **hybrid covers all** |

**Verdict:** Pure A loses validation/submit robustness. Pure B risks UI parity + dependency bloat + URL-step mismatch. Pure C is necessary but insufficient alone. **Recommended = Hybrid A∪B∪C.**

---

## Conflicts resolved

| Conflict | Side X | Side Y | Winner | Why |
|----------|--------|--------|--------|-----|
| Transport | Next forms SA + useActionState (vendor forms guide) | Context7 BFF: RH + client fetch for TG | **RH + fetch** | Explicit status 400/502; SA bodySizeLimit 1MB; TG multipart outbound fits Node RH; mirrors StrategyFormModal |
| Wizard URL shape | 63r6o `/form/stepN` | HTML `#chapter-N` + single page | **Single page + hash/`currentChapter` in LS** | Neon 12-ch parity; miner: prefer single page over step routes |
| LS hydrate | `ssr:false` whole provider (63r6o) | `typeof window` + useEffect (BBEDERRAR/community) | **Either; prefer client island + isHydrated gate** | Avoid hydration mismatch; flash expected until hydrate |
| TG attach | TGWrapper FormData without filename | yagop InputFile filename required | **filename + text/plain required** | Telegram UX for `.txt`; vendor multipart |
| Bot SDK | Add yagop/grammY/TGWrapper | Extend thin `telegram.ts` fetch | **No new SDK** | Local SoT + miner consensus |
| Deploy | Vercel README body/domain patterns | Timeweb eg.egoshev.ru | **Timeweb only; adapt patterns** | Product constraint |
| Next patch | site-next 16.2.10 | Jul 2026 release → 16.2.11+ | **Recommend bump before/at deploy** | Custom server SSRF CVE path; not blocker for architecture |

---

## Recommendations (architecture / API / port / skill)

### Architecture
- **Thin RSC route** `app/anketaplan/page.tsx` (metadata, shell) + **heavy client island** for the wizard.
- **Not** RSC-split per chapter; **not** `/anketaplan/step/N` multi-route (hurts neon parity).
- Port method: **CSS Modules** (or co-located CSS) cloned from neon HTML aesthetic; controlled React state (or light RHF) driven by chapter map.
- Persist: key `egoshev_master_intake_v3`; include `currentChapter`; hash `#chapter-N` optional resume; hydrate after mount; clear LS **only** on `{ ok: true, delivered: true }`.
- ch11 files: **do not upload from page** (HTML SoT) — summary text only in `.txt` dump unless product later decides otherwise.

### API route shape
- **Preferred:** `POST /api/anketaplan/submit` (namespaced; parallel to `/api/strategy/lead`; avoids colliding with generic `/api/submit` demos).
- Flow: normalize → honeypot `company_website` (soft success) → server validate (Zod or shared validators) + size cap → `sendTelegramMessage` (short HTML ≤4096) → `sendTelegramDocument` (`.txt`, filename, caption ≤1024) → both-or-502.
- Extend `lib/notifications/telegram.ts` with `sendTelegramDocument` via native `FormData` + third-arg filename; keep STRATEGY_TG_* / TELEGRAM_* fallbacks; `not_configured` soft success consistent with existing helper.
- Client: fetch + submitting lock (Enter + button) + error keeps form open + draft retained (mirror StrategyFormModal).

### Port method
1. Extract chapter schema / field map from HTML.
2. Client island + neon CSS modules.
3. BMI/BMR/branches/pain cards/passport as pure client calcs.
4. Wire submit UX states: idle | pending | success | error.
5. API + telegram extension last (HITL before deploy).

### Skill boundary (`eg-anketaplan`)
- **Skill does:** WHEN/DO NOT; clarify port steps; cite SoT paths; Dev handoff checklist; HITL before deploy/env; forbid `/anketa` touch and secrets in skill body.
- **Skill does not:** write production page/route code as “done”; bake tokens; auto-send TG/PII; invent schema; deploy without human approve.
- **Dev handoff builds** in `site-next`; factory produces skill + brief, not live traffic.

---

## synthesis (machine)

```yaml
status: ok
synthesis:
  compared:
    - id: A
      name: "One heavy Client Component + neon CSS modules"
      score_summary: "Best UI parity; alone weak on validation/submit/TG"
    - id: B
      name: "Multi-step RHF+Zod+Context/Zustand"
      score_summary: "Best LS/gates/clear-on-ok patterns; /stepN and full RHF deps weaker for neon port"
    - id: C
      name: "Extend telegram.ts + mirror strategy/lead"
      score_summary: "Required API layer; not a UI solution"
  recommended_approach: >
    Hybrid A∪B∪C — Neon client island on /anketaplan (A) with SSR-safe
    localStorage + chapter gates + clear-on-delivered + submitting lock from B
    patterns (Zod preferred; RHF optional/light, not mandatory day-1 if controlled
    state ports cleanly); POST /api/anketaplan/submit + extend telegram.ts
    sendDocument mirroring strategy/lead (C). Skill eg-anketaplan = HITL/ops
    wrapper + Dev handoff only.
  why_best: >
    Satisfies UI parity constraint from HTML SoT while reusing proven site-next
    BFF/TG contracts; docs+repo-miner+vendor+community+local SoT agree on RH
    fetch, multipart filename, draft retention, and no new bot SDK. Avoids
    Server Action 1MB trap and Vercel-only assumptions.
  rationale: >
    architecture_fit and telegram_delivery favor C; ui_parity favors A; state
    persistence and security favor selective B (not full multi-route RHF stack).
    Combined hybrid is the only family that scores on all compare_axes without
    violating do_not_touch_anketa or Timeweb deploy.
  runners_up:
    - name: "Pure A"
      why_weaker: "Neon looks right but double-submit, server Zod, honeypot, and .txt attach remain ad-hoc"
    - name: "Pure B (63r6o-style /stepN + full RHF)"
      why_weaker: "Splits neon into routes; adds deps not yet in site-next; stale 63r6o verbatim; weaker TG story"
    - name: "SA-first + useActionState"
      why_weaker: "Conflicts with Context7 BFF guidance for TG; bodySizeLimit; poorer 502/JSON contract vs StrategyFormModal"
  merge_plan: >
    Factory skill eg-anketaplan: WHEN/DO NOT from clawhub patterns; cite paths
    only (HTML source, strategy/lead, telegram.ts, StrategyFormModal); HITL
    before deploy; Session Handoff shape for Dev. Dev handoff builds in
    site-next: (1) app/anketaplan thin RSC + client island; (2) CSS modules from
    master-client-intake.html; (3) LS key egoshev_master_intake_v3 + currentChapter
    + hash; hydrate after mount; (4) per-chapter Zod.pick/trigger + full schema
    before POST — RHF optional; (5) POST /api/anketaplan/submit clone lead
    normalize→honeypot→validate→TG→400/502/ok+delivered; (6) telegram.ts
    sendTelegramDocument FormData+filename after sendMessage, both-or-502;
    (7) client pending lock + keep draft on error; clear LS only on delivered;
    (8) never touch /anketa; no NEXT_PUBLIC tokens; ch11 no file upload.
  adaptation_plan: >
    Deploy only to Timeweb eg.egoshev.ru/anketaplan (PM2 egoshev, nginx). Set
    TELEGRAM_* / STRATEGY_TG_* on VPS; restart pm2 after env. Enforce nginx
    client_max_body_size + app-level JSON size (JSON+txt dump, not photo
    mega-upload). If proxy.ts exists, align proxyClientMaxBodySize — silent
    truncate risk. Treat Vercel README (body caps, serverless) as pattern
    inspiration only. Prefer bump next 16.2.10 → 16.2.11+ for Jul 2026 custom
    server SSRF patch before production enable. Escape HTML in TG summaries;
    .txt UTF-8 ≤ practical TG limits; caption ≤1024.
  risks:
    - "Hydration flash / chapter jump if LS read during SSR render"
    - "Double TG delivery on retry after partial success (msg ok, doc fail) — mitigate both-or-502 + client lock"
    - "PII in localStorage drafts — purpose-limited, no analytics on same key; consent copy careful; no med claims"
    - "proxyClientMaxBodySize silent truncate if proxy buffers RH body"
    - "Adding full RHF+Zod day-1 without need increases scope; under-validation if Zod deferred too long"
    - "Filename omitted on FormData → bad TG document name"
    - "Accidental edits to /anketa kids flow"
    - "Skill scope creep into production codegen without HITL"
  open_questions:
    - "Day-1: controlled state + Zod-only vs introduce react-hook-form dependency?"
    - "ANKETAPLAN_TG_* env override vs reuse STRATEGY_TG_* / TELEGRAM_* only?"
    - "Success UX: in-place passport vs /anketaplan/success page?"
    - "Idempotency-Key server store needed for Timeweb, or client lock enough?"
    - "Schedule next@16.2.11+ bump as hard gate before enable?"
  needs_more_sources: false
  confidence: high
  sources_ranked:
    - { family: docs, score: 95, note: "Context7 Next RH+client island+body limits" }
    - { family: local_sot, score: 95, note: "telegram.ts + strategy/lead + StrategyFormModal" }
    - { family: vendor, score: 92, note: "TG Bot API sendMessage/sendDocument limits" }
    - { family: repo_miner, score: 90, note: "BBEDERRAR wizard + TG FormData+filename" }
    - { family: github, score: 85, note: "shortlist; 63r6o patterns only (block freshness)" }
    - { family: community, score: 82, note: "hydrate/double-submit/nginx/multipart consensus" }
    - { family: clawhub, score: 78, note: "skill when/do-not + HITL; reject token bake" }
    - { family: news, score: 75, note: "16.2.11+ patch; proxy truncate semantics" }
  gaps_for_lead: []
```

---

## Progress note for research-lead

Synthesis complete. One winner: **Hybrid A∪B∪C**. Ready for `research_brief` + coverage_matrix → prompt-craft (skill) → brain → factory. No further specialist fan-out required (`needs_more_sources: false`).
