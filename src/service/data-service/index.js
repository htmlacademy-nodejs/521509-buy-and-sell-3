'use strict';

const CategoryService = require(`./category`);
const OfferService = require(`./offer`);
const CommentService = require(`./comment`);
const SearchService = require(`./search`);
const OfferTypeService = require(`./offer-type`);
const UserService = require(`./user`);

module.exports = {
  CategoryService,
  OfferService,
  CommentService,
  SearchService,
  OfferTypeService,
  UserService
};
