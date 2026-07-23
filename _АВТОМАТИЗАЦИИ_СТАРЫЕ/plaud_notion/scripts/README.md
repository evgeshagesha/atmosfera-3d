# Скрипты пайплайна: PLAUD / аудио → транскрипт → Notion + Drive

- **run_pipeline.py** — один запуск: обработать inbox + выгрузить в Notion. Загрузил аудио → подписал папкой (courses/название или clients/имя) → запустил скрипт.
- **process_inbox.py** — сканирование `inbox_audio/` (по папкам и по имени файла) → транскрипция (Whisper) → запись в SQLite и папки.
- **sync_notion.py** — выгрузка новых записей из SQLite в Notion (Клиенты, Сессии, Обучение/курсы).
- **db.py** — схема SQLite и функции для клиентов, сессий, уроков курсов.
- **sync_drive.py** — загрузка аудио в Google Drive (опционально).

**Автоматический режим:** см. в `CONNECT_PLAUD_NOTION.md` раздел «Автоматический режим».  
Зависимости: `pip install -r requirements.txt` (faster-whisper, notion-client).
