'use strict';

/**
 * MiddleWare для проверки валидности объявления.
 */

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);

const REQUIRED_OFFER_KEYS = [`type_id`, `title`, `image_url`, `description`, `cost`, `categories`];

module.exports = (req, res, next) => {
  const logger = getLogger({name: `api`});

  const offer = req.body;
  const errors = [];
  const keys = Object.keys(offer);

  logger.debug(`Валидация объявления от пользователя началась.`);

  REQUIRED_OFFER_KEYS.forEach((key) => {
    if (!keys.includes(key)) {
      errors.push(`Key "${key}" is not presented.`);
    }
  });

  if (errors.length) {
    logger.error(`Валидация объявления от пользователя не прошла. Ошибки: ${errors}`);
    res.status(HttpCode.BAD_REQUEST).json({error: {code: HttpCode.BAD_REQUEST, message: `Offer validation failed`, details: errors}});
    return;
  }

  logger.debug(`Валидация объявления от пользователя успешно прошла.`);

  next();
};
