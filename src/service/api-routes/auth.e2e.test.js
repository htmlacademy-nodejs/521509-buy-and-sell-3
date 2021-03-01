'use strict';

const express = require(`express`);
const request = require(`supertest`);

const initDB = require(`../lib/init-db`);
const {getSequelize} = require(`../lib/sequelize`);
const initSessions = require(`../lib/init-sessions`);

const authRouter = require(`./auth`);
const UserService = require(`../data-service/user`);
const defineModels = require(`../models`);

const {HttpCode} = require(`../../consts`);

const MOCK_DATA = require(`../../../data/mock-for-test`);

const USER = {
  email: `zxcvbn@ya.ru`,
  password: `123456`,
};

const USER_WITH_WRONG_PASSWORD = {
  email: `zxcvbn@ya.ru`,
  password: `123`
};

const createAPI = async () => {
  const app = express();
  app.use(express.json());

  const sequelize = getSequelize();
  await initSessions(app, sequelize);
  defineModels(sequelize);


  await initDB(sequelize, MOCK_DATA);
  app.use(`/auth`, authRouter(new UserService(sequelize)));
  return {app, sequelize};
};

describe(`Login user is ok`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app)
      .post(`/auth`)
      .send(USER);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe((HttpCode.OK)));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API returns 400 if password is wrong`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app)
      .post(`/auth`)
      .send(USER_WITH_WRONG_PASSWORD);
  });

  test(`Status code 400`, () => expect(response.statusCode).toBe((HttpCode.BAD_REQUEST)));

  afterAll(async () => {
    await sequelize.close();
  });
});
