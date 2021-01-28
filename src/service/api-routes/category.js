'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../consts`);


module.exports = (categoryService) => {
  const router = new Router();

  router.get(`/`, async (req, res) => {
    const {isWithCount} = req.query;

    const categories = await categoryService.getAll(isWithCount);
    res.status(HttpCode.OK).json(categories);
  });

  return router;
};
