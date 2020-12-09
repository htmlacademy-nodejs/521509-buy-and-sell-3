'use strict';

/**
 * Этот модуль выводит информацию для помощи в консоль.
 * Данные взяты из задания '4. Учебный проект: консольные забавы'
 *
 * @module src/service/cli/help
 **/

const chalk = require(`chalk`);

module.exports = {
  name: `--help`,

  /**
   * Выводит в консоль информацию для помощи.
   */

  run() {
    console.info(chalk.blue(`
      Программа запускает http-сервер и формирует файл с данными для API.

        Гайд:
        service.js <command>

        Команды:
        --version:            выводит номер версии
        --help:               печатает этот текст
        --generate <count>    формирует файл mocks.json
        `));
  }
};
