'use strict';

const {nanoid} = require(`nanoid`);

const {MAX_ID_LENGTH} = require(`../../consts`);

/**
 * Сервис для работы с комментариями к объявлению
 */
class CommentService {
  /**
   * Приватный метод поиска индекса по комментариям. Вызывает ошибку, если индекс не найден.
   *
   * @param {Object} offer - объявление
   * @param {String} commentId - id искомого комментария
   * @return {number} - возвращает индекс найденного объявления.
   * @private
   */
  _findIndexById(offer, commentId) {
    const index = offer.comments.findIndex((it) => it.id === commentId);

    if (index < 0) {
      throw new Error(`Not found comment Id ${commentId} in offer Id ${offer.id}`);
    }

    return index;
  }


  /**
   * Добавление комментария к объявлению
   * @param {Object} offer - объявление
   * @param {Object} comment - добавляемый комментарий
   * @return {Object} - добавленный комментарий с id
   */
  add(offer, comment) {
    const newComment = {...comment, id: nanoid(MAX_ID_LENGTH)};

    offer.comments.push(newComment);

    return newComment;
  }

  /**
   * Удаление комментария к объявлению
   * @param {Object} offer - объявление
   * @param {String} commentId - id комментария
   */
  delete(offer, commentId) {
    offer.comments.splice(this._findIndexById(offer, commentId), 1);
  }

  /**
   * Возвращает все комментарии к объявлению
   * @param {Object} offer - объявление
   * @return {Object[]} - массив комментариев
   */
  getAll(offer) {
    return offer.comments;
  }

  /**
   * Возвращает комментарий к объявлению по id
   * @param {Object} offer - объявление
   * @param {String} commentId - id комментария
   * @return {Object[]} - массив комментариев
   */
  getOne(offer, commentId) {
    return offer.comments[this._findIndexById(offer, commentId)];
  }
}

module.exports = CommentService;
