# t-800-research-docs — anketaplan port (Next.js)

> 💡 Context7 DEEP · library `/vercel/next.js` · site-next `next@16.2.10` · 2026-08-08  
> Роль: `docs_brief` для research-lead. Без production code.

## Свойства

| Поле | Значение |
|------|----------|
| status | ok |
| libraryId | `/vercel/next.js` |
| project_next | `16.2.10` (`01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next/package.json`) |
| Context7 versions nearest | `v16.2.9` listed; queried unversioned `/vercel/next.js` (canary docs) |
| budget_mode | deep |
| query_count | 5 |
| research_date | 2026-08-08 |

---

```yaml
status: ok
docs_brief:
  libraryId: "/vercel/next.js"
  project_package:
    path: "01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next/package.json"
    next: "16.2.10"
    react: "19.2.4"
  queries:
    - "App Router Route Handlers POST method request.json() request.formData() reading body Response"
    - "forms Client Components useActionState Server Actions vs fetch calling Route Handler API"
    - "body size limits serverActions bodySizeLimit route handlers Node.js runtime proxyClientMaxBodySize"
    - "dynamic ssr false Client Component localStorage browser-only window next/dynamic"
    - "NextResponse.json status codes error responses 400 413 429 502 Route Handler"
  citations:
    - topic: "Route Handler POST + request.json / formData"
      quote: "To access the request body, use Request instance methods such as .json(), .formData(), or .text()."
      libraryId: "/vercel/next.js"
      source: "https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/backend-for-frontend.mdx"
    - topic: "Route Handler formData example"
      quote: "Extract form data from the request body using request.formData(). Individual fields can be accessed with formData.get('fieldName')."
      libraryId: "/vercel/next.js"
      source: "https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/03-file-conventions/route.mdx"
    - topic: "useActionState + Server Action forms"
      quote: "This client component uses React's useActionState hook to invoke a server action and access its returned state."
      libraryId: "/vercel/next.js"
      source: "https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/10-error-handling.mdx"
    - topic: "Client fetch → Route Handler"
      quote: "Call the API Route from the client with an event handler… POST request to the API endpoint."
      libraryId: "/vercel/next.js"
      source: "https://github.com/vercel/next.js/blob/canary/docs/02-pages/02-guides/forms.mdx"
    - topic: "Server Actions sequential; Route Handler for parallel/non-mutation BFF"
      quote: "do not rely on Promise.all to parallelize Server Actions from the client… or use a Route Handler for non-mutation requests."
      libraryId: "/vercel/next.js"
      source: "https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/server-actions.mdx"
    - topic: "serverActions.bodySizeLimit default 1MB"
      quote: "Configure bodySizeLimit to control the maximum size of the request body sent to a Server Action. The default limit is 1MB…"
      libraryId: "/vercel/next.js"
      source: "https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/05-config/01-next-config-js/serverActions.mdx"
    - topic: "App Route formData no Next size cap"
      quote: "await request.formData() in a Route Handler will read the entire body into memory without any cap."
      libraryId: "/vercel/next.js"
      source: "https://github.com/vercel/next.js/blob/canary/packages/next/src/server/route-modules/app-route/module.ts"
    - topic: "Pages bodyParser.sizeLimit ≠ App Router"
      quote: "Pages Router API Routes default to a 1mb body size limit… This configuration does not apply to App Router Route Handlers."
      libraryId: "/vercel/next.js"
      source: "https://github.com/vercel/next.js/blob/canary/packages/next/src/server/api-utils/node/api-resolver.ts"
    - topic: "next/dynamic ssr:false browser-only"
      quote: "Use the ssr: false option with next/dynamic to prevent a Client Component from being prerendered on the server."
      libraryId: "/vercel/next.js"
      source: "https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/lazy-loading.mdx"
    - topic: "localStorage / window not on server"
      quote: "Web APIs like window, localStorage, and navigator are not available on the server, these APIs must be safely accessed only when the component is executing in the browser."
      libraryId: "/vercel/next.js"
      source: "https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/static-exports.mdx"
    - topic: "NextResponse.json + status"
      quote: "Create a response with a JSON body and an optional status code. Commonly used in API routes. Example: NextResponse.json({ error: '…' }, { status: 500 })."
      libraryId: "/vercel/next.js"
      source: "https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/next-response.mdx"
  unverified:
    - "Exact HTTP semantics for 413/429/502 are not prescribed by NextResponse docs — app must choose status; 413 appears in image-optimizer internals, not as Route Handler helper."
    - "Self-host nginx/caddy client_max_body_size and Telegram Bot API multipart limits are outside Next.js Context7 corpus (vendor/ops)."
    - "Whether experimental.serverActions stays under experimental in next@16.2.10 config types — verify against installed next/types at implement time."
  query_count: 5
  budget_mode: deep
  recommendation:
    transport: "Route Handler (App Router) + client fetch"
    not_preferred: "Server Action + useActionState as primary path for Telegram sendDocument + JSON BFF"
    rationale:
      - "Explicit JSON contract via request.json() and NextResponse.json(..., { status }) for 400/413/429/502 mapping from validation / TG upstream."
      - "BFF / external API (Telegram sendDocument) fits Route Handler guide; Server Actions optimized for form mutations + sequential per-client dispatch."
      - "Multipart outbound to Telegram is easier to assemble in a Node Route Handler (runtime = 'nodejs') from JSON or FormData inbound."
      - "Server Actions default bodySizeLimit 1MB; raising requires next.config experimental.serverActions — still weaker status/API ergonomics for proxy errors."
    client_island:
      - "'use client' island for draft persistence: read/write localStorage only in useEffect / event handlers (never during SSR render)."
      - "For heavy browser-only modules: next/dynamic(() => import(...), { ssr: false }) from a Client Component parent."
      - "Optional: Suspense + loading fallback when using dynamic."
    body_limits:
      server_actions: "default 1MB; configure experimental.serverActions.bodySizeLimit ('2mb' etc.)."
      app_route_handlers: "no Pages-style bodyParser.sizeLimit; request.formData()/json() can consume full body — enforce app-level max + reverse-proxy limit on self-host Node."
      proxy: "experimental.proxyClientMaxBodySize (e.g. '1mb') when proxying."
      self_host_node: "export const runtime = 'nodejs'; Edge deprecated for routes needing Node APIs; set nginx/caddy max body independently of Next."
  sources:
    - url: "https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/03-file-conventions/route.mdx"
      published_or_updated: "2026-08-08"
      freshness: ok
      takeaway: "POST Route Handler: request.json / formData Web API."
      note: "Context7 canary snapshot at research time; continuous docs."
    - url: "https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/backend-for-frontend.mdx"
      published_or_updated: "2026-08-08"
      freshness: ok
      takeaway: "BFF pattern; consume payloads with .json/.formData/.text."
    - url: "https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/05-config/01-next-config-js/serverActions.mdx"
      published_or_updated: "2026-08-08"
      freshness: ok
      takeaway: "serverActions.bodySizeLimit default 1MB."
    - url: "https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/lazy-loading.mdx"
      published_or_updated: "2026-08-08"
      freshness: ok
      takeaway: "next/dynamic { ssr: false } for client-only islands."
    - url: "https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/next-response.mdx"
      published_or_updated: "2026-08-08"
      freshness: ok
      takeaway: "NextResponse.json(body, { status }) for API error codes."
    - url: "https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/server-actions.mdx"
      published_or_updated: "2026-08-08"
      freshness: ok
      takeaway: "Prefer Route Handler when BFF/parallel/non-mutation API shape needed."
  research_brief:
    docs: "<this docs_brief>"
```

---

## Вердикт для anketaplan (кратко)

1. **Transport:** App Router **Route Handler** (`POST`) + Client **`fetch`** с JSON (и при необходимости FormData).  
2. **Не как основной путь:** Server Action + `useActionState` — ок для простых form-мутаций UI, слабо для Telegram BFF + кастомных 400/413/429/502.  
3. **localStorage:** Client island (`'use client'` + post-mount access) и/или `dynamic(..., { ssr: false })`.  
4. **Лимиты:** SA ≈ **1MB** по умолчанию; App RH **без** Pages `bodyParser` — лимит на **self-host proxy + app guard**. Runtime: **`nodejs`**.  
5. **Ответы:** `NextResponse.json({ error, code }, { status: 400 | 413 | 429 | 502 })` — статус выбирает приложение.

## Запреты соблюдены

- Нет WebSearch/WebFetch вместо Context7  
- Нет factory-артефактов / production code  
- Budget: 5 `query-docs` (DEEP max)
