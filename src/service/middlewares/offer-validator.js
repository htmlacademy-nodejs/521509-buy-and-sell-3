'use strict';

/**
 * MiddleWare для проверки валидности объявления.
 */

const {HttpCode} = require(`../../consts`);

const REQUIRED_OFFER_KEYS = [`type`, `title`, `picture`, `description`, `sum`, `category`];

module.exports = (req, res, next) => {
  const offer = req.body;
  const errors = [];
  const keys = Object.keys(offer);

  REQUIRED_OFFER_KEYS.forEach((key) => {
    if (!keys.includes(key)) {
      errors.push(`Key "${key}" is not presented.`);
    }
  });

  if (errors.length) {
    res.status(HttpCode.BAD_REQUEST).json({error: {code: HttpCode.BAD_REQUEST, message: `Offer validation failed`, details: errors}});
    return;
  }

  next();
};
