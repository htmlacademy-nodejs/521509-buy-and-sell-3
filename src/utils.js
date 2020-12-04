'use strict';

const fs = require(`fs`).promises;
const {EXIT_CODES} = require(`./consts`);

/*
 Этот модуль содержит вспомогательные функции.
 */

/*
   getRandomNumber генерирует случайное число в пределах переданных функции.
   От min - минимального числа до max - максимально возможного числа.
  */
const getRandomNumber = (min = 0, max = 100) => {
  return Math.floor(Math.random() * max + min);
};

/*
    getRandomItemInArray возвращает случайный элемент массива
*/
const getRandomItemInArray = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

/*
    shuffleArray рандомно тасует элементы массива
*/
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [array[i], array[randomPosition]] = [array[randomPosition], array[i]];
  }

  return array;
};

/*
  getRandomItemsInArray возвращает массив со несколькими случайными элементами массива.
*/
const getRandomItemsInArray = (array) => {
  return shuffleArray(array).slice(0, getRandomNumber(1, array.length - 1));
};


/**
 * writeFile записывает данные в файл, и в случае ошибки завершает программу.
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
  const content = JSON.stringify(data);

  try {
    await fs.writeFile(filePath, content);
  } catch (e) {
    console.error(`Ошибка записи в файл ${filePath} ${e}`);
    return process.exit(EXIT_CODES.FAIL);
  }

  return true; // eslint обязывает что-то вернуть в стрелочных функциях
};


module.exports = {
  getRandomNumber,
  getRandomItemInArray,
  getRandomItemsInArray,
  writeFile
};
