# Fitness Booking Application

Приложение для записи на тренировки в фитнес-центре.

## Функциональность

### Frontend (Next.js)
- Просмотр расписания тренировок
- Запись на тренировки

### Backend (Django)
- REST API для управления тренировками
- Управление расписанием
- Бронирование и управление записями
- Административная панель

## Технологии

### Frontend
- **Next.js** - React фреймворк
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **ESLint** - линтинг кода

### Backend
- **Django** - веб-фреймворк
- **Django REST Framework** - REST API
- **SQLite** - база данных
- **Pylint** - линтинг Python кода

## Установка и запуск

### Предварительные требования
- Node.js 18+
- Python 3.8+
- pip (менеджер пакетов Python)
- npm или yarn

### Быстрая установка
```bash
# Установка всех зависимостей
make install

# Или установка по частям:
make install-backend  # Установка зависимостей бэкенда
make install-frontend # Установка зависимостей фронтенда
```

### Запуск для разработки
```
# Запуск обоих серверов одновременно
make dev

# Или запуск по отдельности:
make dev-backend  # Запуск бэкенда на http://127.0.0.1:8000
make dev-frontend # Запуск фронтенда на http://localhost:3000
```
## Доступные команды
### Установка
* make install - установка всех зависимостей
* make install-backend - установка Python зависимостей
* make install-frontend - установка Node.js зависимостей

### Разработка
* make dev - запуск обоих серверов для разработки
* make dev-backend - запуск Django сервера
* make dev-frontend - запуск Next.js сервера

### Линтинг и качество кода
* make lint - проверка кода обоих частей приложения
* make lint-backend - линтинг Python кода
* make lint-frontend - линтинг JavaScript/TypeScript кода

## Структура проекта
```
fitness-booking/
├── backend/                 # Django приложение
│   ├── manage.py
│   ├── requirements.txt
│   └── ... (остальные Django файлы)
├── frontend/               # Next.js приложение
│   ├── package.json
│   ├── next.config.mjs
│   └── ... (остальные Next.js файлы)
└── Makefile               # Файл с командами
```
## Доступ к приложению
После запуска приложение будет доступно:
* Frontend: http://localhost:3000
* Backend API: http://127.0.0.1:8000
* Admin Panel: http://127.0.0.1:8000/admin

## Решение проблем
### Проблемы с зависимостями
```
# Переустановка зависимостей бэкенда
cd backend && pip install -r requirements.txt

# Переустановка зависимостей фронтенда
cd frontend && npm install
```

## Дополнительные команды
### Миграции базы данных
```
cd backend && python manage.py makemigrations
cd backend && python manage.py migrate
```
### Создание суперпользователя
```
cd backend && python manage.py createsuperuser
```
### Сборка фронтенда для продакшена
```
cd frontend && npm run build
```