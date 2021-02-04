'use strict';

/**
 * Подключаем все модули, и настраиваем связи
 */


const defineOfferType = require(`./offer-type`);
const defineCategory = require(`./category`);
const defineUser = require(`./user`);
const defineOffer = require(`./offer`);
const defineComment = require(`./comment`);
const defineOfferCategory = require(`./offer-category`);
const Alias = require(`./aliase`);

const define = (sequelize) => {
  /**
   * Создаем все необходимые модели
   */
  const OfferType = defineOfferType(sequelize);
  const Category = defineCategory(sequelize);
  const User = defineUser(sequelize);
  const Offer = defineOffer(sequelize);
  const Comment = defineComment(sequelize);
  const OfferCategory = defineOfferCategory(sequelize);

  /**
   * Настраиваем связи
   */

  /**
   * Связь "тип объявления - объявление".
   * один ко многим, так как у одного типа может несколько объявлений, а у одного объявления только один тип.
   */
  OfferType.hasMany(Offer, {as: Alias.OFFERS, foreignKey: `type_id`});
  Offer.belongsTo(OfferType, {as: Alias.OFFER_TYPE, foreignKey: `type_id`});

  /**
   * Связь "категории - объявления".
   * Многие ко многим, так как у одной категории может быть много объявлений, а у одного объявления много категорий.
   * Используется связь  super-many-to-many https://sequelize.org/master/manual/advanced-many-to-many.html
   */
  Category.belongsToMany(Offer, {
    through: OfferCategory,
    as: Alias.OFFERS,
    foreignKey: `category_id`,
    otherKey: `offer_id`
  });
  Offer.belongsToMany(Category, {
    through: OfferCategory,
    as: Alias.CATEGORIES,
    foreignKey: `offer_id`,
    otherKey: `category_id`
  });
  Category.hasMany(OfferCategory, {as: Alias.OFFER_CATEGORIES, foreignKey: `category_id`});
  Offer.hasMany(OfferCategory, {as: Alias.OFFER_CATEGORIES, foreignKey: `offer_id`});

  /**
   * Связь пользователь - объявление
   * один ко многим, у пользователя может быть много объявлений, а у объявления только один владелец.
   */
  User.hasMany(Offer, {as: Alias.OFFERS, foreignKey: `user_id`});
  Offer.belongsTo(User, {as: Alias.USERS, foreignKey: `user_id`});

  /**
   * Связь объявление - комментарий
   * один ко многим, у объявления много комментариев, а комментарий к одному только объявлению.
   */
  Offer.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `offer_id`});
  Comment.belongsTo(Offer, {as: Alias.OFFERS, foreignKey: `offer_id`});

  /**
   * Связь пользователь - комментарий
   * один ко многим, у пользователя много комментариев, а комментария один автор.
   */
  User.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `user_id`});
  Comment.belongsTo(User, {as: Alias.USERS, foreignKey: `user_id`});

  return {
    OfferType,
    Category,
    User,
    Offer,
    Comment,
    OfferCategory};
};

module.exports = define;
