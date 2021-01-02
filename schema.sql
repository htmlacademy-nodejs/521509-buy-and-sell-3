DROP TABLE IF EXISTS offers_categories;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS offers_types;
DROP TABLE IF EXISTS categories;

CREATE TABLE offers_types
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL
);

CREATE TABLE categories
(
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL
);

CREATE TABLE users
(
  id SERIAL PRIMARY KEY,
  avatar_url VARCHAR(254),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL
);

CREATE TABLE offers
(
  id SERIAL PRIMARY KEY,
  type_id INTEGER NOT NULL,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  creation_date TIMESTAMPTZ NOT NULL,
  image_url VARCHAR(254),
  cost FLOAT4 NOT NULL,
  FOREIGN KEY (type_id) REFERENCES offers_types(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE comments
(
  id SERIAL PRIMARY KEY,
  text VARCHAR(1000) NOT NULL,
  creation_date TIMESTAMPTZ NOT NULL,
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

