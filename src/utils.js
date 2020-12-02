'use strict';

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

module.exports = {
  getRandomNumber,
  getRandomItemInArray,
  getRandomItemsInArray
};
