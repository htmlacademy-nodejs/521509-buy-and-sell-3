'use strict';

/**
 * Роутер для объявлений. ('/offers')
 *
 * @module /src/express/routes/offers-routes
 */

const {Router} = require(`express`);

const upload = require(`../lib/multer`);
const API = require(`../api`);

const offersRoutes = new Router();

const api = API.getDefaultAPI();

offersRoutes.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  const offerTypes = await api.getOfferTypes();
  res.render(`pages/offers/new-ticket`, {categories, allOfferTypes: offerTypes, oneOfferData: {}});
});

offersRoutes.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const offerData = {
    imageUrl: file.filename,
    cost: body.price,
    typeId: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    categories: body.categories
  };
  try {
    await api.createOffer(offerData);
    res.redirect(`/my`);
  } catch (e) {
    const categories = await api.getCategories();
    const offerTypes = await api.getOfferTypes();
    res.render(`pages/offers/new-ticket`, {
      oneOfferData: offerData,
      error: e.response.data.error,
      categories,
      allOfferTypes: offerTypes});
  }
});

offersRoutes.get(`/:id`, async (req, res) => {
  const oneOffer = await api.getOffer(req.params.id);
  res.render(`pages/offers/ticket`, {oneOffer});
});
offersRoutes.get(`/edit/:id`, async (req, res) => {
  const [oneOffer, categories, offerTypes] = await Promise.all([api.getOffer(req.params.id), api.getCategories(), api.getOfferTypes()]);
  res.render(`pages/offers/ticket-edit`, {oneOffer, categories, allOfferTypes: offerTypes});
});

offersRoutes.get(`/category/:id`, async (req, res) => {
  const categoryId = req.params[`id`];

  let {page = 1} = req.query;
  page = +page;


  const [
    {count, offers, totalPages},
    categories
  ] = await Promise.all([
    api.getOffers({page, categoryId}),
    api.getCategories({isWithCount: true})
  ]);
  const currentCategory = categories.find((it) => it.id === +categoryId);

  res.render(`pages/offers/category`, {allOffers: offers, count, categories, currentCategory, page, totalPages, prefix: `${categoryId}?`});
});

module.exports = offersRoutes;
