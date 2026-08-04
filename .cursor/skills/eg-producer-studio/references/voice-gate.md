# Voice gate — eg-producer-studio

Чеклист тона EG **до** emit brief. Не эссе — pointers + scan.

## Purpose

Пройти voice gate vs brand bans; вернуть `ok` | `needs_voice` | `blocked_ban`.

## Checklist

| # | Check | Fail → |
|---|--------|--------|
| 1 | Спокойный / премиальный / без инфоцыганства | `needs_voice` |
| 2 | Нет медобещаний (вылечим / исцеление / избавим навсегда / секретный\|революционный метод) | `blocked_ban` |
| 3 | Нет слова «врач» как claim (мед. образование в био — OK) | `blocked_ban` |
| 4 | Не anti-gym; «без тренажёров» ≠ «без оборудования» | `blocked_ban` |
| 5 | Нет «тело мечты» / FOMO / дефицит-таймеры | `blocked_ban` |
| 6 | Один CTA-rail (не multi); без 👆 / хэштег-шума | `blocked_ban` |
| 7 | YouTube: **никогда** CTA-домен `eg.egoshev.ru` | `blocked_ban` |

## Cite (Zero-Copy)

- `.cursor/rules/atmosfera-3d.mdc`
- `.cursor/rules/eg-news-brand-safety.mdc`
- optional: `90_ВХОДЯЩИЕ/atmosfera-os-from-claude/.cursor/rules/10-voice-and-language.mdc`
- MASTER / OWNERSHIP — читать, не paste
