'use strict';

/**
 * MiddleWare для проверки валидности объявления.
 */

const {HttpCode} = require(`../../consts`);

const requiredOfferKeys = [`type`, `title`, `picture`, `description`, `sum`, `category`];

module.exports = (req, res, next) => {
  const offer = req.body;
  const errors = [];
  const keys = Object.keys(offer);

  let isOk = true;
  requiredOfferKeys.forEach((key) => {
    if (!keys.includes(key)) {
      errors.push(`Key "${key}" is not presented.`);
      isOk = false;
    }
  });

  if (!isOk) {
    res.status(HttpCode.BAD_REQUEST).send(`Offer validation failed. \n ${errors.join(`\n`)}`);
    return;
  }

  next();
};
