'use strict';

/**
 * MiddleWare для проверки, что объявление существует.
 * Прикрепляет к res.locals найденное объявление.
 */

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);

module.exports = (service) => async (req, res, next) => {
  const logger = getLogger({name: `api`});

  const offerId = req.params[`offerId`];

  logger.debug(`Check that offer ${offerId} exists.`);

  try {
    res.locals.offer = await service.getOne(offerId);
    logger.debug(`Offer ${offerId} exists.`);
    next();
  } catch (err) {
    logger.error(`Offer ${offerId} doesn't exist.`);
    res.status(HttpCode.NOT_FOUND).json({error: {code: HttpCode.NOT_FOUND, message: `Offer doesn't exist`, details: err.message}});
  }


};
