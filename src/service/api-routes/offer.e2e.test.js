'use strict';

const express = require(`express`);
const request = require(`supertest`);
const lodash = require(`lodash`);

const offerRouter = require(`./offer`);
const OfferService = require(`../data-service/offer`);
const CommentService = require(`../data-service/comment`);

const {HttpCode} = require(`../../consts`);

const MOCK_DATA = [
  {
    type: `offer`,
    id: `dotWy`,
    title: `Куплю детские санки`,
    picture: `item12.jpg`,
    description: `Даю недельную гарантию. Онлайн-показ. Таких предложений больше нет! Кому нужен этот новый телефон, если тут такое... Посмотреть или показать приезжайте сами, я не хочу никуда ехать. Если найдёте дешевле — сброшу цену. Бонусом отдам все аксессуары. Не пытайтесь торговаться. Цену вещам я знаю. Кажется, что это хрупкая вещь. Это настоящая находка для коллекционера!`,
    sum: 91217,
    category: [
      `Животные`
    ],
    comments: [
      {
        id: `iYbxW`,
        text: `Оплата наличными или перевод на карту?А сколько игр в комплекте?Продаю в связи с переездом. Отрываю от сердца.Вы что?! В магазине дешевле.С чем связана продажа? Почему так дешёво?А где блок питания?`
      },
      {
        id: `Q13UT`,
        text: `Неплохо, но дорогоС чем связана продажа? Почему так дешёво?Вы что?! В магазине дешевле.А где блок питания?Оплата наличными или перевод на карту?Почему в таком ужасном состоянии?`
      },
      {
        id: `3ybmf`,
        text: `Почему в таком ужасном состоянии?А где блок питания?`
      },
      {
        id: `YglwX`,
        text: `А где блок питания?Совсем немного...`
      },
      {
        id: `1KAS2`,
        text: `Оплата наличными или перевод на карту?А где блок питания?Вы что?! В магазине дешевле.Совсем немного...Почему в таком ужасном состоянии?Продаю в связи с переездом. Отрываю от сердца.А сколько игр в комплекте?`
      },
      {
        id: `_1Qsv`,
        text: `А где блок питания?С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `TgX7e`,
        text: `Вы что?! В магазине дешевле.Продаю в связи с переездом. Отрываю от сердца.А сколько игр в комплекте?Совсем немного...Оплата наличными или перевод на карту?Неплохо, но дорого`
      },
      {
        id: `u5Of8`,
        text: `А где блок питания?`
      },
      {
        id: `uo11w`,
        text: `Почему в таком ужасном состоянии?С чем связана продажа? Почему так дешёво?Вы что?! В магазине дешевле.Оплата наличными или перевод на карту?`
      },
      {
        id: `88g6M`,
        text: `А сколько игр в комплекте?Совсем немного...А где блок питания?Продаю в связи с переездом. Отрываю от сердца.Неплохо, но дорого`
      },
      {
        id: `6Uw4a`,
        text: `Оплата наличными или перевод на карту?`
      },
      {
        id: `_Ysd8`,
        text: `Совсем немного...С чем связана продажа? Почему так дешёво?Неплохо, но дорогоВы что?! В магазине дешевле.Почему в таком ужасном состоянии?А сколько игр в комплекте?Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        id: `EDn6o`,
        text: `С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `pxhOb`,
        text: `Почему в таком ужасном состоянии?Неплохо, но дорогоВы что?! В магазине дешевле.Оплата наличными или перевод на карту?Продаю в связи с переездом. Отрываю от сердца.Совсем немного...А где блок питания?`
      }
    ]
  },
  {
    type: `offer`,
    id: `3z3Ou`,
    title: `Приму в дар вашу машину`,
    picture: `item10.jpg`,
    description: `Мой дед не мог её сломать. Таких предложений больше нет! Кажется, что это хрупкая вещь. Продаю с болью в сердце... Обоснованный торг на месте. Бонусом отдам все аксессуары. При покупке с меня бесплатная доставка в черте города. Товар в отличном состоянии. Встреча возможна только онлайн. Даю недельную гарантию. Пользовались бережно и только по большим праздникам.`,
    sum: 5752,
    category: [
      `Журналы`,
      `Книги`,
      `Игры`,
      `Разное`,
      `Посуда`
    ],
    comments: [
      {
        id: `du2oc`,
        text: `Оплата наличными или перевод на карту?А где блок питания?С чем связана продажа? Почему так дешёво?Вы что?! В магазине дешевле.`
      },
      {
        id: `V_Voi`,
        text: `А сколько игр в комплекте?Совсем немного...Продаю в связи с переездом. Отрываю от сердца.А где блок питания?Вы что?! В магазине дешевле.Неплохо, но дорогоС чем связана продажа? Почему так дешёво?Оплата наличными или перевод на карту?`
      },
      {
        id: `7mNVd`,
        text: `Оплата наличными или перевод на карту?А где блок питания?Совсем немного...С чем связана продажа? Почему так дешёво?Продаю в связи с переездом. Отрываю от сердца.Вы что?! В магазине дешевле.А сколько игр в комплекте?Почему в таком ужасном состоянии?`
      },
      {
        id: `8qVk7`,
        text: `Вы что?! В магазине дешевле.А сколько игр в комплекте?А где блок питания?Продаю в связи с переездом. Отрываю от сердца.Неплохо, но дорогоСовсем немного...`
      }
    ]
  },
  {
    type: `offer`,
    id: `vylYw`,
    title: `Куплю квартиру в центре, недорого`,
    picture: `item15.jpg`,
    description: `Это настоящая находка для коллекционера! Пользовались бережно и только по большим праздникам. Даю недельную гарантию. Кому нужен этот новый телефон, если тут такое... Не пытайтесь торговаться. Цену вещам я знаю. Кажется, что это хрупкая вещь. Обоснованный торг на месте. Мой дед не мог её сломать. Онлайн-показ. Две страницы заляпаны свежим кофе. Встреча возможна только онлайн. Если товар не понравится — верну всё до последней копейки. Если найдёте дешевле — сброшу цену. Продаю с болью в сердце... Посмотреть или показать приезжайте сами, я не хочу никуда ехать. При покупке с меня бесплатная доставка в черте города. Бонусом отдам все аксессуары. Товар в отличном состоянии. Встреча только в масках и перчатках.`,
    sum: 13803,
    category: [
      `Посуда`,
      `Игры`
    ],
    comments: [
      {
        id: `c4fxq`,
        text: `Оплата наличными или перевод на карту?А где блок питания?Почему в таком ужасном состоянии?А сколько игр в комплекте?Совсем немного...С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `GPkSP`,
        text: `Почему в таком ужасном состоянии?С чем связана продажа? Почему так дешёво?А сколько игр в комплекте?Продаю в связи с переездом. Отрываю от сердца.А где блок питания?Вы что?! В магазине дешевле.Оплата наличными или перевод на карту?`
      },
      {
        id: `mCTQC`,
        text: `Совсем немного...А сколько игр в комплекте?Неплохо, но дорого`
      },
      {
        id: `K3KAV`,
        text: `А сколько игр в комплекте?Продаю в связи с переездом. Отрываю от сердца.А где блок питания?Совсем немного...Оплата наличными или перевод на карту?С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `7wVCc`,
        text: `А где блок питания?Совсем немного...Продаю в связи с переездом. Отрываю от сердца.Неплохо, но дорогоВы что?! В магазине дешевле.Почему в таком ужасном состоянии?С чем связана продажа? Почему так дешёво?`
      },
      {
        id: `rB_vF`,
        text: `Почему в таком ужасном состоянии?А сколько игр в комплекте?С чем связана продажа? Почему так дешёво?А где блок питания?Совсем немного...Вы что?! В магазине дешевле.Оплата наличными или перевод на карту?`
      },
      {
        id: `qlRJx`,
        text: `А сколько игр в комплекте?Неплохо, но дорогоВы что?! В магазине дешевле.Совсем немного...Почему в таком ужасном состоянии?Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        id: `kXFc1`,
        text: `Совсем немного...С чем связана продажа? Почему так дешёво?Оплата наличными или перевод на карту?Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        id: `rVd9o`,
        text: `Почему в таком ужасном состоянии?Вы что?! В магазине дешевле.Продаю в связи с переездом. Отрываю от сердца.А сколько игр в комплекте?`
      },
      {
        id: `DGEdS`,
        text: `Совсем немного...Оплата наличными или перевод на карту?Неплохо, но дорогоПочему в таком ужасном состоянии?`
      }
    ]
  },
  {
    type: `offer`,
    id: `y2Dd2`,
    title: `Куплю ноутбук`,
    picture: `item7.jpg`,
    description: `Если найдёте дешевле — сброшу цену. Это настоящая находка для коллекционера!`,
    sum: 11474,
    category: [
      `Игры`,
      `Разное`
    ],
    comments: [
      {
        id: `vbxtJ`,
        text: `А где блок питания?`
      },
      {
        id: `R4CPA`,
        text: `Продаю в связи с переездом. Отрываю от сердца.С чем связана продажа? Почему так дешёво?А сколько игр в комплекте?Почему в таком ужасном состоянии?Совсем немного...Вы что?! В магазине дешевле.`
      },
      {
        id: `b-hWq`,
        text: `Почему в таком ужасном состоянии?Совсем немного...Вы что?! В магазине дешевле.А где блок питания?А сколько игр в комплекте?`
      },
      {
        id: `oh2ah`,
        text: `Совсем немного...Вы что?! В магазине дешевле.А где блок питания?А сколько игр в комплекте?С чем связана продажа? Почему так дешёво?Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        id: `_WLGR`,
        text: `С чем связана продажа? Почему так дешёво?Продаю в связи с переездом. Отрываю от сердца.Вы что?! В магазине дешевле.А где блок питания?`
      }
    ]
  }
];

