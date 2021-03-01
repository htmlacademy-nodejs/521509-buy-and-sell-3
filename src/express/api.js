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

  async _request(url, options, token) {
    const headers = token ? {authorization: token} : {};
    const response = await this._http.request({url, ...options, headers});
    return response.data;
  }

  getOffers({page, isWithComments, categoryId, isOnlyUser, accessToken} = {}) {
    let addRoute = ``;
    if (isOnlyUser) {
      addRoute = `/my`;
    }
    return this._request(`/offers${addRoute}`, {params: {page, categoryId, isWithComments}}, accessToken);
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

  createUser(data) {
    return this._request(`/user`, {
      method: Methods.POST,
      data
    });
  }

  authUser(data) {
    return this._request(`/auth`, {
      method: Methods.POST,
      data
    });
  }

  refreshTokens(refreshToken) {
    return this._request(`/auth/refresh`, {
      method: Methods.POST,
      data: {refreshToken}
    });
  }

  static getDefaultAPI() {
    const baseURL = process.env.API_URL || DEFAULT_BASE_URL;
    return new this(baseURL, TIMEOUT);
  }
}

module.exports = API;
