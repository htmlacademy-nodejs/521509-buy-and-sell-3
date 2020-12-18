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
const {nanoid} = require(`nanoid`);

const {
  getRandomNumber,
  getRandomItemInArray,
  getRandomItemsInArray,
  writeFileInJSON,
  readFileToArray} = require(`../../utils`);
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
 * Длина генерируемых id по умолчанию.
 * @const
 * @type {number}
 * @default 5
 */
const MAX_ID_LENGTH = 5;

/**
 * Максимальное число комментариев
 * @const
 * @type {number}
 * @default 15
 */
const MAX_COMMENTS_COUNT = 15;

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

/**
 * Путь к файлу с категориями относительно корневого каталога
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_CATEGORIES = `data/categories.txt`;

/**
 * Путь к файлу с заголовками предложений относительно корневого каталога
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_OFFER_TITLES = `data/offer-titles.txt`;

/**
 * Путь к файлу с заголовками продаж относительно корневого каталога
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_SALE_TITLES = `data/sale-titles.txt`;

/**
 * Путь к файлу с текстом для объявлений относительно корневого каталога
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_SENTENCES = `data/sentences.txt`;

/**
 * Путь к файлу с текстом комментариев относительно корневого каталога
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_COMMENTS_SENTENCES = `data/comments.txt`;


const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};


const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};


const generateComment = (commentsSentences) => {
  return {
    id: nanoid(MAX_ID_LENGTH),
    text: getRandomItemsInArray(commentsSentences).join(``)
  };
};


/**
 * generateOffer - генерирует случайное объявление согласно заданию:
 * Каждое объявление представлено в виде объекта с полями:
 *
 * @param {[string]} categories - массив категорий
 * @param {[string]} offerTitles - массив заголовков предложений
 * @param {[string]} saleTitles - массив заголовков продаж
 * @param {[string]} sentences - массив текстовых предложений для объявления
 * @param {[string]} commentsSentences - массив текстовых предложений для комментариев
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
 *  "id": "sadAd",
 *  "type": "offer",
 *  "title": "Продам новую приставку Sony Playstation 5",
 *  "description": "Если товар не понравится — верну всё до последней копейки. Пользовались бережно и только по большим праздникам. Продаю с болью в сердце... Товар в отличном состоянии.",
 *  "sum": 94992,
 *  "picture": "item01.jpg",
 *  "category": ["Игры", "Разное"],
 *  }]
 */

const generateOffer = (categories, offerTitles, saleTitles, sentences, commentsSentences) => {
  const type = Math.random() > 0.5 ? OfferType.OFFER : OfferType.SALE;
  return {
    type,
    id: nanoid(MAX_ID_LENGTH),
    title: (type === OfferType.OFFER) ? getRandomItemInArray(offerTitles) : getRandomItemInArray(saleTitles),
    picture: `item${getRandomNumber(1, 16)}.jpg`,
    description: getRandomItemsInArray(sentences).join(` `),
    sum: getRandomNumber(SumRestrict.MIN, SumRestrict.MAX),
    category: getRandomItemsInArray(categories),
    comments: Array(getRandomNumber(0, MAX_COMMENTS_COUNT)).fill({}).map(() => generateComment(commentsSentences))
  };
};


/**
 *  generateOffers - генерирует count число объявлений с помощью функции generateOffer()
 *
 * @param {Number} count - число объявлений, которые нужно сгенерировать
 * @param {[string]} categories - массив категорий
 * @param {[string]} offerTitles - массив заголовков предложений
 * @param {[string]} saleTitles - массив заголовков продаж
 * @param {[string]} sentences - массив текстовых предложений для объявления
 * @param {[string]} commentsSentences - массив текстовых предложений для комментариев
 * @return {Array} - возвращает массив созданных объявлений
 */
const generateOffers = (count, categories, offerTitles, saleTitles, sentences, commentsSentences) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(generateOffer(categories, offerTitles, saleTitles, sentences, commentsSentences));
  }
  return result;
};


/**
 * Читает данные из файлов, превращая пути в абсолютные и переопределяет ошибку, если что-то пошло не так.
 *
 * @param {string} filePath - принимает относительный путь (относительно корня проекта)
 * @return {Promise<Array|*[]>} - возвращает promise с массивом
 */
const readDataForGeneration = async (filePath) => {
  try {
    const absolutePath = path.join(__dirname, PATH_TO_ROOT_FOLDER, filePath);
    const contentArray = await readFileToArray(absolutePath);
    return contentArray;
  } catch (error) {
    throw new Error(`Не удалось прочитать файл ${filePath}: ${error.message}`);
  }
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

    let categories; let offerTitles; let saleTitles; let sentences; let commentsSentences;

    try {
      [categories, offerTitles, saleTitles, sentences, commentsSentences] = await Promise.all([
        readDataForGeneration(PATH_TO_CATEGORIES),
        readDataForGeneration(PATH_TO_OFFER_TITLES),
        readDataForGeneration(PATH_TO_SALE_TITLES),
        readDataForGeneration(PATH_TO_SENTENCES),
        readDataForGeneration(PATH_TO_COMMENTS_SENTENCES)
      ]);
      const absoluteFilePath = path.join(__dirname, PATH_TO_ROOT_FOLDER, FILE_NAME);
      await writeFileInJSON(absoluteFilePath, generateOffers(countNumber, categories, offerTitles, saleTitles, sentences, commentsSentences));
      console.info(chalk.green(`Сгенерировано ${countNumber} объявлений и успешно записаны в файл ${FILE_NAME}.\nАбсолютный путь до файла: ${absoluteFilePath}`));
    } catch (error) {
      console.error(chalk.red(`Ошибка: ${error.message}`));
      process.exit(ExitCodes.FAIL);
    }

  }
};
