'use strict';

const {HttpCode} = require(`../../consts`);

const requiredCommentKeys = [`text`];

module.exports = (req, res, next) => {
  const comment = req.body;
  const errors = [];
  const keys = Object.keys(comment);

  let isOk = true;
  requiredCommentKeys.forEach((key) => {
    if (!keys.includes(key)) {
      errors.push(`Key "${key}" is not presented.`);
      isOk = false;
    }
  });

  if (!isOk) {
    res.status(HttpCode.BAD_REQUEST).send(`Comment validation failed. \n ${errors.join(`\n`)}`);
    return;
  }

  next();
};
