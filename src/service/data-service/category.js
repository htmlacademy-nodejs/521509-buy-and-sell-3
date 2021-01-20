'use strict';

/**
 * Сервис для работы с категориями
 */

const Sequelize = require(`sequelize`);
const Aliase = require(`../models/aliase`);

class CategoryService {
  /**
   * @param {Sequelize} sequelize - экземпляр sequelize
   */
  constructor(sequelize) {
    this._categoryModel = sequelize.models.Category;
    this._offerCategoryModel = sequelize.models.OfferCategory;
  }

  /**
   * Отдает все категории.
   * @async
   * @param {Boolean} isWithCount - требуется ли посчитать, сколько объявлений в каждой категории
   * @return {Promise}
   */
  async getAll(isWithCount) {
    console.log(isWithCount);
    if (isWithCount) {
      const result = await this._categoryModel.findAll({
        attributes: [
          `id`,
          `title`,
          [
            Sequelize.fn(
                `COUNT`,
                `*`
            ),
            `count`
          ]
        ],
        group: [Sequelize.col(`Category.id`)],
        include: [{
          model: this._offerCategoryModel,
          as: Aliase.OFFERS_CATEGORIES,
          attributes: []
        }]
      });
      return result.map((it)=> it.get());
    }
    return await this._categoryModel.findAll({raw: true});
  }


}

module.exports = CategoryService;
