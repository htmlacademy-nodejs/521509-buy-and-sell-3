TRUNCATE offers_categories, comments, offers, users, offers_types, categories;

-- Добавляем типы объявлений
INSERT INTO offers_types (id, title)
  VALUES
    (1, 'offer'),
    (2, 'sale');

-- Добавляем категории
INSERT INTO categories (id, title)
  VALUES
    (1, 'Книги'),
    (3, 'Посуда'),
    (6, 'Журналы'),
    (4, 'Игры'),
    (5, 'Животные'),
    (2, 'Разное');

-- Добавляем пользователей
INSERT INTO users (id, avatar_url, first_name, last_name, email)
  VALUES
    (1, 'avatar02.jpg', 'Яна', 'Артёмов', 'ghjkl@gmail.com'),
    (2, 'avatar01.jpg', 'Дарья', 'Коротких', 'zxcvbn@ya.ru'),
    (3, 'avatar02.jpg', 'Дарья', 'Ефремов', 'asd@mail.ru'),
    (4, 'avatar01.jpg', 'Анна', 'Толстых', 'lasto4ka2016@mail.ru'),
    (5, 'avatar04.jpg', 'Алексей', 'Денисов', 'milaha1954@rambler.ru');

-- Добавляем объявления
INSERT INTO offers (id, type_id, user_id, title, description, creation_date, image_url, cost)
  VALUES
    (1, 2, 1, 'Продам советскую посуду. Почти не разбита', 'Таких предложений больше нет! Встреча возможна только онлайн. Две страницы заляпаны свежим кофе. Это настоящая находка для коллекционера! Продаю с болью в сердце... Онлайн-показ. Если товар не понравится — верну всё до последней копейки.', '2020-11-08T21:57:31.589Z', 'item14.jpg', 75288),
    (2, 1, 2, 'Продам коллекцию журналов «Огонёк»', 'Кому нужен этот новый телефон, если тут такое... Если найдёте дешевле — сброшу цену. При покупке с меня бесплатная доставка в черте города. Пользовались бережно и только по большим праздникам. Даю недельную гарантию. Таких предложений больше нет! Две страницы заляпаны свежим кофе. Это настоящая находка для коллекционера! Мой дед не мог её сломать. Не надо спорить. Встреча возможна только онлайн. Не пытайтесь торговаться. Цену вещам я знаю. Онлайн-показ. Обоснованный торг на месте. Товар в отличном состоянии. Посмотреть или показать приезжайте сами, я не хочу никуда ехать. Бонусом отдам все аксессуары. Продаю с болью в сердце... Встреча только в масках и перчатках. Если товар не понравится — верну всё до последней копейки.', '2020-10-21T23:17:14.486Z', 'item12.jpg', 98738),
    (3, 2, 2, 'Продам отличную подборку фильмов на VHS', 'Встреча возможна только онлайн. Это настоящая находка для коллекционера! Посмотреть или показать приезжайте сами, я не хочу никуда ехать. Кажется, что это хрупкая вещь. Товар в отличном состоянии. Бонусом отдам все аксессуары. Если товар не понравится — верну всё до последней копейки. При покупке с меня бесплатная доставка в черте города. Пользовались бережно и только по большим праздникам. Таких предложений больше нет! Две страницы заляпаны свежим кофе. Если найдёте дешевле — сброшу цену. Даю недельную гарантию. Не надо спорить. Продаю с болью в сердце...', '2020-12-21T09:47:48.065Z', 'item02.jpg', 40986),
    (4, 2, 2, 'Продам холодильник, не работает, но на улице холодно', 'Если товар не понравится — верну всё до последней копейки. Продаю с болью в сердце... Кажется, что это хрупкая вещь.', '2020-11-20T11:45:20.383Z', 'item08.jpg', 97516),
    (5, 2, 4, 'Продам новую приставку Sony Playstation 5', 'Мой дед не мог её сломать. Если товар не понравится — верну всё до последней копейки. Встреча возможна только онлайн. Встреча только в масках и перчатках. Пользовались бережно и только по большим праздникам. Это настоящая находка для коллекционера!', '2020-12-23T17:52:10.639Z', 'item15.jpg', 13065),
    (6, 1, 2, 'Продам книги Стивена Кинга', 'Обоснованный торг на месте. Продаю с болью в сердце... Встреча только в масках и перчатках. Кому нужен этот новый телефон, если тут такое... Даю недельную гарантию. Онлайн-показ. Кажется, что это хрупкая вещь. Если найдёте дешевле — сброшу цену. Мой дед не мог её сломать. Таких предложений больше нет! Встреча возможна только онлайн. При покупке с меня бесплатная доставка в черте города. Посмотреть или показать приезжайте сами, я не хочу никуда ехать. Две страницы заляпаны свежим кофе.', '2020-11-16T01:47:35.028Z', 'item11.jpg', 54385),
    (7, 1, 3, 'Продам холодильник, не работает, но на улице холодно', 'Онлайн-показ.', '2021-01-02T02:40:48.063Z', 'item08.jpg', 88180),
    (8, 1, 4, 'Продам игрушку для собак', 'Мой дед не мог её сломать. Даю недельную гарантию. Встреча только в масках и перчатках. Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам. Если товар не понравится — верну всё до последней копейки. Посмотреть или показать приезжайте сами, я не хочу никуда ехать. При покупке с меня бесплатная доставка в черте города. Кажется, что это хрупкая вещь. Кому нужен этот новый телефон, если тут такое... Бонусом отдам все аксессуары. Не надо спорить. Две страницы заляпаны свежим кофе. Встреча возможна только онлайн. Не пытайтесь торговаться. Цену вещам я знаю. Онлайн-показ. Это настоящая находка для коллекционера! Продаю с болью в сердце...', '2020-10-11T00:48:57.088Z', 'item12.jpg', 69021),
    (9, 2, 4, 'Продам книги Стивена Кинга', 'Встреча только в масках и перчатках. Пользовались бережно и только по большим праздникам. Не надо спорить. Кажется, что это хрупкая вещь. Если найдёте дешевле — сброшу цену. Встреча возможна только онлайн. Две страницы заляпаны свежим кофе. Мой дед не мог её сломать. Не пытайтесь торговаться. Цену вещам я знаю. Посмотреть или показать приезжайте сами, я не хочу никуда ехать. Таких предложений больше нет! Онлайн-показ. Это настоящая находка для коллекционера! Продаю с болью в сердце... Кому нужен этот новый телефон, если тут такое... Если товар не понравится — верну всё до последней копейки. Товар в отличном состоянии. Бонусом отдам все аксессуары. Обоснованный торг на месте.', '2020-12-23T04:00:22.054Z', 'item10.jpg', 63299),
    (10, 1, 2, 'Отдам в хорошие руки подшивку «Мурзилка»', 'Две страницы заляпаны свежим кофе. Не надо спорить. Не пытайтесь торговаться. Цену вещам я знаю. Обоснованный торг на месте. Продаю с болью в сердце... Мой дед не мог её сломать. Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам. Посмотреть или показать приезжайте сами, я не хочу никуда ехать. Даю недельную гарантию. Встреча только в масках и перчатках. Если товар не понравится — верну всё до последней копейки. Встреча возможна только онлайн. При покупке с меня бесплатная доставка в черте города. Бонусом отдам все аксессуары. Кажется, что это хрупкая вещь. Таких предложений больше нет! Онлайн-показ.', '2020-12-04T23:45:53.983Z', 'item12.jpg', 93345);

