# egoshev.ru — Next.js

Полная копия сайта [egoshev.ru](https://egoshev.ru/) на Next.js с локальными фото, видео и стилями Tilda.

## Страницы

- `/` — главная
- `/about` — обо мне
- `/anketa` — анкета
- `/club` — онлайн-сообщество
- `/baza` — программа «базовая настройка тела»
- `/tree` — форматы работы
- `/gaid`, `/online`, `/uslugi` — дополнительные разделы
- `/oferta`, `/personal`, `/policy` — юридические страницы

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Продакшен

```bash
npm run build
npm start
```

## Обновление контента с оригинала

Если сайт на Tilda обновился:

```bash
npm run migrate
```

## Структура

- `app/` — маршруты Next.js
- `components/TildaPage.tsx` — рендер страниц Tilda
- `components/TildaBody.tsx` — загрузка скриптов и инициализация блоков
- `data/` — HTML-контент страниц (JSON)
- `public/assets/` — фото и видео
- `public/tilda/` — CSS и JS Tilda
- `scripts/migrate.mjs` — скрипт миграции

## Что работает

- Все стили, анимации, меню, слайдеры
- Формы (отправка на серверы Tilda)
- Блог (загрузка постов с Tilda Feed API)
- Видео и ленивая загрузка изображений
- Все внутренние ссылки между страницами

## Примечания

- Внешние ссылки (Telegram, Instagram, YouTube) сохранены
- Для деплоя подойдут Vercel, VPS или любой хостинг с Node.js
