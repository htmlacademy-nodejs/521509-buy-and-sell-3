'use strict';

/**
 * Роутер для объявлений. ('/offers')
 *
 * @module /src/express/routes/offers-routes
 */

const {Router} = require(`express`);

const offersRoutes = new Router();

offersRoutes.get(`/:id`, (req, res) => res.send(`/offers/${req.params.id}`));
offersRoutes.get(`/add`, (req, res) => res.send(`/offers/add`));
offersRoutes.get(`/edit/:id`, (req, res) => res.send(`/offers/edit/${req.params.id}`));

offersRoutes.get(`/category/:id`, (req, res) => res.render(`pages/offers/category`));


module.exports = offersRoutes;
