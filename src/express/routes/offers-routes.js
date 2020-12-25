'use strict';

/**
 * Роутер для объявлений. ('/offers')
 *
 * @module /src/express/routes/offers-routes
 */

const {Router} = require(`express`);

const API = require(`../api`);

const offersRoutes = new Router();

const api = API.getDefaultAPI();

offersRoutes.get(`/add`, (req, res) => res.render(`pages/offers/new-ticket`));
offersRoutes.get(`/:id`, (req, res) => res.render(`pages/offers/ticket`));
offersRoutes.get(`/edit/:id`, async (req, res) => {
  const [advert, categories] = await Promise.all([api.getOffer(req.params.id), api.getCategories()]);
  res.render(`pages/offers/ticket-edit`, {advert, categories});
});

offersRoutes.get(`/category/:id`, (req, res) => res.render(`pages/offers/category`));

module.exports = offersRoutes;
