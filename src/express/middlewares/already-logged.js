'use strict';

/**
 * Проверка, что пользователь авторизован
 */


module.exports = () => async (req, res, next) => {
  if (res.locals.isLogged) {
    res.redirect(`/my`);
    return;
  }
  next();
};
