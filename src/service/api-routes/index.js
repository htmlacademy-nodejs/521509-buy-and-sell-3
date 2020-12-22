'use strict';

/**
 * Роутер для API. Подключает дочерние роутеры и передает им сервисы для работы с данными.
 * Временно читает данные из моков.
 */

const {Router} = require(`express`);

const {
  CategoryService,
  OfferService,
  CommentService,
  SearchService
} = require(`../data-service`);

const categoryRouter = require(`./category`);
const offerRouter = require(`./offer`);
const searchRouter = require(`./search`);

const {getMockData} = require(`../lib/get-mock-data`);


const app = new Router();

(async () => {
  const mockData = await getMockData();

  app.use(`/category`, categoryRouter(new CategoryService(mockData)));
  app.use(`/offers`, offerRouter(new OfferService(mockData), new CommentService()));
  app.use(`/search`, searchRouter(new SearchService(mockData)));
})();


module.exports = app;
