'use strict';

/**
 * Этот модуль отдает моковые данные из файла. При первом обращении читает файл, а далее кеш.
 *
 *  @module src/service/
 */

const path = require(`path`);

const {readFileInJSON} = require(`../../utils`);

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

/**
 * Функция отдает все объявления, которые есть в файле с моками. При первом обращении кеширует данные.
 *
 * @return {Array} - Возвращает массив с прочитанными данными или пустой массив, если данных нет.
 */

const getMockData = async () => {
  if (!data) {
    data = await readFileInJSON(path.join(__dirname, PATH_TO_ROOT_FOLDER, FILE_NAME));
  }
  return data;
};

module.exports = {getMockData};
