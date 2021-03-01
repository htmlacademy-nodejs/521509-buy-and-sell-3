'use strict';

/**
 * Роутер для корневого пути. ('/')
 *
 * @module /src/express/routes/main-routes
 */

const {Router} = require(`express`);
const API = require(`../api`);
const upload = require(`../lib/multer`);

const alreadyLogged = require(`../middlewares/already-logged`);


const mainRoutes = new Router();
const api = API.getDefaultAPI();


mainRoutes.get(`/`, async (req, res) => {
  const [{offers}, categories] = await Promise.all([
    api.getOffers({...res.locals.apiCookies}),
    api.getCategories({isWithCount: true, ...res.locals.apiCookies})
  ]);
  res.render(`pages/main`, {allOffers: offers, categories, user: res.locals.user});
});


mainRoutes.get(`/register`, alreadyLogged(), (req, res) => res.render(`pages/register`, {userData: {}, user: {}}));


mainRoutes.post(`/register`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  let fileName = null;

  if (file) {
    fileName = file.filename;
  }
  const userData = {
    avatar: fileName,
    firstNameAndLastName: body[`user-name`],
    email: body[`user-email`],
    password: body[`user-password`],
    repeatPassword: body[`user-password`]
  };
  try {
    await api.createUser(userData);
    res.redirect(`/my`);
  } catch (e) {
    res.render(`pages/register`, {
      userData,
      error: e.response.data.error,
      user: {}
    });
  }
});


mainRoutes.get(`/login`, alreadyLogged(), (req, res) => {
  res.render(`pages/login`, {userData: {}, user: {}});
});

mainRoutes.post(`/login`, upload.none(), async (req, res) => {
  const userData = {
    email: req.body[`user-email`],
    password: req.body[`user-password`]
  };
  try {
    const {accessToken, refreshToken} = await api.authUser(userData);
    res.cookie(`tokens`, JSON.stringify({accessToken, refreshToken}), {httpOnly: true});
    res.redirect(`/my`);
  } catch (e) {
    res.render(`pages/login`, {
      userData,
      error: e.response.data.error,
      user: {}
    });
  }
});


mainRoutes.get(`/search`, async (req, res) => {
  const searchText = req.query.query;
  let data;
  try {
    (data = await api.search(searchText));
  } catch (err) {
    data = [];
  }
  res.render(`pages/search`, {result: data, user: res.locals.user});
});

module.exports = mainRoutes;
