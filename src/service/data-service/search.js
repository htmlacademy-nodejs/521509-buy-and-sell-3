'use strict';

/**
 * Сервис для работы с поиском
 */

class SearchService {
  /**
   * @param {Object[]} offers - массив объявлений
   */
  constructor(offers) {
    this._offers = offers;
  }

  /**
   * Поиск по заголовкам объявлений.
   * @param {String} searchText - поисковый запрос
   * @return {Object[]} - найденные объявления
   */
  searchByTitle(searchText) {
    return this._offers.filter((it) => it.title.toLowerCase().includes(searchText.toLowerCase()));
  }
}

module.exports = SearchService;
