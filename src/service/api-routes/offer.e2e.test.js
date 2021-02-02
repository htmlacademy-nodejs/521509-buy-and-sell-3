'use strict';

const express = require(`express`);
const request = require(`supertest`);

const initDB = require(`../lib/init-db`);
const {getSequelize} = require(`../lib/sequelize`);

const offerRouter = require(`./offer`);
const OfferService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);
const defineModels = require(`../models`);

const {HttpCode} = require(`../../consts`);

const MOCK_DATA = require(`../../../data/mock-for-test`);

const NEW_OFFER = {
  typeId: 2,
  title: `Куплю телевизор`,
  imageUrl: `item1.jpg`,
  description: `Если найдёте дешевле — сброшу цену. Это настоящая находка для коллекционера!`,
  cost: 11474,
  categories: [1, 2]
};

const NEW_INVALID_OFFER = {
  typeId: -1,
  title: `Куплю`,
  imageUrl: `item1`,
  description: `Если найдёте.`,
  cost: 9,
  categories: null
};

const NEW_COMMENT = {
  text: `Comment from JEST. It is Valid.`,
};

const NEW_INVALID_COMMENT = {
  text: `Comment.`,
};

const createAPI = async () => {
  const app = express();
  app.use(express.json());

  const sequelize = getSequelize();
  defineModels(sequelize);

  await initDB(sequelize, MOCK_DATA);
  app.use(`/offers`, offerRouter(new OfferService(sequelize), new CommentService(sequelize)));
  return {app, sequelize};
};


describe(`API returns all offers`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app).get(`/offers`);
  });

  test(`Status Code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Return array with 3 items`, () => expect(response.body.offers.length).toBe(3));
  test(`Second item id is 2`, () => expect(response.body.offers[1].id).toBe(2));

  afterAll(async () => {
    await sequelize.close();
  });
});


