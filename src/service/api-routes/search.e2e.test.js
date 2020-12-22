'use strict';

const express = require(`express`);
const supertest = require(`supertest`);

const searchRouter = require(`./search`);
const SearchService = require(`../data-service/search`);

const {HttpCode} = require(`../../consts`);

const MOCK_DATA = [
  {
    "type": `sale`,
    "id": `g4jOq`,
    "title": `Продам игрушку для собак`,
    "picture": `item12.jpg`,
    "description": `Обоснованный торг на месте. Мой дед не мог её сломать.`,
    "sum": 53833,
    "category": [
      `Журналы`,
      `Посуда`,
      `Животные`
    ],
    "comments": []
  },
  {
    "type": `offer`,
    "id": `-1S9-`,
    "title": `Куплю квартиру в центре, недорого`,
    "picture": `item3.jpg`,
    "description": `Таких предложений больше нет! Не пытайтесь торговаться. Цену вещам я знаю. Встреча только в масках и перчатках. При покупке с меня бесплатная доставка в черте города. Пользовались бережно и только по большим праздникам. Это настоящая находка для коллекционера! Кажется, что это хрупкая вещь. Встреча возможна только онлайн. Бонусом отдам все аксессуары. Две страницы заляпаны свежим кофе. Даю недельную гарантию. Мой дед не мог её сломать. Товар в отличном состоянии.`,
    "sum": 11093,
    "category": [
      `Игры`,
      `Журналы`,
      `Книги`
    ],
    "comments": []
  },
  {
    "type": `sale`,
    "id": `clTww`,
    "title": `Продам новую приставку Sony Playstation 5`,
    "picture": `item10.jpg`,
    "description": `Мой дед не мог её сломать. Таких предложений больше нет! Кажется, что это хрупкая вещь. Не надо спорить. Обоснованный торг на месте. Кому нужен этот новый телефон, если тут такое... Онлайн-показ. Встреча только в масках и перчатках.`,
    "sum": 18831,
    "category": [
      `Разное`
    ],
    "comments": [
      {
        "id": `IrWTm`,
        "text": `Неплохо, но дорогоА где блок питания?`
      }
    ]
  }
];

const app = express();

app.use(express.json());
app.use(`/search`, searchRouter(app, new SearchService(MOCK_DATA)));

let response;

describe(`Search API returns offers based on search query`, () => {

  beforeAll(async () => {
    response = await supertest(app)
      .get(`/search`)
      .query({query: `продам новую`});
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe((HttpCode.OK)));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`clTww`));
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
});
