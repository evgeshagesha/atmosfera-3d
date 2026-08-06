# Scout fragment — LIGHT · eg.egoshev.ru/strategy landing

**Когда:** 2026-08-06  
**Mode:** LIGHT  
**memory_path:** `.cursor/t800-memory`  
**Задача:** `/t800-start` для landing `eg.egoshev.ru/strategy`

```yaml
scout_report:
  mode: LIGHT
  task: landing_eg_egoshev_ru_strategy
  artifact_surface: N/A  # page code ≠ Cursor artifact
  manifest_age_days: 35
  status: stale  # KB last_synced 2026-07-02; does not gate this run
  new_findings: []
  recommended_research: false
  research_mode: SKIP
  block_factory: true
  reason: >
    landing = Dev site-next implementation;
    T-800 only if later skill for strategy copy
  next_for_parent: >
    Dev agent already building /strategy;
    do NOT Task(t-800-factory) for HTML
  skip:
    - t-800-research-lead
    - t-800-prompt-craft
    - t-800-brain-lead  # no factory brief needed
    - t-800-factory
  optional_later:
    - CREATE skill/command for strategy-page copy HITL → then /t800-start
  maintainer_note: KB stale ~35d → Task(t-800-maintainer) separately; not a blocker here
```
