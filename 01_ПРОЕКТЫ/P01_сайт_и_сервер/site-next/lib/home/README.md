# Главная страница (`/`)

Статус: **готова к выкладке и правкам** (`HOME_PAGE_STATUS.ready = true`).

## Быстрый старт

| Что | Где |
|-----|-----|
| Страница Next.js | `app/page.tsx` → `components/home/HomePage.tsx` |
| Реестр блоков | `lib/home/block-registry.ts` |
| Порядок блоков | `data/blocks/index/manifest.json` |
| Метаданные / SEO | `data/index.json` |
| Стили страницы | `data/index.json` → `public/styles/legacy/css/` |

Проверка целостности:

```bash
npm run validate:home
```

## Архитектура

```
app/page.tsx
  └── HomePage
        └── SitePage (route="")
              ├── PageStyles
              ├── 26 React-блоков (block-registry)
              ├── LegacyInteractivity  — слайдеры, меню, формы
              └── TAnimateRuntime      — анимации t-animate
```

**Не используется на главной:** Tilda artboard JS (`t396_init`), Tilda CDN, jQuery runtime.

## Блоки (26)

### Именованные компоненты (править здесь)

См. `HOME_NAMED_BLOCKS` в `lib/home/config.ts` — каждый блок в `components/home/blocks/<Name>/`.

### Разделители (T029)

8 линий-разделителей в `lib/home/line-divider-blocks.tsx`.

## Как вносить правки

1. Найти блок по `rec…` в `data/blocks/index/manifest.json`.
2. Открыть соответствующий компонент в `components/home/blocks/`.
3. Стили блока — обычно `styles.ts` или `html.ts` рядом с компонентом.
4. После добавления блока в manifest — зарегистрировать в `block-registry.ts` и запустить `npm run validate:home`.

## Перед деплоем

- `npm run build`
- `npm run validate:home`
- Проверить `.env`: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (форма контактов)
- Визуально: desktop + mobile (`/`)

## Зависимости от других страниц

Главная **изолирована**: свои компоненты в `components/home/`, свой реестр в `lib/home/`.  
Общая инфраструктура: `components/site/`, `lib/site/`, `public/styles/legacy/`.
