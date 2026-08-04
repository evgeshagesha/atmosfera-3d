# Brief schema — eg-seo-brief

SEO brief YAML fields.

## Purpose

Единый каркас brief перед copy / STOP «Утверждаю brief».

## Schema

```yaml
seo_brief:
  slug: "…"
  H1: "…"
  H2:
    - "…"
  intent: informational|commercial|local
  proof: "…"          # trust angle, не медобещание
  CTA: "https://eg.egoshev.ru/anketa"
  seoCluster: studio_moscow|course_bnt|club_eg|longevity_movement|rehab_biomechanics|…
  meta_title: "…"
  meta_description: "…"
  published: false
```

## Cite

- `meta-limits.md` · `cluster-cta.md`  
- SoT: `СТИЛЬ_СТАТЕЙ_БЛОГА.md`
