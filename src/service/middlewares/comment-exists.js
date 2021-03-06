'use strict';

/**
 * MiddleWare для проверки, что комментарий существует.
 * Прикрепляет к res.locals найденный комментарий.
 */

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);

module.exports = (commentService) => async (req, res, next) => {
  const logger = getLogger({name: `api`});

  const commentId = req.params[`commentId`];

  logger.debug(`Checking that ${commentId} exists...`);

  res.locals.comment = await commentService.getOne(commentId);
  if (res.locals.comment) {
    logger.debug(`Comment ${commentId} exists.`);
    next();
  } else {
    logger.error(`Comment ${commentId} doesn't exist.`);
    res.status(HttpCode.NOT_FOUND).json({error: {code: HttpCode.NOT_FOUND, message: `Comment doesn't exist`, details: `Comment doesn't exist`}});
  }
};
