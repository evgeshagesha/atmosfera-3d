# t-800-intake-clarifier — video montage agent

**Когда:** 2026-07-28 22:12  
**Статус:** `asked` · `blocks_research: true`  
**Тема:** агент монтажа видео (Telegram → cut/анимация, Syntx, Remotion, talking-head / тренировки)

## Почему не skip

Неясны: продукт Syntx (API/ключ), форматы выхода, surface v1 (Cursor-only vs TG-бот), бюджет (бесплатно vs платный API), приоритет use-case (talking-head vs полная тренировка). Без ответов research/factory будут гадать по integrations и artifact_surface.

## Вопросы (ждут ответа)

1. Syntx — что именно? Ссылка/кабинет, есть ли ключ? Или «любая нейросеть» ок?
2. Выход v1: Reels 9:16 / YouTube 16:9 / оба? Длина клипов?
3. Где живёт v1: только Cursor (файл → агент) или реальный Telegram-бот автоматически?
4. Бюджет: только ffmpeg+Remotion локально или платный Syntx/API ок?
5. Приоритет v1: talking-head нарезка ИЛИ полная тренировка?

## Рекомендации (до ответов — гипотезы, не defaults)

- **recommended_surface:** `cursor-workspace` skill+command для v1; связка с P02 ботом — phase 2 после HITL
- **suggested_artifacts:** skill `eg-video-montage` (или аналог) + command `/eg-video-cut`; agent optional; Remotion skills reuse; bot webhook wiring deferred

## Выход YAML

```yaml
status: asked
intake_brief:
  questions:
    - Syntx: продукт/ссылка/ключ или любая нейросеть?
    - Формат и длина: 9:16 / 16:9 / оба?
    - Surface v1: Cursor-only vs Telegram-бот автоматом?
    - Бюджет: бесплатно локально vs платный API ок?
    - Приоритет v1: talking-head vs полная тренировка?
  assumed_defaults: []
  blocks_research: true
recommended_surface: cursor-workspace (skill+command; bot = phase 2)
suggested_artifacts:
  - skill eg-video-montage
  - command /eg-video-cut
  - optional agent
  - reuse remotion-* skills
  - P02 bot wiring deferred
```