const NEW_OFFER = {
  type: `offer`,
  title: `Куплю телевизор`,
  picture: `item1.jpg`,
  description: `Если найдёте дешевле — сброшу цену. Это настоящая находка для коллекционера!`,
  sum: 11474,
  category: [
    `Игры`,
    `Разное`
  ]
};

const NEW_COMMENT = {
  text: `Comment from JEST`,
};

const createAPI = () => {
  const app = express();
  app.use(express.json());

  const mockData = lodash.cloneDeep(MOCK_DATA);
  app.use(`/offers`, offerRouter(new OfferService(mockData), new CommentService()));
  return app;
};


describe(`API returns all offers`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers`);
  });

  test(`Status Code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Return array with 4 items`, () => expect(response.body.length).toBe(4));
  test(`First item id is dotWy`, () => expect(response.body[0].id).toBe(`dotWy`));
});

describe(`API returns right offer Id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/vylYw`);
  });

  test(`Status Code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Item id is dotWy`, () => expect(response.body.id).toBe(`vylYw`));
  test(`Item title is Куплю квартиру в центре, недорого`, () => expect(response.body.title).toBe(`Куплю квартиру в центре, недорого`));
});

describe(`API creates an offer if data is valid`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/offers`).send(NEW_OFFER);
  });

  test(`Status Code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Return offer that created`, () => expect(response.body).toEqual(expect.objectContaining(NEW_OFFER)));
  test(`Offers count is changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.length).toBe(5)));
});

describe(`API returns 400 if posting offer is invalid`, () => {
  const app = createAPI();

  test(`Status Code 400`, async () => {
    for (const key of Object.keys(NEW_OFFER)) {
      const badOffer = {...NEW_OFFER};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect((res) => expect(res.statusCode).toBe(HttpCode.BAD_REQUEST));
    }
  });
  test(`Offers count isn't changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.length).toBe(4)));
});

