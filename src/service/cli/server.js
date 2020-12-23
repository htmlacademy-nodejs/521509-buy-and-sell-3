'use strict';

/**
 * Этот модуль запускает сервер для API.
 *
 *  @module src/service/cli/server
 */

const express = require(`express`);

const routes = require(`../api-routes`);
const {getLogger} = require(`../lib/logger`);
const {API_PREFIX, ExitCodes} = require(`../../consts`);

const requestLogger = require(`../middlewares/req-logger`);
const notFoundMiddleWare = require(`../middlewares/resource-not-found`);
const internalErrorMiddleWare = require(`../middlewares/intenal-server-error`);

/**
 * Порт по умолчанию
 * @const
 * @type {number}
 * @default
 */
const DEFAULT_PORT = 3000;

module.exports = {
  name: `--server`,

  /**
   * Метод run запускает сервер на порту указанным пользователем. Если не указан на порту по умолчанию.
   *
   * @param {Array} args - массив оставшихся аргументов, которые пользователь указал при запуске программы
   */

  async run(args) {
    const [port] = args;
    const portNumber = Number.parseInt(port, 10) || DEFAULT_PORT;

    const logger = getLogger({name: `api`});

    const app = express();
    app.use(express.json());

    app.use(requestLogger);
    app.use(API_PREFIX, routes);

    app.use(notFoundMiddleWare);
    app.use(internalErrorMiddleWare);

    app.listen(portNumber, (err) => {
      if (err) {
        logger.error(`Ошибка при создании сервера: ${portNumber}: ${err.message}`);
        process.exit(ExitCodes.FAIL);
      }

      logger.info(`Сервер поднят успешно на порту: ${portNumber}`);
    });
  }
};
