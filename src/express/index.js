'use strict';
/**
 * Express сервер для запуска фронт-енда приложения.
 *
 * @module /src/express/index
 */

const path = require(`path`);

const express = require(`express`);
const chalk = require(`chalk`);

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const offersRoutes = require(`./routes/offers-routes`);

/**
 * Номер порта для запуска по умолчанию
 *
 * @type {number}
 * @const
 * @default
 */
const PORT_NUMBER = 8080;

/**
 * Путь до папки public. Она будет будет полностью доступна с помощью express.static.
 *
 * @const
 * @type {string}
 * @default
 */
const PUBLIC_PATH_DIR = `public`;

/**
 * Создаем экземпляр Express.
 * @type {*|Express}
 */
const app = express();

/**
 * Подключаем Router'ы для путей.
 */
app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);

/**
 * Добавляем отдачу статичных файлов.
 */
app.use(express.static(path.resolve(__dirname, PUBLIC_PATH_DIR)));

/**
 * Запускаем сервер
 */
app.listen(PORT_NUMBER, (err) => {
  if (err) {
    console.log(chalk.red(err.message));
  }
  console.log(chalk.green(`Front server is started on port: ${PORT_NUMBER}`));
});
