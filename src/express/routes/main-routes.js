'use strict';

/**
 * Роутер для корневого пути. ('/')
 *
 * @module /src/express/routes/main-routes
 */

const {Router} = require(`express`);
const API = require(`../api`);
const upload = require(`../lib/multer`);

const mainRoutes = new Router();
const api = API.getDefaultAPI();


mainRoutes.get(`/`, async (req, res) => {
  const [{offers}, categories] = await Promise.all([api.getOffers(), api.getCategories({isWithCount: true})]);
  res.render(`pages/main`, {allOffers: offers, categories});
});


mainRoutes.get(`/register`, (req, res) => res.render(`pages/register`, {userData: {}}));


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
      error: e.response.data.error
    });
  }
});


mainRoutes.get(`/login`, (req, res) => res.render(`pages/login`, {userData: {}}));

mainRoutes.post(`/login`, upload.none(), async (req, res) => {
  const userData = {
    email: req.body[`user-email`],
    password: req.body[`user-password`]
  };
  try {
    await api.authUser(userData);
    res.redirect(`/my`);
  } catch (e) {
    res.render(`pages/login`, {
      userData,
      error: e.response.data.error
    });
  }
});


mainRoutes.get(`/search`, async (req, res) => {
  const searchText = req.query.query;
  let result;
  try {
    result = await api.search(searchText);
  } catch (err) {
    result = [];
  }
  res.render(`pages/search`, {result});
});

module.exports = mainRoutes;
