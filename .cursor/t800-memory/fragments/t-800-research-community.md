# t-800-research-community — fragment

**Date:** 2026-08-08  
**Channel:** DEEP should-channel · **topic:** anketaplan (multi-step form / Next.js / Telegram)  
**status:** ok (Reddit `site:` often empty; SO + Habr + HN substituted with dated threads)  
**Scope note:** consent/privacy only — **no medical claims** in form copy or community-derived UX tips.

## Consensus (for synthesizer)

1. **Draft in `localStorage` ≠ SSR-safe:** never seed `useState(localStorage…)` — hydrate after mount; expect brief empty/default UI flash.
2. **Disable submit button ≠ idempotent:** Enter key / double-click still fire; need pending guard on form + early-return + `finally`.
3. **Body limits are stacked:** Next default ~1MB (Server Actions) + Vercel hard ~4.5MB; self-host adds nginx `client_max_body_size`. Failures often look like “action never ran”.
4. **Telegram `sendDocument` uploads need `multipart/form-data`:** JSON body only for `file_id` / URL; bot token only server-side (Route Handler proxy).
5. **10+ step wizards:** visible progress + small logical chunks beat one mega-form; free back-nav without data loss is non-negotiable; config-orchestration > if/else spaghetti.
6. **Privacy:** ePrivacy/community consensus — localStorage ≈ cookies for *purpose*; draft-save for an explicit form can be “necessary”, but do **not** piggyback analytics/tracking on the same key.

## Failure modes → anketaplan pitfalls

| Mode | Concrete failure | Pitfall for anketaplan |
|------|------------------|------------------------|
| Hydration | Client restores draft step N, server HTML shows step 1 | Wizard “jumps” / React hydration error; progress bar wrong until remount |
| Double submit | Enter while `pending` duplicates lead / Telegram message | Two intakes, two `sendDocument`, support noise |
| Payload | Photos/PDF via Server Action on Vercel | Silent 413 / undefined return; works locally, dies in prod |
| TG upload | `Content-Type: application/json` + binary | Telegram rejects; empty document |
| UX length | 10+ steps without progress + no back-edit | Drop-off; user can’t fix step 3 from step 9 |
| Consent | Draft LS + marketing pixels same storage story | Banner/legal mismatch; avoid health diagnosis language in fields |

## One-liner

Hydrate drafts client-only · gate submit (button **and** Enter) · keep attachments under stacked body limits or self-host/proxy · Telegram multipart from API route · progress + reversible steps · storage purpose ≠ tracking · no medical claims.

---

