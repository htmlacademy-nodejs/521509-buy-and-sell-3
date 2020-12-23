'use strict';

/**
 * MiddleWare для обработки 500 ошибки.
 */

const {HttpCode} = require(`../../consts`);
const {getLogger} = require(`../lib/logger`);

module.exports = (err, req, res, _next) => {
  const logger = getLogger({name: `api`});

  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({error: {code: HttpCode.INTERNAL_SERVER_ERROR, message: `Internal Server Error`, details: `See logs [500] for more information.`}});

  logger.error(`[500] Внутренняя ошибка сервера при обращении: ${req.url}. Ошибка: ${err.message}.`);
};
