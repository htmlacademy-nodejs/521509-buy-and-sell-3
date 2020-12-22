'use strict';

/**
 * Этот модуль запускает сервер для API.
 *
 *  @module src/service/cli/server
 */

const chalk = require(`chalk`);
const express = require(`express`);

const routes = require(`../api-routes`);
const {HttpCode, API_PREFIX} = require(`../../consts`);


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

    const app = express();
    app.use(express.json());
    app.use(API_PREFIX, routes);


    app.use((req, res) => res.status(HttpCode.NOT_FOUND).json({error: {code: HttpCode.NOT_FOUND, message: `Not Found`, details: `This endpoint is not presented`}}));

    app.listen(portNumber, (err) => {
      if (err) {
        console.log(chalk.red(`Ошибка при создании сервера: ${portNumber}`));
        return;
      }

      console.log(chalk.green(`Сервер поднят успешно на порту: ${portNumber}`));
    });
  }
};
