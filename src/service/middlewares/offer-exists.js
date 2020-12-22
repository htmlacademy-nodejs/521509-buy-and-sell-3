'use strict';

/**
 * MiddleWare для проверки, что объявление существует.
 * Прикрепляет к res.locals найденное объявление.
 */

const {HttpCode} = require(`../../consts`);

module.exports = (service) => (req, res, next) => {
  const offerId = req.params[`offerId`];

  try {
    res.locals.offer = service.getOne(offerId);
    next();
  } catch (err) {
    res.status(HttpCode.NOT_FOUND).json({error: {code: HttpCode.NOT_FOUND, message: `Offer doesn't exist`, details: err.message}});
  }


};
