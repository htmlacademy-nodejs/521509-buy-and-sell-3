'use strict';

/**
 * Роутер для личного кабинета. ('/my')
 *
 * @module /src/express/routes/my-routes
 */

const {Router} = require(`express`);

const privatPages = require(`../middlewares/privatPages`);

const API = require(`../api`);

const myRoutes = new Router();
const api = API.getDefaultAPI();

myRoutes.get(`/`, [privatPages()], async (req, res) => {
  const {offers} = await api.getOffers({isOnlyUser: true, accessToken: res.locals.accessToken});
  res.render(`pages/my/my-tickets`, {allOffers: offers, user: res.locals.user});
});
myRoutes.get(`/comments`, [privatPages()], async (req, res) => {
  const {offers} = await api.getOffers({isWithComments: true, accessToken: res.locals.accessToken});
  res.render(`pages/my/comments`, {allOffers: offers.slice(0, 3), user: res.locals.user});
});

module.exports = myRoutes;
