'use strict';
/**
 * Express сервер для запуска фронт-енда приложения.
 *
 * @module /src/express/index
 */

const path = require(`path`);

const express = require(`express`);
const cors = require(`cors`);
const chalk = require(`chalk`);
const cookieParser = require(`cookie-parser`);

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const offersRoutes = require(`./routes/offers-routes`);

const checkUserAuth = require(`./middlewares/checkUserAuth`);


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
 * Путь до папки для приема файлов от пользователей. Она будет будет полностью доступна с помощью express.static.
 *
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_UPLOAD_DIR = `../../upload`;

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
app.use(cookieParser());

app.use(cors({
  origin: `http://localhost:8080`,
  credentials: true
}));

/**
 * Добавляем отдачу статичных файлов.
 */
app.use(express.static(path.resolve(__dirname, PATH_TO_PUBLIC_DIR)));
app.use(express.static(path.resolve(__dirname, PATH_TO_UPLOAD_DIR)));

app.use(checkUserAuth());

/**
 * Подключаем Router'ы для путей.
 */
app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);


/**
 * Добавляем обработчики ошибок.
 */
app.use((req, res) => res.status(404).render(`errors/404`));
app.use((err, req, res, _next) => {
  console.log(err); // TODO переделать на pino
  res.status(500).render(`errors/500`);
});

/**
 * Запускаем сервер
 */
app.listen(PORT_NUMBER, (err) => {
  if (err) {
    console.log(chalk.red(err.message));
  }
  console.log(chalk.green(`Front server is started on port: ${PORT_NUMBER}`));
});
