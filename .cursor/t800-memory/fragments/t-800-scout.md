# Scout fragment — anketaplan `/anketaplan` · eg.egoshev.ru

**Когда:** 2026-08-08  
**Mode:** STANDARD  
**memory_path:** `/Users/egoshev/Projects/atmosfera-3d/.cursor/t800-memory`  
**Задача:** после intake — маршрут `/anketaplan` в `site-next` (не Vercel anketa.*); skill позже + handoff build

```yaml
scout_report:
  mode: STANDARD
  task: anketaplan_route_site_next
  artifact_surface: cursor-workspace  # later: skill-обёртка + handoff на App Router build
  intake_resolved:
    route: /anketaplan on eg.egoshev.ru (site-next / Timeweb PM2)
    source: 90_ВХОДЯЩИЕ/anketaplan-source/master-client-intake.html
    leave_alone: /anketa
    telegram_hypothesis: server-only TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID (~ /strategy on VPS)
  manifest_age_days: 37
  last_full_sync: "2026-07-02"
  coverage_map_last_synced: "2026-07-06"
  audit_coverage:
    explicit: 44
    missing: 0
    status: ok
  status: stale  # >30d → maintainer отдельно; не блокер factory для product code
  docs_probe:
    changelog: ok  # latest Aug 3, 2026
    docs_home: error_transient  # cursor.com/docs returned load error
    models: ok
    hooks: ok
    subagents_ru: ok
    cursor_router: ok  # NEW page, not in manifest.pages
  new_findings:
    - id: cursor_router_docs
      url: https://cursor.com/docs/cursor-router
      since: "2026-07-22"
      note: Auto Cost/Balance/Intelligence; SDK auto-smart — не в manifest
    - id: google_workspace_plugins
      since: "2026-08-03"
      note: Drive/Gmail/Calendar plugins — вне scope anketaplan
    - id: cursor_start_india
      since: "2026-07-28"
      note: pricing/plan only
    - id: ipad_inbox_review
      since: "2026-07-29"
      note: mobile surface; не влияет на Next form
    - id: models_pool_refresh
      note: docs/models показывает Composer 2.5 / Grok 4.5 pools; KB models-and-pricing от 2026-07-02 устарела по составу
  critical_api_delta:
    subagents_frontmatter: none_confirmed  # name/description/model/readonly/is_background intact
    hooks_events: no_breaking_delta_for_factory  # preToolUse family documented; KB card may lag wording
  recommended_research: true
  research_mode: DEEP
  research_focus:
    - Next.js App Router multi-step client form → Route Handler POST
    - Telegram server-only env pattern vs existing /strategy on VPS
    - Integrate HTML source into site-next without touching /anketa
  block_factory: false
  reason: >
    Нет критичного расхождения Cursor subagents/hooks API.
    Product build = Dev site-next; T-800 factory только позже для skill-обёртки.
  next_for_parent:
    - Task(t-800-research-lead) DEEP с scout_report + intake answers
    - затем Task(t-800-brain-lead)
    - factory только на skill/handoff brief — не на HTML/страницу ad-hoc
  maintainer_note: >
    KB stale ~37d + Missing=0; рекомендовать Task(t-800-maintainer)
    добавить cursor-router (+ опц. plugins/Google) в manifest — отдельно от этого прогона
  implications_for_anketaplan:
    - "1. Cursor KB stale не блокирует App Router form/API; research должен тянуть Context7 Next.js, не Cursor hooks."
    - "2. Surface cursor-workspace: skill = HITL/ops-обёртка; реализация page+route — Dev handoff в site-next."
    - "3. Secrets: подтвердить TELEGRAM_* только server (Route Handler / env VPS), никогда NEXT_PUBLIC_ — паттерн /strategy."
    - "4. Multi-step UI: клиентский state + один POST на финале (или draft+submit); изоляция от /anketa маршрута."
    - "5. Новые Cursor Router/plugins не меняют контракт skill frontmatter; factory brief узкий (skill + handoff), без forge hooks.json."
```

## Sources checked

| Source | Result |
|--------|--------|
| `knowledge-base/manifest.json` | `last_full_sync` 2026-07-02 |
| `00-meta/manifest-coverage-map.md` | 2026-07-06 |
| `scripts/audit-coverage.sh` | Missing=0 |
| https://cursor.com/changelog | Aug 3 … Jul 17 entries |
| https://cursor.com/docs/models | OK |
| https://cursor.com/docs/hooks | OK |
| https://cursor.com/ru/docs/subagents | OK |
| https://cursor.com/docs/cursor-router | NEW vs manifest |
| https://cursor.com/docs | transient error |

## Handoff

Parent → `Task(t-800-research-lead)` with this fragment + intake answers.  
Не factory. Не код.
