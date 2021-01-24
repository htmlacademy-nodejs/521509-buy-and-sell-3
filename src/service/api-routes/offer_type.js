'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../consts`);


module.exports = (offerTypeService) => {
  const router = new Router();

  router.get(`/`, async (req, res) => {
    const offerTypes = await offerTypeService.getAll();

    res.status(HttpCode.OK).json(offerTypes);
  });

  return router;
};
