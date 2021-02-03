'use strict';

const defineModels = require(`../models`);
const {getLogger} = require(`../lib/logger`);


module.exports = async (sequelize, {offerTypes, categories, offers, comments, offersCategories}) => {
  const logger = getLogger({name: `init-db`});

  logger.info(`Creating tables...`);
  const {OfferType, Category, /* User, */Offer, Comment, OfferCategory} = defineModels(sequelize);
  await sequelize.sync({force: true});
  logger.info(`New tables have been created.`);

  logger.info(`Inserting ${offerTypes.length} offer's types.`);
  await OfferType.bulkCreate(offerTypes);
  logger.info(`Offer's types have been inserted.`);

  logger.info(`Inserting ${categories.length} categories.`);
  await Category.bulkCreate(categories);
  logger.info(`Categories have been inserted.`);

  // Временно отключаем
  // logger.info(`Добавляем ${users.length} пользователей.`);
  // await User.bulkCreate(users);
  // logger.info(`Пользователи добавлены.`);

  logger.info(`Inserting ${offers.length} offers.`);
  await Offer.bulkCreate(offers);
  logger.info(`Offers have been inserted.`);

  logger.info(`Inserting ${comments.length} comments.`);
  await Comment.bulkCreate(comments);
  logger.info(`Comments have been inserted.`);

  logger.info(`Inserting ${offersCategories.length} connections offers-categories.`);
  await OfferCategory.bulkCreate(offersCategories);
  logger.info(`Connections offers-categories have been inserted.`);
};
