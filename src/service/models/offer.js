'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Offer extends Model {}

const define = (sequelize) => Offer.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(1000),// eslint-disable-line
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    field: `image_url`
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
},
{
  sequelize,
  modelName: `Offer`,
  tableName: `offers`,
  timestamps: true,
  paranoid: true,
  createdAt: `created_at`,
  updatedAt: `updated_at`,
  deletedAt: `deleted_at`
}
);

module.exports = define;
