'use strict';

const {DataTypes, Model} = require(`sequelize`);

class User extends Model {}

const define = (sequelize) => User.init({
  'avatar_url': {
    type: DataTypes.STRING
  },
  'first_name': {
    type: DataTypes.STRING(100), // eslint-disable-line
    allowNull: false
  },
  'last_name': {
    type: DataTypes.STRING(100), // eslint-disable-line
    allowNull: false
  },
  'email': {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
},
{
  sequelize,
  modelName: `User`,
  tableName: `users`
}
);

module.exports = define;
