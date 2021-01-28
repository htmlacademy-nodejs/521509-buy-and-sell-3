Создание базы основной и для тестов
```
psql -U postgres -W -h localhost -a -f create-db.sql
```

Коннектимся к серверу
```
psql -U postgres -W -h localhost
```

Создание пользователя
```
CREATE USER "buy_and_sell_user" WITH ENCRYPTED PASSWORD 'password';
```

Выдаем доступ к базе основной и для тестов
```
GRANT ALL PRIVILEGES ON DATABASE "buy_and_sell" TO "buy_and_sell_user"; 
GRANT ALL PRIVILEGES ON DATABASE "buy_and_sell_test" TO "buy_and_sell_user"; 
\q
```

Указываем параметры для подключения в файл .env и наполняем базу тестовыми данными. Если тестовые данные не нужны, то просто запускаем.
```
npm run filldb
```
