'use strict';

const {Model} = require(`sequelize`);

class OfferCategory extends Model {}

const define = (sequelize) => OfferCategory.init({},
    {
      sequelize,
      modelName: `OfferCategory`,
      tableName: `offers_categories`,
      timestamps: true,
      paranoid: true,
      createdAt: `created_at`,
      updatedAt: `updated_at`,
      deletedAt: `deleted_at`
    }
);

module.exports = define;
