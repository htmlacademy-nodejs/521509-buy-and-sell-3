'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../consts`);


module.exports = (app, categoryService) => {
  const router = new Router();

  router.get(`/`, (req, res) => {
    const categories = categoryService.getAll();
    res.status(HttpCode.OK).json(categories);
  });

  return router;
};
