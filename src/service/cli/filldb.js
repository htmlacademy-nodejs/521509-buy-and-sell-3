'use strict';

/**
 * Этот модуль генерирует данные для наполнения базы данных.
 * Если не было указано количество объявлений - то количество статей генерируется по умолчанию.
 *
 * База наполняется через sequelize
 *
 *  @module src/service/cli/filldb
 */

const path = require(`path`);

const {getLogger} = require(`../lib/logger`);

const {
  getRandomNumber,
  getRandomItemInArray,
  getRandomItemsInArray,
  readFileToArray,
  getRandomDateInPast
} = require(`../../utils`);
const {ExitCodes} = require(`../../consts`);

const {getSequelize} = require(`../lib/sequelize`);
const defineModels = require(`../models`);

/**
 * Число объявлений по умолчанию
 * @const
 * @type {number}
 * @default 10
 */
const DEFAULT_OFFERS_COUNT = 10;


/**
 * Число пользователей по умолчанию
 * @const
 * @type {number}
 * @default 5
 */
const DEFAULT_USERS_COUNT = 5;


/**
 * Максимальное число генерируемых объявлений
 * @const
 * @type {number}
 * @default 1000
 */
const MAX_COUNT = 1000;


/**
 * Максимальный интервал в прошлом в миллисекундах
 * @const
 * @type {Number}
 * @default 90 дней ~ 3 месяца
 */
const MAX_PAST = 3 * 30 * 24 * 60 * 60 * 1000;


/**
 * Максимальное число комментариев
 * @const
 * @type {number}
 * @default 5
 */
const MAX_COMMENTS_COUNT = 5;

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


/**
 * Путь к файлу с именами пользователей относительно корневого каталога
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_FIRSTNAMES = `data/user-first-names.txt`;


/**
 * Путь к файлу с фамилиями пользователей относительно корневого каталога
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_LASTNAMES = `data/user-last-names.txt`;


/**
 * Путь к файлу с e-mails пользователей относительно корневого каталога
 * @const
 * @type {string}
 * @default
 */
const PATH_TO_EMAILS = `data/user-emails.txt`;


/**
 * Словарь с возможными типами объявлений
 *
 * @type {{SALE: string, OFFER: string}}
 */
const OfferTypes = {
  OFFER: `offer`,
  SALE: `sale`,
};


/**
 * Словарь для определения минимальной и максимальной суммы объявления
 *
 * @type {{MIN: number, MAX: number}}
 */
const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const generateOfferTypes = () => {
  return [{_id: 1, title: OfferTypes.OFFER}, {_id: 2, title: OfferTypes.SALE}];
};


/**
 * Генерирует объекты категории на основе заголовков категорий.
 *
 * @param {String[]} categoriesTitles - заголовки категорий
 * @return {Object}
 */
const generateCategories = (categoriesTitles) => {
  return categoriesTitles.map((it, index) => {
    return {
      _id: index + 1,
      title: it
    };
  });
};

/**
 * Генерирует пользователей
 *
 * @param {Number} count - число пользователей
 * @param {String[]} firstNames - массив имён
 * @param {String[]} lastNames - массив фамилий
 * @param {String[]} emails - массив e-mail
 * @return {{firstname: String, avatar_url: string, id: Number, email: String, lastname: String}[]} - возвращает массив пользователей
 */
const generateUsers = (count, firstNames, lastNames, emails) => {
  const randomEmails = getRandomItemsInArray(emails, count);
  return Array(count).fill({}).map((it, index) => {
    return {
      '_id': index + 1,
      'first_name': getRandomItemInArray(firstNames),
      'last_name': getRandomItemInArray(lastNames),
      'email': randomEmails[index],
      'avatar_url': `avatar${(`0` + getRandomNumber(1, 4)).slice(-2)}.jpg`
    };
  });
};


/**
 * Генерирует комментарии для каждого объявления
 *
 * @param {Object[]} offers - объявления
 * @param {Object[]} users - пользователи
 * @param {String[]} commentsSentences - массив строк предложений
 * @return {Object[]} - возвращает комментарии
 */
const generateComments = (offers, users, commentsSentences) => {
  const result = [];
  offers.forEach((offer) => {
    result.push(...Array(MAX_COMMENTS_COUNT).fill({}).map(() => {
      return {
        'text': getRandomItemsInArray(commentsSentences).join(``),
        'created_at': getRandomDateInPast(MAX_PAST),
        'offer_id': offer._id,
        // 'user_id': getRandomItemInArray(users).id
      };
    }));
  });
  return result;
};


/**
 * Генерация объявлений
 *
 * @param {Number} count - число объявлений
 * @param {String[]} saleTitles - заголовки
 * @param {String[]} sentences - предложения для описания
 * @param {Object[]} users - пользователи
 * @return {{cost: number, user_id: *, type_id: number, image_url: string, description: string, id, creation_date: Date, title: *}[]}
 */
