'use strict';

/**
 * MiddleWare для проверки, что объявление существует.
 * Прикрепляет к res.locals найденное объявление.
 */

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);

module.exports = (service) => (req, res, next) => {
  const logger = getLogger({name: `api`});

  const offerId = req.params[`offerId`];

  logger.debug(`Проверяем, что объявление ${offerId} существует.`);

  try {
    res.locals.offer = service.getOne(offerId);
    logger.debug(`Проверка прошла. Объявление ${offerId} существует.`);
    next();
  } catch (err) {
    logger.error(`Объявление ${offerId} не существует.`);
    res.status(HttpCode.NOT_FOUND).json({error: {code: HttpCode.NOT_FOUND, message: `Offer doesn't exist`, details: err.message}});
  }


};
