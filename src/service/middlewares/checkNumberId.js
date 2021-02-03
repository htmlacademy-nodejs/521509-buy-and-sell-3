'use strict';

/**
 * MiddleWare для проверки, что id является числом.
 *
 * !Это избыточная проверка (проверка есть далее), но она есть в задании. Попрактикуемся.
 */
const Joi = require(`joi`);

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);

module.exports = (...idFields) => async (req, res, next) => {
  const logger = getLogger({name: `api`});

  logger.debug(`Проверяем, что id можно привести к валидному id.`);

  const ids = idFields.map((idField) => req.params[idField]);

  try {
    for (const id of ids) {
      await Joi.number().positive().validateAsync(id);
    }
    logger.debug(`Id принят(ы).`);
  } catch (e) {
    res.status(HttpCode.BAD_REQUEST).json({error: {code: HttpCode.BAD_REQUEST, message: `Id is invalid`, details: e.details}});
    logger.debug(`Невозможно привести в валидному id.`);
    return;
  }

  next();
};
