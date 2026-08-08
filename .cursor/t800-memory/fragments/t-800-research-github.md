# t-800-research-github — fragment

**Topic:** anketaplan · Next.js App Router multi-step form + localStorage + Telegram `sendDocument` from route handler  
**Date:** 2026-08-08  
**Mode:** DEEP shallow (no clone)  
**status:** ok · form patterns mixed freshness · Telegram libs fresh

> 💡 Shallow pass only. Deep tree/scripts → `t-800-research-repo-miner` via lead.

## Verdict

Канон для wizard+localStorage в App Router — **63r6o** (SSR-safe `dynamic(..., { ssr: false })` + Zod `.pick` + Context). Самый свежий Next 15 пример persistence — **BBEDERRAR**. Для route handler → Telegram file: **raw `FormData` + `File`/`Blob` + `fetch(.../sendDocument)`** (TGWrapper / Grammy InputFile / yagop fileOptions) — не копировать устаревший Pages `formidable` verbatim.

## Freshness (as of 2026-08-08)

| Level | Age | Action |
|-------|-----|--------|
| ok | ≤90d | adapt |
| warn | 91–180d | only if no fresher |
| block | >180d | patterns only, no verbatim |

---

## github_findings

```yaml
github_findings:
  - repo: "BBEDERRAR/social-support-app"
    url: "https://github.com/BBEDERRAR/social-support-app"
    stars: 0
    last_activity: "2026-06-25"
    freshness: ok
    license: null
    artifact_type: other
    snippet_summary: "Next.js 15 + React 19 + RHF + Zod + shadcn; custom useLocalStorage; multi-step wizard with SSR-safe persistence."
    adapt_for_cursor: "Port useLocalStorage + per-step Zod; map to anketaplan steps; ignore AI/OpenAI parts."

  - repo: "63r6o/shadcn-nextjs-multistep-form-example"
    url: "https://github.com/63r6o/shadcn-nextjs-multistep-form-example"
    stars: 25
    last_activity: "2024-11-05"
    freshness: block
    license: null
    artifact_type: other
    snippet_summary: "App Router multi-route wizard; Context + localStorage; dynamic import ssr:false; Zod schema.pick per step; clearFormData on submit."
    adapt_for_cursor: "Treat as pattern SoT despite stale push; re-verify vs Next 15 dynamic/ssr; attribution if code adapted."

  - repo: "jamesqquick/nextjs-multi-page-form-nextjs"
    url: "https://github.com/jamesqquick/nextjs-multi-page-form-nextjs"
    stars: 38
    last_activity: "2024-07-30"
    freshness: block
    license: null
    artifact_type: other
    snippet_summary: "App Router multi-page form; Context + localStorage; Zod; server actions / useFormState."
    adapt_for_cursor: "Cross-check persistence vs 63r6o; prefer route handler over server action for Telegram file upload."

  - repo: "SametAydinhan/multi-step-form-nextjs"
    url: "https://github.com/SametAydinhan/multi-step-form-nextjs"
    stars: 1
    last_activity: "2025-06-02"
    freshness: block
    license: MIT
    artifact_type: other
    snippet_summary: "App Router onboarding wizard; RHF + Zod + Chakra; no localStorage persistence documented."
    adapt_for_cursor: "Use only for step component split + resolver wiring; add LS from 63r6o/BBEDERRAR."

  - repo: "natdexterra/multistep-form-engine"
    url: "https://github.com/natdexterra/multistep-form-engine"
    stars: 0
    last_activity: "2026-03-10"
    freshness: warn
    license: null
    artifact_type: other
    snippet_summary: "Vite+shadcn+RHF+Zod+Zustand localStorage middleware; branching; review step. Not Next App Router."
    adapt_for_cursor: "Steal Zustand persist shape if Context grows; do not import Vite layout as Next."

  - repo: "jilimb0/TGWrapper"
    url: "https://github.com/jilimb0/TGWrapper"
    stars: 0
    last_activity: "2026-07-20"
    freshness: ok
    license: Apache-2.0
    artifact_type: other
    snippet_summary: "TS Telegram client: sendDocument via FormData; Blob/Uint8Array → append; binary payload detection."
    adapt_for_cursor: "Primary pattern for App Router route.ts → Telegram multipart without heavy bot framework."

  - repo: "yagop/node-telegram-bot-api"
    url: "https://github.com/yagop/node-telegram-bot-api"
    stars: 9195
    last_activity: "2026-07-14"
    freshness: ok
    license: MIT
    artifact_type: other
    snippet_summary: "Canonical sendDocument(path|Stream|Buffer) + fileOptions.filename/contentType; Buffer needs filename."
    adapt_for_cursor: "Prefer thin fetch+FormData in Next route; cite yagop only for Buffer/filename edge cases."

  - repo: "grammyjs/grammY"
    url: "https://github.com/grammyjs/grammY"
    stars: 3709
    last_activity: "2026-08-08"
    freshness: ok
    license: MIT
    artifact_type: other
    snippet_summary: "Modern Bot API; InputFile for multipart uploads; very active."
    adapt_for_cursor: "Optional if anketaplan wants grammy; else raw FormData (Bun/stream caveats documented elsewhere)."

  - repo: "telegraf/telegraf"
    url: "https://github.com/telegraf/telegraf"
    stars: 9177
    last_activity: "2025-01-11"
    freshness: block
    license: MIT
    artifact_type: other
    snippet_summary: "sendDocument via callApi; mature but last push stale vs grammy/yagop."
    adapt_for_cursor: "Secondary; prefer grammy or raw FormData for new Next route."

  - repo: "madebyankur/use-safe-submit"
    url: "https://github.com/madebyankur/use-safe-submit"
    stars: 1
    last_activity: "2025-09-09"
    freshness: block
    license: MIT
    artifact_type: other
    snippet_summary: "Client UUID idempotency-key + withIdempotency App Router wrapper; MemoryStore; anti double-submit."
    adapt_for_cursor: "Pattern only: Idempotency-Key header or form field before Telegram sendDocument."

  - repo: "morganney/next-no-double-submit"
    url: "https://github.com/morganney/next-no-double-submit"
    stars: 0
    last_activity: "2024-05-09"
    freshness: block
    license: null
    artifact_type: other
    snippet_summary: "useFormStatus / useActionState client pending gate demo."
    adapt_for_cursor: "UI disable-while-pending only; pair with server idempotency for Telegram."
```

