'use strict';
/**
 * Этот модуль содержит вспомогательные функции.
 *
 * @module src/utils
 */

const fs = require(`fs`).promises;

const {MAX_OFFERS_QUERY} = require(`./consts`);

/**
 * getRandomNumber генерирует случайное число в пределах переданных функции.
 *
 * @param {Number} min - нижняя граница диапазона
 * @param {Number} max - верхняя граница диапазона
 * @return {number} - сгенирированное случайное число
 */

const getRandomNumber = (min = 0, max = 100) => {
  return Math.floor(Math.random() * max + min);
};

/**
 * getRandomItemInArray возвращает случайный элемент массива
 *
 * @param {Array} array - массив, из которого будет выбран случайный элемент
 * @return {*} - случайный элемент массива
 */

const getRandomItemInArray = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

/**
 * shuffleArray - рандомно тасует элементы массива
 *
 * @param {Array} array - массив элементов
 * @return {Array} - тасованный массив
 */

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

/**
 * getRandomItemsInArray - возвращает массив со несколькими случайными элементами массива, по умолчанию случайной длины
 *
 * @param {Array} array - исходный массив
 * @param {Number} count - кол-во элементов в новом массиве
 * @return {Array} - массив со случайными элементами случайной длины
 */
const getRandomItemsInArray = (array, count = null) => {
  if (!count) {
    count = getRandomNumber(1, array.length - 1);
  }
  return shuffleArray(array).slice(0, count);
};


/**
 * writeFileInJSON записывает данные в файл в формате JSON
 *
 * @async
 * @param {string} filePath - путь до файла включая название файла
 * @param {object} data - объект, который должен быть записан в файл.
 *
 * @example
 * const {writeFile} = require('./utils);
 * await writeFile('test.txt', 'This is test string');
 */

const writeFileInJSON = async (filePath, data) => {
  const content = JSON.stringify(data, null, 2);
  await fs.writeFile(filePath, content);
};

/**
 * writeFileInString записывает данные в файл.
 *
 * @async
 * @param {string} filePath - путь до файла включая название файла
 * @param {object} data - объект, который должен быть записан в файл.
 *
 * @example
 * const {writeFile} = require('./utils);
 * await writeFile('test.txt', 'This is test string');
 */

const writeFile = async (filePath, data) => {
  await fs.writeFile(filePath, data);
};

/**
 * Читает файл и отдает отфильтрованный массив без пустых элементов и лишних пробелов.
 *
 * @param {string} filePath - абсолютный путь до файла
 * @param {string} encoding - кодировка, по умолчанию utf8
 * @return {Promise.<Array>} - возвращает Promise со информацией.
 */
const readFileToArray = async (filePath, encoding = `utf8`) => {
  const data = await fs.readFile(filePath, encoding);
  return data.split(`\n`).map((it) => it.trim()).filter((it) => it.length !== 0);
};

/**
 * Читает файл, c JSON информацией и возвращает прочитанный объект.
 *
 * @param {string} filePath - абсолютный путь до файла
 * @param {string} encoding - кодировка, по умолчанию utf8
 * @return {Promise.<Object>} - объект со информацией.
 */
const readFileInJSON = async (filePath, encoding = `utf8`) => {
  const data = await fs.readFile(filePath, encoding);
  return JSON.parse(data);
};

/**
 * Возвращает случайную Date в прошлом
 *
 * @param {Number} max - максимальный интервал в прошлом в миллисекундах
 * @return {Date} - случайная Date
 */
const getRandomDateInPast = (max) => {
  return new Date(Date.now() - getRandomNumber(0, max));
};

const parseLimitAndOffset = (limit, offset) => {
  let limitCount = Number.parseInt(limit, 10);
  let offsetCount = Number.parseInt(offset, 10);
  if (isNaN(limitCount) || limitCount <= 0 || limitCount > MAX_OFFERS_QUERY) {
    limitCount = MAX_OFFERS_QUERY;
  }
  if (isNaN(offsetCount) || offsetCount < 0) {
    offsetCount = 0;
  }
  return {limitCount, offsetCount};
};

const getNextAndPrevUrl = (req, totalCount, limitCount, offsetCount, isWithComments) => {
  const totalPages = Math.ceil(totalCount / limitCount);
  const currentPage = Math.ceil((offsetCount / limitCount) + 1);

  let nextPage = null;
  let previousPage = null;

  const baseUrl = (req.protocol + `://` + req.get(`host`) + req.originalUrl.split(`/?`)[0]);

  if (currentPage < totalPages) {
    nextPage = `${baseUrl}/?limit=${limitCount}&offset=${offsetCount + limitCount}&isWithComments=${!!isWithComments}`;
  }

  if (currentPage > 1) {
    previousPage = `${baseUrl}/?limit=${limitCount}&offset=${offsetCount - limitCount}&isWithComments=${!!isWithComments}`;
  }

  return {nextPage, previousPage};
};


module.exports = {
  getRandomNumber,
  getRandomItemInArray,
  getRandomItemsInArray,
  writeFileInJSON,
  writeFile,
  readFileToArray,
  readFileInJSON,
  getRandomDateInPast,
  parseLimitAndOffset,
  getNextAndPrevUrl
};
