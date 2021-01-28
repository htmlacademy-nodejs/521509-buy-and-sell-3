'use strict';

/**
 * Модуль подключает sequelize c параметрами окружения из .env
 */
const path = require(`path`);

const Sequelize = require(`sequelize`);
const {getLogger} = require(`./logger`);

const {Env} = require(`../../consts`);

if (process.env.NODE_ENV === Env.TESTING) {
  require(`dotenv`).config({path: path.resolve(__dirname, `../../../test.env`)});
} else {
  require(`dotenv`).config({path: path.resolve(__dirname, `../../../.env`)});
}

/**
 * Забираем все необходимые переменные
 */
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_POOL_MAX_CONNECTIONS,
  DB_POOL_MIN_CONNECTIONS,
  DB_POOL_ACQUIRE,
  DB_POOL_IDLE
} = process.env;

const getSequelize = () => {
  /**
   * Проверяем, что нам всего хватает для подключения, если нет, кидаем ошибку.
   * @type {Boolean}
   */
  const someThingNotDefined = [DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_POOL_MAX_CONNECTIONS, DB_POOL_MIN_CONNECTIONS, DB_POOL_ACQUIRE, DB_POOL_IDLE].some((it) => it === undefined);

  if (someThingNotDefined) {
    throw new Error(`Не хватает переменных окружения для подключения к БД, смотри 'environments.md'`);
  }

  const logger = getLogger({name: `DB`});

  return new Sequelize(
      DB_NAME,
      DB_USER,
      DB_PASSWORD, {
        host: DB_HOST,
        port: DB_PORT,
        dialect: `postgres`,
        pool: {
          max: +DB_POOL_MAX_CONNECTIONS,
          min: +DB_POOL_MIN_CONNECTIONS,
          acquire: +DB_POOL_ACQUIRE,
          idle: +DB_POOL_IDLE
        },
        logging: logger.debug.bind(logger)
        // logging: (...msg) => console.log(msg)
      }
  );
};

module.exports = {getSequelize};
