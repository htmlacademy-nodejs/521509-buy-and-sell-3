'use strict';

/**
 * MiddleWare для проверки, что комментарий существует.
 * Прикрепляет к res.locals найденный комментарий.
 */

const {HttpCode} = require(`../../consts`);

module.exports = (service) => (req, res, next) => {
  const {offer} = res.locals;
  const commentId = req.params[`commentId`];

  try {
    res.locals.comment = service.getOne(offer, commentId);
    next();
  } catch (err) {
    res.status(HttpCode.NOT_FOUND).send(err.message);
  }
};