---

## top_repos (ranked)

| Rank | Repo | Stars | Activity | Why relevant |
|------|------|------:|----------|--------------|
| 1 | BBEDERRAR/social-support-app | 0 | 2026-06-25 ok | Fresh Next 15 multi-step + localStorage + RHF/Zod |
| 2 | 63r6o/shadcn-nextjs-multistep-form-example | 25 | 2024-11-05 block | Best documented App Router LS + `ssr:false` + Zod pick |
| 3 | jilimb0/TGWrapper | 0 | 2026-07-20 ok | FormData/Blob `sendDocument` — route-handler shaped |
| 4 | yagop/node-telegram-bot-api | 9195 | 2026-07-14 ok | Production sendDocument Buffer/filename semantics |
| 5 | grammyjs/grammY | 3709 | 2026-08-08 ok | Modern InputFile multipart alternative |
| 6 | jamesqquick/nextjs-multi-page-form-nextjs | 38 | 2024-07-30 block | Context + LS + Zod + server actions cross-check |
| 7 | madebyankur/use-safe-submit | 1 | 2025-09-09 block | Idempotency for form POST / route handlers |
| 8 | SametAydinhan/multi-step-form-nextjs | 1 | 2025-06-02 block | Candidate verified: RHF+Zod wizard, no LS |

