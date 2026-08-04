# Calendar schema — eg-producer-studio

YAML-схема недельного календаря идей. HITL only — без автопоста.

## Purpose

Emit structured week plan → route rows в craft-skills.

## Schema

```yaml
calendar:
  week_id: "YYYY-Www"
  rows:
    - day: mon|tue|wed|thu|fri|sat|sun
      pillar: движение|дыхание|дисциплина
      format: reels|stories|post|seo|warmup
      idea: "…"
      CTA_level: none|curiosity|soft_ask
      recommended_skill: eg-reels-script|eg-warmup|eg-seo-brief|null
```

## Rules

- один `CTA_level` на row; hard close не каждый день  
- default soft CTA → `https://eg.egoshev.ru/anketa` только на `soft_ask`  
- `published: false` на любых сохранённых черновиках  
- drafts → `90_ВХОДЯЩИЕ/producer-drafts/`

## Cite

- `references/pillars.md` · `cta-matrix.md`  
- brand rules: `atmosfera-3d.mdc`
