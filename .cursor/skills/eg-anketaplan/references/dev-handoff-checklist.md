# Dev handoff checklist — eg-anketaplan

> 💡 Hybrid **A ∪ B ∪ C** из research/brain.  
> **Factory / skill НЕ реализуют** `site-next`. Код пишет **Dev / main Agent** после HITL STOP.

## Контекст для Dev

| Поле | Locked |
|------|--------|
| Route | https://eg.egoshev.ru/anketaplan · Timeweb `site-next` |
| Source | `90_ВХОДЯЩИЕ/anketaplan-source/master-client-intake.html` |
| LS | `egoshev_master_intake_v3` |
| API | `POST /api/anketaplan/submit` |
| Validation | **Zod day-1** · **RHF SKIP** |
| Idempotency | **client submit lock** day-1 |
| Success UX | **in-place** (passport/success state) · нет `/anketaplan/success` day-1 |
| TG | `STRATEGY_TG_*` → `TELEGRAM_*` · extend `sendDocument` · **both-or-502** |
| Do not touch | `/anketa` · kids-anketa · bake secrets · Vercel-only deploy |

## Шаги 1–8 (Hybrid A∪B∪C)

### 1. Thin RSC shell (A)

- `app/anketaplan/page.tsx` — тонкий RSC-каркас (meta/title по необходимости).
- Не multi-route `/anketaplan/stepN`. Не iframe HTML SoT. Не `dangerouslySetInnerHTML` монолита.

### 2. One neon client island (A)

- Один тяжёлый client component: 12 глав, progress, ветки, BMI/BMR calc — порт визуала/логики из HTML SoT.
- CSS Modules / colocated styles с neon tokens SoT (не чужой design-system dump).

### 3. localStorage SSR-safe (A)

- Ключ **`egoshev_master_intake_v3`** (parity с HTML).
- Restore/persist только в browser (`typeof window` / client-only); без SSR crash.

### 4. Zod validation (B)

- Zod: per-chapter + full schema **перед** POST.
- **RHF day-1 SKIP** — controlled React state для parity с neon UI.
- Client: honeypot / consent / size guards по зеркалу strategy lead (адаптация, не слепой копипаст).

### 5. API route (C)

- `app/api/anketaplan/submit/route.ts`.
- Flow: normalize → honeypot → consent/size → **Zod validate** → TG.
- Mirror: `lib/strategy/lead.ts` + `app/api/strategy/lead/route.ts`.
- Soft `not_configured` как у lead, когда TG env отсутствует (dev).

### 6. Telegram: message + `.txt` document (C)

- Extend `lib/notifications/telegram.ts`: `sendMessage` затем `sendDocument` (FormData + filename).
- Env: **`STRATEGY_TG_*` → `TELEGRAM_*`** server-only. Нет `NEXT_PUBLIC_*`. Нет `ANKETAPLAN_TG_*` day-1.
- Caps cite: message ≤4096 · caption ≤1024 · document = полный `.txt` паспорт.
- **both-or-502**: если message OK, а document fail (или наоборот) → **502**, не «полууспех».

### 7. Client submit lock + in-place success (A+C)

- На время POST: disable submit / lock (idempotency day-1 без durable store).
- Success: **in-place** UI (passport/success state на той же странице).
- Не редирект на `/anketaplan/success` day-1. Не `alert()` как финальный UX.

### 8. Env / deploy / smoke (Timeweb)

- Secrets только на VPS / server env (не в git, не в skill).
- Deploy target: **Timeweb site-next** · `eg.egoshev.ru` — **не** новый Vercel-проект.
- Перед production enable: HITL gates A–E (`hitl-gates.md`) + smoke-лист.
- Рекомендация Dev: учесть Next custom-server / SSRF patch notes (hard-gate перед enable — note, не blocker skill).

## Explicit boundary

| Кто | Делает |
|-----|--------|
| `/eg-anketaplan` skill | HITL · cite · checklist · `handoff_pack` · STOP |
| Factory | Создаёт skill/command/refs only |
| Dev / main Agent | Реализует шаги 1–8 в `site-next` |
| `eg-bot-engineer` | **Не** primary для этой страницы |

## После кода (Dev → HITL)

Вернуть в чат: PR/paths · smoke results · open questions.  
Production enable TG / публичный route — только после человеческого approve (gate E).
