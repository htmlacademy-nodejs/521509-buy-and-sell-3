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

  getOffers() {
    return this._request(`/offers`);
  }

  getOffer(id) {
    return this._request(`/offers/${id}`);
  }

  search(query) {
    return this._request(`/search`, {params: {query}});
  }

  getCategories() {
    return this._request(`/category`);
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
