'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Comment extends Model {}

const define = (sequelize) => Comment.init({
  text: {
    type: DataTypes.STRING(1000), // eslint-disable-line
    allowNull: false
  }
},
{
  sequelize,
  modelName: `Comment`,
  tableName: `comments`,
  timestamps: true,
  paranoid: true,
  createdAt: `created_at`,
  updatedAt: `updated_at`,
  deletedAt: `deleted_at`
}
);

module.exports = define;
