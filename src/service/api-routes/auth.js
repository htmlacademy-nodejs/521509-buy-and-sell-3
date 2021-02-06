'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../consts`);

const joiValidator = require(`../middlewares/joi-validator`);
const checkUserAndPassword = require(`../middlewares/user-and-password-checker`);

const authSchema = require(`../joi-shemas/auth`);

module.exports = (userService) => {
  const router = new Router();

  router.post(`/`, [joiValidator(authSchema), checkUserAndPassword(userService)], async (req, res) => {
    res.status(HttpCode.OK).json({massage: `success`});
  });

  router.delete(`/`, async (req, res) => {
    req.session.destroy();
    res.status(HttpCode.DELETED).json({massage: `success`});
  });

  return router;
};
