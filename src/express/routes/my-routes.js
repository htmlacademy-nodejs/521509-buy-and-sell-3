'use strict';

/**
 * Роутер для личного кабинета. ('/my')
 *
 * @module /src/express/routes/my-routes
 */

const {Router} = require(`express`);

const API = require(`../api`);

const myRoutes = new Router();
const api = API.getDefaultAPI();

myRoutes.get(`/`, async (req, res) => {
  // pug 3.0.0 имеет баг с переменными, которые начинаются с `of`. https://github.com/pugjs/pug/issues/3263/ Переменную offer использовать нельзя
  const adverts = await api.getOffers();
  res.render(`pages/my/my-tickets`, {adverts});
});
myRoutes.get(`/comments`, async (req, res) => {
  const adverts = await api.getOffers();
  res.render(`pages/my/comments`, {adverts: adverts.slice(0, 3)});
});

module.exports = myRoutes;
