# t-800-research-clawhub — DEEP

> scanned_at: 2026-07-24  
> hub: https://clawhub.ai/  
> intent: content pipeline HITL · PDF premium · Telegram channel post · trend rewrite / brand voice · newsletter digest  
> rejected_verbatim: true  
> factory_write: none

## Tabs scanned

| Tab | Access | Notes |
|-----|--------|-------|
| Featured (home) | OK | Plugins: Lobster, Memory LanceDB, Diffs, Firecrawl, etc. |
| Top / Trending / New (skills UI) | Partial | SPA lists often empty via fetch; cards resolved via search + direct URLs |
| Skills categories | Partial | Communication / Creative / Automation inferred from cards |

## EG constraints applied

- Автопост без явного OK — **запрещён**
- Trend Adapter = адаптация, не копипаст
- PDF = dark / cyan premium (не «синий digest с emoji»)

---

## clawhub_findings (items)

### 1. HITL Protocol — @rotorstar/hitl-protocol
- **url:** https://clawhub.ai/rotorstar/hitl-protocol
- **category:** skill
- **tab_signal:** search / intent-match (HITL)
- **summary:** Протокол human decisions для агентов: approval / selection / confirmation; inline submit через native buttons (Telegram и др.); states pending→completed; opaque tokens.
- **attribution:** ClawHub / rotorstar
- **pattern_to_steal:** Review case object + native Approve/Reject buttons; multi-round edit (`previous_case_id`); timeout + `default_action` ≠ silent publish; HTTPS + opaque token.
- **security_flags:**
  - low: requires bot platform for buttons — token must stay in env, never in skill text
  - note: good security narrative (SHA-256 hash storage, timing-safe compare) — adopt spirit, not copy
- **adapt_for_cursor:** Cursor skill/command: `content-hitl` — draft artifact → AskQuestion/user confirm → only then call Telegram MCP; never self-resume publish.

