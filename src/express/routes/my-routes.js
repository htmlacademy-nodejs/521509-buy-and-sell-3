'use strict';

/**
 * Роутер для личного кабинета. ('/my')
 *
 * @module /src/express/routes/my-routes
 */

const {Router} = require(`express`);

const myRoutes = new Router();

myRoutes.get(`/`, (req, res) => res.render(`pages/my/my-tickets`));
myRoutes.get(`/comments`, (req, res) => res.render(`pages/my/comments`));

module.exports = myRoutes;
