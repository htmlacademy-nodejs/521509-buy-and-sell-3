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
  tableName: `offer_types`
}
);

module.exports = define;
