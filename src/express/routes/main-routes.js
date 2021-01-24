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
  const [allOffers, categories] = await Promise.all([api.getOffers(), api.getCategories({isWithCount: true})]);
  res.render(`pages/main`, {allOffers, categories});
});
mainRoutes.get(`/register`, (req, res) => res.render(`pages/register`));
mainRoutes.get(`/login`, (req, res) => res.render(`pages/login`));
mainRoutes.get(`/search`, async (req, res) => {
  const searchText = req.query.query;
  let result;
  try {
    result = await api.search(searchText);
  } catch (err) {
    result = [];
  }
  res.render(`pages/search`, {result});
});

module.exports = mainRoutes;