-- Добавляем комментарии
INSERT INTO comments (text, creation_date, offer_id, user_id)
  VALUES
    ('Вы что?! В магазине дешевле.А где блок питания?Неплохо, но дорого', '2020-10-08T21:17:07.198Z', 1, 3),
    ('А где блок питания?Продаю в связи с переездом. Отрываю от сердца.Совсем немного...Почему в таком ужасном состоянии?А сколько игр в комплекте?Неплохо, но дорогоС чем связана продажа? Почему так дешёво?Оплата наличными или перевод на карту?', '2020-12-25T15:16:37.216Z', 1, 4),
    ('Оплата наличными или перевод на карту?А сколько игр в комплекте?С чем связана продажа? Почему так дешёво?', '2020-11-15T04:51:25.305Z', 1, 3),
    ('Неплохо, но дорого', '2020-11-18T11:36:13.959Z', 1, 4),
    ('Оплата наличными или перевод на карту?А где блок питания?Неплохо, но дорогоПочему в таком ужасном состоянии?', '2020-10-19T15:56:29.222Z', 1, 1),
    ('Почему в таком ужасном состоянии?С чем связана продажа? Почему так дешёво?', '2020-11-25T09:00:46.372Z', 2, 4),
    ('Совсем немного...', '2020-11-12T21:53:19.347Z', 2, 2),
    ('А сколько игр в комплекте?Почему в таком ужасном состоянии?', '2020-11-12T04:41:00.984Z', 2, 3),
    ('С чем связана продажа? Почему так дешёво?Оплата наличными или перевод на карту?', '2021-01-03T08:42:31.154Z', 2, 2),
    ('Оплата наличными или перевод на карту?Продаю в связи с переездом. Отрываю от сердца.', '2020-11-05T08:47:01.407Z', 2, 2),
    ('А где блок питания?Совсем немного...Вы что?! В магазине дешевле.А сколько игр в комплекте?Почему в таком ужасном состоянии?', '2020-12-03T03:24:17.831Z', 3, 4),
    ('А сколько игр в комплекте?', '2020-12-08T01:04:40.994Z', 3, 1),
    ('Совсем немного...С чем связана продажа? Почему так дешёво?Почему в таком ужасном состоянии?', '2020-12-25T10:25:17.721Z', 3, 1),
    ('Почему в таком ужасном состоянии?Продаю в связи с переездом. Отрываю от сердца.', '2020-11-13T21:03:29.421Z', 3, 3),
    ('А где блок питания?Неплохо, но дорогоСовсем немного...Вы что?! В магазине дешевле.Оплата наличными или перевод на карту?С чем связана продажа? Почему так дешёво?', '2020-10-13T15:14:09.822Z', 3, 1),
    ('Продаю в связи с переездом. Отрываю от сердца.С чем связана продажа? Почему так дешёво?А где блок питания?А сколько игр в комплекте?Неплохо, но дорого', '2020-12-03T02:23:11.873Z', 4, 1),
    ('С чем связана продажа? Почему так дешёво?Оплата наличными или перевод на карту?Совсем немного...Почему в таком ужасном состоянии?А где блок питания?', '2020-12-24T16:36:02.168Z', 4, 3),
    ('Неплохо, но дорогоА сколько игр в комплекте?Почему в таком ужасном состоянии?', '2020-10-16T04:18:38.958Z', 4, 3),
    ('Вы что?! В магазине дешевле.Совсем немного...Оплата наличными или перевод на карту?А сколько игр в комплекте?Продаю в связи с переездом. Отрываю от сердца.Почему в таком ужасном состоянии?А где блок питания?С чем связана продажа? Почему так дешёво?', '2020-10-15T14:34:13.973Z', 4, 1),
    ('А где блок питания?', '2020-11-12T03:58:27.976Z', 4, 1),
    ('Неплохо, но дорогоА сколько игр в комплекте?', '2020-12-11T22:59:21.787Z', 5, 4),
    ('Вы что?! В магазине дешевле.Почему в таком ужасном состоянии?', '2020-10-11T08:24:47.698Z', 5, 3),
    ('Совсем немного...А где блок питания?Почему в таком ужасном состоянии?Вы что?! В магазине дешевле.', '2020-11-18T00:24:32.370Z', 5, 3),
    ('Почему в таком ужасном состоянии?Совсем немного...С чем связана продажа? Почему так дешёво?А где блок питания?', '2020-12-08T18:52:10.798Z', 5, 3),
    ('Продаю в связи с переездом. Отрываю от сердца.А где блок питания?Совсем немного...Оплата наличными или перевод на карту?Неплохо, но дорого', '2020-12-14T16:12:20.365Z', 5, 3),
    ('Оплата наличными или перевод на карту?С чем связана продажа? Почему так дешёво?', '2020-10-24T10:40:49.415Z', 6, 2),
    ('Неплохо, но дорогоА где блок питания?Почему в таком ужасном состоянии?Продаю в связи с переездом. Отрываю от сердца.Совсем немного...', '2020-11-17T12:21:34.506Z', 6, 3),
    ('А где блок питания?С чем связана продажа? Почему так дешёво?Вы что?! В магазине дешевле.Неплохо, но дорогоА сколько игр в комплекте?Оплата наличными или перевод на карту?', '2020-11-20T15:36:15.238Z', 6, 1),
    ('Неплохо, но дорогоВы что?! В магазине дешевле.А где блок питания?Почему в таком ужасном состоянии?Продаю в связи с переездом. Отрываю от сердца.С чем связана продажа? Почему так дешёво?Совсем немного...', '2020-10-26T11:02:47.663Z', 6, 4),
    ('Почему в таком ужасном состоянии?С чем связана продажа? Почему так дешёво?А сколько игр в комплекте?Продаю в связи с переездом. Отрываю от сердца.Совсем немного...', '2020-11-22T10:36:11.764Z', 6, 4),
    ('Совсем немного...А где блок питания?Вы что?! В магазине дешевле.С чем связана продажа? Почему так дешёво?Продаю в связи с переездом. Отрываю от сердца.', '2020-11-28T20:47:10.384Z', 7, 3),
    ('Неплохо, но дорогоПродаю в связи с переездом. Отрываю от сердца.Совсем немного...', '2020-10-19T01:50:08.364Z', 7, 1),
    ('Продаю в связи с переездом. Отрываю от сердца.С чем связана продажа? Почему так дешёво?Оплата наличными или перевод на карту?', '2020-11-01T14:06:17.697Z', 7, 1),
    ('Вы что?! В магазине дешевле.Продаю в связи с переездом. Отрываю от сердца.Неплохо, но дорогоОплата наличными или перевод на карту?С чем связана продажа? Почему так дешёво?Совсем немного...', '2020-11-20T08:54:05.638Z', 7, 4),
    ('Оплата наличными или перевод на карту?Почему в таком ужасном состоянии?Вы что?! В магазине дешевле.Совсем немного...Неплохо, но дорогоА где блок питания?С чем связана продажа? Почему так дешёво?А сколько игр в комплекте?', '2020-11-17T11:13:53.515Z', 7, 1),
    ('С чем связана продажа? Почему так дешёво?А сколько игр в комплекте?Почему в таком ужасном состоянии?Неплохо, но дорогоПродаю в связи с переездом. Отрываю от сердца.', '2020-12-23T19:47:43.759Z', 8, 2),
    ('Вы что?! В магазине дешевле.Неплохо, но дорого', '2020-12-27T15:07:43.832Z', 8, 2),
    ('А где блок питания?Продаю в связи с переездом. Отрываю от сердца.', '2020-11-20T20:19:47.306Z', 8, 4),
    ('Оплата наличными или перевод на карту?А сколько игр в комплекте?Почему в таком ужасном состоянии?А где блок питания?Вы что?! В магазине дешевле.Совсем немного...Неплохо, но дорогоПродаю в связи с переездом. Отрываю от сердца.', '2020-12-06T13:39:28.765Z', 8, 4),
    ('Совсем немного...С чем связана продажа? Почему так дешёво?Неплохо, но дорогоПродаю в связи с переездом. Отрываю от сердца.А сколько игр в комплекте?', '2020-11-18T06:09:46.507Z', 8, 1),
    ('А где блок питания?Неплохо, но дорогоА сколько игр в комплекте?С чем связана продажа? Почему так дешёво?Совсем немного...Продаю в связи с переездом. Отрываю от сердца.Вы что?! В магазине дешевле.', '2020-12-13T17:03:28.922Z', 9, 4),
    ('Почему в таком ужасном состоянии?Совсем немного...', '2020-12-09T00:36:41.172Z', 9, 1),
    ('А где блок питания?Неплохо, но дорогоОплата наличными или перевод на карту?', '2020-12-25T03:38:01.222Z', 9, 1),
    ('Почему в таком ужасном состоянии?С чем связана продажа? Почему так дешёво?Неплохо, но дорогоВы что?! В магазине дешевле.', '2020-10-21T04:01:08.031Z', 9, 4),
    ('Продаю в связи с переездом. Отрываю от сердца.А сколько игр в комплекте?Совсем немного...А где блок питания?Вы что?! В магазине дешевле.', '2020-11-23T21:41:59.021Z', 9, 1),
    ('Вы что?! В магазине дешевле.С чем связана продажа? Почему так дешёво?А сколько игр в комплекте?Оплата наличными или перевод на карту?Совсем немного...Почему в таком ужасном состоянии?Продаю в связи с переездом. Отрываю от сердца.', '2020-12-06T10:08:11.019Z', 10, 4),
    ('А где блок питания?Почему в таком ужасном состоянии?Продаю в связи с переездом. Отрываю от сердца.Совсем немного...Неплохо, но дорогоА сколько игр в комплекте?Вы что?! В магазине дешевле.', '2020-12-31T02:53:59.666Z', 10, 2),
    ('Вы что?! В магазине дешевле.Оплата наличными или перевод на карту?', '2020-12-31T22:50:32.850Z', 10, 1),
    ('Продаю в связи с переездом. Отрываю от сердца.А сколько игр в комплекте?', '2020-10-30T15:32:52.301Z', 10, 2),
    ('Оплата наличными или перевод на карту?Неплохо, но дорогоВы что?! В магазине дешевле.', '2020-11-12T00:08:40.324Z', 10, 2);

-- добавляем связи категории - объявления
INSERT INTO offers_categories (offer_id, category_id)
  VALUES
    (1, 4),
    (1, 3),
    (2, 3),
    (2, 1),
    (2, 2),
    (2, 5),
    (2, 6),
    (3, 5),
    (4, 3),
    (4, 2),
    (4, 4),
    (4, 1),
    (5, 6),
    (5, 4),
    (5, 1),
    (6, 5),
    (7, 2),
    (7, 1),
    (7, 6),
    (7, 3),
    (8, 1),
    (8, 6),
    (8, 4),
    (9, 5),
    (9, 2),
    (10, 1);