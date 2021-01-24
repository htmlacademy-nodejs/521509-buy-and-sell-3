-- Получить список всех категорий (идентификатор, наименование категории);
SELECT id, title FROM categories;

-- Получить список категорий для которых создано минимум одно объявление (идентификатор, наименование категории);
SELECT categories.id, categories.title FROM offers_categories
  INNER JOIN categories ON offers_categories.category_id = categories.id
  GROUP BY categories.id;

-- Получить список категорий с количеством объявлений (идентификатор, наименование категории, количество объявлений в категории);
SELECT categories.id, categories.title, count(categories.id) FROM offers_categories
  INNER JOIN categories ON offers_categories.category_id = categories.id
  GROUP BY categories.id
  ORDER BY count(categories.id) DESC;

-- Получить список объявлений (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие объявления;

-- Спасибо наставнику за наводку на курс по SQL, создаем представление, чтобы не повторять этот код при необходимости выборки по id или иным полям.
-- Пройдя тот же курс немного дальше, это решение ок. Но так как я сам не смог придумать нормальное название, то возможно лучше было использовать табличные выражения.
DROP VIEW IF EXISTS offers_info;
CREATE VIEW offers_info AS(
SELECT
  offers.id AS "id",
  offers.title AS "title",
  offers.cost AS "cost",
  offers_types.title AS "type",
  offers.description AS "text",
  offers.created_at AS "created_at",
--  users.first_name AS "user_first_name",
--  users.last_name AS "user_last_name",
--  users.email AS "user_email",
  comments.comments_count AS "comments_count",
  offers_categories.categories_titles AS "categories"
    FROM offers
  INNER JOIN offers_types
    ON offers.type_id = offers_types.id
--  INNER JOIN users
--    ON offers.user_id = users.id
  LEFT JOIN (
    SELECT
      comments.offer_id,
      count(comments.offer_id) AS "comments_count"
    FROM comments
    GROUP BY comments.offer_id
  )
    comments ON comments.offer_id = offers.id
  INNER JOIN
    (
      SELECT offers_categories.offer_id, string_agg(categories.title, ', ') AS "categories_titles"
      FROM offers_categories
      INNER JOIN categories ON categories.id = offers_categories.category_id
      GROUP BY offers_categories.offer_id
    )
     offers_categories ON offers_categories.offer_id = offers.id
  ORDER BY offers.created_at DESC
    );
-- выбираем наше новое представление
SELECT * FROM offers_info;

-- Получить полную информацию определённого объявления (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
-- Это тот же вопрос, что и выше, только добавилось условие WHERE. В этом запросе ищем объявление с id = 2
SELECT * FROM offers_info WHERE id = 2;


-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);
SELECT
  comments.id AS "Comment id",
  comments.offer_id AS "Offer id",
  concat(users.first_name, ' ', users.last_name) AS "User name",
  comments.text AS "Comment text"
    FROM comments
  INNER JOIN users
    ON comments.user_id = users.id
  ORDER BY comments.created_at DESC
  LIMIT 5
    ;

-- Получить список комментариев для определённого объявления (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). Сначала новые комментарии;
SELECT
  comments.id AS "Comment id",
  comments.offer_id AS "Offer id",
  concat(users.first_name, ' ', users.last_name) AS "User name",
  comments.text AS "Comment text"
    FROM comments
  INNER JOIN users
    ON comments.user_id = users.id
  WHERE comments.offer_id = 2;
    ;


-- Выбрать 2 объявления, соответствующих типу «куплю»;
SELECT
  offers.id AS "Offer id",
  offers.title AS "Offer title",
  offers_types.title AS "Offer type"
    FROM offers
  JOIN offers_types ON offers.type_id = offers_types.id
  WHERE offers_types.title = 'offer'
  LIMIT 2;


-- Обновить заголовок определённого объявления на «Уникальное предложение!»;
UPDATE offers
  SET title = 'Уникальное предложение!'
  WHERE id = 2;
