Создание базы
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

Выдаем доступ к базе
```
GRANT ALL PRIVILEGES ON DATABASE "buy_and_sell" TO "buy_and_sell_user"; 
```

Отключаемся от базы и коннектимся новым пользователем и втягиваем схему
```
\q
psql -U buy_and_sell_user -W -h localhost -d buy_and_sell  -a -f schema.sql
```

Генерируем объявления и наполняем базу
```
node src/service/service.js --fill 1000
psql -U buy_and_sell_user -W -h localhost -d buy_and_sell  -a -f fill-db.sql
```
