'use strict';

/**
 * Этот модуль отдает моковые данные из файла. При первом обращении читает файл, а далее кеш.
 *
 *  @module src/service/
 */

const path = require(`path`);

const {getLogger} = require(`../lib/logger`);
const {readFileInJSON} = require(`../../utils`);
const {ExitCodes} = require(`../../consts`);

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

let data;

const logger = getLogger({name: `api`});

/**
 * Функция отдает все объявления, которые есть в файле с моками. При первом обращении кеширует данные.
 *
 * @return {Array} - Возвращает массив с прочитанными данными или пустой массив, если данных нет.
 */

const getMockData = async () => {
  if (!data) {
    try {
      logger.debug(`Старт чтения файла с моками.`);
      data = await readFileInJSON(path.join(__dirname, PATH_TO_ROOT_FOLDER, FILE_NAME));
      logger.info(`Файл с моками успешно прочитан.`);
    } catch (err) {
      logger.error(`Не удалось прочитать файл с моками: ${err.message}`);
      process.exit(ExitCodes.FAIL);
    }
  }
  return data;
};

module.exports = {getMockData};
