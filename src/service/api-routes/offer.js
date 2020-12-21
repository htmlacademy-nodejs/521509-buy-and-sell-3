'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../consts`);
const offerExists = require(`../middlewares/offer-exists`);
const offerValidator = require(`../middlewares/offer-validator`);
const commentExists = require(`../middlewares/comment-exists`);
const commentValidator = require(`../middlewares/comment-validator`);

const router = new Router();

module.exports = (app, service, commentService) => {
  app.use(`/offers`, router);


  router.get(`/`, (req, res) => {
    const offers = service.getAll();
    res.status(HttpCode.OK).json(offers);
  });


  router.get(`/:offerId`, offerExists(service), (req, res) => {
    const {offer} = res.locals;

    res.status(HttpCode.OK).json(offer);
  });


  router.post(`/`, offerValidator, (req, res) => {
    let newOffer = req.body;
    newOffer = service.add(newOffer);

    res.status(HttpCode.CREATED).json(newOffer);
  });


  router.put(`/:offerId`, [offerExists(service), offerValidator], offerExists(service), (req, res) => {
    let updatedOffer = req.body;
    updatedOffer = service.update(req.params[`offerId`], updatedOffer);

    res.status(HttpCode.OK).json(updatedOffer);
  });


  router.delete(`/:offerId`, offerExists(service), (req, res) => {
    service.delete(req.params[`offerId`]);

    res.status(HttpCode.DELETED).send();
  });


  router.get(`/:offerId/comments`, offerExists(service), (req, res) => {
    const offer = service.getOne(req.params[`offerId`]);

    res.status(HttpCode.OK).json(commentService.getAll(offer));
  });


  router.post(`/:offerId/comments`, [offerExists(service), commentValidator], (req, res) => {
    let newComment = req.body;
    const {offer} = res.locals;
    newComment = commentService.add(offer, newComment);

    res.status(HttpCode.CREATED).json(newComment);
  });


  router.delete(`/:offerId/comments/:commentId`, [offerExists(service), commentExists(commentService)], (req, res) => {
    const {offer} = res.locals;
    commentService.delete(offer, req.params[`commentId`]);

    res.status(HttpCode.DELETED).send();
  });
};
