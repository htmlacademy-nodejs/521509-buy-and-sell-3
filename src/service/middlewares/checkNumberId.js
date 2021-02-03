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

  logger.debug(`Checking that id(s) are valid...`);

  const ids = idFields.map((idField) => req.params[idField]);

  try {
    for (const id of ids) {
      await Joi.number().positive().validateAsync(id);
    }
    logger.debug(`Id(s) are valid.`);
  } catch (e) {
    res.status(HttpCode.BAD_REQUEST).json({error: {code: HttpCode.BAD_REQUEST, message: `Id is invalid`, details: e.details}});
    logger.debug(`Id(s) are invalid.`);
    return;
  }

  next();
};
