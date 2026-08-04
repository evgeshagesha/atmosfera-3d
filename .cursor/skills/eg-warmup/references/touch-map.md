# Touch map — eg-warmup

YAML schema nurture sequence.

## Purpose

Карта 3–7 касаний Reels→Stories→Direct до soft anketa.

## Schema

```yaml
touch_map:
  goal: "…"
  audience_stage: cold|warm|ready
  touches:
    - day: 1
      channel: reels|stories|direct
      beat: "…"
      CTA_level: none|curiosity|soft_ask
  final_cta: "https://eg.egoshev.ru/anketa"
  published: false
```

## Rules

- soft_ask только ближе к концу  
- no auto-send  
- drafts → `90_ВХОДЯЩИЕ/producer-drafts/`

## Cite

- `stories-beats.md` · `direct-soft.md` · `cta-matrix` (studio)
