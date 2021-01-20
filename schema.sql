DROP TABLE IF EXISTS offers_categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS offers_types;
DROP TABLE IF EXISTS categories;

-- схема созданная sequelize не совсем та, что ниже. Sequelize добавляет поля createdAt, updatedAt и другие...
CREATE TABLE offers_types
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE categories
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  avatar_url VARCHAR(255),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE offers
(
  id SERIAL PRIMARY KEY,
  type_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL,
  image_url VARCHAR(255),
  cost FLOAT NOT NULL,
  FOREIGN KEY (type_id) REFERENCES offers_types(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

CREATE TABLE comments
(
  id SERIAL PRIMARY KEY,
  text VARCHAR(1000) NOT NULL,
  "createdAt" TIMESTAMPTZ NOT NULL,
  offer_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (offer_id) REFERENCES offers(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE offers_categories
(
  offer_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  CONSTRAINT offers_categories_pk PRIMARY KEY (offer_id, category_id),
  FOREIGN KEY (offer_id) REFERENCES offers(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

