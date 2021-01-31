'use strict';

const defineModels = require(`../models`);
const {getLogger} = require(`../lib/logger`);


module.exports = async (sequelize, {offerTypes, categories, offers, comments, offersCategories}) => {
  const logger = getLogger({name: `init-db`});

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
};
