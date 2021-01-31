'use strict';

const Aliase = require(`../models/aliase`);
const {PAGE_SIZE} = require(`../../consts`);

/**
 * Сервис для работы с объявлениями
 */
class OfferService {
  /**
   * @param {Sequelize} sequelize - экземпляр sequelize
   */
  constructor(sequelize) {
    this._offerModel = sequelize.models.Offer;
    this._commentModel = sequelize.models.Comment;
    this._categoryModel = sequelize.models.Category;
    this._offerCategoryModel = sequelize.models.OfferCategory;
  }

  /**
   * Добавление нового объявления с добавлением к нему id и пустого массива с комментариями.
   *
   * @async
   * @param {Object} offerData - объявление
   * @return {Promise}
   */
  async add(offerData) {
    const offer = await this._offerModel.create(offerData);
    await offer.setOfferType(offerData.typeId);
    await offer.addCategories(offerData.categories);
    return offer.get();
  }

  /**
   * Удаление объявления по id
   * @async
   * @param {String} id - id объявления
   * @return {Boolean} - возвращает true - если что-то удалил
   */
  async delete(id) {
    const deletedRows = await this._offerModel.destroy({
      where: {
        id
      }
    });

    return !!deletedRows;
  }

  /**
   * Отдача всех объявлений, которые есть.
   * @async
   * @param {Boolean} isWithComments - нужны ли комментарии
   * @return {Object[]}
   */
  async getAll(isWithComments) {
    const include = [Aliase.CATEGORIES, Aliase.OFFER_TYPE];
    if (isWithComments) {
      include.push(Aliase.COMMENTS);
    }
    const offers = await this._offerModel.findAll({include});
    return offers.map((item) => item.get());
  }

  /**
   * Отдача постранично всех объявлений, которые есть.
   * @async
   * @param {Number} page - номер страницы
   * @param {Boolean} isWithComments - нужны ли комментарии
   * @return {Object[]}
   */
  async getPage(page, isWithComments) {
    const include = [Aliase.CATEGORIES, Aliase.OFFER_TYPE];
    if (isWithComments) {
      include.push(Aliase.COMMENTS);
    }
    const {count, rows} = await this._offerModel.findAndCountAll({
      limit: PAGE_SIZE,
      offset: (PAGE_SIZE * (page - 1)),
      distinct: true,
      include
    });

    return {count, offers: rows};
  }

  /**
   * Отдача постранично всех объявлений для указанной категории.
   * @async
   * @param {Number} page - номер страницы
   * @param {Number} categoryId - id категории, если нужно только для определенной категории
   * @param {Boolean} isWithComments - нужны ли комментарии
   * @return {Object[]}
   */
  async getPageByCategory(page, categoryId, isWithComments) {
    // получаем id объявлений на 1 странице.
    const {count, rows} = await this._offerModel.findAndCountAll({
      attributes: [`id`],
      limit: PAGE_SIZE,
      offset: (PAGE_SIZE * (page - 1)),
      // distinct: true,
      include: [{
        attributes: [],
        model: this._categoryModel,
        as: Aliase.CATEGORIES,
        through: {
          where: {
            'category_id': categoryId
          },
          required: true
        },
        required: true
      }]
    });

    // получаем полные объявления по найденным id.
    const include = [Aliase.CATEGORIES, Aliase.OFFER_TYPE];
    if (isWithComments) {
      include.push(Aliase.COMMENTS);
    }
    const offers = await this._offerModel.findAll({
      where: {
        id: rows.map((it) => it.id)
      },
      include
    });

    return {count, offers: offers.map((item) => item.get())};
  }

  /**
   * Отдает объявление по Id
   * @async
   * @param {Number} id - id объявления
   * @return {Object} - найденное объявление
   */
  async getOne(id) {
    const offer = await this._offerModel.findByPk(id, {
      include: [Aliase.CATEGORIES, Aliase.COMMENTS, Aliase.OFFER_TYPE]
    });
    return offer.get();
  }

  /**
   * Обновление объявления по id
   * @async
   * @param {String} id - id объявления
   * @param {Object} offer - новое объявление
   * @return {Object} - получившиеся объявление
   */
  async update(id, offer) {
    const updatedOffer = await this._offerModel.update(offer, {
      where: {id},
      returning: true,
      plain: true
    });

    // Это только в постгресе работает.
    return updatedOffer[1].get();
  }
}

module.exports = OfferService;
