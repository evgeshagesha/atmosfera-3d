#!/bin/bash
# Скрипт первой настройки GitHub для проекта Атмосфера 3D
# Запуск: открой Терминал и выполни:
#   bash ~/Projects/atmosfera-3d/scripts/первый_push_github.sh

set -e
cd ~/Projects/atmosfera-3d

echo "=== Шаг 1: Инициализация Git ==="
if [ ! -d .git ]; then
  git init
  git branch -M main
else
  echo "Git уже инициализирован"
fi

echo ""
echo "=== Шаг 2: Первый коммит ==="
git add -A
git commit -m "$(cat <<'EOF'
Старт: экосистема Атмосфера 3D

- Структура PARA на русском
- Главный контекст и честный разбор
- Инструкции Cursor и GitHub
- T-800 Agent установлен
- Сохранённые автоматизации (бот, Plaud)
EOF
)" || echo "Нечего коммитить или коммит уже есть"

echo ""
echo "=== Шаг 3: Создание репозитория на GitHub ==="
echo ""
echo "Сделай ОДНО из двух:"
echo ""
echo "ВАРИАНТ А (через сайт — проще для новичка):"
echo "  1. Открой https://github.com/new"
echo "  2. Repository name: atmosfera-3d"
echo "  3. Private (рекомендую — там бизнес-данные)"
echo "  4. НЕ ставь галочки README, .gitignore, license"
echo "  5. Create repository"
echo "  6. Скопируй команды «push an existing repository» и выполни их"
echo ""
echo "ВАРИАНТ Б (если установишь GitHub CLI):"
echo "  brew install gh"
echo "  gh auth login"
echo "  gh repo create atmosfera-3d --private --source=. --push"
echo ""
echo "После push открой репозиторий на github.com — там будет вся система."
