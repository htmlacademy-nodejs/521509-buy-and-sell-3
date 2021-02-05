'use strict';

const MOCK_OFFER_TYPE = [{title: `offer`}, {title: `sale`}];

const MOCK_CATEGORIES = [{title: `Разное`}, {title: `Животные`}, {title: `Книги`}, {title: `Журналы`}, {title: `Посуда`}, {title: `Игры`}];

const MOCK_USERS = [
  {
    firstNameAndLastName: `Яна Жванецкий`,
    email: `zxcvbn@ya.ru`,
    avatar: `avatar02.jpg`,
    password: `$2b$10$IX8aybWvJ.J6K9ySkavVTuJ4WYylqJxcTnv3.fcMv4QdgcQ0DJAA6`
  },
  {
    firstNameAndLastName: `Лев Коротких`,
    email: `qwe312341@gmail.com`,
    avatar: `avatar04.jpg`,
    password: `$2b$10$VwlP35bPMkRAMIJVqAmwg..ddoopW8ojss93007T6SXP98.9OvxZC`
  },
  {
    firstNameAndLastName: `Дарья Коваль`,
    email: `asd@mail.ru`,
    avatar: `avatar01.jpg`,
    password: `$2b$10$Z7Ije4z.Jm8nsJM7dkxJ5ef5qzAhx/k/9j9uht1.GOJP/O1ccJcNq`
  },
  {
    firstNameAndLastName: `Инокентий Долгих`,
    email: `ghjkl@gmail.com`,
    avatar: `avatar02.jpg`,
    password: `$2b$10$JgmUkBaBfI8MqxlLRtmoVeDRgB8BJ099Zabx2wVMGj7he2dSiqydm`
  },
  {
    firstNameAndLastName: `Дарья Денисов`,
    email: `asdfg@ya.ru`,
    avatar: `avatar01.jpg`,
    password: `$2b$10$MrfWJyy4FzNtvI4KTpI8BOj9X2tU73o5O6yN4yoxJwqGdiTfha8Xy`
  }
];

const MOCK_OFFERS = [
  {
    'type_id': 1,
    'title': `Продам советскую посуду. Почти не разбита`,
    'description': `Обоснованный торг на месте. Продаю с болью в сердце... Посмотреть или показать приезжайте сами, я не хочу никуда ехать. При покупке с меня бесплатная доставка в черте города. Две страницы заляпаны свежим кофе. Кажется, что это хрупкая вещь. Встреча только в масках и перчатках.`,
    'created_at': `2020-12-22T09:19:41.508Z`,
    'imageUrl': `item06.jpg`,
    'cost': 97126,
    'user_id': 1
  },
  {
    'type_id': 2,
    'title': `Продам коллекцию журналов «Огонёк»`,
    'description': `Кажется, что это хрупкая вещь. Обоснованный торг на месте. Бонусом отдам все аксессуары. Таких предложений больше нет! Встреча возможна только онлайн. Не пытайтесь торговаться. Цену вещам я знаю. Онлайн-показ. Пользовались бережно и только по большим праздникам. Если найдёте дешевле — сброшу цену. Кому нужен этот новый телефон, если тут такое...`,
    'created_at': `2021-01-25T10:56:22.909Z`,
    'imageUrl': `item16.jpg`,
    'cost': 53378,
    'user_id': 3
  },
  {
    'type_id': 2,
    'title': `Продам книги Стивена Кинга`,
    'description': `Не надо спорить.`,
    'created_at': `2020-12-23T12:00:47.320Z`,
    'imageUrl': `item07.jpg`,
    'cost': 37180,
    'user_id': 1
  }];

const MOCK_COMMENTS = [
  {
    'text': `Совсем немного...С чем связана продажа? Почему так дешёво?Неплохо, но дорогоВы что?! В магазине дешевле.`,
    'created_at': `2020-11-12T17:32:33.522Z`,
    'offer_id': 1,
    'user_id': 2
  },
  {
    'text': `Оплата наличными или перевод на карту?А где блок питания?А сколько игр в комплекте?Продаю в связи с переездом. Отрываю от сердца.Неплохо, но дорогоВы что?! В магазине дешевле.Совсем немного...С чем связана продажа? Почему так дешёво?`,
    'created_at': `2020-11-26T10:32:38.093Z`,
    'offer_id': 1,
    'user_id': 2
  },
  {
    'text': `Продаю в связи с переездом. Отрываю от сердца.Почему в таком ужасном состоянии?Оплата наличными или перевод на карту?А где блок питания?`,
    'created_at': `2020-11-23T20:49:13.227Z`,
    'offer_id': 1,
    'user_id': 2
  },
  {
    'text': `Оплата наличными или перевод на карту?Неплохо, но дорогоС чем связана продажа? Почему так дешёво?Совсем немного...Продаю в связи с переездом. Отрываю от сердца.Вы что?! В магазине дешевле.Почему в таком ужасном состоянии?`,
    'created_at': `2021-01-25T18:15:08.778Z`,
    'offer_id': 2,
    'user_id': 1
  },
  {
    'text': `Почему в таком ужасном состоянии?Продаю в связи с переездом. Отрываю от сердца.С чем связана продажа? Почему так дешёво?Оплата наличными или перевод на карту?А сколько игр в комплекте?`,
    'created_at': `2020-12-25T18:36:56.631Z`,
    'offer_id': 3,
    'user_id': 3
  },
  {
    'text': `Продаю в связи с переездом. Отрываю от сердца.Неплохо, но дорогоА где блок питания?Совсем немного...Оплата наличными или перевод на карту?С чем связана продажа? Почему так дешёво?Вы что?! В магазине дешевле.`,
    'created_at': `2020-11-09T22:20:58.388Z`,
    'offer_id': 3,
    'user_id': 4
  }];

const MOCK_OFFERS_CATEGORIES = [
  {'offer_id': 1, 'category_id': 5},
  {'offer_id': 1, 'category_id': 3},
  {'offer_id': 2, 'category_id': 4},
  {'offer_id': 3, 'category_id': 2},
  {'offer_id': 3, 'category_id': 3},
  {'offer_id': 3, 'category_id': 5},
  {'offer_id': 3, 'category_id': 1}
];

module.exports = {
  offerTypes: MOCK_OFFER_TYPE,
  categories: MOCK_CATEGORIES,
  offers: MOCK_OFFERS,
  comments: MOCK_COMMENTS,
  offersCategories: MOCK_OFFERS_CATEGORIES,
  users: MOCK_USERS
};