const generateOffers = (count, saleTitles, sentences /* ,users*/) => {
  return Array(count).fill({}).map((it, index) => {
    return {
      '_id': index + 1,
      'type_id': getRandomNumber(1, 2),
      // 'user_id': getRandomItemInArray(users).id,
      'title': getRandomItemInArray(saleTitles),
      'description': getRandomItemsInArray(sentences).join(` `),
      'created_at': getRandomDateInPast(MAX_PAST),
      'imageUrl': `item${(`0` + getRandomNumber(1, 16)).slice(-2)}.jpg`,
      'cost': getRandomNumber(SumRestrict.MIN, SumRestrict.MAX),
    };
  });
};

/**
 * Для каждого объявления генерируем рандомное количество категорий
 *
 * @param {Object[]} offers - объявления
 * @param {Object[]} categories - категории
 * @return {[]}
 */
const generateOffersCategories = (offers, categories) => {
  const result = [];
  offers.forEach((offer) => {
    const randomCategories = getRandomItemsInArray(categories);
    randomCategories.forEach((category) => result.push({
      'offer_id': offer._id,
      'category_id': category._id
    }));
  });
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
  name: `--filldb`,

  /**
   * Метод run запускает генерацию объявлений и записывает их в указанный файл
   *
   * @param {Array} args - массив оставшихся аргументов, которые пользователь указал при запуске программы
   */

  async run(args) {
    const logger = getLogger({name: `fill-db`});

    const [count] = args;
    const countNumber = Number.parseInt(count, 10) || DEFAULT_OFFERS_COUNT;
    if (countNumber > MAX_COUNT) {
      logger.error(
          `Указано число объявлений больше ${MAX_COUNT}. \nУкажи не больше ${MAX_COUNT} объявлений`
      );
      return;
    }

    const sequelize = getSequelize();

    try {
      logger.info(`Подключаемся к базе данных...`);
      await sequelize.authenticate();
      logger.info(`Соединение с базой данных успешно установлено.`);
    } catch (error) {
      logger.error(`Ошибка: ${error}`);
      process.exit(ExitCodes.FAIL);
    }

    let categoriesTitles; let saleTitles; let sentences; let commentsSentences;
    let firstnames; let lastnames; let emails;

    try {
      [categoriesTitles, saleTitles, sentences, commentsSentences, firstnames, lastnames, emails] = await Promise.all([
        readDataForGeneration(PATH_TO_CATEGORIES),
        readDataForGeneration(PATH_TO_SALE_TITLES),
        readDataForGeneration(PATH_TO_SENTENCES),
        readDataForGeneration(PATH_TO_COMMENTS_SENTENCES),
        readDataForGeneration(PATH_TO_FIRSTNAMES),
        readDataForGeneration(PATH_TO_LASTNAMES),
        readDataForGeneration(PATH_TO_EMAILS)
      ]);

      const offerTypes = generateOfferTypes();
      const categories = generateCategories(categoriesTitles);
      const users = generateUsers(DEFAULT_USERS_COUNT, firstnames, lastnames, emails);
      const offers = generateOffers(countNumber, saleTitles, sentences, users);
      const comments = generateComments(offers, users, commentsSentences);
      const offersCategories = generateOffersCategories(offers, categories);

      logger.info(`Создаём новые таблицы...`);
      const {OfferType, Category, /* User, */Offer, Comment, OfferCategory} = defineModels(sequelize);
      await sequelize.sync({force: true});
      logger.info(`Новые таблицы созданы.`);

      logger.info(`Добавляем ${offerTypes.length} типов объявлений.`);
      await OfferType.bulkCreate(offerTypes);
      logger.info(`Типы объявлений добавлены.`);

      logger.info(`Добавляем ${categories.length} категорий.`);
      await Category.bulkCreate(categories);
      logger.info(`Категории добавлены.`);

      // Временно отключаем
      // logger.info(`Добавляем ${users.length} пользователей.`);
      // await User.bulkCreate(users);
      // logger.info(`Пользователи добавлены.`);

      logger.info(`Добавляем ${offers.length} объявлений.`);
      await Offer.bulkCreate(offers);
      logger.info(`Объявления добавлены.`);

      logger.info(`Добавляем ${comments.length} комментарии.`);
      await Comment.bulkCreate(comments);
      logger.info(`Комментарии добавлены.`);

      logger.info(`Добавляем ${offersCategories.length} связей объявления-категории.`);
      await OfferCategory.bulkCreate(offersCategories);
      logger.info(`Связи объявления-категории добавлены.`);

      logger.info(`Сгенерировано ${countNumber} объявлений и успешно записаны в базу данных`);
      process.exit(ExitCodes.SUCCESS);
    } catch (error) {
      logger.error(`Ошибка: ${error.message}`);
      process.exit(ExitCodes.FAIL);
    }

  }
};
