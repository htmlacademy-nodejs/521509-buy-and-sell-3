'use strict';

/*
  Этот модудь содержит константы
 */

// коды завершения программы
const EXIT_CODES = {
  SUCCESS: 0,
  FAIL: 1
};

// команда по умолчанию
const DEFAULT_COMMAND = `--help`;


// с какого индекса аргумента начинается ввод пользователя. Первые 2 - путь до node.js и путь до сценария.
const USER_ARGV_INDEX = 2;

module.exports = {
  DEFAULT_COMMAND,
  EXIT_CODES,
  USER_ARGV_INDEX
};