describe(`API changes offer after PUT request`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).put(`/offers/y2Dd2`).send(NEW_OFFER);
  });

  test(`Status Code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Return offer that updated`, () => expect(response.body).toEqual(expect.objectContaining(NEW_OFFER)));
  test(`Offer is really changed`, () => request(app).get(`/offers/y2Dd2`).expect((res) => expect(res.body).toEqual(expect.objectContaining(NEW_OFFER))));
  test(`Offers count isn't changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.length).toBe(4)));
});

describe(`API returns 404 on not existing offer`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).put(`/offers/21221`).send(NEW_OFFER);
  });

  test(`Status Code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
  test(`Returns error with message`, () => expect(response.body.error.message).toBe(`Offer doesn't exist`));
  test(`Offers count isn't changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.length).toBe(4)));
});

describe(`API returns 400 on updating on invalid offer`, () => {
  const app = createAPI();

  test(`Status Code 400`, async () => {
    for (const key of Object.keys(NEW_OFFER)) {
      const badOffer = {...NEW_OFFER};
      delete badOffer[key];
      await request(app)
        .put(`/offers/y2Dd2`)
        .send(badOffer)
        .expect((res) => expect(res.statusCode).toBe(HttpCode.BAD_REQUEST));
    }
  });
  test(`Offers count isn't changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.length).toBe(4)));
});

