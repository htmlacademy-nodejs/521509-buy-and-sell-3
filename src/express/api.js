'use strict';

const axios = require(`axios`);

const {Methods} = require(`../consts`);

const TIMEOUT = 1000;

const DEFAULT_PORT = 3000;
const DEFAULT_BASE_URL = `http://localhost:${DEFAULT_PORT}/api`;

class API {
  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout
    });
  }

  async _request(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  getOffers({isWithComments} = {isWithComments: false}) {
    return this._request(`/offers`, {params: {isWithComments}});
  }

  getOffer(id) {
    return this._request(`/offers/${id}`);
  }

  getOfferTypes() {
    return this._request(`/offer-types`);
  }

  search(query) {
    return this._request(`/search`, {params: {query}});
  }

  getCategories({isWithCount} = {isWithCount: false}) {
    return this._request(`/category`, {params: {isWithCount}});
  }

  createOffer(data) {
    return this._request(`/offers`, {
      method: Methods.POST,
      data
    });
  }

  static getDefaultAPI() {
    const baseURL = process.env.API_URL || DEFAULT_BASE_URL;
    return new this(baseURL, TIMEOUT);
  }
}

module.exports = API;
