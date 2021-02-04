'use strict';

const Joi = require(`joi`);

module.exports = Joi.object({
  firstNameAndLastName: Joi.string()
    .min(2)
    .max(100)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp(`^[a-zA-Z0-9]{3,30}$`)),
  repeatPassword: Joi.ref(`password`),
  avatar: [
    Joi.string().optional()
    .regex(new RegExp(/\.(jpe?g|png)$/i)),
    Joi.allow(null)]
})
  .with(`password`, `repeatPassword`);
