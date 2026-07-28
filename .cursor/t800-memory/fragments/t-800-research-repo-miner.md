# t-800-research-repo-miner — DEEP mine brief (RETRY)

> mined_at: 2026-07-28 | mode: DEEP | no clone | topic: FREE Western RSS → RU EG blog+TG  
> method: GitHub API + raw + WebFetch (README + key source/docs)  
> handoff: github shallow → prefer FreshRSS, NodeRSSBot, feedsmith (+ optional miniflux)

## Verdict for synthesizer

**v1 Cursor skill (no self-host):** take **feedsmith** (MIT) as parse/OPML lib + **NodeRSSBot patterns** (ETag/304, guid/link hash dedupe, TG HTML template + rate limit) as *logic*, not as deployable bot. **FreshRSS** = reference for **HTML+XPath + `frss:cssFullContent` OPML outline** (anatolyfit-class); **AGPL — patterns/docs only, never vendor PHP**. Human gate = draft artifacts before any `sendMessage` (invert NodeRSSBot auto-push).

Subscription SoT for EG: **YAML allowlist in vault** as source of truth; **OPML as interchange** (import seed / export backup) via feedsmith `parseOpml` / `generateOpml`. Optional later: Miniflux Apache-2.0 always-on poller.

---

```yaml
status: ok
repo_mine_brief:
  topic: "FREE Western RSS → RU EG adapt → blog + Telegram"
  mines_count: 4
  mines:
    - repo: "FreshRSS/FreshRSS"
      url: "https://github.com/FreshRSS/FreshRSS"
      stars: 15632
      license: "AGPL-3.0"
      last_activity: "2026-07-28"
      language: PHP
      freshness: ok
      paths_reviewed:
        - README.md (edge)
        - docs: users/11_website_scraping.html
        - docs: developers/OPML.html
        - app/views/helpers/export/opml.phtml
        - app/Models/Feed.php (unicityCriteria)
        - lib/http-conditional.php (presence)
        - included: SimplePie, lib_opml, PhpGt/CssXPath, php-http-304
      architecture_pattern: |
        Self-hosted aggregator: categories→feeds; poll via SimplePie + HTTP conditional;
        SoT subscriptions = OPML import/export with namespaced extensions
        xmlns:frss="https://freshrss.org/opml";
        feed kinds: RSS/Atom | HTML+XPath | XML+XPath | JSON Feed | JSON dotted |
        HTML+XPath→JSON; optional cssFullContent for full-article scrape after listing.
      concrete_config_formats:
        opml_html_xpath_example: |
          <outline xmlns:frss="https://freshrss.org/opml"
            text="Example" type="HTML+XPath"
            xmlUrl="https://www.example.net/page.html"
            htmlUrl="https://www.example.net/page.html"
            frss:xPathItem="//a[contains(@href,'/interesting/')]/ancestor::article"
            frss:xPathItemTitle="descendant::h2"
            frss:xPathItemContent="."
            frss:xPathItemUri="descendant::a[string-length(@href)>0]/@href"
            frss:xPathItemThumbnail="descendant::img/@src"
            frss:xPathItemUid="..."
            frss:cssFullContent="article"
            frss:cssFullContentConditions="..."
            frss:cssContentFilter="..."
            frss:unicityCriteria="link"
            frss:ttl="-60" />
        xpath_fields:
          - frss:xPathItem
          - frss:xPathItemTitle
          - frss:xPathItemContent
          - frss:xPathItemUri
          - frss:xPathItemAuthor
          - frss:xPathItemTimestamp
          - frss:xPathItemTimeFormat
          - frss:xPathItemThumbnail
          - frss:xPathItemCategories
          - frss:xPathItemUid
        unicity_criteria_values:
          - "id (default)"
          - "link"
          - "sha1:link_published"
          - "sha1:link_published_title"
          - "sha1:title"
          - "(auto-degrade on bad GUIDs)"
        css_full_content: "Article CSS selector on original site → OPML attr frss:cssFullContent"
      patterns_for_cursor_skill:
        - "Document HTML+XPath outline schema for sites without RSS (anatolyfit-class)"
        - "Separate listing XPath vs full-content CSS selector"
        - "Dedup policy ladder: guid → link → sha1(link+date+title)"
        - "OPML as portable subscription interchange + optional scrape metadata"
      adapt_for_eg:
        - "ADAPT: XPath/CSS outline YAML fields mirroring frss:* for 1–N no-RSS sites"
        - "ADAPT: unicityCriteria → skill dedupe key policy in state file"
        - "SKIP v1: full FreshRSS self-host / PHP / Docker / GReader API"
        - "SKIP: vendor any FreshRSS PHP (AGPL viral risk into skill/plugin)"
        - "LEGAL: scrape listing titles+URLs only; full HTML only for human rewrite brief, not republish"
      security_notes:
        - "AGPL-3.0 — patterns/docs citation OK; do not copy source into repo"
        - "OPML export can include CURLOPT_* cookies/proxy/headers — never commit private export with secrets"
        - "HTTP auth / cookie scrape configs are sensitive; EG vault secrets stay out of git"
        - "Respect robots/ToS; rate-limit HTML fetches; identifiable UA"

    - repo: "fengkx/NodeRSSBot"
      url: "https://github.com/fengkx/NodeRSSBot"
      stars: 406
      license: "MIT"
      last_activity: "2026-07-26"
      language: TypeScript
      freshness: ok
      paths_reviewed:
        - README.md
        - source/config.ts
        - source/types/config.d.ts
        - source/utils/fetch.ts
        - source/utils/feed.ts (getNewItems)
        - source/utils/hash-feed.ts
        - source/utils/send.ts
        - source/utils/got.ts (make-fetch-happen cache)
        - source/proxies/rss-feed.ts
        - source/parser/templates.ts (rss2/atom/rdf xpath maps)
        - source/types/message.ts
        - test/test-data/opml.opml
        - source/middlewares/import-from-opml.ts (path confirmed)
      architecture_pattern: |
        Multi-process: fetch worker (node-schedule + fastq concurrency) → IPC SuccessMessage
        {sendItems, feed} → Telegram sender (Telegraf);
        SQLite: rss_feed (url, etag_header, last_modified_header, recent_hash_list, ttl,
        next_fetch_time, error_count) + subscribes;
        HTTP: If-None-Match / If-Modified-Since → 304 skip parse;
        dedupe: MD5(guid|id)[:8] else MD5(link+title)[:8] vs recent_hash_list JSON;
        OPML import/export standard type=rss outlines; auto-discover <link rel=alternate rss|atom>.
      concrete_config_formats:
        env_vars:
          RSSBOT_TOKEN: "required Telegram bot token"
          RSSBOT_DB_PATH: "SQLite path (or DATABASE_URL on Heroku)"
          RSSBOT_FETCH_GAP: "5m | Nh — schedule interval"
          RSSBOT_STRICT_TTL: "1 — honor feed next_fetch_time"
          RSSBOT_HTTP_CACHE: "0|1 — make-fetch-happen disk cache"
          RSSBOT_ITEM_NUM: "10 — max items per push"
          RSSBOT_CONCURRENCY: "200 (capped by db_pool_max-2)"
          RSSBOT_SEND_CONCURRENCY: "48"
          RSSBOT_SEND_RATE: "45 msgs/window via async-sema RateLimit"
          RSSBOT_ALLOW_LIST: "comma user ids"
          NOT_SEND: "1 debug — fetch without Telegram"
          TELEGRAM_API_BASE: "https://api.telegram.org"
          RSSBOT_UA: "custom User-Agent"
        opml_sample: |
          <outline type="rss" text="Title" xmlUrl="https://.../feed.xml"/>
          nested groups via parent outline text= without xmlUrl
        telegram_message_template: |
          HTML: <b>sanitize(feed_title)</b>\n<a href="link">title||link</a>
          parse_mode=HTML; link_preview disabled;
          handle retry_after; delete subs on blocked/kicked
        hash_dedupe: "guid||id → md5[:8]; else md5(link+title)[:8]; sliding recent_hash_list"
      patterns_for_cursor_skill:
        - "Poll headers: If-None-Match + If-Modified-Since; treat 304 as no-op"
        - "Persist per-feed etag + last_modified + next_fetch_time in local JSON/SQLite state"
        - "Dedupe store: short hashes of guid/link; cap list ~2× items"
        - "TG: HTML template + Sema concurrency + RateLimit + retry_after sleep"
        - "OPML SoT import for bulk subscribe; NOT_SEND / draft mode for HITL"
        - "Discover feed URL from HTML link[rel=alternate]"
      adapt_for_eg:
        - "ADAPT: ETag/Last-Modified + hash dedupe into skill state file under vault"
        - "ADAPT: TG digest HTML template (source title + link only) after human OK"
        - "ADAPT: fetch_gap / item_num / send_rate as skill config knobs"
        - "ADAPT: NOT_SEND semantics → always draft-first (harder than default bot)"
        - "SKIP v1: always-on Node process / Docker / multi-user subscribe DB"
        - "SKIP: auto-push every poll (brand risk); EG = command-triggered + HITL"
        - "SKIP: RSSHub public instances as default (reliability/ToS); only curated feeds"
      security_notes:
        - "MIT — pattern reuse OK; do not ship bot token in git"
        - "RSSBOT_TOKEN / SENTRY_DSN / proxy creds via env only"
        - "sanitize() before HTML parse_mode to avoid injection"
        - "allow_list for who can command bot if ever deployed"
        - "delete_on_err_send cleans blocked chats — OK for bot, N/A for EG skill"

    - repo: "macieklamberski/feedsmith"
      url: "https://github.com/macieklamberski/feedsmith"
      stars: 611
      license: "MIT"
      last_activity: "2026-07-27"
      language: TypeScript
      freshness: ok
      paths_reviewed:
        - README.md
        - package.json (MIT, entities + fast-xml-parser)
        - docs/reference/opml.md
        - src/opml/common/types.ts
        - src/opml/parse/index.ts
        - src/feeds/*/parse|generate (tree)
        - homepage feedsmith.dev (OPML path via raw docs)
      architecture_pattern: |
        Library-only (no poller/server): universal parseFeed(content) → {format, feed};
        format-specific parseRssFeed/parseAtomFeed/parseJsonFeed/parseRdfFeed;
        generateRssFeed/generateAtomFeed/generateJsonFeed/generateOpml;
        parseOpml with extraOutlineAttributes + maxItems;
        preserves original structure + namespaces (dc, content, media, …);
        tree-shakable ESM+CJS; Node 14+ / browsers.
      concrete_config_formats:
        parse_api: |
          import { parseFeed, parseOpml, generateOpml, generateRssFeed } from 'feedsmith'
          const { format, feed } = parseFeed(xmlOrJson)
          // RSS items: title, link, guid?, pubDate?, dc?.creator, content?
          const opml = parseOpml(opmlXml, {
            extraOutlineAttributes: ['frss:cssFullContent', 'frss:xPathItem'] // custom
          })
          opml.body?.outlines?.[0].xmlUrl
        opml_outline_fields:
          - text (required)
          - type, xmlUrl, htmlUrl, title, description, category, language, url
          - nested outlines[]
          - ExtraFields via index signature / extraOutlineAttributes
        npm: "feedsmith (stable) | feedsmith@beta for 3.x migration"
      patterns_for_cursor_skill:
        - "Primary v1 dependency for RSS/Atom/JSON/OPML without self-host"
        - "OPML round-trip for curated EG allowlist interchange"
        - "generateRssFeed optional for internal EG digest feed (not for scraping)"
        - "Prefer guid || link for item identity after parse"
        - "extraOutlineAttributes to carry FreshRSS-style scrape metadata in OPML"
      adapt_for_eg:
        - "ADAPT: npm feedsmith inside skill helper script / package.json for poll+parse"
        - "ADAPT: YAML SoT → generateOpml backup; seed OPML → parseOpml → YAML"
        - "ADAPT: type-safe Rss.Item fields for draft frontmatter (source_url, source_title)"
        - "SKIP: expecting feedsmith to poll/HTTP-cache (caller owns fetch+ETag)"
        - "SKIP: HTML+XPath scraping (not in library — pair with FreshRSS pattern or cheerio/xpath separately)"
        - "LEGAL fit: parse metadata → rewrite pipeline; never dump content:encoded as blog body"
      security_notes:
        - "MIT — preferred dependency for EG code"
        - "XXE/entity risk mitigated by fast-xml-parser defaults — keep deps updated"
        - "Do not eval feed content; treat as untrusted input"
        - "v3 still beta — pin version in skill docs; test parse on each Western feed"

    - repo: "miniflux/v2"
      url: "https://github.com/miniflux/v2"
      stars: 9522
      license: "Apache-2.0"
      last_activity: "2026-07-24"
      language: Go
      freshness: ok
      optional: true
      paths_reviewed:
        - README.md (OPML, ETag/Last-Modified, Telegram integration list)
        - internal/integration/telegrambot/telegrambot.go
        - internal/integration/telegrambot/client.go
      architecture_pattern: |
        Minimalist self-hosted reader: Postgres; OPML import/export; poll respects
        Last-Modified, If-Modified-Since, If-None-Match, Cache-Control, Expires, ETags;
        default poll ~1h; REST API; integration telegrambot pushes entry on rules.
      concrete_config_formats:
        telegram_push_template: |
          HTML: <strong>%s</strong> - <a href="%s">%s</a>
          args: feed.Title, entry.URL, entry.Title
          optional inline buttons: Miniflux entry | article | comments
          disableWebPagePreview / disableNotification / topicID (forum)
        api: "REST for entries/feeds — useful if EG later self-hosts Miniflux as SoT"
      patterns_for_cursor_skill:
        - "Cleaner TG one-liner: bold source + link title (closer to EG premium tone)"
        - "Confirm free Bot API sendMessage JSON shape"
        - "HTTP cache header set as industry baseline (cross-check NodeRSSBot)"
      adapt_for_eg:
        - "ADAPT: message template wording for post-HITL Telegram digest"
        - "ADAPT later: Miniflux as optional always-on FREE hub (Apache friendlier than FreshRSS AGPL)"
        - "SKIP v1: Postgres + Go deploy; skill stays Cursor-triggered"
      security_notes:
        - "Apache-2.0 — safer long-term self-host than AGPL FreshRSS if needed"
        - "Bot token + chat_id in Miniflux user settings — same secret hygiene"
        - "Preview disabled option reduces untrusted link unfurl leakage"

  cross_repo_comparison:
    subscription_sot:
      FreshRSS: "OPML + DB (+ frss extensions)"
      NodeRSSBot: "SQLite + OPML import/export"
      feedsmith: "library only — EG should own YAML SoT + OPML interchange"
      miniflux: "Postgres + OPML"
      eg_v1_recommend: "YAML allowlist in vault; OPML via feedsmith; no SaaS"
    poll_etag:
      FreshRSS: "php-http-304 / SimplePie conditional"
      NodeRSSBot: "explicit If-None-Match + If-Modified-Since; 304 → none"
      miniflux: "full cache header set; default 1h"
      feedsmith: "N/A — caller implements"
      eg_v1_recommend: "Copy NodeRSSBot header pair + state JSON; optional make-fetch-happen"
    dedupe:
      FreshRSS: "unicityCriteria ladder + auto-degrade"
      NodeRSSBot: "md5(guid|id)[:8] else md5(link+title)[:8] recent list"
      eg_v1_recommend: "guid || link as primary key; hash store like NodeRSSBot; document FreshRSS ladder for pathological feeds"
    no_rss_sites:
      FreshRSS: "HTML+XPath + cssFullContent — gold standard outline"
      others: "no native scrape"
      eg_v1_recommend: "YAML scrape outline (frss-compatible fields) for anatolyfit-class; implement with cheerio/xpath OR defer to optional FreshRSS/RSS-Bridge later"
    telegram:
      NodeRSSBot: "multi-item digest, rate limit, HTML, preview off"
      miniflux: "single entry, bold+link, buttons optional"
      eg_v1_recommend: "miniflux-style one entry OR short digest; NodeRSSBot rate-limit if batch; ALWAYS after human gate"
    human_gate:
      NodeRSSBot_miniflux: "push on fetch by default"
      eg_required: "draft md → brand check → explicit OK → publish blog + TG"
    legal_rewrite_not_republish:
      all: "store source URL + title (+ optional summary for rewrite brief)"
      forbid: "paste content:encoded / scraped full HTML as published article"

  eg_skill_extractable_blueprint:
    config_yaml_sketch: |
      # subscriptions SoT (vault) — not SaaS
      sources:
        - id: example-blog
          title: "Example Blog"
          xmlUrl: "https://example.com/feed.xml"
          htmlUrl: "https://example.com"
          topics: [biomechanics, strength]
          enabled: true
        - id: anatolyfit
          title: "AnatolyFit"
          type: HTML+XPath   # FreshRSS-compatible
          xmlUrl: "https://anatolyfit.com/..."
          xpath:
            item: "..."
            itemTitle: "..."
            itemUri: "..."
          cssFullContent: "article"  # optional; for brief only
      poll:
        if_none_match: true
        if_modified_since: true
        state_file: ".cursor/eg-news-state.json"
      dedupe:
        key: "guid||link"
        hash_store: "recent_hashes"
      outputs:
        draft_dir: "drafts/news/"
        telegram_template: "<b>{{source}}</b> — <a href=\"{{url}}\">{{title}}</a>"
      gates:
        require_human_ok_before_publish: true
        require_human_ok_before_telegram: true
    v1_stack: "feedsmith parse + local fetch/ETag + YAML SoT + HITL drafts + free Bot API"
    skip_until_later: "FreshRSS/Miniflux self-host, RSSHub, auto-schedule worker"

  security_summary:
    - "Prefer MIT/Apache deps (feedsmith, NodeRSSBot patterns, Miniflux later)"
    - "Never vendor FreshRSS/RSSHub AGPL code into skill"
    - "Secrets: TG token only in env; no private OPML with CURLOPT cookies in git"
    - "Sanitize HTML for Telegram; disable link preview by default"
    - "Untrusted feed XML/HTML — parse only, no execute"

  sources:
    - url: "https://github.com/FreshRSS/FreshRSS"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: "OPML+XPath+cssFullContent+unicity — pattern bible for no-RSS sites"
    - url: "https://freshrss.github.io/FreshRSS/en/developers/OPML.html"
      published_or_updated: "2026-07-28"
      freshness: ok
      takeaway: "Concrete frss:* OPML attribute set"
    - url: "https://github.com/fengkx/NodeRSSBot"
      published_or_updated: "2026-07-26"
      freshness: ok
      takeaway: "TS poll ETag + hash dedupe + TG rate limits"
    - url: "https://github.com/macieklamberski/feedsmith"
      published_or_updated: "2026-07-27"
      freshness: ok
      takeaway: "Best v1 library parse/OPML without self-host"
    - url: "https://github.com/miniflux/v2"
      published_or_updated: "2026-07-24"
      freshness: ok
      takeaway: "Apache TG template + cache headers; optional later hub"
```

## Handoff to synthesizer

1. **Optimal v1 family:** library poll-in-Cursor (feedsmith + NodeRSSBot HTTP/dedupe/TG patterns) — not full aggregator self-host.  
2. **anatolyfit-class:** FreshRSS HTML+XPath OPML schema → EG YAML scrape outline.  
3. **HITL hard rule:** invert bot auto-send.  
4. **Licenses:** feedsmith MIT for code; FreshRSS AGPL for docs-only.  
5. **mines_count: 4** (≥2 complete; primary 3 + optional miniflux).
