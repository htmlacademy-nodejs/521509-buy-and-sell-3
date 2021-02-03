'use strict';

const Joi = require(`joi`);

module.exports = Joi.object({
  title: Joi.string()
    .min(10)
    .max(100)
    .required(),
  description: Joi.string()
    .min(50)
    .max(1000)
    .required(),
  cost: Joi.number()
    .greater(10)
    .required(),
  categories: Joi.array()
    .items(Joi.number().positive())
    .required(),
  typeId: Joi.number()
    .positive()
    .required(),
  imageUrl: Joi.string()
    .regex(new RegExp(/\.(jpe?g|png)$/i))
    .required()
});
