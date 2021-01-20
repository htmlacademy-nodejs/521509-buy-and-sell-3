'use strict';

/**
 * Сервис для работы с поиском
 */
const {Op} = require(`sequelize`);
const Alias = require(`../models/aliase`);


class SearchService {
  /**
   * @param {Sequelize} sequelize - экземпляр sequelize
   */
  constructor(sequelize) {
    this._offerModel = sequelize.models.Offer;
  }

  /**
   * Поиск по заголовкам объявлений.
   * @async
   * @param {String} searchText - поисковый запрос
   * @return {Object[]} - найденные объявления
   */
  async searchByTitle(searchText) {
    const offers = await this._offerModel.findAll({
      where: {
        title: {
          // чувствительно к регистру, но не должно.
          [Op.iLike]: `%${searchText}%`
        }
      },
      include: [Alias.CATEGORIES, Alias.OFFERS_TYPES]
    });
    return offers.map((offer) => offer.get());
  }
}

module.exports = SearchService;
