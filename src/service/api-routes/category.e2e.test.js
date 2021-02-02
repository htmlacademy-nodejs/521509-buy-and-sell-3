'use strict';

const express = require(`express`);
const request = require(`supertest`);

const initDB = require(`../lib/init-db`);
const {getSequelize} = require(`../lib/sequelize`);

const categoryRouter = require(`./category`);
const CategoryService = require(`../data-service/category`);
const defineModels = require(`../models`);

const {HttpCode} = require(`../../consts`);

const MOCK_DATA = require(`../../../data/mock-for-test`);

let app;
let sequelize;

beforeAll(async () => {
  app = express();
  app.use(express.json());

  sequelize = getSequelize();
  defineModels(sequelize);

  await initDB(sequelize, MOCK_DATA);
  app.use(`/category`, categoryRouter(new CategoryService(sequelize)));
});


describe(`API returns category list`, () => {

  let response;

  beforeAll(async () => {
    response = await request(app).get(`/category`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 6 categories`, () => expect(response.body.length).toBe(6));

  test(`Category names are Разное, Животные, Книги, Журналы, Посуда, Игры`,
      () => expect(response.body.map((it) => it.title)).toEqual(
          expect.arrayContaining([`Разное`, `Животные`, `Книги`, `Журналы`, `Посуда`, `Игры`])
      )
  );

  afterAll(async () => {
    await sequelize.close();
  });

});


