'use strict';

const path = require(`path`);

const bcrypt = require(`bcrypt`);

const {Env} = require(`../../consts`);

if (process.env.NODE_ENV === Env.TESTING) {
  require(`dotenv`).config({path: path.resolve(__dirname, `../../../test.env`)});
} else {
  require(`dotenv`).config({path: path.resolve(__dirname, `../../../.env`)});
}

/**
 * Сервис для работы с пользователями
 */
class UserService {
  /**
   * @param {Sequelize} sequelize - экземпляр sequelize
   */
  constructor(sequelize) {
    this._userModel = sequelize.models.User;
    this._saltRounds = +process.env.SALT_ROUNDS;
  }

  /**
   * Добавление нового пользователя.
   *
   * @async
   * @param {Object} userData - пользователь
   * @return {Promise}
   */
  async add(userData) {
    userData.password = await bcrypt.hash(userData.password, this._saltRounds);
    const user = await this._userModel.create(userData);
    return user.get();
  }

  /**
   * Отдает пользователя по Id
   * @async
   * @param {Number} id - id пользователя
   * @return {Object} - найденный пользователь
   */
  async getOne(id) {
    const user = await this._userModel.findByPk(id);
    return user.get();
  }

  /**
   * Отдает пользователя по Id
   * @async
   * @param {String} email - email пользователя
   * @return {Object} - найденный пользователь
   */
  async getOneByEmail(email) {
    return await this._userModel.findOne({
      where: {
        email
      },
      raw: true
    });
  }

  /**
   * Проверяет пользователя по Id или email
   * @async
   * @param {Number} id - email пользователя
   * @param {String} password - email пользователя
   * @param {String} email - email пользователя
   * @return {Object} - найденный пользователь
   */
  async checkUser(id, password, email = null) {
    let user;
    if (email) {
      user = await this.getOneByEmail(email);
    } else {
      user = await this.getOne(id);
    }

    if (!user) {
      throw new Error(`User doesn't exist`);
    }

    const isCorrectUser = await bcrypt.compare(password, user.password);

    if (!isCorrectUser) {
      throw new Error(`User with such email and password doesn't found.`);
    }

    return user;
  }
}

module.exports = UserService;
