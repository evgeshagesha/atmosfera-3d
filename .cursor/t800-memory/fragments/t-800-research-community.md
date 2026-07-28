# t-800-research-community — FREE RSS → RU rewrite+cite → SEO blog + Telegram

**Date:** 2026-07-28 (RETRY DEEP)  
**Agent:** t-800-research-community  
**Topic:** Free-only Western RSS → RU EG adapt → blog + Telegram; SEO Moscow studio / course / club  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Hubs:** r/rss, r/selfhosted, r/SEO, HN, habr.com, vc.ru  
**Constraint:** No Inoreader Pro · No Twitter/FB scrape · Not legal advice

---

## Executive consensus (community)

1. **Free stack beats paid aggregators** for this use-case: self-host FreshRSS (± RSS-Bridge/RSSHub) → OPML catalog → optional `rss-to-telegram` / `rssbot`. Inoreader/Feedly Pro are convenience, not a hard dependency.
2. **Rewrite + attribution is the community norm**; full-text republish / paraphrase-to-rank is treated as copyright risk + SEO duplicate/spam risk.
3. **Google Alerts RSS = enrichment only** — fragile, laggy, undocumented; do not build the pipeline backbone on it.
4. **RU local SEO** for a Moscow studio: geo + Яндекс.Бизнес/Карты + modular service/blog pages + Дзен RSS syndication of *your own* posts — not scraped Western full text.
5. **Sites without RSS** (e.g. anatolyfit): FreshRSS HTML+XPath / RSS-Bridge CssSelector|XPath — not social scrape.

---

## 1) Consensus free stack vs paid

| Role | Free (community default) | Paid (skip as dependency) |
|------|--------------------------|---------------------------|
| Reader / store | **FreshRSS** (SQLite, extensions, WebSub, HTML+XPath) or **Miniflux** (Go+Postgres, tiny RAM, built-in full-text) | Inoreader Pro, Feedly Pro |
| Sites without RSS | FreshRSS HTML+XPath; **RSS-Bridge** (CssSelector/XPath); **RSSHub** routes | RSS.app (~$10/mo cited on Habr as overpriced vs self-host) |
| Telegram out | `Rongronggg9/RSS-to-Telegram-Bot`, `iovxw/rssbot` (Rust binary), custom digest bots | Inoreader → TG rules |
| Light VPS reader | Fusion (Go+SQLite, ~80MB) as Miniflux-lite alternative | — |

**Community preference pattern (2024–2026):**

- Habr / selfhost guides: leave Inoreader/Feedly → **own VPS** for independence + bridges (Telegram, HTML sites).
- FreshRSS = safest default (multi-user, XPath scraping, OPML, Fever/Google Reader API for mobile).
- Miniflux = if you want minimal UI + auto full-text and accept Postgres.
- Habr Q&A (2025 season, q/1410550): practical compose = **FreshRSS + rss-to-telegram-bot**, TZ `Europe/Moscow`.

**For EG pipeline (aligned with strategist):** FreshRSS (or poll feeds directly in Cursor skill) + curated OPML `wellness-feed-catalog` + human approve → blog/TG. Paid SaaS not required for v1.

---

## 2) Legal norms: rewrite + attribution (practical guidance, not legal advice)

**Community consensus (HN + practice):**

- RSS is **not** a public-domain database. Posts are copyrighted unless license says otherwise (CC etc.).
- Aggregators that show **title + short snippet + link** are culturally accepted; **full-text frontends / scrapers** of commercial publishers are called out as infringement risk (HN Neuters/Reuters thread, Jan 2025).
- **Facts are not copyrightable**; **expression, structure, pacing, translation of the article** often is a derivative work. “Just rewrite / translate” ≠ automatic safe harbor (HN discussion Jan 2024+).
- Newsrooms “rewrite each other” from facts + reporting — not from automated paraphrase farms. Automated mass paraphrase for SEO ad revenue is repeatedly flagged as plagiarism/spam (older HN plagiarism demo + ongoing SEO discourse).

**Practical EG-safe pattern (community-aligned):**

1. Ingest: title, link, date, author, 1–3 sentence summary for triage only.
2. Human/EG rewrite: **new angle** in Atmosfera 3D method voice (механика → путь → CTA), not sentence-level paraphrase.
3. Cite: named source + outbound link (“по материалам / опираясь на обзор X”).
4. Never: medical promises, diagnosis, “вылечим”; never outrank-by-copy.
5. Prefer **primary papers / reviews** as seed ideas → original EG explanation → product bridge (студия / курс / клуб).

> 💡 Not legal advice. RU + US rules differ; when in doubt, link-heavy commentary + original method content.

