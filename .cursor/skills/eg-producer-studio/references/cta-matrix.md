# CTA matrix — eg-producer-studio

One-ask CTA rail. Default: `https://eg.egoshev.ru/anketa`.

## Purpose

Стадии curiosity→soft_ask; никогда multi-CTA / YouTube→eg domain.

## Stages

| CTA_level | Когда | Поведение |
|-----------|-------|-----------|
| `none` | trust / education | без ссылки |
| `curiosity` | интерес без давления | вопрос / «можно разобрать» — без URL или soft hint |
| `soft_ask` | готовность | **один** CTA → `https://eg.egoshev.ru/anketa` |

## Rules

- one_cta_only  
- no 👆 · no hashtag spam · no FOMO timers  
- YouTube / контент: **никогда** `eg.egoshev.ru` как CTA-домен  
- drafts: `published: false`

## Cite

- `90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/20-products-prices.mdc`  
- `00_ПУЛЬТ_УПРАВЛЕНИЯ/ГЛАВНЫЙ_КОНТЕКСТ.md`  
- `.cursor/rules/eg-news-brand-safety.mdc`