### 2. Lobster (plugin Featured + skill)
- **url:** https://clawhub.ai/guwidoe/lobster · Featured plugin Lobster @openclaw on home
- **category:** plugin + skill
- **tab_signal:** Featured (home)
- **summary:** Deterministic pipelines with `approve` gate + resume token before side effects.
- **attribution:** ClawHub / openclaw · guwidoe
- **pattern_to_steal:** Side-effect steps halt until explicit approve; resume token; typed pipeline vs re-planning each turn.
- **security_flags:**
  - medium: `exec --shell` in pipelines — EG: no shell publish without confirm
  - medium: historical gap — approval identity / channel buttons (openclaw/lobster#44); do not let agent self-approve
  - reject_for_EG: any default_action=approve on publish timeout
- **adapt_for_cursor:** YAML step graph in skill: research→draft→**HITL gate**→publish; gate owned by human only.

### 3. TG Channel Manager — @axisrow/tg-channel-manager
- **url:** https://clawhub.ai/axisrow/tg-channel-manager
- **category:** skill
- **tab_signal:** intent Telegram channel
- **summary:** Config-driven TG pipeline: scout → draft → human approves → publisher; statuses draft / pending / published; dedup index; SearXNG scout.
- **attribution:** ClawHub / axisrow
- **pattern_to_steal:** Explicit status machine; human approval transitions draft→pending; publisher only reads pending; channel config (rubrics, exclude filters) separate from bot code.
- **security_flags:**
  - medium: bot-token in local config — must be secrets/.env only
  - medium: auto publisher cron — EG must keep publish behind OK (disable cron auto-post or require pending+manual)
  - low: public channel scrape for dedup — no PII scrape of private chats
- **adapt_for_cursor:** Skill `tg-channel-hitl`: write draft to queue file; user MCP send only after status=approved; Trend items go through rewrite gate first.

### 4. Content Pipeline — @runesleo/runesleo-content-pipeline
- **url:** https://clawhub.ai/runesleo/runesleo-content-pipeline
- **category:** skill
- **tab_signal:** intent content pipeline
- **summary:** Research → Ideate → Write → Queue; commands review / approve / adapt / publish; status seed→…→published.
- **attribution:** ClawHub / runesleo
- **pattern_to_steal:** File-backed queue + separate `approve` vs `publish`; `/pipeline adapt` for platform variants; voice match + anti-cliché in write stage.
- **security_flags:**
  - low: if `publish` is only a status marker — OK; if it posts externally — must require second confirm
  - reject_verbatim: do not copy prompt hooks/scores
- **adapt_for_cursor:** Map to EG content machine: draft in inbox → HITL → Telegram/site; `adapt` = Trend Adapter (rewrite+brand), not republish source.

### 5. Multi-Agent Brand Studio — @kuan0808/multi-agent-brand-studio
- **url:** https://clawhub.ai/kuan0808/multi-agent-brand-studio
- **category:** skill
- **tab_signal:** brand + approval
- **summary:** Multi-agent social ops; approval-gated publishing; brand isolation; KB with content guidelines.
- **attribution:** ClawHub / kuan0808
- **pattern_to_steal:** Brand-isolated guidelines folder; nothing publishes without owner approval; Reviewer on-demand.
- **security_flags:**
  - medium: telegram topic scripts / channel-map — side effects need confirm
  - low: multi-agent self-collusion risk — owner is sole publisher
- **adapt_for_cursor:** Single brand EG workspace; subagent roles optional; hard rule: owner OK before Telegram MCP.

### 6. tech-news-digest — @dinstein/tech-news-digest
- **url:** https://clawhub.ai/dinstein/tech-news-digest
- **category:** skill
- **tab_signal:** newsletter digest + PDF
- **summary:** Multi-source digest; quality scoring; Discord/email/markdown/PDF (weasyprint); explicit ban on interpolating untrusted content into shell.
- **attribution:** ClawHub / dinstein
- **pattern_to_steal:** Unified source model + dedupe + template outputs; PDF as render of approved markdown; **shell-safety**: never pass titles/tweets into shell args.
- **security_flags:**
  - positive: no shell interpolation of fetched content
  - low: email send scripts — confirm before send
  - style_reject: blue emoji A4 digest ≠ EG dark cyan premium — steal pipeline, not visual
- **adapt_for_cursor:** Digest skill → EG weekly digest draft; PDF via existing EG premium PDF system (dark/cyan); delivery only after HITL.

### 7. Brand Voice Style Guide Generator — @gitflopez/brand-voice-style-guide-generator
- **url:** https://clawhub.ai/gitflopez/brand-voice-style-guide-generator
- **category:** skill
- **tab_signal:** brand voice
- **summary:** Voice audit, tone-by-channel, do/don't, vocabulary use/avoid, before/after rewrites, training kit.
- **attribution:** ClawHub / gitflopez
- **pattern_to_steal:** Persistent voice profile as source of truth for rewrite; do/don't tables; channel-specific tone grid.
- **security_flags:** [] (instructional; low risk if no auto-publish)
- **adapt_for_cursor:** Point rewrite skill at EG_TONE_OF_VOICE / EG_POSITIONING — not generate competing brand PDF unless asked.

### 8. Content Remix Studio — @akhmittra/content-remix-studio
- **url:** https://clawhub.ai/akhmittra/content-remix-studio
- **category:** skill
- **tab_signal:** trend rewrite / localization
- **summary:** One asset → platform-optimized variants; tone/format/length adaptation.
- **attribution:** ClawHub / akhmittra
- **pattern_to_steal:** Structured remix matrix (platform × tone × length); hooks per platform; **adaptation not clone**.
- **security_flags:**
  - medium: trend/source rewrite without attribution risk — EG: Trend Adapter must transform + brand voice, no copy-paste viral text
- **adapt_for_cursor:** Trend Adapter skill: input trend → mechanism/EG frame → CTA; reject if similarity to source is high.

### Bonus (digest / automation — lighter weight)

| Title | URL | Pattern |
|-------|-----|---------|
| Newsletter Creation & Curation | https://clawhub.ai/shashwatgtm/newsletter-creation-curation | Cadence + approval boundaries for employee/company voice |
| Business Automation Architect | https://clawhub.ai/1kalin/afrexai-business-automation | `approval_gate` YAML: buttons, deadline, on_timeout escalate ≠ auto-publish |
| Writing Assistant | https://clawhub.ai/clawdssen/agentledger-writing-assistant | `writing-state.md` voice persistence + quality gates |
| Style Guide Generator (PDF) | https://clawhub.ai/tomstools11/style-guide-generator | PDF as branded deliverable from structured sections |
| Content Production | https://clawhub.ai/alirezarezvani/content-production | Read marketing-context.md before draft; publish-ready gates |

---

## adaptation_patterns (for Cursor / EG)

### HITL
1. Status machine: `drafted → awaiting_ok → approved → published` (no skip).
2. Side effects (Telegram post, email, public PDF drop) only after human OK.
3. Agent must not hold resume/approve token for its own publish.
4. Timeout: `abort` or `skip`, never silent `approve` for public posts.
5. Optional: Telegram inline buttons for OK/Reject (HITL Protocol pattern).

### PDF premium
1. Steal: md→PDF pipeline + template separation (digest skill).
2. Steal: shell-safety (no untrusted strings in CLI).
3. Reject visual: light/blue/emoji digest → use EG dark graphite + cyan, premium typography.
4. PDF generate ≠ publish; attach/send only post-HITL.

### Trend rewrite / brand voice
1. Steal: remix matrix + voice profile (do/don't, never-say).
2. EG Trend Adapter: problem→mechanism→EG path→CTA; localization to RU brand tone.
3. Hard reject: verbatim trend copy, medical claims, cheap fitness tone.
4. Quality gate: voice match against EG tone files before queue.

### Telegram channel
1. Steal: scout/draft/approve/publisher separation (TG Channel Manager).
2. Dedup index for already-posted ideas.
3. Publisher reads only `approved` queue items after human OK.

### Newsletter digest
1. Steal: multi-source → score → template → optional PDF/email.
2. EG: weekly utility digest as draft; HITL before any send/post.

---

## security_flags / rejected_verbatim

### security_flags (aggregate)
- no secrets in prompts / SKILL body
- no shell publish without confirm
- no jailbreak / ignore-previous patterns observed in summaries (re-check on install)
- no PII scrape of private Telegram; public channel dedup only
- Lobster/exec + self-approve risk → require human-only gate for EG
- Cron auto-publisher → disable or hard-gate for EG

### rejected_verbatim
- Full SKILL.md / prompts from any card above
- Hook formulas, virality scores, exact command trees as copy-paste products
- tech-news-digest PDF visual theme as EG brand
- Any skill text that enables publish without OK

---

## sources

| url | published_or_updated | freshness | takeaway |
|-----|---------------------|-----------|----------|
| https://clawhub.ai/ | 2026-07-24 (live) | ok | Featured Lobster + skills hub entry |
| https://clawhub.ai/rotorstar/hitl-protocol | unknown (live card) | warn | HITL cases + TG buttons |
| https://clawhub.ai/guwidoe/lobster | unknown (live) | warn | approve gate + resume |
| https://clawhub.ai/axisrow/tg-channel-manager | unknown (live) | warn | TG scout→approve→publish |
| https://clawhub.ai/runesleo/runesleo-content-pipeline | unknown (live) | warn | queue status + adapt/approve |
| https://clawhub.ai/kuan0808/multi-agent-brand-studio | unknown (live) | warn | brand isolation + approval |
| https://clawhub.ai/dinstein/tech-news-digest | unknown (live) | warn | digest+PDF + shell safety |
| https://clawhub.ai/gitflopez/brand-voice-style-guide-generator | unknown (live) | warn | voice profile structure |
| https://clawhub.ai/akhmittra/content-remix-studio | unknown (live) | warn | platform remix / rewrite |
| https://github.com/openclaw/lobster/issues/44 | issue live | ok | approval identity / channel gap warning |

## confidence

**0.78** — strong intent match via card summaries + search; Top/Trending SPA lists partially opaque to fetch; dates on cards often unknown → freshness mostly `warn`; patterns sufficient for architect, not for verbatim install.

## NO factory write

Research fragment only. Hand off to research-lead / brain / factory separately.
