'use strict';

const {nanoid} = require(`nanoid`);

const {MAX_ID_LENGTH} = require(`../../consts`);

/**
 * Сервис для работы с объявлениями
 */
class OfferService {
  /**
   * @param {Object[]} offers - массив объявлений
   */
  constructor(offers) {
    this._offers = offers;
  }

  /**
   * Приватный метод поиска индекса по объявлениям. Вызывает ошибку, если индекс не найден.
   *
   * @param {String} id - id искомого объявления
   * @return {number} - возвращает индекс найденного объявления.
   * @private
   */
  _findIndexById(id) {
    const index = this._offers.findIndex((it) => it.id === id);

    if (index < 0) {
      throw new Error(`Not Found offer with ID ${id}`);
    }

    return index;
  }

  /**
   * Добавление нового объявления с добавлением к нему id и пустого массива с комментариями.
   *
   * @param {Object} offer - объявление
   * @return {Object} - возвращает созданное объявление
   */
  add(offer) {
    const newOffer = {...offer, id: nanoid(MAX_ID_LENGTH), comments: []};

    this._offers.push(newOffer);

    return newOffer;
  }

  /**
   * Удаоение объявления по id
   * @param {String} id - id объявления
   */
  delete(id) {
    this._offers.splice(this._findIndexById(id), 1);
  }

  /**
   * Отдача все объявлений, которые есть.
   * @return {Object[]}
   */
  getAll() {
    return this._offers;
  }

  /**
   * Отдает объявление по Id
   * @param {String} id - id объявления
   * @return {Object} - найденное объявление
   */
  getOne(id) {
    return this._offers[this._findIndexById(id)];
  }

  /**
   * Обновление объявления по id
   * @param {String} id - id объявления
   * @param {Object} offer - новое объявление
   * @return {Object} - получившиеся объявление
   */
  update(id, offer) {
    const index = this._findIndexById(id);
    this._offers[index] = {...this._offers[index], ...offer};
    return this._offers[index];
  }
}

module.exports = OfferService;
