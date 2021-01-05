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
SELECT
  offers.id AS "Offer id",
  offers.title AS "Offer title",
  offers.cost AS "Offer Cost",
  offers_types.title AS "Offer type",
  offers.description AS "Offer text",
  offers.creation_date AS "Offer CD",
  users.first_name AS "User first name",
  users.last_name AS "User last name",
  users.email AS "User email",
  count(comments.offer_id) AS "Comments count",
  offers_categories.categories_titles AS "Categories"
    FROM offers
  INNER JOIN offers_types
    ON offers.type_id = offers_types.id
  INNER JOIN users
    ON offers.user_id = users.id
  INNER JOIN comments
    ON comments.offer_id = offers.id
  INNER JOIN
    (
      SELECT offers_categories.offer_id, string_agg(categories.title, ', ') AS "categories_titles"
      FROM offers_categories
      INNER JOIN categories ON categories.id = offers_categories.category_id
      GROUP BY offers_categories.offer_id
    )
     offers_categories ON offers_categories.offer_id = offers.id
  GROUP BY offers.id, offers_types.id, users.id, offers_categories.categories_titles
  ORDER BY offers.creation_date DESC
    ;


-- Получить полную информацию определённого объявления (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий);
-- Это тот же вопрос, что и выше, только добавилось условие WHERE. В этом запросе ищем объявление с id = 2
SELECT
  offers.id AS "Offer id",
  offers.title AS "Offer title",
  offers.cost AS "Offer Cost",
  offers_types.title AS "Offer type",
  offers.description AS "Offer text",
  offers.creation_date AS "Offer CD",
  users.first_name AS "User first name",
  users.last_name AS "User last name",
  users.email AS "User email",
  count(comments.offer_id) AS "Comments count",
  offers_categories.categories_titles AS "Categories"
    FROM offers
  INNER JOIN offers_types
    ON offers.type_id = offers_types.id
  INNER JOIN users
    ON offers.user_id = users.id
  INNER JOIN comments
    ON comments.offer_id = offers.id
  INNER JOIN
    (
      SELECT offers_categories.offer_id, string_agg(categories.title, ', ') AS "categories_titles"
      FROM offers_categories
      INNER JOIN categories ON categories.id = offers_categories.category_id
      GROUP BY offers_categories.offer_id
    )
     offers_categories ON offers_categories.offer_id = offers.id
  WHERE offers.id = 2
  GROUP BY offers.id, offers_types.id, users.id, offers_categories.categories_titles
    ;


-- Получить список из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);
SELECT
  comments.id AS "Comment id",
  comments.offer_id AS "Offer id",
  concat(users.first_name, ' ', users.last_name) AS "User name",
  comments.text AS "Comment text"
    FROM comments
  INNER JOIN users
    ON comments.user_id = users.id
  ORDER BY comments.creation_date DESC
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
