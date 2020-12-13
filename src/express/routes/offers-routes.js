'use strict';

/**
 * Роутер для объявлений. ('/offers')
 *
 * @module /src/express/routes/offers-routes
 */

const {Router} = require(`express`);

const offersRoutes = new Router();


offersRoutes.get(`/add`, (req, res) => res.render(`pages/offers/new-ticket`));
offersRoutes.get(`/:id`, (req, res) => res.render(`pages/offers/ticket`));
offersRoutes.get(`/edit/:id`, (req, res) => res.render(`pages/offers/ticket-edit`));

offersRoutes.get(`/category/:id`, (req, res) => res.render(`pages/offers/category`));

module.exports = offersRoutes;
