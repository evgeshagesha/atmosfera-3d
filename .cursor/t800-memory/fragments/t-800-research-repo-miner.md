# t-800-research-repo-miner — fragment

**Date:** 2026-08-08  
**Mission:** master-client-intake → Next `/anketaplan` (DEEP)  
**Constraint:** no clone · WebFetch / GitHub API / raw only  
**mines_count:** 4  
**status:** ok  
**Target (adapt only):** site-next App Router `/anketaplan` · key `egoshev_master_intake_v3` · POST + TG short msg + `.txt` · extend `telegram.ts` · mirror strategy/lead honeypot+validate+502 · Timeweb eg.egoshev.ru · do not touch `/anketa`

---

## repo_mine_brief (YAML)

```yaml
status: ok
mined_at: "2026-08-08"
method: raw_github_api_no_clone
mines_count: 4
target_product: |
  Port master-client-intake.html → Next 16.2.10 App Router /anketaplan;
  preserve 12-chapter neon UI + localStorage egoshev_master_intake_v3;
  API Route Handler: short sendMessage + sendDocument(.txt);
  existing telegram.ts = sendMessage only; strategy/lead = honeypot+validate+502.
repo_mine_brief:
  mines:
    - repo: "63r6o/shadcn-nextjs-multistep-form-example"
      url: "https://github.com/63r6o/shadcn-nextjs-multistep-form-example"
      stars: 25
      license: null
      language: TypeScript
      pushed_at: "2024-11-05T00:16:22Z"
      updated_at: "2026-02-09T06:56:37Z"
      next: "15.0.2"
      freshness: block  # push >180d; patterns durable — adapt only, no verbatim copy
      paths_reviewed:
        - README.md
        - package.json
        - src/types/input-data.ts
        - src/app/form/layout.tsx
        - src/app/form/multistep-form-context.tsx
        - src/app/form/step1/page.tsx
        - src/app/form/step2/page.tsx
        - src/app/form/step3/page.tsx
      checklist:
        step_nav_hash_query: "path segments /form/stepN via router.push — NOT hash/query"
        localStorage_ssr_safe: "dynamic(..., { ssr: false }) wrap of provider; init reads LS in useState"
        per_step_validation: "zod .pick() + zodResolver per step; final step full schema"
        pending_success_error_retry: "absent (alert + clearFormData only)"
        server_validation_size_secrets: "absent (client-only demo)"
        sendMessage_sendDocument: "n/a"
        double_submit: "absent"
      patterns:
        - "Shared layout provider + sibling step pages (App Router)"
        - "STORAGE_KEY constant + updateFormData merges Partial → LS"
        - "clearFormData on successful final submit"
        - "Last step re-validates entire InputData schema + shows formState.errors"
        - "No external global store (Context + useState only)"
      gaps_vs_checklist:
        - "No hash/query deep-link for chapter index"
        - "No pending/error/retry UX; draft cleared only on success path (alert)"
        - "No API route / server Zod / size limits"
        - "ssr:false entire provider → no SSR HTML for form shell (OK for draft hydrate)"
      adapt_for_cursor_anketaplan:
        - "Prefer single-page 12-chapter wizard (preserve neon HTML UX) over /stepN routes — OR keep chapter as ?ch=1..12 / hash for deep-link resume"
        - "Reuse: versioned STORAGE_KEY egoshev_master_intake_v3 + Partial merge + clear-on-success-only"
        - "Reuse: per-chapter Zod pick/trigger before next; full schema before POST"
        - "Prefer typeof window guard OR client-only island over blanket ssr:false of whole page if SEO shell needed; for /anketaplan draft-heavy page, client island is fine"
        - "Do NOT copy alert() final submit — wire to /api/anketaplan"

    - repo: "BBEDERRAR/social-support-app"
      url: "https://github.com/BBEDERRAR/social-support-app"
      stars: 0
      license: null
      language: TypeScript
      pushed_at: "2026-06-25T18:22:03Z"
      updated_at: "2025-05-12T19:34:52Z"
      homepage: "https://social-support-app.vercel.app"
      next: "15.3.2"
      freshness: ok  # push ≤90d from 2026-08-08
      paths_reviewed:
        - README.md
        - package.json
        - .env.example
        - src/hooks/use-local-storage.ts
        - src/lib/zod-schemas.ts
        - src/components/form/application-form-wizard.tsx
        - src/components/ui/stepper.tsx
        - src/app/api/submit/route.ts
        - src/app/api/openai/route.ts
        - src/app/(app)/success/page.tsx
        - src/__tests__/components/form/application-form-wizard.test.tsx
        - src/__tests__/lib/zod-schemas.test.ts
      checklist:
        step_nav_hash_query: "in-memory currentStep 1..3 + Stepper UI — NOT hash/query"
        localStorage_ssr_safe: "useLocalStorage: typeof window === undefined → initialValue; try/catch JSON"
        per_step_validation: "formMethods.trigger([...fields]) per step before advance"
        pending_success_error_retry: "partial — success → clear LS + /success; error only console.error; draft KEPT on failure (good)"
        server_validation_size_secrets: "submit route mock delay, NO Zod re-validate; openai uses env OPENAI_* server-side"
        sendMessage_sendDocument: "n/a"
        double_submit: "weak — RHF handleSubmit but no explicit isSubmitting disable / idempotency key"
      patterns:
        - "Single FormProvider + multi-step components (better for 12-chapter neon port than URL-per-step)"
        - "FORM_STORAGE_KEY + useLocalStorage hook SSR-safe"
        - "watch() subscription syncs RHF → LS continuously"
        - "reset(storedFormData) on mount for hydrate"
        - "trigger(fieldList) = per-step gate"
        - "POST /api/submit JSON; clear storage ONLY if response.ok"
        - "Secrets only in Route Handler (openai/route.ts) — never NEXT_PUBLIC"
        - ".env.example documents server keys"
        - "Jest coverage for wizard + zod-schemas"
      gaps_vs_checklist:
        - "No hash/query chapter persistence (refresh resets currentStep to 1 even if LS has data)"
        - "No user-visible error/retry UI; no size limit on payload"
        - "submit/route.ts does not re-validate with Zod (trusts client)"
        - "No honeypot / spam path (unlike EG strategy/lead)"
        - "Vercel-oriented demo — ignore domain; EG stays Timeweb eg.egoshev.ru"
      adapt_for_cursor_anketaplan:
        - "PRIMARY client pattern for /anketaplan: one client wizard + chapter index state + Stepper/progress for 12 chapters"
        - "Port useLocalStorage semantics; key MUST stay egoshev_master_intake_v3 (compat with HTML master)"
        - "Also persist currentChapter in LS blob so refresh resumes chapter (fix social-support gap)"
        - "On POST failure: keep draft (already their pattern); add visible error + Retry; disable button while pending"
        - "API: do NOT copy mock submit — copy strategy/lead shape: honeypot pretend-ok, validate, 502 on TG fail"
        - "Server: re-run Zod + max body/size check before Telegram"
        - "Optional: success page or in-place success state; clear LS only after delivered:true"

    - repo: "jilimb0/TGWrapper"
      url: "https://github.com/jilimb0/TGWrapper"
      stars: 0
      license: Apache-2.0
      language: TypeScript
      pushed_at: "2026-07-20T04:21:51Z"
      updated_at: "2026-07-12T09:22:05Z"
      freshness: ok
      paths_reviewed:
        - README.md
        - src/core/api-client.ts
        - test/api-client.high-level.test.ts
        - (tree scan: sendDocument / FormData / BinaryInput)
      checklist:
        step_nav_hash_query: "n/a (bot framework)"
        localStorage_ssr_safe: "n/a"
        per_step_validation: "n/a"
        pending_success_error_retry: "ApiClient retry: maxRetries 3, 429 retry_after, jitter backoff, circuit breaker"
        server_validation_size_secrets: "token in ApiClient ctor (server); no size gate for documents in client"
        sendMessage_sendDocument: "YES — high-level sendMessage + sendDocument; binary → FormData auto"
        double_submit: "requestId UUID per call; retries are transport-level (risk of duplicate TG msgs on ambiguous network — relevant for webhook bots more than one-shot form POST)"
      patterns:
        - "containsBinaryPayload → toFormData else JSON.stringify"
        - "sendDocument(chatId, BinaryInput, extra) → callApi('sendDocument', { chat_id, document, ...extra })"
        - "BinaryInput: Blob | Uint8Array | ArrayBuffer | AsyncIterable"
        - "appendFormValue: Blob/Uint8Array → toBlob → form.append(key, file) — NO explicit filename argument"
        - "fetch(`${baseUrl}/bot${token}/${method}`) POST"
        - "TelegramApiError + retryable Network/429"
      gaps_vs_checklist:
        - "Filename omitted on FormData append — Telegram may get generic name; BAD for intake_*.txt UX"
        - "Heavy framework (Redis, observability) — overkill for one Route Handler delivery"
        - "Does not teach sendMessage THEN sendDocument orchestration / failure partial state"
      adapt_for_cursor_anketaplan:
        - "DO NOT add @tgwrapper/core dependency — extract pattern only"
        - "Extend lib/notifications/telegram.ts: keep sendTelegramMessage; add sendTelegramDocument via native FormData"
        - "CRITICAL: form.append('document', blob, 'egoshev_master_intake_YYYYMMDD.txt') — third arg filename (TGWrapper gap)"
        - "content-type text/plain on Blob"
        - "Order: sendMessage(short HTML summary) then sendDocument(full dump); if message ok / doc fail → still 502 or partial flag — decide: prefer both-or-502 so client retries keep draft"
        - "Reuse retry/backoff optionally for 429; keep strategy/lead 502 contract"

    - repo: "yagop/node-telegram-bot-api"
      url: "https://github.com/yagop/node-telegram-bot-api"
      stars: 9195
      license: MIT
      language: TypeScript
      pushed_at: "2026-07-14T16:34:40Z"
      updated_at: "2026-08-08T11:44:29Z"
      freshness: ok
      note: "v2 rewrite (@next); mined uploads/multipart only — not full bot runner"
      paths_reviewed:
        - README.md (Uploads section)
        - examples/08-uploads.ts
        - src/core/files.ts
        - src/core/multipart.ts
        - test/unit/multipart.test.ts
      checklist:
        step_nav_hash_query: "n/a"
        localStorage_ssr_safe: "n/a"
        per_step_validation: "n/a"
        pending_success_error_retry: "transport maxRetries; Blob/Uint8Array re-streamable on retry; bare ReadableStream one-shot"
        server_validation_size_secrets: "token via Api/Bot; filename/contentType explicit in InputFile meta"
        sendMessage_sendDocument: "YES — api.sendDocument({ chat_id, document: new InputFile(bytes, { filename, contentType }) })"
        double_submit: "library retries transport — form POST must client-lock; idempotency not in library"
      patterns:
        - "InputFile(data, { filename?, contentType? }) — filename is what Telegram sees (no sniffing)"
        - "multipartBody always sets Content-Disposition filename= (fallback to field name)"
        - "hello.txt example: TextEncoder → InputFile(..., { filename: 'hello.txt', contentType: 'text/plain' })"
        - "Escape CR/LF in filename/contentType (header injection hardening)"
        - "String document value = file_id/URL; bytes must be wrapped"
        - "Next App Router webhook helper exists but IRRELEVANT for outbound form notify"
      gaps_vs_checklist:
        - "Adding full node-telegram-bot-api@next for one sendDocument is heavy vs fetch+FormData"
        - "Legacy v1 Buffer+fileOptions docs still online — do not mix APIs"
      adapt_for_cursor_anketaplan:
        - "Semantics SoT for .txt attachment: ALWAYS pass filename + text/plain"
        - "Implement with fetch FormData (match existing telegram.ts style), not new Bot SDK"
        - "Canonical wire shape: chat_id + document file part with filename intake_*.txt + optional caption"
        - "If retrying sendDocument after failure, Buffer/Uint8Array/Blob is fine (replayable); do not use one-shot stream"
        - "Client: isSubmitting lock; optional Idempotency-Key header stored server-side briefly if double-POST feared"

  cross_repo_synthesis:
    recommended_stack_for_anketaplan:
      client: |
        social-support-app wizard model (single page, chapter index, RHF optional or controlled state from HTML port)
        + 63r6o ideas: Zod per-chapter + full-schema gate + versioned LS key
        + persist chapter index inside egoshev_master_intake_v3 payload
      api: |
        Mirror app/api/strategy/lead/route.ts (honeypot, validate, 502)
        + server Zod + payload size cap
        + sendTelegramMessage(short) then sendTelegramDocument(.txt)
      telegram: |
        Extend telegram.ts with FormData sendDocument; filename+contentType from yagop semantics;
        FormData detection idea from TGWrapper; NO new bot framework dep
      double_submit: |
        Client pending lock + disable CTA; keep draft on any non-success;
        clear LS only after { ok:true, delivered:true }
      do_not:
        - touch /anketa
        - vercel domain assumptions
        - clear draft on error
        - FormData append without filename
        - expose bot token to client

  checklist_coverage_matrix:
    step_nav_hash_query: "partial — none of mines use hash; adapt by storing chapter in LS ± ?ch="
    localStorage_hydrate_ssr: "covered — 63r6o ssr:false; BBEDERRAR typeof window"
    per_step_validation: "covered — both form repos"
    pending_success_error_retry_keeps_draft: "partial — BBEDERRAR keeps draft on fail; need UI"
    server_validation_size_env: "partial — openai env pattern; submit lacks Zod/size — EG must add"
    sendMessage_plus_sendDocument_txt: "covered — TGWrapper + yagop (filename critical)"
    double_submit: "weak in all mines — EG must add client lock ± optional idempotency"

  mines_count: 4
  deep_pass: true  # ≥2 successful deep mines
```

