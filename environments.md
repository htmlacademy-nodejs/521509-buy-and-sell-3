Настройки переменных окружения

Подключение к базе данных
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=buy_and_sell
DB_USER=buy_and_sell_user
DB_PASSWORD=password

# Максимальное число соединений с БД
DB_POOL_MAX_CONNECTIONS = 5
# Минимальное число соединений с БД
DB_POOL_MIN_CONNECTIONS = 0
# Максимальное время ожидания для коннекта с БД
DB_POOL_ACQUIRE = 10000
# Максимальное время ожидания выполнения запроса к БД
DB_POOL_IDLE = 10000
```

Безопасность
```
# Параметры для хеширования паролей пользователей
SALT_ROUNDS = 10

# Параметры для сессии

SESSIONS_SECRET = BUY_AND_SELL
# Максимальное время жизни сессии в миллисекундах
SESSION_EXPIRATION = 604800000
# Временной интервал проверки и удаления устаревших сессий.
SESSION_CHECK_EXPIRATTION_INTERVAL = 600000
```

