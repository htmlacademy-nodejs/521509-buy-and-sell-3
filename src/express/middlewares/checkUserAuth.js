'use strict';

/**
 * Проверка, что пользователь авторизован
 */
const API = require(`../api`);

const api = API.getDefaultAPI();

module.exports = () => async (req, res, next) => {
  res.locals.apiCookies = {cookies: req.headers.cookie || ``};
  try {
    const {data, cookies} = await api.checkUserAuth({...res.locals.apiCookies});

    res.locals.isLogged = true;
    if (cookies) {
      res.locals.apiCookies.cookies = cookies;
      res.set(`Set-Cookie`, cookies);
    }
    res.locals.user = data.user;
  } catch (e) {
    res.locals.isLogged = false;
    res.locals.user = {};
  }

  next();
};
