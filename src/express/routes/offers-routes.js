'use strict';

/**
 * Роутер для объявлений. ('/offers')
 *
 * @module /src/express/routes/offers-routes
 */

const path = require(`path`);

const {Router} = require(`express`);
const {nanoid} = require(`nanoid`);
const multer = require(`multer`);

const UPLOAD_DIR = `../../../upload/img/`;

const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});
const upload = multer({storage});

const API = require(`../api`);

const offersRoutes = new Router();

const api = API.getDefaultAPI();

offersRoutes.get(`/add`, async (req, res) => {
  const categories = await api.getCategories();
  const offerTypes = await api.getOfferTypes();
  res.render(`pages/offers/new-ticket`, {categories, allOfferTypes: offerTypes});
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
    // не смог найти варианта возвращать на страницу с оставшейся полностью формой.
    const categories = await api.getCategories();
    const offerTypes = await api.getOfferTypes();
    res.render(`pages/offers/new-ticket`, {
      title: offerData.title,
      description: offerData.description,
      cost: offerData.cost,
      offerTypeId: offerData.typeId,
      offerCategories: offerData.categories,
      error: e.response.data.error,
      categories,
      allOfferTypes: offerTypes});
    // res.redirect(`back`, {error: e.response.data.error});
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
