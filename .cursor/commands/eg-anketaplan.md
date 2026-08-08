---
name: eg-anketaplan
description: |
  HITL-чеклист и Dev-handoff для /anketaplan (месячный план после консультации).
  Читает skill + refs; STOP до codegen site-next.
  Use when: /eg-anketaplan · анкета плана · intake master-client · smoke Timeweb.
  Do NOT use when: правка production Next; /anketa; P02 bot; eg-programma;
  bake TELEGRAM_*; медобещания.
---

# /eg-anketaplan — thin router

Тонкий slash → skill `eg-anketaplan`.  
**HITL only.** Не пишет `site-next`, не деплоит, не включает TG, не шлёт PII.

## Сначала прочитай

1. `.cursor/skills/eg-anketaplan/SKILL.md`
2. `.cursor/skills/eg-anketaplan/references/cite-paths.md`
3. `.cursor/skills/eg-anketaplan/references/dev-handoff-checklist.md`
4. `.cursor/skills/eg-anketaplan/references/hitl-gates.md`
5. `.cursor/skills/eg-anketaplan/references/tone-bans.md`

Не дублировать полное тело skill здесь.

## Маршрут

| Запрос | Куда |
|--------|------|
| Handoff / smoke / SoT /anketaplan | **этот command** → skill algorithm |
| Текст месячной программы клиенту | `/eg-programma` · `eg-client-programs` |
| Бот P02 / Prodamus | `/p02-bot` · `eg-bot-engineer` |
| Production Next codegen | **Dev / main Agent site-next** после `ready_for_dev` |

## Алгоритм (кратко)

1. Уточнить цель (1–3 Q) или гипотеза.  
2. Cite SoT paths + locked decisions.  
3. Bans gate (`tone-bans.md`).  
4. Собрать Dev checklist cite (шаги 1–8).  
5. Gates A–C → YAML exit.  
6. **STOP** — ждать Dev; не писать `app/anketaplan/**`.

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

## STOP

Показать `handoff_pack`.  
**STOP before Dev codegen.**  
Не трогать `/anketa`. Не bake secrets. Не Vercel-проект. Gates D–E — после кода Dev + human enable.
