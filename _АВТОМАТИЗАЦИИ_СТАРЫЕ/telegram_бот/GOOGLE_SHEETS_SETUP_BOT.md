# Настройка Google Таблицы для логов бота (состояние, утренние ответы, новые участники)

Бот сохраняет в таблицу:
- **Ответы новых участников** о состоянии (после приветствия и ссылки на тест 20)
- **Сообщения в группе** (в т.ч. ответы на утренний опрос «как самочувствие»)

Дальше эти данные можно использовать для адаптации программ (Екатерина, Ксения и др.).

---

## Шаг 1. Создать Google Таблицу

1. Открой [Google Таблицы](https://sheets.google.com) и создай новую таблицу (например: «Логи состояния EG бот»).
2. В первой строке задай заголовки колонок:

   | date | time | user_id | user_name | message | type |

   - **date** — дата (YYYY-MM-DD)
   - **time** — время (UTC)
   - **user_id** — ID пользователя в Telegram
   - **user_name** — имя
   - **message** — текст сообщения
   - **type** — тип: `new_member_state` (ответ нового участника) или `group_message` (сообщение в группе, в т.ч. ответ на утренний опрос)

---

## Шаг 2. Добавить скрипт (Apps Script)

1. В таблице: **Расширения** → **Apps Script**.
2. Удали весь код в редакторе и вставь этот скрипт:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.date || "",
      data.time || "",
      data.user_id || "",
      data.user_name || "",
      data.message || "",
      data.type || ""
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Сохрани проект (Ctrl+S). Название — любое (например «EG Bot Log»).

---

## Шаг 3. Развернуть как веб-приложение

1. В Apps Script нажми **Развернуть** → **Новые развёртывания**.
2. Тип: **Веб-приложение**.
3. Настройки:
   - **Описание:** например «EG Bot»
   - **Запуск от имени:** твой аккаунт
   - **У кого есть доступ:** **Все пользователи** (доступ будет только по длинному URL, без входа)
4. Нажми **Развернуть**. Подтверди разрешения (вход в Google, доступ к таблице).
5. Скопируй **URL веб-приложения** (длинная ссылка вида `https://script.google.com/macros/s/.../exec`).

---

## Шаг 4. Вписать URL в .env на сервере

В файле `.env` на сервере (в папке с ботом) добавь или измени:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/ТВОЙ_ID/exec
```

Подставь свой URL из шага 3. Сохрани файл и перезапусти бота:

```bash
sudo systemctl restart eg-community-bot
```

После этого бот будет отправлять каждое сообщение из группы и ответы новых участников в эту таблицу. Утренние ответы попадут в таблицу с типом `group_message`; ответ нового участника о состоянии — с типом `new_member_state`.

---

## Дополнительно

- **Ссылка на тест для новых участников** по умолчанию: `https://t.me/c/2348800665/1894`. Чтобы поменять, в `.env` добавь:
  ```env
  NEW_MEMBER_TEST_LINK=https://t.me/c/2348800665/1894
  ```
- Программы (Екатерина, Ксения и т.д.) и «видоизменения по состоянию» можно делать отдельно: экспорт из таблицы в CSV или использование этих данных в своих отчётах/скриптах.
