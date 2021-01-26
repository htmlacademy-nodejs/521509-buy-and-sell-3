'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../consts`);
const {parseLimitAndOffset, getNextAndPrevUrl} = require(`../../utils`);


module.exports = (categoryService) => {
  const router = new Router();

  router.get(`/`, async (req, res) => {
    const {isWithCount} = req.query;

    const categories = await categoryService.getAll(isWithCount);
    res.status(HttpCode.OK).json(categories);
  });

  router.get(`/:id`, async (req, res) => {
    const id = req.params[`id`];
    const {limit, offset, isWithComments} = req.query;
    const {limitCount, offsetCount} = parseLimitAndOffset(limit, offset);

    let offers = await categoryService.getOffers(id, limitCount, offsetCount, isWithComments);

    offers = {...offers, ...getNextAndPrevUrl(req, offers.count, limitCount, offsetCount, isWithComments)};

    res.status(HttpCode.OK).json(offers);
  });

  return router;
};
