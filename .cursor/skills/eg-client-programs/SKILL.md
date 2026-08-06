---
name: eg-client-programs
description: |
  Роутер клиентских программ Атмосфера 3D: post-session | monthly |
  long-term → HITL-черновик в program-drafts. Zero-Copy cite vault SoT.
  Use when: /eg-programma или /программа; нужен документ после сессии,
  план на месяц или скелет долгосрочной программы.
  Do NOT use when: PDF-рендер; сайт/VK/Remotion; eg-producer / eg-news;
  диагноз/медобещания; продажа «Персональная программа на 30 дней» как
  post-session; T-800 factory; автоотправка клиенту.
disable-model-invocation: true
---

# eg-client-programs

Роутер клиентских программ EG: тип → cite SoT → bans → outline → HITL-черновик.  
**HITL only.** Skill не шлёт клиенту, не рендерит PDF, не правит сайт/VK/Remotion.

## Роль

HITL-оператор клиентских программ Атмосфера 3D: черновик **markdown only** в `program-drafts/`. Не автоотправка.

## Когда применять

**Triggers:** `/eg-programma` · `/программа` · документ после сессии · план на месяц · скелет долгосрочной программы.

**Не применять:** PDF-рендер; сайт/VK/Remotion; `eg-producer` / `eg-news`; диагноз/медобещания; «Персональная программа на 30 дней» как post-session; T-800 factory; автоотправка клиенту.

## Что читать

| Файл | Зачем |
|------|--------|
| `90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/50-programs.mdc` | структура / типы программ |
| `90_ВХОДЯЩИЕ/atmosfera-os-from-claude/programs/TEMPLATE-program.md` | карта секций шаблона |
| `03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/05_МЕТОДИКА_И_ПРАКТИКА/EG_CLIENT_PROGRAMS_STYLE_SPEC.md` | style **draft** — pending SoT until user «утверждаю» |
| `EG_PDF_PREMIUM_STYLE_SYSTEM.md` | cite-only (вне репо); never embed CSS/HTML |
| `90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/10-voice-and-language.mdc` | голос |
| `90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/20-products-prices.mdc` | services / цены |
| `90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/40-design-system.mdc` | design language (cite, no paste) |
| `03_РЕСУРСЫ/EG_ИМПЕРИЯ_ЗНАНИЙ/02_КЛИЕНТСКИЙ_ПУТЬ/HOME_AND_FREE_EQUIPMENT_FUNNEL.md` | home / equipment funnel (monthly) |
| `90_ВХОДЯЩИЕ/CURSOR PROMPT ATMOSFERA 3D.md` §14 | product boundary Type1 ≠ 30-day |
| `references/post-session.md` | L3 Type1 |
| `references/monthly-plan.md` | L3 Type2 |
| `references/long-term.md` | L3 Type3 skeleton |
| `references/bans-checklist.md` | hard fail gates |

Zero-Copy: **cite paths**, не копировать эссе из SoT в тело skill.

## L3 refs

Load **ONE** type ref + **always** `references/bans-checklist.md`:

| Type | Ref |
|------|-----|
| `post-session` | `references/post-session.md` |
| `monthly` | `references/monthly-plan.md` |
| `long-term` | `references/long-term.md` |

## Алгоритм

### 1. Parse type

`post-session` | `monthly` | `long-term` — из `/eg-programma` args или запроса.  
Пусто → один уточняющий вопрос → `status: needs_type`.

### 2. Read SoT + quote

Read релевантные пути из таблицы «Что читать». Процитировать **заголовки секций** (не эссе) перед черновиком.

### 3. Bans gate

Прогнать `references/bans-checklist.md`. Hit → `status: blocked_ban` + заполнить `refused_claims[]`. Не писать клиентский черновик.

### 4. Prefill outline

Каркас из type ref + `TEMPLATE-program.md`. Не изобретать Architecture B/C.

### 5. Write draft

Путь: `90_ВХОДЯЩИЕ/program-drafts/`. YAML meta в шапке черновика (см. ниже). PII не коммитить в git.

### 6. STOP

Показать draft + path + meta.  
**STOP.** Ждать: «Утверждаю черновик».  
Без автоотправки. Single gate (не dual-hash).

## Draft YAML meta

```yaml
doc_type: post-session|monthly|long-term
hitl: draft
citations: []          # SoT paths used
refused_claims: []     # from bans gate
style_spec_status: pending   # pending until user «утверждаю»; then approved
```

## Product boundary

- **Type1** (`post-session`) ≠ продукт «Персональная программа на 30 дней» (§14).
- Post-session: **без** полной матрицы подходов/повторов.
- Services block — из `20-products-prices.mdc` (cite, soft).
- **Type3** (`long-term`) = **skeleton only** в v1 (без PDF visual canon).

## Выход

`draft_path` + `doc_type` + `status: ok|needs_type|blocked_ban|needs_sot` + `next_step`

## Связи

| Что | Куда |
|-----|------|
| Invoke | `/eg-programma` · `/программа` |
| Agent Task | **нет** — no `Task(agent)` |
| Nested producer | **нет** — no kontent/prodazhi |
| Craft sibling | не eg-producer / eg-news |

## Запреты

- автопост / auto-send клиенту  
- сайт / VK / Remotion / PDF-рендер  
- диагноз-ярлык · «вылечим» / исцеление / избавим навсегда · «врач» physician-claim  
- Zero-Copy violate (paste эссе SoT в skill/draft как канон)  
- STYLE SPEC как SoT до user PASS («утверждаю»)  
- Description Trap: pipeline только в body, не в description  
- Type1 = «Персональная программа на 30 дней»  
- sets/reps overload в post-session  
- Type3 как полный PDF-канон / монография  
