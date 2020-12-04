'use strict';

/**
 * Этот модуль содержит константы
 *
 * @module src/consts
 */

/**
 * Коды завершения программы
 *
 * @type {{SUCCESS: number, FAIL: number}}
 */
const ExitCodes = {
  SUCCESS: 0,
  FAIL: 1
};

/**
 * Команда по умолчанию при запуске программы
 *
 * @type {string}
 */
const DEFAULT_COMMAND = `--help`;

/**
 * с какого индекса аргумента начинается ввод пользователя. Первые 2 - путь до node.js и путь до сценария.
 *
 * @type {number}
 */
const USER_ARGV_INDEX = 2;

module.exports = {
  DEFAULT_COMMAND,
  ExitCodes,
  USER_ARGV_INDEX
};
