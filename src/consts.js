'use strict';

/**
 * Этот модуль содержит константы
 *
 * @module src/consts
 */

/**
 * Коды завершения программы
 * @const
 * @type {{SUCCESS: number, FAIL: number}}
 * @default
 */
const ExitCodes = {
  SUCCESS: 0,
  FAIL: 1
};

/**
 * Команда по умолчанию при запуске программы
 * @const
 * @type {string}
 * @default
 */
const DEFAULT_COMMAND = `--help`;

/**
 * с какого индекса аргумента начинается ввод пользователя. Первые 2 - путь до node.js и путь до сценария.
 *
 * @type {number}
 * @const
 * @default
 */
const USER_ARGV_INDEX = 2;


/**
 * Коды для ответов сервера
 *
 * @const
 * @type {Object}
 */
const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  CREATED: 201,
  DELETED: 204,
  BAD_REQUEST: 400
};

/**
 * Длина генерируемых id по умолчанию.
 * @const
 * @type {number}
 * @default 5
 */
const MAX_ID_LENGTH = 5;

/**
 * Путь(роут) АПИ по умолчанию.
 * @const
 * @type {string}
 * @default /api
 */
const API_PREFIX = `/api`;


/**
 * Переменные окружения. Нужно будет перенести в .env
 * @const
 * @type {Object}
 */
const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
};

module.exports = {
  DEFAULT_COMMAND,
  ExitCodes,
  USER_ARGV_INDEX,
  HttpCode,
  MAX_ID_LENGTH,
  API_PREFIX,
  Env
};
