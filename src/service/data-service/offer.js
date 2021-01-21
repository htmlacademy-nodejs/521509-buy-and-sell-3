'use strict';

const Aliase = require(`../models/aliase`);

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
