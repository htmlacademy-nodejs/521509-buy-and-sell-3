'use strict';

/**
 * Проверка, что пользователь авторизован
 */

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);

module.exports = () => async (req, res, next) => {
  const logger = getLogger({name: `api`});

  logger.debug(`Check user auth...`);


  if (!req.session.isLogged) {
    logger.debug(`User is not authenticated`);
    res.status(HttpCode.FORBIDDEN).json({error: {code: HttpCode.FORBIDDEN, message: `User is not authenticated`, details: `User is not authenticated`}});
    return;
  }

  logger.debug(`User is authenticated`);

  next();
};
