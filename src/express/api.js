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
      timeout,
      withCredentials: true
    });
  }

  async _request(url, options) {
    const response = await this._http.request({url, ...options, withCredentials: true});
    const cookies = response.headers[`set-cookie`] || response.headers[`cookie`];
    return {data: response.data, cookies};
  }

  getOffers({page, isWithComments, categoryId, isOnlyUser, cookies} = {}) {
    let addRoute = ``;
    if (isOnlyUser) {
      addRoute = `/my`;
    }
    return this._request(`/offers${addRoute}`, {params: {page, categoryId, isWithComments}, headers: {Cookie: cookies}});
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

  checkUserAuth({cookies = ``}) {
    return this._request(`/auth`, {headers: {Cookie: cookies}});
  }

  static getDefaultAPI() {
    const baseURL = process.env.API_URL || DEFAULT_BASE_URL;
    return new this(baseURL, TIMEOUT);
  }
}

module.exports = API;
