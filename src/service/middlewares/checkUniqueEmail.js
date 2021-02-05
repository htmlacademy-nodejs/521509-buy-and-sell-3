'use strict';

/**
 * MiddleWare для проверки, что email пользователя уникальный.
 * Прикрепляет к res.locals найденный комментарий.
 */

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);

module.exports = (userService) => async (req, res, next) => {
  const logger = getLogger({name: `api`});

  logger.debug(`Checking that email is unique...`);

  const email = req.body.email;

  let user = await userService.getOneByEmail(email);
  if (user) {
    logger.error(`User with this email exists.`);
    res.status(HttpCode.BAD_REQUEST).json({error: {code: HttpCode.BAD_REQUEST, message: `User with this email exists.`, details: `Not unique email.`}});
  } else {
    logger.debug(`Email us unique.`);
    next();
  }
};
