'use strict';

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);


module.exports = (schema) => (async (req, res, next) => {
  const logger = getLogger({name: `api`});

  logger.debug(`Валидация началась.`);

  const body = req.body;

  try {
    await schema.validateAsync(body, {abortEarly: false});
  } catch (errors) {
    res.status(HttpCode.BAD_REQUEST).json({error: {code: HttpCode.BAD_REQUEST, message: `Validation failed`, details: errors.details}});
    logger.debug(`Валидация не прошла. Ошибки: ${errors}`);
    return;
  }

  logger.debug(`Валидация успешно прошла.`);

  next();
});
