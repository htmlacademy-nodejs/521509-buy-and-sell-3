'use strict';

/**
 * Роутер для корневого пути. ('/')
 *
 * @module /src/express/routes/main-routes
 */

const {Router} = require(`express`);
const API = require(`../api`);

const mainRoutes = new Router();
const api = API.getDefaultAPI();


mainRoutes.get(`/`, async (req, res) => {
  // pug 3.0.0 имеет баг с переменными, которые начинаются с `of`. https://github.com/pugjs/pug/issues/3263/ Переменную offer использовать нельзя
  const adverts = await api.getOffers();
  res.render(`pages/main`, {adverts});
});
mainRoutes.get(`/register`, (req, res) => res.render(`pages/register`));
mainRoutes.get(`/login`, (req, res) => res.render(`pages/login`));
mainRoutes.get(`/search`, (req, res) => res.render(`pages/search`));

module.exports = mainRoutes;
