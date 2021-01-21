'use strict';

const {DataTypes, Model} = require(`sequelize`);

class OfferType extends Model {}

const define = (sequelize) => OfferType.init({
  title: {
    type: DataTypes.STRING(50), // eslint-disable-line
    allowNull: false,
    unique: true
  }
},
{
  sequelize,
  modelName: `OfferType`,
  tableName: `offer_types`,
  timestamps: true,
  paranoid: true,
  createdAt: `created_at`,
  updatedAt: `updated_at`,
  deletedAt: `deleted_at`
}
);

module.exports = define;
