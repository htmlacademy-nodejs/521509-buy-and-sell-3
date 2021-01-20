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
  const allOffers = await api.getOffers();
  res.render(`pages/my/my-tickets`, {allOffers});
});
myRoutes.get(`/comments`, async (req, res) => {
  const allOffers = await api.getOffers({isWithComments: true});
  res.render(`pages/my/comments`, {allOffers: allOffers.slice(0, 3)});
});

module.exports = myRoutes;