```yaml
top_repos:
  - repo: "BBEDERRAR/social-support-app"
    url: "https://github.com/BBEDERRAR/social-support-app"
    why: "Freshest Next 15 App Router wizard with localStorage + RHF/Zod/shadcn"
  - repo: "63r6o/shadcn-nextjs-multistep-form-example"
    url: "https://github.com/63r6o/shadcn-nextjs-multistep-form-example"
    why: "Canonical App Router multi-route form + LS + dynamic ssr:false + Zod.pick"
  - repo: "jilimb0/TGWrapper"
    url: "https://github.com/jilimb0/TGWrapper"
    why: "TS FormData multipart sendDocument — closest to Next route handler"
  - repo: "yagop/node-telegram-bot-api"
    url: "https://github.com/yagop/node-telegram-bot-api"
    why: "Battle-tested sendDocument fileOptions; Buffer must carry filename"
  - repo: "grammyjs/grammY"
    url: "https://github.com/grammyjs/grammY"
    why: "Active InputFile upload API if bot framework preferred over raw fetch"
  - repo: "jamesqquick/nextjs-multi-page-form-nextjs"
    url: "https://github.com/jamesqquick/nextjs-multi-page-form-nextjs"
    why: "Popular App Router + Context/LS + Zod; stale but useful cross-check"
  - repo: "madebyankur/use-safe-submit"
    url: "https://github.com/madebyankur/use-safe-submit"
    why: "Anti double-submit + Idempotency-Key for App Router POST"
  - repo: "SametAydinhan/multi-step-form-nextjs"
    url: "https://github.com/SametAydinhan/multi-step-form-nextjs"
    why: "Verified candidate: RHF+Zod App Router wizard (no LS)"
```

---

## handoff_repo_miner

**Deep-mine these (priority order):**

1. `63r6o/shadcn-nextjs-multistep-form-example` — form layout, context, LS key, `dynamic` SSR gate, step routes, Zod pick  
2. `BBEDERRAR/social-support-app` — `useLocalStorage` hook, Next 15 client/server boundary, step validation sync  
3. `jilimb0/TGWrapper` — `toFormData` / `appendFormValue` / `sendDocument` binary path  
4. `yagop/node-telegram-bot-api` — `doc/usage.md` sending files + filename/contentType rules  

**Optional if time:** `madebyankur/use-safe-submit` (idempotency wrapper), `grammyjs/grammY` (InputFile only).

```yaml
handoff_repo_miner: true
deep_mine:
  - "63r6o/shadcn-nextjs-multistep-form-example"
  - "BBEDERRAR/social-support-app"
  - "jilimb0/TGWrapper"
  - "yagop/node-telegram-bot-api"
skip_or_shallow_only:
  - "SametAydinhan/multi-step-form-nextjs"  # no LS; redundant after 63r6o
  - "telegraf/telegraf"  # stale push; prefer grammy/raw
  - "natdexterra/multistep-form-engine"  # Vite, not App Router
```

---

## Pattern notes (for synthesizer / factory — not code)

### Multi-step + localStorage (App Router)
- Persist partial step data in Context or Zustand; write LS on each step submit.
- **Must** avoid `localStorage` during SSR: `next/dynamic(..., { ssr: false })` on provider **or** hydrate in `useEffect`.
- Per-step Zod: `schema.pick({ ... })` + `zodResolver`; clear storage after successful final submit.

### Telegram `sendDocument` from `route.ts`
- Build `FormData`: `chat_id`, `document` as `File`/`Blob` (filename required), optional `caption`.
- `fetch(https://api.telegram.org/bot${TOKEN}/sendDocument, { method: "POST", body: form })` — **do not** set `Content-Type` manually.
- Buffer without filename → Telegram type errors (yagop docs / issues).
- Prefer thin fetch over full bot framework for one-shot notify from Next route.

### Anti double-submit
- Client: disable while pending (`useFormStatus` / local submitting flag).
- Server: `Idempotency-Key` (header or form field) + short-TTL store before calling Telegram — so double-click ≠ double document.

### adaptation_notes
- MIT/Apache OK with attribution.
- Stale form repos: copy **patterns**, not dependency pins.
- EG brand/product copy never from these repos.
- anketaplan: wizard → generate attachment → POST route → `sendDocument` once (idempotent).

---

## Queries run
1. Next.js App Router multi-step form TypeScript localStorage  
2. react-hook-form zod wizard App Router  
3. shadcn multistep form nextjs localStorage  
4. Telegram Bot API sendDocument Node.js FormData typescript  
5. Next.js route handler telegram notification file attachment  
6. anti double submit idempotency form Next.js  

## Candidates verified (2026-08-08)
- ✅ 63r6o/shadcn-nextjs-multistep-form-example (25★, push 2024-11-05, **block**)  
- ✅ SametAydinhan/multi-step-form-nextjs (1★, push 2025-06-02, **block**, no LS)  
- ✅ Telegram multipart: jilimb0/TGWrapper (**ok**) + yagop/node-telegram-bot-api (**ok**) (+ grammyjs/grammY backup)
