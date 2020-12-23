'use strict';

/**
 * MiddleWare логирования всех обращений.
 */

const {getLogger} = require(`../lib/logger`);

module.exports = (req, res, next) => {
  const logger = getLogger({name: `api`});

  logger.debug(`Запрос по URL ${req.originalUrl}`);
  res.on(`finish`, () => {
    logger.info(`Ответ на запрос ${req.originalUrl} : ${res.statusCode}`);
  });

  next();
};