---

## 3) RU local SEO angles — студия Москва · курс · клуб Евгения Гошева

From vc.ru / Habr local-SEO discourse 2025–2026 (studio analogues, Yandex guides):

| Cluster | Angles (examples) | Funnel |
|---------|-------------------|--------|
| **Студия Москва** | «функциональная / 3D работа с телом Москва», район/метро, «запись на приём», отзывы, Яндекс.Карты NAP consistency, LocalBusiness schema | Maps + service pages → booking |
| **Онлайн-курс** | «базовая настройка тела», входной продукт, «кому подходит / кому нет», модули, отличие от «ещё одних тренировок» | Info → course CTA |
| **Клуб / сообщество** | «клуб Евгения Гошева», удержание, дисциплина, прогрессия после курса/студии | Retention / LTV |
| **Дзен** | Own blog RSS → Дзен (community: free auto-import, up to ~5/day cited); Дзен as Yandex attention surface, not scraped EN content | Reach → site |

**Rules echoed in RU community:**

- Separate landing intents (studio vs course vs club) — don’t dump all offers on one URL.
- Modular blocks beat “простыня”: who / process / FAQ / proof / CTA.
- Geo in Webmaster + real Moscow contacts; reviews on Maps matter as much as blog wordcount.
- Blog supports **informational** queries; commercial catalog/service pages remain priority for booking.

---

## 4) Google Alerts RSS fragility — take

| Claim | Freshness | Verified? |
|-------|-----------|-----------|
| Alerts still offers email + RSS delivery; **no official API** | 2026 (cloro.dev) | ok — product still live |
| RSS workaround: undocumented, session-tied, can break | 2026 | ok — community/product blogs |
| Misses mentions; lag (days); weak social coverage | 2024–2026 forums + vendor blogs | warn — pattern consensus, not a peer-reviewed miss-rate |
| Zapier parsers choke on Google redirect links | Zapier community | ok — repro pattern |
| Safe role: **casual long-tail enrichment**, never backbone | consensus | ok |

**EG take:** optional Alerts RSS for brand/niche keywords → triage folder in FreshRSS. Backbone = curated wellness OPML + direct publisher feeds.

---

## 5) Article skeleton tips — wellness studio blog (EG)

Synthesized from vc.ru modular service pages (2026 neuro-SERP) + local studio SEO + EG brand constraints:

1. **H1** — problem/mechanism + optional geo only if page is local intent (`… в Москве` for studio cluster).
2. **Answer-first** (40–80 words): what happens → why → what to do.
3. **Для кого / не для кого** — segments without fear-mongering.
4. **Механика** — EG method frame (оценка → регуляция → коррекция → интеграция → стабилизация); cite Western source as *seed*, not as body.
5. **Практика / протокол** — 3–7 steps reader can try; no medical claims.
6. **Связь со студией / курсом / клубом** — one clear next step (не три CTA в первом экране).
7. **FAQ** — real client questions; FAQPage schema where applicable.
8. **Attribution box** — source title, author, link, date accessed.
9. **Internal links** — silo: studio pages ↔ method posts ↔ course ↔ club.

Telegram digest twin: 1 hook + 3 bullets + link to full blog + soft CTA (директ / запись / курс).

---

## 6) Concrete feed URLs (community-mentioned + probe 2026-07-28)

### Verified HTTP 200 + feed MIME (this run)

| Source | URL | Notes |
|--------|-----|-------|
| Stronger by Science | `https://www.strongerbyscience.com/feed/` | Feedspot + live RSS |
| Martin Buchheit | `https://martin-buchheit.net/feed/` | Feedspot sports science list |
| TrainingPeaks Blog | `https://www.trainingpeaks.com/feed/` | Feedspot |
| Science for Sport | `https://scienceforsport.com/feed/` | Feedspot; 200 on recheck |
| ScienceDaily Sports Science | `https://www.sciencedaily.com/rss/matter_energy/sports_science.xml` | Feedspot |
| HRV4Training Substack | `https://hrv4training.substack.com/feed` | Feedspot |
| JOSPT ToC | `https://www.jospt.org/action/showFeed?type=etoc&feed=rss&jc=jospt` | Feeder.co discover + live RDF/RSS |
| Habr all | `https://habr.com/ru/rss/all/` | RU tech/ops |
| Habr hub health | `https://habr.com/ru/rss/hubs/health/` | adjacent health |

### Partial / needs bridge

