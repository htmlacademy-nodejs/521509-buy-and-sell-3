'use strict';

/**
 * MiddleWare для обработки 404 ошибки.
 */

const {HttpCode} = require(`../../consts`);
const {getLogger} = require(`../lib/logger`);

module.exports = (req, res, next) => {
  const logger = getLogger({name: `api`});

  res.status(HttpCode.NOT_FOUND).json({error: {code: HttpCode.NOT_FOUND, message: `Not Found`, details: `This endpoint is not presented`}});

  logger.error(`[404] Пользователь обратился к несуществующему ресурсу: ${req.url}`);

  next();
};
