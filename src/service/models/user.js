'use strict';

const {DataTypes, Model} = require(`sequelize`);

class User extends Model {}

const define = (sequelize) => User.init({
  avatar: {
    type: DataTypes.STRING
  },
  firstName: {
    type: DataTypes.STRING(100), // eslint-disable-line
    allowNull: false,
    field: `first_name`
  },
  lastName: {
    type: DataTypes.STRING(100), // eslint-disable-line
    allowNull: false,
    field: `last_name`
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    timestamps: true,
    paranoid: true,
    createdAt: `created_at`,
    updatedAt: `updated_at`,
    deletedAt: `deleted_at`
  },
},
{
  sequelize,
  modelName: `User`,
  tableName: `users`
}
);

module.exports = define;
