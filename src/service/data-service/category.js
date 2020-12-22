'use strict';

/**
 * Сервис для работы с категориями
 */

class CategoryService {
  /**
   * @param {Object[]} offers - массив объявлений
   */
  constructor(offers) {
    this._offers = offers;
  }

  /**
   * Отдает все категории, для который есть объявления.
   * @return {String[]}
   */
  getAll() {
    const categories = new Set();
    this._offers.forEach((it) => categories.add(...it.category));
    return [...categories];
  }

}

module.exports = CategoryService;
