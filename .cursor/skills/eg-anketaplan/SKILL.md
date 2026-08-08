---
name: eg-anketaplan
description: |
  HITL-чеклист и Dev-handoff для /anketaplan (месячный план после консультации):
  SoT HTML, API submit, Telegram ops на Timeweb site-next (Атмосфера 3D).
  Use when: anketaplan · анкета плана · месячный план после консультации ·
  intake master-client · TG submit .txt · smoke eg.egoshev.ru/anketaplan ·
  handoff Dev site-next · /eg-anketaplan.
  Do NOT use when: правка production Next внутри skill (→ Dev/site-next);
  трогать /anketa / kids-anketa; бот P02 / Prodamus / eg-bot-engineer;
  eg-client-programs (текст программы); eg-producer / Remotion / eg-news;
  Vercel-проект; bake TELEGRAM_* / NEXT_PUBLIC_*; медобещания;
  Zero-Copy — не копировать цены в skill.
disable-model-invocation: true
---

# eg-anketaplan

HITL-навигатор intake месячного плана после консультации.  
**Не** генератор Next-приложения: skill уточняет, цитирует SoT, собирает Dev-handoff и STOP до codegen.

## Роль

Провести HITL-проход по `/anketaplan` на Timeweb `site-next` (https://eg.egoshev.ru/anketaplan): сверить HTML SoT, locked decisions, бренд-баны → выдать `handoff_pack` для Dev. Код `app/anketaplan/**` и `api/anketaplan/**` пишет **Dev / main Agent site-next**, не этот skill и не factory.

## Когда применять / Не применять

| Применять | Не применять |
|-----------|--------------|
| `/eg-anketaplan` · анкета плана · master-client intake | Production Write в `site-next/**` внутри skill |
| TG submit `.txt` · smoke `eg.egoshev.ru/anketaplan` | `/anketa` · kids-anketa · правка существующих анкет |
| Handoff Dev site-next | Бот P02 / Prodamus → `eg-bot-engineer` |
| | Текст программы → `eg-client-programs` / `/eg-programma` |
| | `eg-producer` · Remotion · `eg-news` · Vercel-проект |
| | Bake `TELEGRAM_*` / `NEXT_PUBLIC_*` · dump цен · медобещания |

## SoT paths (cite only)

Детали → `references/cite-paths.md`.

| Что | Путь (cite) |
|-----|-------------|
| HTML SoT | `90_ВХОДЯЩИЕ/anketaplan-source/master-client-intake.html` |
| Target page | `01_ПРОЕКТЫ/P01_сайт_и_сервер/site-next/app/anketaplan/` |
| API | `…/app/api/anketaplan/submit/` · `POST /api/anketaplan/submit` |
| Mirror | `…/lib/strategy/lead.ts` · `StrategyFormModal` · `…/api/strategy/lead` |
| TG | `…/lib/notifications/telegram.ts` |
| Цены | `20-products-prices.mdc` / `products.yaml` (Zero-Copy) |
| Бренд | `.cursor/rules/atmosfera-3d.mdc` |

**Locked:** LS `egoshev_master_intake_v3` · Zod day-1 · RHF SKIP · client submit lock · in-place success · both-or-502 · `STRATEGY_TG_*` → `TELEGRAM_*` (нет `ANKETAPLAN_TG_*` day-1) · не трогать `/anketa`.

## Workflow HITL

1. **Цель** — 1–3 уточнения (кто клиент, после какой консультации, готов ли Dev к порту) или сильная гипотеза.
2. **SoT** — прочитать/процитировать HTML SoT + `references/cite-paths.md`; сверить LS key и поля.
3. **Баны** — `references/tone-bans.md` + Zero-Copy цен; hit → `status: blocked_ban`.
4. **Dev checklist** — пройти `references/dev-handoff-checklist.md` (Hybrid A∪B∪C, шаги 1–8); **не** писать код.
5. **Gates** — `references/hitl-gates.md` (A–E); smoke-лист cite.
6. **STOP** — выдать YAML `handoff_pack` → Dev site-next. Без codegen, без deploy, без enable TG из skill.

## Handoff

| Что | Куда |
|-----|------|
| `app/anketaplan/**`, `api/anketaplan/submit`, `telegram.ts` extend | **Dev / main Agent site-next** (primary) |
| HITL clarify / checklist / smoke | **этот skill** |
| Текст месячной программы клиенту | `eg-client-programs` / `/eg-programma` |
| Бот P02 / Prodamus / Timeweb bot | `eg-bot-engineer` (**не** primary для anketaplan) |
| Remotion / producer / news | вне скоупа |

## Выход

```yaml
handoff_pack:
  goal: ""
  route: "https://eg.egoshev.ru/anketaplan"
  api: "POST /api/anketaplan/submit"
  ls_key: "egoshev_master_intake_v3"
  sot_paths: []
  locked:
    telegram_env: STRATEGY_TG_then_TELEGRAM
    zod_day1: true
    rhf_day1: skip
    idempotency: client_submit_lock
    success_ux: in_place
    both_or_502: true
  bans: []
  open_questions: []
  smoke: []
  status: ready_for_dev | needs_clarify | blocked_ban
  next_step: "Dev implements site-next per references/dev-handoff-checklist.md"
```

## Запреты

- Write/edit `site-next/**` · bake secrets · `NEXT_PUBLIC_*` для TG  
- Трогать `/anketa` · iframe / `dangerouslySetInnerHTML` полного HTML SoT  
- Vercel как deploy-target · `ANKETAPLAN_TG_*` day-1  
- Auto-post PII в TG из skill · dump цен · медобещания / physician-claim  
- Handoff в `eg-bot-engineer` как primary для этой страницы

## References

| Файл | Содержание |
|------|------------|
| `references/cite-paths.md` | Cite-only SoT / target / mirror |
| `references/dev-handoff-checklist.md` | Hybrid A∪B∪C · шаги 1–8 для Dev |
| `references/hitl-gates.md` | STOP gates A–E · smoke |
| `references/tone-bans.md` | Бренд / мед / PII / Zero-Copy |

## Как вызвать

Только slash: **`/eg-anketaplan`** (`disable-model-invocation: true`).
