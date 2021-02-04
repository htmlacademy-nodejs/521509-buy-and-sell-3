'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../consts`);

const joiValidator = require(`../middlewares/joi-validator`);
const checkUniqueEmail = require(`../middlewares/checkUniqueEmail`);

const newUserSchema = require(`../joi-shemas/new-user`);

module.exports = (userService) => {
  const router = new Router();

  router.post(`/add`, [joiValidator(newUserSchema), checkUniqueEmail(userService)], async (req, res) => {
    let newUser = req.body;
    newUser = await userService.add(newUser);

    res.status(HttpCode.CREATED).json(newUser);
  });

  return router;
};
