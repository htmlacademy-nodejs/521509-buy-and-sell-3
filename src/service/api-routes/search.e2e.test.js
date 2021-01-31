'use strict';

const express = require(`express`);
const supertest = require(`supertest`);

const initDB = require(`../lib/init-db`);
const {getSequelize} = require(`../lib/sequelize`);

const searchRouter = require(`./search`);
const SearchService = require(`../data-service/search`);
const defineModels = require(`../models`);

const {HttpCode} = require(`../../consts`);

const MOCK_DATA = require(`../../../data/mock-for-test`);

const app = express();
app.use(express.json());

const sequelize = getSequelize();
defineModels(sequelize);

beforeAll(async () => {
  await initDB(sequelize, MOCK_DATA);
  app.use(`/search`, searchRouter(new SearchService(sequelize)));
});


let response;

describe(`Search API returns offers based on search query`, () => {

  beforeAll(async () => {
    response = await supertest(app)
      .get(`/search`)
      .query({query: `советскую`});
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe((HttpCode.OK)));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(1));
});

describe(`Search API returns empty array if nothing found`, () => {

  beforeAll(async () => {
    response = await supertest(app)
      .get(`/search`)
      .query({query: `продам коляску`});
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe((HttpCode.OK)));
  test(`0 offers found`, () => expect(response.body.length).toBe(0));
});

describe(`Search API returns 400 and error, if query is missing`, () => {

  beforeAll(async () => {
    response = await supertest(app)
      .get(`/search`);
  });

  test(`Status code 400`, () => expect(response.statusCode).toBe((HttpCode.BAD_REQUEST)));
  test(`Message is correct`, () => expect(response.body.error.message).toBe(`Query string is empty.`));

  afterAll(async (done) => {
    await sequelize.close();
    done();
  });

});

