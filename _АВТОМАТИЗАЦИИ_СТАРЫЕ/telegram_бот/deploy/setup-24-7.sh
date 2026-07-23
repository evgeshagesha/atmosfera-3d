#!/bin/bash
# Запуск на VPS (Beget) один раз после загрузки проекта.
# Использование: cd /home/egoshev/eg-community-bot && bash deploy/setup-24-7.sh

set -e
cd "$(dirname "$0")/.."
DIR="$(pwd)"
USER="$(whoami)"

echo "=== 1. Виртуальное окружение и зависимости ==="
python3 -m venv venv
./venv/bin/pip install -q -r requirements.txt

echo "=== 2. Файл .env ==="
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Создан .env из .env.example. ОБЯЗАТЕЛЬНО отредактируй .env: nano .env"
  echo "Укажи: TELEGRAM_BOT_TOKEN, OPENAI_API_KEY, COMMUNITY_CHAT_ID (ID группы EGcommunity)."
else
  echo ".env уже есть."
fi

echo "=== 3. Systemd: бот 24/7 ==="
UNIT="/etc/systemd/system/eg-community-bot.service"
sudo tee "$UNIT" > /dev/null << EOF
[Unit]
Description=EG Community Telegram Bot
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$DIR
Environment=PATH=$DIR/venv/bin
ExecStart=$DIR/venv/bin/python bot.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable eg-community-bot
sudo systemctl start eg-community-bot
echo "Бот запущен: systemctl status eg-community-bot"

echo "=== 4. Cron: ежедневные задачи ==="
CRON_TMP=$(mktemp)
crontab -l 2>/dev/null > "$CRON_TMP" || true
# Удаляем старые строки наших скриптов
sed -i.bak '/eg-community-bot.*run_daily/d' "$CRON_TMP" 2>/dev/null || true
sed -i.bak '/eg-community-bot.*generate_channel_post/d' "$CRON_TMP" 2>/dev/null || true
# Добавляем новые (в 9:00 — опрос в группу; в 10:00 — пост в канал). 15 дневных сообщений отключены.
echo "0 9 * * * cd $DIR && $DIR/venv/bin/python run_daily_group_checkin.py" >> "$CRON_TMP"
echo "0 10 * * * cd $DIR && $DIR/venv/bin/python generate_channel_post.py --post" >> "$CRON_TMP"
crontab "$CRON_TMP"
rm -f "$CRON_TMP" "$CRON_TMP.bak"
echo "Cron добавлен: ежедневно в 9:00 — опрос в группу; в 10:00 — пост в канал."

echo ""
echo "=== Готово. Дальше: ==="
echo "1. Отредактируй .env: nano $DIR/.env"
echo "2. Проверь бота: systemctl status eg-community-bot"
echo "3. Бот должен быть добавлен в группу EGcommunity и в канал @EvgeniiGoshev как админ."
echo "4. COMMUNITY_CHAT_ID — ID группы (например -1001234567890), смотри в getUpdates."
echo "5. Для вебхука Prodamus при необходимости запусти webhook_prodamus.py отдельно (см. README)."