| Source | Status | Adaptation |
|--------|--------|------------|
| **anatolyfit.com** | `/feed/` → **404**; `/blog/feed/` → HTML page | FreshRSS **HTML+XPath** or RSS-Bridge CssSelector (intake example site) |
| **Examine.com** | `/feed/` → **429** HTML (blocked/rate-limit) | Do not rely on public RSS; use Research Feed UI manually or skip automation |
| **Barbell Medicine** | Blog RSS not confirmed; podcast via RedCircle/Apple id `1199780143` | Prefer podcast as *idea seed*, not auto-transcript-to-blog; verify current enclosure feed from show page before OPML |
| **SBS Podcast** | Community notes podcast winding down | Prefer **blog** `/feed/` over podcast |

### Bridge URL patterns (self-host; don’t depend on public instances)

- RSS-Bridge Telegram (Habr 2024-11-24):  
  `http://<host>:3000/?action=display&bridge=TelegramBridge&username=%40ChannelName&format=Atom`
- RSSHub Telegram: `https://<rsshub>/telegram/channel/<username>`
- Public rsshub.app / rss-bridge.org: slow cache (4–8h) — community prefers **own** instance.

### Feedspot / catalog caveat

Feedspot “Top Sports Science RSS 2026” truncates many URLs behind export paywall — use as **discovery list**, then verify with HEAD/GET before OPML commit.

---

## 7) Dated sources (≥ prefer 2024–2026)

```yaml
community_findings:
  - platform: habr
    url: "https://habr.com/ru/companies/ruvds/articles/833322/"
    published: "2024-08-07"
    freshness: ok
    claim: "Self-host Fusion/Miniflux-class reader + RSS-Bridge + RSSHub + FreshRSS (incl. XPath) replaces dependence on Inoreader/Feedly; VPS from ~₽130/mo class cited."
    verified: true
    cursor_adaptation: "Document free stack: FreshRSS±Bridge/Hub; OPML wellness catalog; no Pro SaaS."

  - platform: habr
    url: "https://habr.com/ru/articles/860896/"
    published: "2024-11-24"
    freshness: ok
    claim: "Paid rss.app ~$10/mo unnecessary; self-host RSS-Bridge TelegramBridge + rss2email beats public bridges' 6–8h lag."
    verified: true
    cursor_adaptation: "For outbound EG channel use rss-to-telegram; for inbound public TG use own Bridge if ever needed — still no Twitter/FB."

  - platform: habr
    url: "https://qna.habr.com/q/1410550"
    published: "2025-04-29"
    freshness: ok
    claim: "Minimal VPS path: Docker Compose FreshRSS + rongronggg9/rss-to-telegram-bot; alt rssbot Rust binary /sub."
    verified: true
    cursor_adaptation: "v1 may skip always-on bot — Cursor command digest; later compose on existing Timeweb VPS."

  - platform: habr
    url: "https://habr.com/ru/articles/1042690/"
    published: "2026-06-02"
    freshness: ok
    claim: "Custom TG news bot + RSSHub on ~$5/mo; digest = shared pool then per-user filter (over-fetch)."
    verified: true
    cursor_adaptation: "Digest design: pick top N EG-relevant items/day, rewrite one, post TG teaser + blog link."

  - platform: hn
    url: "https://news.ycombinator.com/item?id=42544665"
    published: "2025-01-01"
    freshness: ok
    claim: "Full-text scraper frontends of wire publishers ≈ copyright infringement; aggregators ≠ full copies; no magic % rewrite threshold."
    verified: true
    cursor_adaptation: "Hard rule: no full-text mirror; rewrite+cite+EG angle only."

  - platform: hn
    url: "https://news.ycombinator.com/item?id=38774792"
    published: "2023-12-26"
    freshness: warn
    claim: "FreshRSS HTML+XPath for no-RSS sites; CSS selector for full-text of truncated RSS; RSS-Bridge as decoupled alternative."
    verified: true
    cursor_adaptation: "Use for anatolyfit and similar; keep selectors in OPML/notes; expect breakage when DOM changes."

  - platform: other
    url: "https://freshrss.github.io/FreshRSS/en/users/11_website_scraping.html"
    published: "2025-08"  # docs cite crowdsourced XPath OPML Aug 2025
    freshness: ok
    claim: "Official FreshRSS: Type = HTML+XPath / JSON paths; community OPML of scraping settings."
    verified: true
    cursor_adaptation: "Prefer official docs + Codeberg xpath examples over random blogs."

  - platform: other
    url: "https://cloro.dev/blog/google-alerts-api/"
    published: "2026-07"
    freshness: ok
    claim: "No Google Alerts API; RSS delivery fragile/slow; median Google News RSS age ~days in sample — casual only."
    verified: true
    cursor_adaptation: "Alerts = optional Enrichment category in OPML, never primary source list."

  - platform: vc.ru
    url: "https://vc.ru/seo/2021973-kak-prodvignut-sait-v-yandekse-v-2025-godu"
    published: "2025"
    freshness: ok
    claim: "Yandex 2025: geo + behavior + ecosystem (Дзен) matter; blog/Дзен cases lift branded/direct demand."
    verified: true
    cursor_adaptation: "Wire site outbound RSS (already site-next) into Дзен; localize studio cluster."

  - platform: vc.ru
    url: "https://vc.ru/id1111830/1789706-besplatnyi-trafik-iz-yandeksa-na-avtopilote"
    published: "2024-2025"
    freshness: warn
    claim: "Blog→Дзен via RSS autopost (free tier claims); SEO fields carry over."
    verified: false
    cursor_adaptation: "Use as idea; verify current Дзен RSS import limits in product UI before automating."

  - platform: vc.ru
    url: "https://vc.ru/marketing/2792138-optimizatsiya-stranits-uslug-pod-neyro-vydachu"
    published: "2026"
    freshness: ok
    claim: "Service pages = modular blocks (answer-first, segments, process, prices, FAQ schema) for neuro-SERP."
    verified: true
    cursor_adaptation: "Apply skeleton to studio/course/club pages AND adapted blog posts."

  - platform: vc.ru
    url: "https://vc.ru/seo/2917124-prodvizhenie-sajta-fotostudii-dlya-topovyh-pozitsij-v-lokalnoj-vydache"
    published: "2025-2026"
    freshness: ok
    claim: "Local studio SEO: split intents; blog secondary to commercial landings; Maps/catalog first."
    verified: true
    cursor_adaptation: "Don't let RSS content factory outrank fixing Maps + service URLs."

  - platform: feedspot
    url: "https://rss.feedspot.com/sports_science_rss_feeds/"
    published: "2026"
    freshness: ok
    claim: "Curated sports-science RSS list incl. SbS, Science for Sport, Buchheit, TrainingPeaks, ScienceDaily."
    verified: true
    cursor_adaptation: "Seed wellness-feed-catalog OPML; re-verify each URL (paywalled full export)."
```

