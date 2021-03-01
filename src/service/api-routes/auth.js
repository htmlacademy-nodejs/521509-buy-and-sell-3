'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../consts`);

const JWTHelper = require(`../lib/jwt`);

const joiValidator = require(`../middlewares/joi-validator`);
const checkUserAndPassword = require(`../middlewares/user-and-password-checker`);

const authSchema = require(`../joi-shemas/auth`);

module.exports = (userService) => {
  const router = new Router();

  router.post(`/`, [joiValidator(authSchema), checkUserAndPassword(userService)], async (req, res) => {
    res.status(HttpCode.OK).json({message: `success`, ...res.locals.tokens});
  });

  router.post(`/refresh`, async (req, res) => {
    const {refreshToken} = req.body;
    try {
      const newTokens = await JWTHelper.refreshAccessToken(refreshToken);
      res.status(HttpCode.OK).json({message: `success`, ...newTokens});
    } catch (e) {
      res.status(HttpCode.FORBIDDEN).json({error: {code: HttpCode.FORBIDDEN, message: `Failed token refreshing`, details: e.message}});
    }
  });

  return router;
};
