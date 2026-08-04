---
name: eg-producer
description: |
  Продюсер-пак Атмосфера 3D: studio→craft→kontent→prodazhi CTA.
  HITL STOP на brief, beats, draft, ready. Без автопоста.
  Use when: /eg-producer или /продюсер; нужен контент-пайплайн
  (reels|warmup|seo|calendar) с черновиками в producer-drafts.
  Do NOT use when: eg-news-to-blog; Remotion; автопост TG/VK;
  правка сайта; деплой бота; T-800 factory.
---

# /eg-producer — продюсерский пайплайн (HITL)

Тонкий роутер на producer skills + leaf-агенты.  
**STOP** на brief / beats / черновик / Ready. Не публикует, не шлёт TG/VK, не правит сайт.

## Сначала прочитай

1. `.cursor/skills/eg-producer-studio/SKILL.md`
2. Выбранный craft skill:
   - reels → `.cursor/skills/eg-reels-script/SKILL.md`
   - warmup → `.cursor/skills/eg-warmup/SKILL.md`
   - seo → `.cursor/skills/eg-seo-brief/SKILL.md`
3. `.cursor/rules/atmosfera-3d.mdc`
4. `.cursor/rules/eg-news-brand-safety.mdc`

## Режимы

Parse `$ARGUMENTS`: `studio` | `reels` | `warmup` | `seo` | `calendar` | `repurpose`

| Режим | Куда |
|-------|------|
| studio / calendar / repurpose | `eg-producer-studio` |
| reels | studio brief → `eg-reels-script` |
| warmup | studio brief → `eg-warmup` |
| seo | studio brief → `eg-seo-brief` |
| news blog | **не здесь** → `/eg-news-to-blog` |
| Remotion / site / bot deploy | вне скоупа |

## Маршрут (routine)

1. **Studio brief** (skill `eg-producer-studio`) → показать brief + path → **STOP**  
   Gate: «Утверждаю brief»
2. **Craft** (reels / warmup / seo) → schema/beats/map → **STOP**  
   Gate: «Утверждаю beats»
3. **`Task(kontent)`** draft polish → **STOP**  
   Gate: «Утверждаю черновик»  
   Parent **must pass full context** (beats + bans + CTA constraints).
4. **`Task(prodazhi)`** soft CTA / Direct / objections → **STOP**  
   Gate: «Ready»
5. Paths: `90_ВХОДЯЩИЕ/producer-drafts/` · всегда `published: false`  
   CTA: один → `https://eg.egoshev.ru/anketa`

Nesting ≤2. `kontent` / `prodazhi` — leaves (без nested Task).

## Выход

`mode` + `paths` + optional hashes + `status` + `next_step`

## Запреты

- TG/VK autopost · `blog.json` · site/Next edits · Remotion  
- `published: true` из пайплайна  
- multi-CTA · FOMO · медобещания · YouTube CTA→eg.egoshev.ru  
- обход HITL STOP gates  
