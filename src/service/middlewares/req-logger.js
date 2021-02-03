'use strict';

/**
 * MiddleWare логирования всех обращений.
 */

const {getLogger} = require(`../lib/logger`);

module.exports = (req, res, next) => {
  const logger = getLogger({name: `api`});

  logger.debug(`Request on URL ${req.originalUrl}`);
  res.on(`finish`, () => {
    logger.info(`Request ${req.originalUrl} finished with code: ${res.statusCode}`);
  });

  next();
};