---

## Adaptation bullets (factory handoff)

### Client `/anketaplan`
1. Port neon 12-chapter UI as **client island** (preserve visuals from `master-client-intake.html`).
2. Storage key **`egoshev_master_intake_v3`** — merge partial chapter updates; include `currentChapter`.
3. Hydrate SSR-safe (`typeof window` or dynamic `ssr:false` island).
4. Validate chapter before next; full validate before submit.
5. States: `idle | pending | success | error`; Retry keeps draft; clear LS only on delivered success.
6. Double-submit: disable CTA while `pending`.

### API `POST /api/anketaplan` (name TBD)
1. Clone contracts from `strategy/lead`: honeypot → fake ok; validate → 400; TG fail → **502**.
2. Server Zod + max JSON/text size before TG.
3. Env: same token/chat pattern as `telegram.ts` (server-only).
4. `sendMessage` short summary → `sendDocument` UTF-8 `.txt` dump.

### `telegram.ts` extension
```ts
// Pattern (adapt, do not paste libs):
const fd = new FormData();
fd.append("chat_id", chatId);
fd.append("document", new Blob([text], { type: "text/plain;charset=utf-8" }), filename);
await fetch(`https://api.telegram.org/bot${token}/sendDocument`, { method: "POST", body: fd });
```

### Explicit non-goals
- Do not install TGWrapper / node-telegram-bot-api for this feature.
- Do not modify `/anketa`.
- Do not assume Vercel.

---

## Freshness notes

| Repo | pushed_at | freshness | action |
|------|-----------|-----------|--------|
| 63r6o/... | 2024-11-05 | block | patterns only |
| BBEDERRAR/... | 2026-06-25 | ok | primary client pattern |
| jilimb0/TGWrapper | 2026-07-20 | ok | FormData detect pattern |
| yagop/node-telegram-bot-api | 2026-07-14 | ok | filename/InputFile semantics |

---

## Open questions for synthesizer / factory

1. Persist chapter via `?ch=` vs LS-only (mines don't settle this)?
2. On sendMessage OK + sendDocument fail: return 502 (retry both) vs `delivered: partial`?
3. Filename scheme: `egoshev_master_intake_{iso}.txt` vs include phone/name slug?
