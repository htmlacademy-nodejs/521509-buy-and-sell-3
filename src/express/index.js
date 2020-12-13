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
 * Путь до папки со статикой public. Она будет будет полностью доступна с помощью express.static.
 *
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_PUBLIC_DIR = `public`;

/**
 * Путь до папки с шаблономи.
 *
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_TEMPLATES_DIR = `templates`;

/**
 * Создаем экземпляр Express.
 * @type {*|Express}
 */
const app = express();

/**
 * Устанавливаем pug, как шаблонизатор по умолчанию и указываем путь до шаблонов.
 */
app.set(`views`, path.resolve(__dirname, PATH_TO_TEMPLATES_DIR));
app.set(`view engine`, `pug`);

/**
 * Подключаем Router'ы для путей.
 */
app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);

/**
 * Добавляем отдачу статичных файлов.
 */
app.use(express.static(path.resolve(__dirname, PATH_TO_PUBLIC_DIR)));


/**
 * Добавляем обработчики ошибок.
 */
app.use((req, res) => res.status(404).render(`errors/404`));
// Для обработки ошибок нужно передать 4 аргумента, но eslint ругается на next, который не используется.
app.use((err, req, res, next) => res.status(500).render(`errors/500`)); // eslint-disable-line

/**
 * Запускаем сервер
 */
app.listen(PORT_NUMBER, (err) => {
  if (err) {
    console.log(chalk.red(err.message));
  }
  console.log(chalk.green(`Front server is started on port: ${PORT_NUMBER}`));
});
