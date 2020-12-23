'use strict';

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);

const REQUIRED_COMMENT_KEYS = [`text`];

module.exports = (req, res, next) => {
  const logger = getLogger({name: `api`});

  const comment = req.body;
  const errors = [];
  const keys = Object.keys(comment);

  logger.debug(`Валидация комментария от пользователя началась.`);

  REQUIRED_COMMENT_KEYS.forEach((key) => {
    if (!keys.includes(key)) {
      errors.push(`Key "${key}" is not presented.`);
    }
  });

  if (errors.length) {
    logger.error(`Валидация объявления от пользователя не прошла. Ошибки: ${errors}`);
    res.status(HttpCode.BAD_REQUEST).json({error: {code: HttpCode.BAD_REQUEST, message: `Comment validation failed`, details: errors}});
    return;
  }

  logger.debug(`Валидация комментария от пользователя успешно прошла.`);

  next();
};
