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
    this._offerModel = sequelize.models.Offer;
    this._offerCategoryModel = sequelize.models.OfferCategory;
  }

  /**
   * Отдает все категории.
   * @async
   * @param {Boolean} isWithCount - требуется ли посчитать, сколько объявлений в каждой категории
   * @return {Promise}
   */
  async getAll(isWithCount) {
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
          as: Aliase.OFFER_CATEGORIES,
          attributes: []
        }]
      });
      return result.map((it)=> it.get());
    }
    return await this._categoryModel.findAll({raw: true});
  }

  // не удачная попытка получать все объявления категории. Невозможно посчитать количество объявлений.
  async getOffers(categoryId, limit, offset, isWithComments) {
    const include = [Aliase.CATEGORIES, Aliase.OFFER_TYPE];
    if (isWithComments) {
      include.push(Aliase.COMMENTS);
    }
    const {count, rows} = await this._categoryModel.findAndCountAll({
      attributes: [],

      where: {
        id: categoryId
      },
      include: [
        {
          model: this._offerModel,
          as: Aliase.OFFERS,
          include,
          limit: 2
        }
      ],
      distinct: true,
      limit,
      offset
    }
    );
    return {count, offers: rows[0].offers};
  }


}

module.exports = CategoryService;
