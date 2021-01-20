'use strict';

/**
 * Сервис для работы с типами объявлений
 */
class OfferTypeService {
  /**
   * @param {Sequelize} sequelize - экземпляр sequelize
   */
  constructor(sequelize) {
    this._offerTypeModel = sequelize.models.OfferType;
  }

  /**
   * Выдача всех типов объявлений
   * @async
   * @return {Object[]} - найденные объявления
   */
  async getAll() {
    return await this._offerTypeModel.findAll({raw: true});
  }
}

module.exports = OfferTypeService;
