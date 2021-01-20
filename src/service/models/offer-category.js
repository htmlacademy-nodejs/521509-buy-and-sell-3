'use strict';

const {Model} = require(`sequelize`);

class OfferCategory extends Model {}

const define = (sequelize) => OfferCategory.init({},
    {
      sequelize,
      modelName: `OfferCategory`,
      tableName: `offers_categories`
    }
);

module.exports = define;