---

## Custom channel: `wellness-feed-catalog` + RU SEO structure

### Proposed OPML categories (community-shaped)

1. **evidence_strength** — Stronger by Science, Science for Sport, Martin Buchheit, TrainingPeaks  
2. **rehab_pt** — JOSPT ToC (+ later PT blogs via XPath if needed)  
3. **recovery_hrv** — HRV4Training Substack, ScienceDaily sports science (noisy — heavy filter)  
4. **ru_ops_seo** — Habr health/tech (ops ideas only, not client-facing copy)  
5. **xpath_sites** — anatolyfit + others without native RSS  
6. **alerts_optional** — Google Alerts RSS (quarantine folder)  
7. **skip_v1** — Examine (blocked), Twitter/FB, paywalled scrape

### RU SEO structure map (studio + course + club)

```
/studio (or /moskva)     → commercial local + Maps
/uslugi/*                → modular service blocks
/kurs/*                  → course intent + FAQ
/klub/*                  → community / LTV
/blog/*                  → informational EG originals (rewrite+cite seeds)
  └─ rss.xml             → Дзен + TG digest tooling
```

Each blog post should map to **one primary commercial next step** (студия | курс | клуб), matching PRODUCT_ROUTER / intake.

---

## Hype vs checked

| Hype | Reality |
|------|---------|
| “Free RSS factory = infinite SEO traffic” | Duplicate/paraphrase farms get little trust; local Maps + original expertise win studios |
| “Google Alerts RSS is fine monitoring” | OK for hobby; bad for pipeline SLA |
| “Public RSSHub always works” | Rate limits + lag; self-host |
| “Translate EN article = unique RU SEO” | Derivative-work risk + thin content risk |
| “Examine/Barbell auto-RSS” | Examine feed blocked here; BBM podcast ≠ ready blog feed |

---

## Deliverables for synthesizer / factory

1. Free stack recommendation: **FreshRSS or direct poll in skill** + OPML `wellness-feed-catalog` + optional TG bot later.  
2. Legal posture: rewrite + cite + EG angle; no full-text.  
3. SEO: three intent silos + modular skeleton + own RSS→Дзен.  
4. Alerts: optional only.  
5. Seed feeds: table in §6 (verified).  
6. anatolyfit: XPath path, not `/feed/`.

```yaml
status: ok
agent: t-800-research-community
mode: deep
retry: true
fragment: fragments/t-800-research-community.md
```
