'use strict';

/**
 * Этот модуль запускает сервер для API.
 *
 *  @module src/service/cli/server
 */

const path = require(`path`);

const chalk = require(`chalk`);
const express = require(`express`);

const {HttpCode} = require(`../../consts`);
const {readFileInJSON} = require(`../../utils`);

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

/**
 * Название файла для записи результата
 * @const
 * @type {string}
 * @default
 */
const FILE_NAME = `mocks.json`;

/**
 * Относительный путь к корневому каталогу
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_ROOT_FOLDER = `../../../`;

/**
 * Функция отдает все объявления, которые есть в файле с моками.
 *
 * @return {Array} - Возвращает массив с прочитанными данными или пустой массив, если данных нет.
 */
const getOffers = async () => {
  try {
    const offers = await readFileInJSON(path.join(__dirname, PATH_TO_ROOT_FOLDER, FILE_NAME));
    return offers;
  } catch (error) {
    console.log(chalk.red(`Не удалось прочитать файл с данными ${FILE_NAME}: ${error.message}`));
    return [];
  }
};

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
      res.send(await getOffers());
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
