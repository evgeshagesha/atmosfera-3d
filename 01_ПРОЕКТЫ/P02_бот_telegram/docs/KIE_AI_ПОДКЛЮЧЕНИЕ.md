# 🔌 Kie.ai — подключение для EG

> Статус: каркас готов  
> Цель: 4K-фото для статей, 4 варианта из одной идеи, позже видео

## Свойства

| | |
|---|---|
| Кабинет | [kie.ai](https://kie.ai/) |
| Документация | [docs.kie.ai](https://docs.kie.ai/) |
| Ключ | только в `bot/.env` → `KIE_API_KEY` |
| Клиент | `bot/kie_images.py` |

> 💡 API-ключ **никогда** не отправляйте в чат Cursor, Telegram или GitHub.

## Что уже готово

1. Клиент `kie_images.py` умеет:
   - проверить кредиты;
   - создать задачу на 1–6 изображений;
   - ждать результат;
   - сразу скачать файлы локально.
2. Базовая модель для статей: `bytedance/seedream-v4-text-to-image`.
3. Режим «из 1 фото → 4 варианта»: `bytedance/seedream-v4-edit` + `--reference-url`.
4. Разрешение по умолчанию: `4K`.

## Один шаг от вас

1. Откройте [kie.ai → API Keys](https://kie.ai/).
2. Создайте ключ.
3. На Mac откройте файл:

```bash
nano ~/Projects/atmosfera-3d/01_ПРОЕКТЫ/P02_бот_telegram/bot/.env
```

4. Добавьте строку:

```bash
KIE_API_KEY=вставьте_ключ_сюда
```

5. Сохраните (`Ctrl+O`, Enter, `Ctrl+X`).
6. Напишите в чат только: **`ключ добавлен`**.

После этого я проверю кредиты и сделаю тестовую генерацию 4 × 4K.

## Команды после подключения

```bash
cd ~/Projects/atmosfera-3d/01_ПРОЕКТЫ/P02_бот_telegram/bot

# Быстрый smoke (кредиты; с --generate ещё и 4×4K)
python3 test_kie_smoke.py
python3 test_kie_smoke.py --generate

python3 kie_images.py credits
python3 kie_images.py generate --prompt "..." --count 4 --resolution 4K
python3 kie_images.py wait TASK_ID --output generated/kie
```

> Статус 24.07.2026: `KIE_API_KEY` в `.env` пустой → smoke возвращает `BLOCKED`. После `ключ добавлен` — прогон `--generate`.

Из одного референса:

```bash
python3 kie_images.py generate \
  --prompt "Four premium editorial variations for EG blog cover" \
  --reference-url "https://eg.egoshev.ru/uploads/blog/pochemu-strogie-diety-cover.jpg" \
  --count 4 \
  --resolution 4K
```

## Следующий этап

- Автоматическая вставка выбранного 4K-кадра в статью.
- Отдельный режим для коротких видео под Reels / Telegram.
- Лимит кредитов и журнал генераций.
