# 🧱 EG BODY OS · Slice 0

> Студенческое приложение платформы. Маркетинговый сайт (`site-next`) не трогаем.

## Свойства

| | |
|---|---|
| **Папка** | `eg-body-os-app/` (корень репозитория, сосед `site-next`) |
| **Стек** | Next.js App Router · TypeScript · Tailwind · Prisma · PostgreSQL |
| **Auth** | Better Auth email OTP, сессии в БД |
| **Срез** | 0 — оболочка, OTP, схема entitlements, 5 вкладок |

> 💡 EG BODY OS — платформа. Атмосфера 3D — клиентский бренд. Club — один продукт внутри OS. Доступ через `canAccess`, никогда `isPaid`.

## Запуск

```bash
docker compose up -d
cp .env.example .env   # BETTER_AUTH_SECRET: openssl rand -base64 32
pnpm install
pnpm db:deploy
pnpm dev
```

В development код OTP пишется в лог сервера и показывается на экране входа.

## Навигация

Logged-out: Welcome → «Начать» → «С чего начнём?» → OTP. «Войти» сразу на OTP.
Logged-in: TODAY / LIBRARY / CLUB / PROGRESS / ME. Tab bar только после сессии.

## Не в этом срезе

Платежи, Kinescope, 66 уроков, Club CMS, бот, Personal 30, DNS.
