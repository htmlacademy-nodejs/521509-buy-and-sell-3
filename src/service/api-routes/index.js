'use strict';

/**
 * Роутер для API. Подключает дочерние роутеры и передает им сервисы для работы с данными.
 */

const {Router} = require(`express`);

const {
  CategoryService,
  OfferService,
  CommentService,
  SearchService,
  OfferTypeService,
  UserService
} = require(`../data-service`);

const categoryRouter = require(`./category`);
const offerRouter = require(`./offer`);
const searchRouter = require(`./search`);
const offerTypeRouter = require(`./offer_type`);
const userRouter = require(`./user`);
const authRouter = require(`./auth`);

const {getSequelize} = require(`../lib/sequelize`);
const defineModels = require(`../models`);


const getAPIRouter = async () => {
  const app = new Router();

  const sequelize = getSequelize();
  defineModels(sequelize);

  app.use(`/category`, categoryRouter(new CategoryService(sequelize)));
  app.use(`/offers`, offerRouter(new OfferService(sequelize), new CommentService(sequelize)));
  app.use(`/search`, searchRouter(new SearchService(sequelize)));
  app.use(`/offer-types`, offerTypeRouter(new OfferTypeService(sequelize)));
  app.use(`/user`, userRouter(new UserService(sequelize)));
  app.use(`/auth`, authRouter(new UserService(sequelize)));
  return app;
};


module.exports = {getAPIRouter};
