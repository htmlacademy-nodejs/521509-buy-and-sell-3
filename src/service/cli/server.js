'use strict';

/**
 * Этот модуль запускает сервер для API.
 *
 *  @module src/service/cli/server
 */

const chalk = require(`chalk`);
const express = require(`express`);

const {HttpCode} = require(`../../consts`);
const {getMockData} = require(`../lib/get-mock-data`);

/**
 * Порт по умолчанию
 * @const
 * @type {number}
 * @default
 */
const DEFAULT_PORT = 3000;

/**
 * Сообщение по умолчанию, если ресурс не найден
 * @const
 * @type {string}
 * @default
 */
const NOT_FOUND_MESSAGE = `Not found`;


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

    app.get(`/offers`, (async (req, res) => {
      res.send(await getMockData());
    }));

    app.use((req, res) => res.status(HttpCode.NOT_FOUND).send(NOT_FOUND_MESSAGE));

    app.listen(portNumber, (err) => {
      if (err) {
        console.log(chalk.red(`Ошибка при создании сервера: ${portNumber}`));
        return;
      }

      console.log(chalk.green(`Сервер поднят успешно на порту: ${portNumber}`));
    });
  }
};
