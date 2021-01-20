'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Category extends Model {}

const define = (sequelize) => Category.init({
  title: {
    type: DataTypes.STRING(50), // eslint-disable-line
    allowNull: false,
    unique: true
  }
},
{
  sequelize,
  modelName: `Category`,
  tableName: `categories`
}
);

module.exports = define;
