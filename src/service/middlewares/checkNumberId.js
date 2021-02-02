'use strict';

/**
 * MiddleWare для проверки, что id является числом.
 *
 * !Это избыточная проверка (проверка есть далее), но она есть в задании. Попрактикуемся.
 */
const Joi = require(`joi`);

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);

const idFields = [`id`, `offerId`, `commentId`];

module.exports = () => async (req, res, next) => {
  const logger = getLogger({name: `api`});

  logger.debug(`Проверяем, что id можно привести к валидному id.`);

  const ids = [];
  idFields.forEach((idField) => {
    const id = req.params[idField];
    if (id) {
      ids.push(id);
    }
  });

  try {
    for (const id of ids) {
      await Joi.number().positive().validateAsync(id);
    }
    // await Joi.number().positive().validateAsync(ids[0]);
    logger.debug(`Id принят(ы).`);
  } catch (e) {
    res.status(HttpCode.BAD_REQUEST).json({error: {code: HttpCode.BAD_REQUEST, message: `Id is invalid`, details: e.details}});
    logger.debug(`Невозможно привести в валидному id.`);
    return;
  }

  next();
};
