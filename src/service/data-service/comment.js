'use strict';

/**
 * Сервис для работы с комментариями к объявлению
 */
class CommentService {
  /**
   * @param {Sequelize} sequelize - экземпляр sequelize
   */
  constructor(sequelize) {
    this._commentModel = sequelize.models.Comment;
  }
  /**
   * Добавление комментария к объявлению
   * @async
   * @param {Number} offerId - Id объявления
   * @param {Object} comment - добавляемый комментарий
   * @return {Object} - добавленный комментарий с id
   */
  async add(offerId, comment) {
    return await this._commentModel.create({'offer_id': offerId, ...comment});
  }

  /**
   * Удаление комментария к объявлению
   * @async
   * @param {String} commentId - id комментария
   * @return {Boolean} - возвращает true если комментарий был удален.
   */
  async delete(commentId) {
    const deletedRows = await this._commentModel.destroy({where: {'id': commentId}});
    return !!deletedRows;
  }

  /**
   * Возвращает все комментарии к объявлению
   * @async
   * @param {Object} offerId - ID объявления
   * @return {Object[]} - массив комментариев
   */
  async getAll(offerId) {
    return await this._commentModel.findAll({
      where:
          {
            'offer_id': offerId
          },
      raw: true
    });
  }

  /**
   * Возвращает комментарий к объявлению по id
   * @async
   * @param {String} commentId - id комментария
   * @return {Object} - комментарий
   */
  async getOne(commentId) {
    return await this._commentModel.findOne({
      where:
        {
          'id': commentId
        },
      raw: true
    });
  }
}

module.exports = CommentService;
