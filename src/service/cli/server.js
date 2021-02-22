'use strict';

/**
 * Этот модуль запускает сервер для API.
 *
 *  @module src/service/cli/server
 */

const express = require(`express`);
const cors = require(`cors`);

const {getAPIRouter} = require(`../api-routes`);
const {getLogger} = require(`../lib/logger`);
const {API_PREFIX, ExitCodes} = require(`../../consts`);

const requestLogger = require(`../middlewares/req-logger`);
const notFoundMiddleWare = require(`../middlewares/resource-not-found`);
const internalErrorMiddleWare = require(`../middlewares/intenal-server-error`);

const {getSequelize} = require(`../lib/sequelize`);
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

    const sequelize = getSequelize();

    try {
      logger.info(`Connecting to DB...`);
      await sequelize.authenticate();
      logger.info(`Connected to DB.`);
    } catch (error) {
      logger.error(`Connection to DB failed: ${error}`);
      process.exit(ExitCodes.FAIL);
    }

    const app = express();
    app.use(express.json());

    app.use(cors({
      origin: `http://localhost:8080`,
      credentials: true
    }));

    app.use(requestLogger);
    app.use(API_PREFIX, await getAPIRouter());

    app.use(notFoundMiddleWare);
    app.use(internalErrorMiddleWare);

    app.listen(portNumber, (err) => {
      if (err) {
        logger.error(`Error, server can't be started on: ${portNumber}: ${err.message}`);
        process.exit(ExitCodes.FAIL);
      }

      logger.info(`Server is running on port: ${portNumber}`);
    });
  }
};
