'use strict';

/**
 * MiddleWare для проверки логина и пароля пользователя.
 */

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);

module.exports = (userService) => async (req, res, next) => {
  const logger = getLogger({name: `api`});

  logger.debug(`Try to auth user...`);

  try {
    await userService.checkUser(null, req.body.password, req.body.email);
    next();
  } catch (err) {
    logger.debug(`Error by authentication. ${err}`);
    res.status(HttpCode.BAD_REQUEST).json({error: {code: HttpCode.BAD_REQUEST, message: `Error by authentication.`, details: err.message}});
  }
};
