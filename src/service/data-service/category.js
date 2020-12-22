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
    const categories = [];
    this._offers.forEach((it) => categories.push(...it.category));
    return [...new Set(categories)];
  }

}

module.exports = CategoryService;
