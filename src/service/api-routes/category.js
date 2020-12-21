'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../consts`);

const router = new Router();

module.exports = (app, service) => {
  app.use(`/category`, router);

  router.get(`/`, (req, res) => {
    const categories = service.getAll();
    res.status(HttpCode.OK).json(categories);
  });
};
