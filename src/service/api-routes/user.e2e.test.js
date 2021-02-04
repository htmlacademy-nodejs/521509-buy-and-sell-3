'use strict';

const express = require(`express`);
const request = require(`supertest`);

const initDB = require(`../lib/init-db`);
const {getSequelize} = require(`../lib/sequelize`);

const userRouter = require(`./user`);
const UserService = require(`../data-service/user`);
const defineModels = require(`../models`);

const {HttpCode} = require(`../../consts`);

const MOCK_DATA = require(`../../../data/mock-for-test`);

const NEW_USER = {
  firstNameAndLastName: `Илья Варламов`,
  email: `abn@ya.ru`,
  password: `123456`,
  repeatPassword: `123456`
};

const NEW_USER_WITH_NOT_UNIQUE_EMAIL = {
  firstNameAndLastName: `Илья Варламов`,
  email: `zxcvbn@ya.ru`,
  password: `123456`,
  repeatPassword: `123456`
};

const NEW_INVALID_USER = {
  firstNameAndLastName: `И`,
  email: `abnya.ru`,
  password: `12`,
  repeatPassword: `1`
};

const createAPI = async () => {
  const app = express();
  app.use(express.json());

  const sequelize = getSequelize();
  defineModels(sequelize);

  await initDB(sequelize, MOCK_DATA);
  app.use(`/user`, userRouter(new UserService(sequelize)));
  return {app, sequelize};
};

describe(`Creating valid user is ok`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app)
      .post(`/user/add`)
      .send(NEW_USER);
  });

  test(`Status code 204`, () => expect(response.statusCode).toBe((HttpCode.CREATED)));
  test(`User first name and last name is equal`, () => expect(response.body.firstNameAndLastName).toBe(NEW_USER.firstNameAndLastName));
  test(`User email is equal`, () => expect(response.body.email).toBe(NEW_USER.email));
  test(`User password is not equal`, () => expect(response.body.password).not.toBe(NEW_USER.password));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API returns 400 if posting user is invalid`, () => {
  let app;
  let sequelize;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
  });

  test(`Status Code 400 without any key.`, async () => {
    for (const key of Object.keys(NEW_USER)) {
      const badUser = {...NEW_USER};
      delete badUser[key];
      await request(app)
        .post(`/user/add`)
        .send(badUser)
        .expect((res) => expect(res.statusCode).toBe(HttpCode.BAD_REQUEST));
    }
  });

  test(`There are 5 errors in invalid user`, async () => {
    await request(app)
      .post(`/user/add`)
      .send(NEW_INVALID_USER)
      .expect((res) => {
        expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(res.body.error.details.length).toBe(5);
      });
  });

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`Creating user with exists email should fail`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app)
      .post(`/user/add`)
      .send(NEW_USER_WITH_NOT_UNIQUE_EMAIL);
  });

  test(`Status code 400`, () => expect(response.statusCode).toBe((HttpCode.BAD_REQUEST)));

  afterAll(async () => {
    await sequelize.close();
  });
});