describe(`API returns right offer Id`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app).get(`/offers/2`);
  });

  test(`Status Code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Item id is 2`, () => expect(response.body.id).toBe(2));
  test(`Item title is Продам коллекцию журналов «Огонёк»`, () => expect(response.body.title).toBe(`Продам коллекцию журналов «Огонёк»`));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API creates an offer if data is valid`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app).post(`/offers`).send(NEW_OFFER);
  });

  test(`Status Code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Return offer title and cost that created`, () => {
    expect(response.body.title).toBe(`Куплю телевизор`);
    expect(response.body.cost).toEqual(11474);
  });
  test(`Offers count is changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.offers.length).toBe(4)));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API returns 400 if posting offer is invalid`, () => {
  let app;
  let sequelize;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
  });

  test(`Status Code 400 without any key.`, async () => {
    for (const key of Object.keys(NEW_OFFER)) {
      const badOffer = {...NEW_OFFER};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect((res) => expect(res.statusCode).toBe(HttpCode.BAD_REQUEST));
    }
  });

  test(`There are 6 errors in invalid offer`, async () => {
    await request(app)
      .post(`/offers`)
      .send(NEW_INVALID_OFFER)
      .expect((res) => {
        expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(res.body.error.details.length).toBe(6);
      });
  });

  test(`Offers count isn't changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.offers.length).toBe(3)));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API changes offer after PUT request`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app).put(`/offers/2`).send(NEW_OFFER);
  });

  test(`Status Code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Return offer that updated`, () => {
    expect(response.body.title).toBe(`Куплю телевизор`);
    expect(response.body.cost).toEqual(11474);
  });
  test(`Offer is really changed`, () => request(app).get(`/offers/2`).expect((res) => {
    expect(res.body.title).toBe(`Куплю телевизор`);
    expect(res.body.cost).toEqual(11474);
  }));
  test(`Offers count isn't changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.offers.length).toBe(3)));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API returns 404 on not existing offer`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app).put(`/offers/21221`).send(NEW_OFFER);
  });

  test(`Status Code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
  test(`Returns error with message`, () => expect(response.body.error.message).toBe(`Offer doesn't exist`));
  test(`Offers count isn't changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.offers.length).toBe(3)));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API returns 400 on updating on invalid offer`, () => {
  let app;
  let sequelize;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
  });

  test(`Status Code 400`, async () => {
    for (const key of Object.keys(NEW_OFFER)) {
      const badOffer = {...NEW_OFFER};
      delete badOffer[key];
      await request(app)
        .put(`/offers/2`)
        .send(badOffer)
        .expect((res) => expect(res.statusCode).toBe(HttpCode.BAD_REQUEST));
    }
  });

  test(`There are 6 errors in invalid offer`, async () => {
    await request(app)
      .put(`/offers/2`)
      .send(NEW_INVALID_OFFER)
      .expect((res) => {
        expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
        expect(res.body.error.details.length).toBe(6);
      });
  });

  test(`Offers count isn't changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.offers.length).toBe(3)));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API delete offer after request`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app).delete(`/offers/2`);
  });

  test(`Status Code 204`, () => expect(response.statusCode).toBe(HttpCode.DELETED));
  test(`Offer is really deleted`, () => request(app).get(`/offers/2`).expect((res) => expect(res.statusCode).toBe(HttpCode.NOT_FOUND)));
  test(`Offers count is changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.offers.length).toBe(2)));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API get offer's comments`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app).get(`/offers/1/comments`);
  });

  test(`Status Code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`There are 5 comments`, () => expect(response.body.length).toBe(3));
  test(`Second comment text is right`, () => expect(response.body[1].text).toBe(`Оплата наличными или перевод на карту?А где блок питания?А сколько игр в комплекте?Продаю в связи с переездом. Отрываю от сердца.Неплохо, но дорогоВы что?! В магазине дешевле.Совсем немного...С чем связана продажа? Почему так дешёво?`));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API delete comment`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app).delete(`/offers/1/comments/2`);
  });

  test(`Status Code 204`, () => expect(response.statusCode).toBe(HttpCode.DELETED));
  test(`Comments count is changed`, () => request(app).get(`/offers/1/comments`).expect((res) => expect(res.body.length).toBe(2)));
  test(`Comments is really deleted`, () => request(app).get(`/offers/2/comments`).expect((res) => {
    let isCommentIdExist = false;
    for (const comment of res.body) {
      if (comment[`id`] === 2) {
        isCommentIdExist = true;
      }
    }
    expect(isCommentIdExist).toBeFalsy();
  }));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API delete comment doesn't exist`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app).delete(`/offers/2/comments/9999`);
  });

  test(`Status Code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
  test(`Comments count isn't changed`, () => request(app).get(`/offers/2/comments`).expect((res) => expect(res.body.length).toBe(1)));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API add comments to offer`, () => {
  let app;
  let sequelize;
  let response;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
    response = await request(app).post(`/offers/2/comments/`).send(NEW_COMMENT);
  });

  test(`Status Code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Return comment that created`, () => expect(response.body).toEqual(expect.objectContaining(NEW_COMMENT)));
  test(`Comments is really added`, () => request(app).get(`/offers/2/comments/`).expect((res) => {
    let addedComment = {};
    for (const comment of res.body) {
      if (comment.text === NEW_COMMENT.text) {
        addedComment = comment;
      }
    }
    expect(addedComment).toEqual(expect.objectContaining(addedComment));
  }));
  test(`Comments count is changed`, () => request(app).get(`/offers/2/comments/`).expect((res) => expect(res.body.length).toBe(2)));

  afterAll(async () => {
    await sequelize.close();
  });
});

describe(`API returns 400 if posting comment offer is without any key`, () => {
  let app;
  let sequelize;

  beforeAll(async () => {
    ({app, sequelize} = await createAPI());
  });

  test(`Status Code 400 without any key`, async () => {
    for (const key of Object.keys(NEW_COMMENT)) {
      const badComment = {...NEW_COMMENT};
      delete badComment[key];
      await request(app)
        .post(`/offers/2/comments/`)
        .send(badComment)
        .expect((res) => expect(res.statusCode).toBe(HttpCode.BAD_REQUEST));
    }
  });

  test(`Status code 400 for invalid comment`, async () => {
    await request(app)
      .post(`/offers/2/comments`)
      .send(NEW_INVALID_COMMENT)
      .expect((res) => expect(res.statusCode).toBe(HttpCode.BAD_REQUEST));
  });

  test(`Offer's comments count isn't changed`, () => request(app).get(`/offers/2/comments/`).expect((res) => expect(res.body.length).toBe(1)));

  afterAll(async () => {
    await sequelize.close();
  });
});