```yaml
community_findings:
  - platform: so
    url: "https://stackoverflow.com/questions/78223440/how-to-work-correctly-with-localstorage-in-next-js-14"
    published: "2024-03-26"
    freshness: ok
    claim: "Next.js 14 App Router: reading localStorage only in useEffect (or dynamic ssr:false) avoids ReferenceError; UI still shows default (e.g. count 0) until client init — expected flash."
    verified: true
    cursor_adaptation: "anketaplan draft wizard: default empty draft on SSR; after mount rehydrate step+answers; gate progress UI with isHydrated; never localStorage in useState initializer."

  - platform: so
    url: "https://stackoverflow.com/questions/79944550/hydration-failed-because-initial-ui-does-not-match-server-rendered-html-when-rea"
    published: "2026-05-21"
    freshness: ok
    claim: "useState(localStorage.getItem(...)) in client component → Hydration failed: server lacks localStorage, client may restore different theme/draft."
    verified: true
    cursor_adaptation: "Hard ban for anketaplan: no LS in render/init; same pattern for step index and consent flags."

  - platform: so
    url: "https://stackoverflow.com/questions/77902231/how-to-prevent-form-submission-with-enter-key-when-a-server-action-is-pending"
    published: "2024-01-29"
    freshness: ok
    claim: "useFormStatus disabled button alone does not stop Enter-key re-submit while Server Action pending → duplicate requests."
    verified: true
    cursor_adaptation: "Final step: isSubmitting/pending guard on form onSubmit + disable controls; for fetch POST same early-return + finally; optional idempotency key server-side."

  - platform: so
    url: "https://stackoverflow.com/questions/78196546/why-does-my-server-action-not-run-when-i-pass-in-images-that-are-too-large-using"
    published: "2024-03-20"
    freshness: ok
    claim: "Prod Vercel: Server Action with ≥~2MB images never runs (no server log); client gets undefined destructure. Stacked limits: Next SA default 1MB + Vercel payload ~4.5MB."
    verified: true
    cursor_adaptation: "Prefer self-hosted Next for anketaplan uploads OR client→object storage / API route with raised limits; never assume local next.config bodySizeLimit survives Vercel; document nginx client_max_body_size on VPS."

  - platform: so
    url: "https://stackoverflow.com/questions/68574254/body-exceeded-1mb-limit-error-in-next-js-api-route"
    published: "2021-07-28"
    freshness: warn
    claim: "Community still cites 1mb bodyParser default; 2025 answers add Next 15 experimental.serverActions.bodySizeLimit and nginx client_max_body_size for self-host proxies."
    verified: true
    cursor_adaptation: "Treat body limits as ops checklist: Next config + reverse-proxy + host platform; anketaplan JSON-only submit stays tiny; file→Telegram bypass giant JSON bodies."

  - platform: habr
    url: "https://habr.com/ru/articles/879174/"
    published: "2025-02-04"
    freshness: ok
    claim: "Telegram Bot API: application/json except file upload; multipart/form-data required to upload files (sendDocument etc.)."
    verified: true
    cursor_adaptation: "Next.js Route Handler builds FormData (chat_id + document Blob/Buffer); never expose bot token to browser; prefer sendDocument of generated PDF/summary over dumping raw PII in chat text."

  - platform: habr
    url: "https://habr.com/ru/sandbox/288470/"
    published: "2026-06-10"
    freshness: ok
    claim: "Pattern: Telegram bot → authenticated POST to Next.js API routes (shared secret + telegram id headers) for processing; files downloaded via bot API then forwarded to Next."
    verified: true
    cursor_adaptation: "Inverse for anketaplan: web form → Next API → Telegram sendDocument/sendMessage; same secret boundary; do not put TG token in client env NEXT_PUBLIC_*."

  - platform: habr
    url: "https://habr.com/ru/companies/yoomoney/articles/991712/"
    published: "2026-02-02"
    freshness: ok
    claim: "B2B onboarding A/B: quiz-first + always-visible progress checklist → +4% conversion to submit; long forms split into small logical steps (more screens, less load per screen)."
    verified: true
    cursor_adaptation: "anketaplan 10+ steps: persistent progress (N of M or checklist), group fields by intent not by DB schema, validate per-step on Next, allow revisit without wipe."

  - platform: hn
    url: "https://news.ycombinator.com/item?id=44413184"
    published: "2025-06-29"
    freshness: ok
    claim: "Show HN SmartStepper: config-based multi-step orchestration; commenters — steppers harder than they look; demos break; prefer parse-over-validate / async validation functions over FE validation-as-religion."
    verified: true
    cursor_adaptation: "Declarative step config (id, fields, validate, next) in anketaplan; server re-validate always; don’t block UX on fancy client schema alone."

  - platform: hn
    url: "https://news.ycombinator.com/item?id=44890338"
    published: "2025-08-11"
    freshness: warn
    claim: "Community correction: law cares about purpose not storage API — localStorage ≠ free pass vs cookies; settings/necessary OK, tracking needs consent."
    verified: false
    cursor_adaptation: "Draft LS for in-progress questionnaire can be framed as strictly necessary for the service user requested; separate consent for marketing; never store health diagnoses; clear privacy copy near submit."

sources_note: |
  Reddit r/nextjs|r/reactjs site-search returned empty in this pass (2026-08-08).
  Concrete failure modes taken from SO (repro + accepted patterns), Habr (dated RU product/TG), HN (stepper + storage purpose).
  Older SO body-limit thread kept as warn — still referenced in 2024–2025 answers.
```

## Pitfalls checklist (synthesizer handoff)

- [ ] SSR draft restore without hydration gate  
- [ ] Submit only via disabled button (Enter leak)  
- [ ] Large attachments through Vercel Server Actions  
- [ ] Telegram JSON upload of binary  
- [ ] Bot token in client bundle  
- [ ] Wizard without progress + irreversible steps  
- [ ] Medical/diagnosis wording in field labels or success copy  
- [ ] Analytics piggybacked on draft localStorage key  
