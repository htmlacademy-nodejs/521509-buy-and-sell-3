'use strict';

const {Router} = require(`express`);

const checkNumberId = require(`../middlewares/checkNumberId`);
const offerExists = require(`../middlewares/offer-exists`);
const commentExists = require(`../middlewares/comment-exists`);
const joiValidator = require(`../middlewares/joi-validator`);
const checkUserAuth = require(`../middlewares/is-user-authenticated`);

const commentSchema = require(`../joi-shemas/comment`);
const offerSchema = require(`../joi-shemas/offer`);

const {HttpCode} = require(`../../consts`);
const {getNextAndPrevUrl} = require(`../../utils`);


module.exports = (offerService, commentService) => {
  const router = new Router();


  router.get(`/`, async (req, res) => {
    let {page, categoryId, isWithComments} = req.query;

    if (Number.isNaN(+page) || page <= 0) {
      page = 1;
    }

    let offers;
    if (!categoryId) {
      offers = await offerService.getPage(+page, isWithComments);
    } else {
      offers = await offerService.getPageByCategory(+page, categoryId, isWithComments);
    }

    offers = {...offers, ...getNextAndPrevUrl(req, offers.count, +page, {isWithComments, categoryId})};

    res.status(HttpCode.OK).json(offers);
  });

  router.get(`/my/`, checkUserAuth(), async (req, res) => {
    let {page, isWithComments} = req.query;
    const userId = res.locals.userData.id;

    if (Number.isNaN(+page) || page <= 0) {
      page = 1;
    }

    let offers = await offerService.getPage(+page, isWithComments, userId);

    offers = {...offers, ...getNextAndPrevUrl(req, offers.count, +page, {isWithComments})};

    res.status(HttpCode.OK).json(offers);
  });


  router.get(`/:offerId`, [checkNumberId(`offerId`), offerExists(offerService)], (req, res) => {
    const {offer} = res.locals;

    res.status(HttpCode.OK).json(offer);
  });


  router.post(`/`, [joiValidator(offerSchema), checkUserAuth()], async (req, res) => {
    let newOffer = req.body;
    newOffer[`user_id`] = res.locals.user.id;
    newOffer = await offerService.add(newOffer);

    res.status(HttpCode.CREATED).json(newOffer);
  });


  router.put(`/:offerId`, [checkNumberId(`offerId`), offerExists(offerService), joiValidator(offerSchema)], offerExists(offerService), async (req, res) => {
    let updatedOffer = req.body;
    updatedOffer = await offerService.update(req.params[`offerId`], updatedOffer);

    res.status(HttpCode.OK).json(updatedOffer);
  });


  router.delete(`/:offerId`, [checkNumberId(`offerId`), offerExists(offerService)], async (req, res) => {
    await offerService.delete(req.params[`offerId`]);

    res.status(HttpCode.DELETED).send();
  });


  router.get(`/:offerId/comments`, [checkNumberId(`offerId`), offerExists(offerService)], async (req, res) => {
    const comments = await commentService.getAll(req.params[`offerId`]);

    res.status(HttpCode.OK).json(comments);
  });


  router.post(`/:offerId/comments`, [checkNumberId(`offerId`), offerExists(offerService), joiValidator(commentSchema)], async (req, res) => {
    let newComment = req.body;
    newComment = await commentService.add(req.params[`offerId`], newComment);

    res.status(HttpCode.CREATED).json(newComment);
  });


  router.delete(`/:offerId/comments/:commentId`, [checkNumberId(`offerId`, `commentId`), offerExists(offerService), commentExists(commentService)], async (req, res) => {
    await commentService.delete(req.params[`commentId`]);

    res.status(HttpCode.DELETED).send();
  });

  return router;
};
