# 🔄 Telegram → VK: запуск моста

## Свойства

- **Источник:** `@EvgeniiGoshev` (на VPS: `CHANNEL_ID=-1001695859819`)
- **Назначение:** **стена** VK-сообщества [`club230430425`](https://vk.ru/club230430425) через `wall.post`
- **Опционально:** stories клуба (`VK_BRIDGE_STORIES`), wall video (`VK_BRIDGE_VIDEO`), клипы (`VK_BRIDGE_CLIPS`)
- **Не назначение:** канал мессенджера [`im/channels/-234353785`](https://vk.ru/im/channels/-234353785) — отдельный продукт, публичного API нет
- **Сервис:** `eg-community-bot`
- **Режим по умолчанию:** мост вкл на VPS для текста/фото; медиа-флаги **выкл**
- **Операторский гайд:** [`TG_VK_АВТОПОСТ.md`](../../../P01_сайт_и_сервер/TG_VK_АВТОПОСТ.md)
- **HITL CLI:** `vk_bridge_cli.py` (`--check` / `--dry-run` / `--test-post --confirm`)

> 💡 Мост копирует исходный текст без генерации и переписывания. Обычные URL
> сохраняются; скрытые ссылки Telegram добавляются в конец текста.
>
> ⚠️ Название файла `vk_channel_bridge` = мост из **Telegram-канала**, не в VK-канал.

## Что входит в MVP

- текстовые посты;
- одно фото с подписью;
- альбом до 10 фотографий с общей подписью;
- постоянная дедупликация через `data/vk_bridge.sqlite3`;
- повторная защита VK через параметр `guid`;
- опциональное упоминание соавтора в тексте (`VK_COAUTHOR_*`).

### Расширения (feature flags, по умолчанию `0`)

| Флаг | Поведение | Токен |
|------|-----------|--------|
| `VK_BRIDGE_VIDEO=1` | TG video → `video.save` + `wall.post` | User + scope `video` |
| `VK_BRIDGE_CLIPS=1` | TG video → `shortVideo.create` (клипы) | User (community → error 27) |
| `VK_BRIDGE_STORIES=1` | TG photo/video → stories клуба | Community OK (scope `stories` уже есть) |

Опросы, анимации, аудио, пересланные посты — **не** публикуются.
Редактирование уже опубликованного поста Telegram также не меняет пост VK.

> ⚠️ Telegram Bot API **не** отдаёт личные TG Stories боту. В мост попадают только
> `channel_post`. Чтобы «видео из сторис» оказалось в VK — публикуй то же видео в канал.

Telegram Bot API передаёт пост канала, но не гарантирует идентификацию
конкретного администратора. Поэтому мост обрабатывает новые входящие
`channel_post` нужного канала. Сообщения, отправленные самим этим ботом,
не образуют цикл: мост ничего не отправляет обратно в Telegram.

## 1. Права

1. Бот должен оставаться администратором канала `@EvgeniiGoshev`.
2. Для публикации текста нужен VK-токен с правом `wall`.
3. Для загрузки фото нужен **пользовательский токен администратора** с правами
   `wall` и `photos`. Токен сообщества может вернуть ошибку VK `27` на
   `photos.getWallUploadServer`.
4. Для wall-video / клипов — отдельный `VK_USER_ACCESS_TOKEN` (user admin).
   Scope `video` у VK часто выдаётся только по запросу в поддержку.
5. Stories клуба — community token с правом `stories` (уже в маске токена на VPS).

## 2. Настройка `/opt/atmosfera-bot/.env`

```dotenv
CHANNEL_ID=@EvgeniiGoshev
VK_BRIDGE_ENABLED=1
VK_ACCESS_TOKEN=<секретный_токен_сообщества>
# VK_USER_ACCESS_TOKEN=<user_токен_админа>   # для VIDEO/CLIPS и надёжных фото
VK_GROUP_ID=230430425
VK_API_VERSION=5.199
VK_ALBUM_SETTLE_SECONDS=3
VK_BRIDGE_DB_PATH=/opt/atmosfera-bot/data/vk_bridge.sqlite3
VK_BRIDGE_VIDEO=0
VK_BRIDGE_CLIPS=0
VK_BRIDGE_STORIES=0
VK_COAUTHOR_USER_ID=424816541
VK_COAUTHOR_SCREEN_NAME=egoshev1
VK_COAUTHOR_LABEL=Евгений Гошев
```

Не добавлять рабочий токен в git, `.env.example` или документацию.

Соавтор: https://vk.ru/egoshev1 — **не** `vk.ru/egoshev` (другой аккаунт).

## 3. Обновление и проверка

```bash
cd /opt/atmosfera-bot
./venv/bin/pip install -r requirements.txt
mkdir -p data
sudo systemctl restart eg-community-bot
sudo systemctl status eg-community-bot
sudo journalctl -u eg-community-bot -n 100 --no-pager
./venv/bin/python vk_bridge_cli.py --check
```

В журнале должна появиться строка вида:

```text
VK bridge enabled: … → VK group 230430425 (video=False clips=False stories=False coauthor=…)
```

## 4. Smoke-тест

1. Опубликовать вручную в канале короткий тестовый текст.
2. Проверить появление одной записи в VK.
3. Опубликовать фото с подписью.
4. Опубликовать альбом из 2–3 фото.
5. (После user-токена + флагов) — одно короткое видео.
6. Проверить журнал:

```bash
sudo journalctl -u eg-community-bot -f
```

Если фото возвращает `VK error 27`, используется неподходящий токен сообщества:
заменить / добавить пользовательский токен администратора с `wall + photos`.

## Откат

Установить `VK_BRIDGE_ENABLED=0` (или отдельные медиа-флаги в `0`) и перезапустить сервис.
База дедупликации может оставаться на сервере: она не содержит токены или тексты постов.
