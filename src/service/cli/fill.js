'use strict';

/**
 * Этот модуль генерирует данные для наполнения базы данных.
 * Если не было указано количество объявлений - то количество статей генерируется по умолчанию.
 *
 * Запросы SQL сохраняются в указанный файл в корневой директории в указанной константе FILE_NAME.
 *
 *  @module src/service/cli/fill
 */

const path = require(`path`);

const chalk = require(`chalk`);

const {
  getRandomNumber,
  getRandomItemInArray,
  getRandomItemsInArray,
  readFileToArray,
  getRandomDateInPast,
  writeFile
} = require(`../../utils`);
const {ExitCodes} = require(`../../consts`);


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
 * Название файла для записи результата
 * @const
 * @type {string}
 * @default
 */
const FILE_NAME = `fill-db.sql`;


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
const OfferType = {
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


/**
 * Возвращает строку с SQL запросом для добавления типов объявлений
 *
 * @return {string}
 */
const fillOfferTypes = () => {
  return (
    `INSERT INTO offers_types (id, title)
     VALUES
      (1, '${OfferType.OFFER}'),
      (2, '${OfferType.SALE}');`
  );
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
      id: index + 1,
      title: it
    };
  });
};


/**
 * Возвращает строку с SQL запросом для добавления категорий
 *
 * @param {Object[]} categories - объекты категорий
 * @return {string}
 */
const fillCategories = (categories) => {
  const values = categories.map((it) => `(${it.id}, '${it.title}')`).join(`, \n`);
  return (
    `INSERT INTO categories (id, title)
      VALUES
        ${values};`
  );
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
      'id': index + 1,
      'firstname': getRandomItemInArray(firstNames),
      'lastname': getRandomItemInArray(lastNames),
      'email': randomEmails[index],
      'avatar_url': `avatar${(`0` + getRandomNumber(1, 4)).slice(-2)}.jpg`
    };
  });
};


/**
 *  Возвращает строку с SQL запросом для добавления пользователей
 *
 * @param {{firstname: String, avatar_url: string, id: Number, email: String, lastname: String}[]} users - массив пользователей
 * @return {string}
 */
const fillUsers = (users) => {
  const values = users.map((it) => `(${it.id}, '${it[`avatar_url`]}', '${it.firstname}', '${it.lastname}', '${it.email}')`).join(`, \n`);
  return (
    `INSERT INTO users (id, avatar_url, first_name, last_name, email)
      VALUES
        ${values};`
  );
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
        'creation_date': getRandomDateInPast(MAX_PAST),
        'offer_id': offer.id,
        'user_id': getRandomItemInArray(users).id
      };
    }));
  });
  return result;
};


/**
 * Возвращает строку с SQL запросом для добавления комментариев
 *
 * @param {Object[]} comments - комментарии
 * @return {string}
 */
const fillComments = (comments) => {
  const values = comments.map((it) => `('${it.text}', '${it[`creation_date`].toISOString()}', ${it[`offer_id`]}, ${it[`user_id`]})`).join(`, \n`);
  return (
    `INSERT INTO comments (text, creation_date, offer_id, user_id)
      VALUES
        ${values};`
  );
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
const generateOffers = (count, saleTitles, sentences, users) => {
  return Array(count).fill({}).map((it, index) => {
    return {
      'id': index + 1,
      'type_id': getRandomNumber(1, 2),
      'user_id': getRandomItemInArray(users).id,
      'title': getRandomItemInArray(saleTitles),
      'description': getRandomItemsInArray(sentences).join(` `),
      'creation_date': getRandomDateInPast(MAX_PAST),
      'image_url': `item${(`0` + getRandomNumber(1, 16)).slice(-2)}.jpg`,
      'cost': getRandomNumber(SumRestrict.MIN, SumRestrict.MAX),
    };
  });
};


/**
 * Возвращает строку с SQL запросом для добавления объявлений
 *
 * @param {Object[]} offers - объявления
 * @return {string}
 */
const fillOffers = (offers) => {
  const values = offers.map((it) => `(${it.id}, ${it[`type_id`]}, ${it[`user_id`]}, '${it.title}', '${it.description}', '${it[`creation_date`].toISOString()}', '${it[`image_url`]}', ${it.cost})`).join(`, \n`);
  return (
    `INSERT INTO offers (id, type_id, user_id, title, description, creation_date, image_url, cost)
      VALUES
        ${values};`
  );
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
      'offer_id': offer.id,
      'category_id': category.id
    }));
  });
  return result;
};


/**
 * Возвращает строку с SQL запросом для добавления связей объявлений и категорий
 *
 * @param {Object[]} offersCategories
 * @return {string}
 */
const fillOffersCategories = (offersCategories) => {
  const values = offersCategories.map((it) => `(${it[`offer_id`]}, ${it[`category_id`]})`).join(`, \n`);
  return (
    `INSERT INTO offers_categories (offer_id, category_id)
      VALUES
        ${values};`
  );
};


/**
 * Генерация итогового SQL запроса
 *
 * @param {Object[]} categories - категории
 * @param {Object[]} users - пользователи
 * @param {Object[]} offers - объявления
 * @param {Object[]} comments - комментарии
 * @param {Object[]} offersCategories - связи объявлений и категорий
 * @return {string} - SQL запрос
 */
const generateFullSql = (categories, users, offers, comments, offersCategories) => {
  return (
    `TRUNCATE offers_categories, comments, offers, users, offers_types, categories;

  -- Добавляем типы объявлений
  ${fillOfferTypes()}

  -- Добавляем категории
  ${fillCategories(categories)}

  -- Добавляем пользователей
  ${fillUsers(users)}

  -- Добавляем объявления
  ${fillOffers(offers)}

  -- Добавляем комментарии
  ${fillComments(comments)}

  -- добавляем связи категории - объявления
  ${fillOffersCategories(offersCategories)}`
  );
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
  name: `--fill`,

  /**
   * Метод run запускает генерацию объявлений и записывает их в указанный файл
   *
   * @param {Array} args - массив оставшихся аргументов, которые пользователь указал при запуске программы
   */

  async run(args) {
    const [count] = args;
    const countNumber = Number.parseInt(count, 10) || DEFAULT_OFFERS_COUNT;
    if (countNumber > MAX_COUNT) {
      console.error(chalk.red(
          `Указано число объявлений больше ${MAX_COUNT}. \nУкажи не больше ${MAX_COUNT} объявлений`
      ));
      return;
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
      const absoluteFilePath = path.join(__dirname, PATH_TO_ROOT_FOLDER, FILE_NAME);

      const categories = generateCategories(categoriesTitles);
      const users = generateUsers(DEFAULT_USERS_COUNT, firstnames, lastnames, emails);
      const offers = generateOffers(countNumber, saleTitles, sentences, users);
      const comments = generateComments(offers, users, commentsSentences);
      const offersCategories = generateOffersCategories(offers, categories);

      await writeFile(absoluteFilePath, generateFullSql(categories, users, offers, comments, offersCategories));
      console.info(chalk.green(`Сгенерировано ${countNumber} объявлений и успешно записаны в файл ${FILE_NAME}.\nАбсолютный путь до файла: ${absoluteFilePath}`));
    } catch (error) {
      console.error(chalk.red(`Ошибка: ${error.message}`));
      process.exit(ExitCodes.FAIL);
    }

  }
};
