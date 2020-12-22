'use strict';

const {Router} = require(`express`);

const {HttpCode} = require(`../../consts`);
const offerExists = require(`../middlewares/offer-exists`);
const offerValidator = require(`../middlewares/offer-validator`);
const commentExists = require(`../middlewares/comment-exists`);
const commentValidator = require(`../middlewares/comment-validator`);


module.exports = (app, offerService, commentService) => {
  const router = new Router();


  router.get(`/`, (req, res) => {
    const offers = offerService.getAll();
    res.status(HttpCode.OK).json(offers);
  });


  router.get(`/:offerId`, offerExists(offerService), (req, res) => {
    const {offer} = res.locals;

    res.status(HttpCode.OK).json(offer);
  });


  router.post(`/`, offerValidator, (req, res) => {
    let newOffer = req.body;
    newOffer = offerService.add(newOffer);

    res.status(HttpCode.CREATED).json(newOffer);
  });


  router.put(`/:offerId`, [offerExists(offerService), offerValidator], offerExists(offerService), (req, res) => {
    let updatedOffer = req.body;
    updatedOffer = offerService.update(req.params[`offerId`], updatedOffer);

    res.status(HttpCode.OK).json(updatedOffer);
  });


  router.delete(`/:offerId`, offerExists(offerService), (req, res) => {
    offerService.delete(req.params[`offerId`]);

    res.status(HttpCode.DELETED).send();
  });


  router.get(`/:offerId/comments`, offerExists(offerService), (req, res) => {
    const offer = offerService.getOne(req.params[`offerId`]);

    res.status(HttpCode.OK).json(commentService.getAll(offer));
  });


  router.post(`/:offerId/comments`, [offerExists(offerService), commentValidator], (req, res) => {
    let newComment = req.body;
    const {offer} = res.locals;
    newComment = commentService.add(offer, newComment);

    res.status(HttpCode.CREATED).json(newComment);
  });


  router.delete(`/:offerId/comments/:commentId`, [offerExists(offerService), commentExists(commentService)], (req, res) => {
    const {offer} = res.locals;
    commentService.delete(offer, req.params[`commentId`]);

    res.status(HttpCode.DELETED).send();
  });

  return router;
};
