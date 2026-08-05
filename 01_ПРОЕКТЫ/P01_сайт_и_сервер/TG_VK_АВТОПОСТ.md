# 🔄 TG → VK автопост (сообщество)

> Цель: копировать посты из **Telegram-канала** на **стену** сообщества ВКонтакте.  
> Это **не** анкета и **не** blog→VK. Анкета уже работает отдельно.

| | |
|--|--|
| **Статус** | ✅ Мост **стена** живой · 🆕 видео/клипы/сторис — **за флагами**, нужны доп. права |
| **Источник TG** | `@EvgeniiGoshev` · на VPS `CHANNEL_ID=-1001695859819` |
| **Назначение VK (авто)** | **Стена** [club230430425](https://vk.ru/club230430425) · `VK_GROUP_ID=230430425` · `wall.post` |
| **Канал сообщества (руками)** | [im/channels/-234353785](https://vk.ru/im/channels/-234353785) · **не** зеркалится из TG |
| **Сервер** | `egoshev-timeweb` · `/opt/atmosfera-bot/` · сервис `eg-community-bot` |
| **Код моста** | `01_ПРОЕКТЫ/P02_бот_telegram/bot/vk_channel_bridge.py` |
| **HITL CLI** | `vk_bridge_cli.py` (`--check` / `--dry-run` / `--test-post --confirm`) |
| **Включение** | `VK_BRIDGE_ENABLED=1` + `VK_ACCESS_TOKEN` в `.env` |
| **Тест-пост (стена)** | https://vk.ru/wall-230430425_173 («проверка моста EG») |

---

## Простыми словами: что умеет мост сейчас

| Что постишь в TG-канал | Что будет в VK | Нужно |
|------------------------|----------------|-------|
| Текст | Пост на стене клуба | ✅ Уже работает (community token) |
| Фото / альбом фото | Пост с фото | ⚠️ Часто нужен user-токен админа (`photos`) |
| Видео → **стена** | Пост с видео | ❌ Нужен **user-токен** + право `video` · флаг `VK_BRIDGE_VIDEO=1` |
| Видео → **Клипы** | Клип сообщества | ❌ Нужен **user-токен** · `shortVideo` · флаг `VK_BRIDGE_CLIPS=1` |
| Фото/видео → **Stories клуба** | История сообщества | ✅ Community token уже с правом `stories` · флаг `VK_BRIDGE_STORIES=1` |
| Соавтор (личная страница) | Упоминание в тексте `[id…\|Имя]` | ✅ Env `VK_COAUTHOR_*` (официального «соавтора клипа» в API нет) |
| Сторис **Telegram** (не канал) | — | ❌ Бот **не видит** личные TG Stories — только посты канала |
| Канал мессенджера VK | — | ❌ Публичного API нет |

> 💡 **Главное для новичка:** сейчас зеркало — это **стена клуба**. Клипы и обычное видео на стену заработают только после user-токена админа. Сторис клуба — можно включить флагом уже на текущем токене сообщества.

---

## ⚠️ Стена vs канал (проверено 04.08.2026)

В VK у сообщества **две разные ленты**:

| | Стена сообщества | Канал сообщества |
|--|------------------|------------------|
| Где смотреть | Страница клуба, блок «записи» | Мессенджер → **Каналы** |
| URL | `vk.ru/club230430425` | `vk.ru/im/channels/-234353785` |
| Как публикуется | `wall.post` (наш мост) | Только UI мессенджера |
| Публичный API | ✅ есть | ❌ нет |

Авто из TG → **только стена** (+ опционально stories клуба). В канал мессенджера — руками.

---

## Честный MVP (проверено на VPS, community token)

Права текущего ключа сообщества (`groups.getTokenPermissions`):
`photos`, `docs`, `messages`, `wall`, `manage`, **`stories`**, `market`.

| Метод | Community token | Нужно для |
|-------|-----------------|-----------|
| `wall.post` (текст) | ✅ | Базовый мост |
| `photos.getWallUploadServer` | ⚠️ часто error 27 | Фото на стене |
| `video.save` | ❌ error 5 (user auth) | Видео на стене |
| `shortVideo.create` | ❌ error 27 | Клипы |
| `stories.get*UploadServer` | ✅ | Stories клуба |

**Соавтор / copyright через API:** публичного параметра «отметить соавтора» на клипе/посте нет. Мост добавляет **упоминание** в текст: `[id424816541|Евгений Гошев]`.  
Личная страница Евгения: **[vk.ru/egoshev1](https://vk.ru/egoshev1)** (`id424816541`).  
`vk.ru/egoshev` — **другой** аккаунт (не использовать как соавтора).

> ✅ **Confirmed 2026-08-05:** coauthor = **egoshev1** / `id424816541` (Евгений подтвердил). Env на VPS: `VK_COAUTHOR_USER_ID` + `VK_COAUTHOR_SCREEN_NAME=egoshev1` + label.

**Telegram Stories:** бот получает только `channel_post`. Личные сторис TG в мост **не попадут**. Workaround: публикуй то же видео в канал → при `VK_BRIDGE_STORIES=1` уйдёт в VK Stories клуба.

---

## Флаги `.env` (HITL — по умолчанию выкл)

```dotenv
VK_BRIDGE_ENABLED=1          # живой мост текст/фото
VK_BRIDGE_VIDEO=0            # TG video → wall video (нужен VK_USER_ACCESS_TOKEN)
VK_BRIDGE_CLIPS=0            # TG video → VK Clips (нужен user token)
VK_BRIDGE_STORIES=0          # TG photo/video → VK stories клуба (community OK)
VK_USER_ACCESS_TOKEN=        # user-токен админа клуба (video + ideally photos)
VK_COAUTHOR_USER_ID=424816541
VK_COAUTHOR_SCREEN_NAME=egoshev1
VK_COAUTHOR_LABEL=Евгений Гошев
```

Текст/фото мост **не ломается**, пока флаги видео = `0`.

---

## Что уже есть (аудит кода)

| Компонент | Роль | Статус |
|-----------|------|--------|
| `vk_channel_bridge.py` | `channel_post` → wall (+ video/clips/stories по флагам) | ✅ |
| `bot.py` + флаги | Регистрация хендлера | ✅ live текст/фото |
| `vk_bridge_cli.py --check` | Пробы wall / photos / video / clips / stories | ✅ |
| Анкета / бот продаж | Воронка | ✅ **не трогаем** |

---

## Как работает

```text
Новый пост в @EvgeniiGoshev
  → ChannelToVkBridge
  → текст/фото → wall.post (+ mention соавтора)
  → видео → если CLIPS → shortVideo; иначе если VIDEO → video.save+wall;
            плюс если STORIES → stories клуба
  → дедуп: sqlite + VK guid
```

Редактирование поста в TG **не** обновляет VK.

---

## Что дать Евгению (чтобы включить клипы/видео)

1. ~~Подтвердить личную страницу~~ → ✅ **egoshev1 / id424816541** (2026-08-05).
2. **User-токен админа** клуба (Standalone app / Implicit Flow) с правами минимум:
   - `wall`, `photos`, `offline`
   - для видео/клипов — `video` (часто выдаётся поддержкой VK: `devsupport@corp.vk.com`)
3. На VPS в `.env`:
   - `VK_USER_ACCESS_TOKEN=…` (не в чат, не в git)
   - `VK_BRIDGE_CLIPS=1` и/или `VK_BRIDGE_VIDEO=1`
   - `VK_COAUTHOR_USER_ID=424816541` + `VK_COAUTHOR_SCREEN_NAME=egoshev1`
4. Опционально сразу: `VK_BRIDGE_STORIES=1` — **без** user-токена (на текущем community токене).
5. Smoke: пост видео в TG-канал → смотри стену / вкладку Клипы / Stories клуба + `journalctl -u eg-community-bot -f`.

---

## Команды на VPS

```bash
ssh egoshev-timeweb
cd /opt/atmosfera-bot
./venv/bin/python vk_bridge_cli.py --check
sudo systemctl restart eg-community-bot
sudo journalctl -u eg-community-bot -n 50 --no-pager
```

Ожидаем в логе строку вида:
`VK bridge enabled: … → VK group 230430425 (video=… clips=… stories=… coauthor=…)`

---

## Отличие от blog→VK

| | TG→VK (этот документ) | Blog→VK |
|--|----------------------|---------|
| Источник | Канал `@EvgeniiGoshev` | Статья `blog.json` / slug |
| Скрипт | `vk_channel_bridge` + CLI | `publish_blog_social.py --vk` |
| Режим | live после включения | HITL на каждый slug |

---

## Ссылки

- Сообщество: https://vk.ru/club230430425  
- Личная страница (соавтор): https://vk.ru/egoshev1  
- Канал TG: https://t.me/EvgeniiGoshev  
- Техдока: [VK_CHANNEL_BRIDGE.md](../P02_бот_telegram/bot/docs/VK_CHANNEL_BRIDGE.md)  
- Blog→VK: [ВК_СЕГОДНЯ_АВТОПОСТ.md](./ВК_СЕГОДНЯ_АВТОПОСТ.md)

[← P01](./README.md)
