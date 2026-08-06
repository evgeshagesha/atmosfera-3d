# bans-checklist — hard fail gates

Прогонять **до** записи черновика. Hit → `status: blocked_ban` + `refused_claims[]`. Не слать клиенту.

## Medical / brand bans

Hard fail при наличии в тексте / запросе:

| Ban | Примечание |
|-----|------------|
| Диагноз-ярлык | не ставить клинический ярлык |
| «вылечим» / исцеление / избавим навсегда | медобещания |
| «врач» physician-claim | медобразование в био — OK; слово «врач» как claim — никогда |
| секретный / революционный метод | инфостиль |
| тело мечты | дешёвый фитнес-клише |

## Product boundary bans

| Ban | Правило |
|-----|---------|
| Type1 = «Персональная программа на 30 дней» | post-session ≠ этот продукт (§14) |
| sets/reps overload в post-session | нет полной тренировочной матрицы |
| Type3 как полный PDF-канон | v1 = skeleton only |

## Ops bans

| Ban | Правило |
|-----|---------|
| auto-send клиенту | запрещено |
| сайт / VK / Remotion | вне скоупа |
| черновики вне `program-drafts/` | drafts only → `90_ВХОДЯЩИЕ/program-drafts/` |
| PII в git commit | не коммитить персональные данные клиента |

## STYLE SPEC / PDF premium cite rules

- `EG_CLIENT_PROGRAMS_STYLE_SPEC.md` — cite как **draft**; `style_spec_status: pending` until user «утверждаю».
- Не продвигать STYLE SPEC в SoT без PASS.
- `EG_PDF_PREMIUM_STYLE_SYSTEM.md` — **cite-only**; never embed CSS/HTML в skill/refs/draft.

## On diagnosis ask

1. **Refuse** — не заполнять фейковую клиническую схему.
2. **Functional reframe** — язык функции, движения, нагрузки, дыхания, следующего шага.
3. Записать отказ в `refused_claims[]`.
4. При необходимости → `status: blocked_ban` или мягкий `needs_sot` + уточнение без диагноза.
