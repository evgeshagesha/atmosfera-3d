# HITL gates — eg-anketaplan

> 💡 Dual-ish STOP: clarify → Dev codegen → smoke → human enable.  
> Skill **не** деплоит и **не** включает TG.

## Status values

| Status | Когда |
|--------|--------|
| `needs_clarify` | Не хватает 1–3 критичных ответов |
| `blocked_ban` | Hit `tone-bans.md` / Zero-Copy / `/anketa` confusion |
| `ready_for_dev` | Handoff pack готов; **STOP** до codegen |
| `dev_in_progress` | Dev пишет `site-next` (вне skill) |
| `ready_for_smoke` | Код на стенде; ждём smoke |
| `blocked_smoke` | Smoke fail |
| `awaiting_enable` | Smoke OK; ждём human «включаем prod» |
| `done` | Human approved production enable |

## STOP gates A–E

### Gate A — Clarify / SoT

**STOP**, пока не ясно:

- цель intake (после какой консультации / кто заполняет);
- SoT HTML путь подтверждён;
- не путаем `/anketa` с `/anketaplan`.

Fail → `needs_clarify` или `blocked_ban`.

### Gate B — Brand / bans

Прогнать `tone-bans.md`.  
Hit медобещания, physician-claim, dump цен, bake secrets → `blocked_ban`. **Не** выдавать `ready_for_dev`.

### Gate C — Handoff before codegen

Выдать YAML `handoff_pack` + указать `dev-handoff-checklist.md`.  
**STOP.** Ждать, что Dev / человек берёт реализацию.  
Skill / factory **не** пишут `app/anketaplan/**`, `api/anketaplan/**`, production `telegram.ts`.

### Gate D — Smoke (cite list)

После Dev-деплоя на Timeweb — пройти smoke (отметить в handoff):

| # | Check |
|---|--------|
| 1 | `GET https://eg.egoshev.ru/anketaplan` — 200, UI shell + island |
| 2 | Progress / главы переключаются; restore после reload (LS `egoshev_master_intake_v3`) |
| 3 | Client validation (Zod) блокирует пустой/битый submit |
| 4 | Honeypot / bot path не шлёт в TG |
| 5 | Happy path: `POST /api/anketaplan/submit` → TG short message **и** `.txt` document |
| 6 | Document fail → **502** (both-or-502); UI показывает ошибку, не «успех» |
| 7 | Double-click submit: lock удерживает дубль |
| 8 | In-place success (нет обязательного `/success` route) |
| 9 | `/anketa` не сломан (не трогали) |
| 10 | Нет `TELEGRAM_*` / токенов в client bundle / HTML |

Fail любого критичного пункта → `blocked_smoke`.

### Gate E — Production enable

**STOP** до явной фразы человека (напр. «утверждаю enable /anketaplan» / «включаем TG»).  
Skill не публикует, не крутит systemd, не пишет secrets на VPS.

## Порядок

```text
A clarify → B bans → C handoff STOP → Dev codegen → D smoke → E human enable → done
```

Нельзя: skip C и сразу Write site-next из skill; skip E и «тихо» включить TG.