describe(`API changes offer after request`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/offers/y2Dd2`);
  });

  test(`Status Code 204`, () => expect(response.statusCode).toBe(HttpCode.DELETED));
  test(`Offer is really deleted`, () => request(app).get(`/offers/y2Dd2`).expect((res) => expect(res.statusCode).toBe(HttpCode.NOT_FOUND)));
  test(`Offers count is changed`, () => request(app).get(`/offers`).expect((res) => expect(res.body.length).toBe(3)));
});

describe(`API get offer's comments`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/offers/y2Dd2/comments`);
  });

  test(`Status Code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`There are 5 comments`, () => expect(response.body.length).toBe(5));
  test(`Second comment id is b-hWq`, () => expect(response.body[1].id).toBe(`R4CPA`));
});

describe(`API delete comment`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/offers/y2Dd2/comments/R4CPA`);
  });

  test(`Status Code 204`, () => expect(response.statusCode).toBe(HttpCode.DELETED));
  test(`Comments count is changed`, () => request(app).get(`/offers/y2Dd2/comments`).expect((res) => expect(res.body.length).toBe(4)));
  test(`Comments is really deleted`, () => request(app).get(`/offers/y2Dd2/comments`).expect((res) => {
    let isCommentIdExist = false;
    for (const comment in res.body) {
      if (comment[`id`] === `R4CPA`) {
        isCommentIdExist = true;
      }
    }
    expect(isCommentIdExist).toBeFalsy();
  }));
});

describe(`API delete comment doesn't exist`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).delete(`/offers/y2Dd2/comments/R4CPA212`);
  });

  test(`Status Code 404`, () => expect(response.statusCode).toBe(HttpCode.NOT_FOUND));
  test(`Comments count isn't changed`, () => request(app).get(`/offers/y2Dd2/comments`).expect((res) => expect(res.body.length).toBe(5)));
});

describe(`API add comments to offer`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app).post(`/offers/y2Dd2/comments/`).send(NEW_COMMENT);
  });

  test(`Status Code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Return comment that created`, () => expect(response.body).toEqual(expect.objectContaining(NEW_COMMENT)));
  test(`Comments is really added`, () => request(app).get(`/offers/y2Dd2/comments/`).expect((res) => {
    let addedComment = {};
    for (const comment in res.body) {
      if (comment.text === NEW_COMMENT.text) {
        addedComment = comment;
      }
    }
    expect(addedComment).toEqual(expect.objectContaining(addedComment));
  }));
  test(`Comments count is changed`, () => request(app).get(`/offers/y2Dd2/comments/`).expect((res) => expect(res.body.length).toBe(6)));
});

describe(`API returns 400 if posting comment offer is without any key`, () => {
  const app = createAPI();

  test(`Status Code 400`, async () => {
    for (const key of Object.keys(NEW_COMMENT)) {
      const badComment = {...NEW_COMMENT};
      delete badComment[key];
      await request(app)
        .post(`/offers/y2Dd2/comments/`)
        .send(badComment)
        .expect((res) => expect(res.statusCode).toBe(HttpCode.BAD_REQUEST));
    }
  });
  test(`Offer's comments count isn't changed`, () => request(app).get(`/offers/y2Dd2/comments/`).expect((res) => expect(res.body.length).toBe(5)));
});
