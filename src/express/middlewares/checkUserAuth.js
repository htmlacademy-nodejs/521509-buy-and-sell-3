'use strict';

/**
 * Проверка, что пользователь авторизован
 */
const API = require(`../api`);

const atob = require(`atob`);
const api = API.getDefaultAPI();


module.exports = () => async (req, res, next) => {
  try {
    // получаем токены из кук
    let {accessToken, refreshToken} = JSON.parse(req.cookies.tokens);
    // парсим токены
    let payloadAccess = JSON.parse(atob(accessToken.split(`.`)[1]));
    const payloadRefresh = JSON.parse(atob(refreshToken.split(`.`)[1]));

    // если access вышел а refresh нет, то обновляем
    if (payloadAccess.exp * 1000 < Date.now() && payloadRefresh.exp * 1000 > Date.now()) {
      // пробуем рефрешнуть
      ({accessToken, refreshToken} = await api.refreshTokens(refreshToken));
      // запихиваем в куки, чтобы сохранились у пользователя
      res.cookie(`tokens`, JSON.stringify({accessToken, refreshToken}), {httpOnly: true});
      // парсим только токен access чтобы достать пользователя
      payloadAccess = JSON.parse(atob(accessToken.split(`.`)[1]));
    }

    // запоминаем пользователя
    res.locals.user = payloadAccess.data;
    res.locals.accessToken = accessToken;
    res.locals.isLogged = true;
  } catch (e) {
    res.locals.isLogged = false;
    res.locals.user = {};
  }

  next();
};
