'use strict';

const {Router} = require(`express`);


const offerExists = require(`../middlewares/offer-exists`);
const offerValidator = require(`../middlewares/offer-validator`);
const commentExists = require(`../middlewares/comment-exists`);
const commentValidator = require(`../middlewares/comment-validator`);

const {HttpCode} = require(`../../consts`);
const {getNextAndPrevUrl} = require(`../../utils`);


module.exports = (offerService, commentService) => {
  const router = new Router();


  router.get(`/`, async (req, res) => {
    let {page, categoryId, isWithComments} = req.query;

    if (Number.isNaN(+page)) {
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


  router.get(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;

    res.status(HttpCode.OK).json(offer);
  });


  router.post(`/`, offerValidator, async (req, res) => {
    let newOffer = req.body;
    newOffer = await offerService.add(newOffer);

    res.status(HttpCode.CREATED).json(newOffer);
  });


  router.put(`/:offerId`, [offerExists(offerService), offerValidator], offerExists(offerService), async (req, res) => {
    let updatedOffer = req.body;
    updatedOffer = await offerService.update(req.params[`offerId`], updatedOffer);

    res.status(HttpCode.OK).json(updatedOffer);
  });


  router.delete(`/:offerId`, offerExists(offerService), async (req, res) => {
    await offerService.delete(req.params[`offerId`]);

    res.status(HttpCode.DELETED).send();
  });


  router.get(`/:offerId/comments`, offerExists(offerService), async (req, res) => {
    const comments = await commentService.getAll(req.params[`offerId`]);

    res.status(HttpCode.OK).json(comments);
  });


  router.post(`/:offerId/comments`, [offerExists(offerService), commentValidator], async (req, res) => {
    let newComment = req.body;
    newComment = await commentService.add(req.params[`offerId`], newComment);

    res.status(HttpCode.CREATED).json(newComment);
  });


  router.delete(`/:offerId/comments/:commentId`, [offerExists(offerService), commentExists(commentService)], async (req, res) => {
    await commentService.delete(req.params[`commentId`]);

    res.status(HttpCode.DELETED).send();
  });

  return router;
};
