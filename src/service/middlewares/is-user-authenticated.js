'use strict';

/**
 * Проверка, что пользователь авторизован
 */

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);

const JWTHelper = require(`../lib/jwt`);

module.exports = () => async (req, res, next) => {
  const logger = getLogger({name: `api`});

  logger.debug(`Check user auth...`);

  try {
    res.locals.userData = await JWTHelper.verifyToken(req.headers[`authorization`]);
    logger.debug(`User is authenticated`);
    next();
  } catch (e) {
    logger.debug(`User is not authenticated`);
    res.status(HttpCode.FORBIDDEN).json({error: {code: HttpCode.FORBIDDEN, message: `User is not authenticated`, details: e.message}});
  }
};
