'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Offer extends Model {}

const define = (sequelize) => Offer.init({
  'title': {
    type: DataTypes.STRING,
    allowNull: false
  },
  'description': {
    type: DataTypes.STRING(1000),// eslint-disable-line
    allowNull: false
  },
  'image_url': {
    type: DataTypes.STRING
  },
  'cost': {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  sequelize,
  modelName: `Offer`,
  tableName: `offers`
}
);

module.exports = define;
