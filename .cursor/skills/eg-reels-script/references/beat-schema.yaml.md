# Beat schema — eg-reels-script

Canonical beat YAML. Schema-first (до prose).

## Purpose

Единый каркас beats для Reels HITL gate «Утверждаю beats».

## Schema

```yaml
beats:
  channel: reels
  hook: "…"                    # primary chosen hook
  hook_options: ["…", "…", "…"]  # batch ×3
  tension: "…"
  mechanism: "…"
  what_to_do: "…"
  result_feel: "…"
  cta: "https://eg.egoshev.ru/anketa"  # or none until soft_ask
  duration_sec: [0, 3, 8, 15, 25]      # timed markers
  pillar: движение|дыхание|дисциплина
  published: false
```

## Rules

- emit YAML **before** full script  
- one CTA only when soft_ask  
- no FOMO fields  

## Cite

- `hook-patterns.md` · `retention-spine.md` · SKILL.md алгоритм
