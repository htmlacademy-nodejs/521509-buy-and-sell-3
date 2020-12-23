'use strict';

/**
 * MiddleWare для проверки, что комментарий существует.
 * Прикрепляет к res.locals найденный комментарий.
 */

const {getLogger} = require(`../lib/logger`);
const {HttpCode} = require(`../../consts`);

module.exports = (commentService) => (req, res, next) => {
  const logger = getLogger({name: `api`});

  const {offer} = res.locals;
  const commentId = req.params[`commentId`];

  logger.debug(`Проверяем, что комментарий ${commentId} существует.`);

  try {
    res.locals.comment = commentService.getOne(offer, commentId);
    logger.debug(`Проверка прошла. Комментарий ${commentId} существует.`);
    next();
  } catch (err) {
    logger.error(`Комментарий ${commentId} не существует.`);
    res.status(HttpCode.NOT_FOUND).json({error: {code: HttpCode.NOT_FOUND, message: `Comment doesn't exist`, details: err.message}});
  }
};
