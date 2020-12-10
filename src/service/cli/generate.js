'use strict';

/**
 * Этот модуль генерирует данные для моков.
 * Если не было указано количество объявлений - то количество статей генерируется по умолчанию.
 *
 * Моки сохраняются в указанный файл в корневой директории  в указанной константе FILE_NAME.
 *
 * Данные для генерации взяты из задания.
 *
 *  @module src/service/cli/generate
*/

const path = require(`path`);

const chalk = require(`chalk`);

const {getRandomNumber, getRandomItemInArray, getRandomItemsInArray, writeFileInJSON} = require(`../../utils`);
const {ExitCodes} = require(`../../consts`);

/**
 * Число объявлений по умолчанию
 * @const
 * @type {number}
 * @default
 */
const DEFAULT_COUNT = 1;

/**
 * Максимальное число генерируемых объявлений
 * @const
 * @type {number}
 * @default
 */
const MAX_COUNT = 1000;

/**
 * Название файла для записи результата
 * @const
 * @type {string}
 * @default
 */
const FILE_NAME = `mocks.json`;

/**
 * Относительный путь к месту сохранения файла
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_ROOT_FOLDER = `../../../`;

const SALE_TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Продам коллекцию журналов «Огонёк»`,
  `Отдам в хорошие руки подшивку «Мурзилка»`,
  `Продам советскую посуду. Почти не разбита`
];

const OFFER_TITLES = [
  `Куплю антиквариат`,
  `Куплю породистого кота`,
  `Куплю детские санки`
];

const SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `Две страницы заляпаны свежим кофе.`,
  `При покупке с меня бесплатная доставка в черте города.`,
  `Кажется, что это хрупкая вещь.`,
  `Мой дед не мог её сломать.`,
  `Кому нужен этот новый телефон, если тут такое...`,
  `Не пытайтесь торговаться. Цену вещам я знаю.`
];

const CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};


const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};


/**
 * generateOffer - генерирует случайное объявление согласно заданию:
 * Каждое объявление представлено в виде объекта с полями:
 *
 * @return {Object} - Возвращает сгенерированное объявление
 * title. Строка. Заголовок объявления;
 * picture. Строка. Имя файла с изображением. Для имени используйте itemXX.jpg, где XX значение от 01 до 16;
 * description. Строка. Краткое описание объявления;
 * type. Строка. Тип объявления. Доступно два варианта: offer и sale;
 * sum. Число. Стоимость товара для объявления.
 * category. Массив категорий к которым относится объявление. Доступные варианты имён категорий доступны ниже. Одно объявление может относится к нескольким категориям.
 *
 * Пример:
 * [{
 *  "type": "offer",
 *  "title": "Продам новую приставку Sony Playstation 5",
 *  "description": "Если товар не понравится — верну всё до последней копейки. Пользовались бережно и только по большим праздникам. Продаю с болью в сердце... Товар в отличном состоянии.",
 *  "sum": 94992,
 *  "picture": "item01.jpg",
 *  "category": ["Игры", "Разное"],
 *  }]
 */

const generateOffer = () => {
  const type = Math.random() > 0.5 ? OfferType.OFFER : OfferType.SALE;
  return {
    type,
    title: (type === OfferType.OFFER) ? getRandomItemInArray(OFFER_TITLES) : getRandomItemInArray(SALE_TITLES),
    picture: `item${getRandomNumber(1, 16)}.jpg`,
    description: getRandomItemsInArray(SENTENCES).join(` `),
    sum: getRandomNumber(SumRestrict.MIN, SumRestrict.MAX),
    category: getRandomItemsInArray(CATEGORIES)
  };
};


/**
 * generateOffers - генерирует count число объявлений с помощью функции generateOffer()
 *
 * @param {Number} count - число объявлений, которые нужно сгенерировать
 * @return {Array} - возвращает массив созданных объявлений
 */
const generateOffers = (count) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(generateOffer());
  }
  return result;
};

module.exports = {
  name: `--generate`,

  /**
   * Метод run запускает генерацию объявлений и записывает их в указанный файл
   *
   * @param {Array} args - массив оставшихся аргументов, которые пользователь указал при запуске программы
   */

  async run(args) {
    const [count] = args;
    const countNumber = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countNumber > MAX_COUNT) {
      console.error(chalk.red(
          `Указано число объявлений больше ${MAX_COUNT}. \nУкажи не больше ${MAX_COUNT} объявлений`
      ));
      return;
    }

    try {
      const absoluteFilePath = path.join(__dirname, PATH_TO_ROOT_FOLDER, FILE_NAME);
      await writeFileInJSON(absoluteFilePath, generateOffers(countNumber));
      console.info(chalk.green(`Сгенерировано ${countNumber} объявлений и успешно записаны в файл ${FILE_NAME}.\nАбсолютный путь до файла: ${absoluteFilePath}`));
    } catch (e) {
      console.error(chalk.red(`Ошибка записи в файл ${FILE_NAME} ${e}`));
      process.exit(ExitCodes.FAIL);
    }

  }
};
