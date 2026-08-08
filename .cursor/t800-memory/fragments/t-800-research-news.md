# t-800-research-news — Next.js 15–16 body limits / forms (nice channel)

**Date:** 2026-08-08  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Intent:** Dated news/changelog only — Route Handler POST · Client forms · body limits (Next 15–16)  
**Deploy context:** Timeweb Node **self-host** (≠ Vercel serverless body caps)

---

## Verdict

**status: ok** — material for self-host forms/uploads; **not** a Vercel-limit story.

Stack of limits that *do* apply on Timeweb:

| Layer | Default (docs) | Applies when | Failure mode |
| --- | --- | --- | --- |
| `serverActions.bodySizeLimit` | **1MB** | Server Actions / `"use server"` forms | Reject / size guard (Action path) |
| `experimental.middlewareClientMaxBodySize` (15.x) | **10MB** | `middleware` buffers body | **Silent truncate** — no client 413 |
| `experimental.proxyClientMaxBodySize` (16 / proxy) | **10MB** | `proxy.ts` buffers body for RH | **Silent truncate** — no client 413 |
| Reverse proxy (nginx/Caddy on Timeweb) | vendor-specific | In front of Node | Often real **413** |

Vercel Hobby/Pro **~4.5MB** platform cap: **irrelevant** on Timeweb. Next.js *internal* buffers + any OS/nginx still matter.

---

## news_findings

```yaml
status: ok
channel: nice
prefer_freshness_days: 30
hard_freshness_days: 90
news_findings:
  - source: blog
    url: "https://nextjs.org/blog/july-2026-security-release"
    published: "2026-07-20"
    freshness: ok
    claim: >
      Patch to next@15.5.21 / next@16.2.11. Among CVEs: unbounded Server Action
      payload on Edge (CVE-2026-64646); SSRF when Server Action forwards/redirects
      on custom servers (CVE-2026-64649); App Router Server Action DoS (CVE-2026-64641).
    impact_for_cursor: >
      Timeweb custom Node = custom server path. Prefer patched 15.5.21+ or 16.2.11+.
      Keep forms on Node Route Handlers / Node runtime Actions; avoid Edge Actions
      for intake payloads. Security patch ≠ raising bodySizeLimit.

  - source: changelog
    url: "https://nextjs.org/docs/app/api-reference/config/next-config-js/serverActions"
    published: "2026-06-25"
    freshness: warn
    claim: >
      Official docs (v16.3.0): serverActions.bodySizeLimit default remains 1MB;
      limit is raw HTTP body including multipart overhead (suggest +10–20KB headroom).
      Config still shown under experimental.serverActions in examples.
    impact_for_cursor: >
      Client <form> → Server Action intake: raise bodySizeLimit only if needed;
      Route Handler POST JSON/text is a separate path (not this knob alone).

  - source: changelog
    url: "https://nextjs.org/docs/app/api-reference/config/next-config-js/proxyClientMaxBodySize"
    published: "2025-10-20"
    freshness: block
    claim: >
      Docs lastUpdated 2025-10-20 (v16.3.0 page): when proxy is used, body is
      cloned/buffered; default max 10MB; over-limit → partial body + console warn,
      request continues (no hard fail to client).
    impact_for_cursor: >
      Material for Next 16 + proxy.ts in path to Route Handler POST. Align
      proxyClientMaxBodySize with expected FormData size or uploads corrupt silently.
      Stale as “news” (>90d) but still SoT docs — cite with docs date.

  - source: changelog
    url: "https://nextjs.org/docs/15/app/api-reference/config/next-config-js/middlewareClientMaxBodySize"
    published: "2025-10-09"
    freshness: block
    claim: >
      Next 15.5.x docs: middlewareClientMaxBodySize default 10MB; same silent
      truncation semantics when middleware reads/clones body before Route Handler.
    impact_for_cursor: >
      If site still on middleware.ts (15.x) on Timeweb, set this for large POST
      bodies. On 16 prefer proxyClientMaxBodySize after middleware→proxy rename.

  - source: blog
    url: "https://nextjs.org/blog/next-16"
    published: "2025-10-21"
    freshness: block
    claim: >
      Next.js 16 renames middleware.ts → proxy.ts (Node default runtime);
      middleware deprecated for Edge cases. Body-buffer config follows proxy path.
    impact_for_cursor: >
      Breaking rename for App Router request interception; form POST through
      proxy inherits buffering limits. Codemod available. Not a form API change per se.

  - source: other
    url: "https://github.com/vercel/next.js/discussions/86985"
    published: "2025-12-09"
    freshness: block
    claim: >
      Community (15.5+ standalone prod): FormData file binary dropped / 0-byte
      despite 200; serverActions.bodySizeLimit alone insufficient; reports point to
      separate proxyClientMaxBodySize. Conflicting reports of effective ~1MB vs docs 10MB.
      One user: option ineffective on 15.5.12 until upgrade to 16.2.4.
    impact_for_cursor: >
      Announcement≠verified single default. For Timeweb standalone: set BOTH
      bodySizeLimit and proxy/middlewareClientMaxBodySize; verify with build+start
      (not only next dev). Prefer Route Handler + size checks for uploads >1MB.

  - source: other
    url: "https://github.com/vercel/next.js/issues/90090"
    published: "2026-03-10"
    freshness: warn
    claim: >
      multipart/form-data POST without valid Server Action IDs can return 500
      instead of 404 (action-handler). Fix PRs open/discussed (#91129 / related).
    impact_for_cursor: >
      Client forms must POST to an exported Route Handler POST or a real Action —
      wrong path + multipart can look like “forms broken” (500). Monitor patch
      line before relying on fallthrough 404.

  - source: other
    url: "https://github.com/vercel/next.js/issues/93754"
    published: "2026-05-11"
    freshness: warn
    claim: >
      Reports of empty FormData on Server Actions after 16.2.6 security build;
      reporter later attributed to browser cache; issue closed / locked.
    impact_for_cursor: >
      Soft warn only — not confirmed framework regression. If empty FormData after
      security bump: hard-refresh / clear client cache before blaming Next.
```

---

## Timeweb mapping (self-host)

1. **Do not** design around Vercel 4.5MB — it is not your ceiling.  
2. **Do** assume Next buffering limits if `middleware`/`proxy` is present + Action 1MB default.  
3. Check **nginx/Caddy `client_max_body_size` / equivalent** on Timeweb — often the real hard stop (413).  
4. Prefer **Route Handler `POST`** for structured intake (JSON / small multipart); raise limits only with memory budget on the VPS.  
5. After Jul 2026 security: stay on **patched** 15.5.21+ / 16.2.11+; custom-server SSRF CVE is self-host relevant.  
6. No factory artifacts from this pass.

---

## Skip / non-material

- Empty FormData #93754 — closed as non-repro / client cache.  
- Generic “unable to access API 404” StackOverflow — method/export mistakes, not 2025–26 breaking change.
