'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../consts`);
const {getLogger} = require(`../lib/logger`);


module.exports = (searchService) => {
  const logger = getLogger({name: `api`});

  const router = new Router();

  router.get(`/`, (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      logger.error(`Пользователь обратился с несуществующим поисковым запросом.`);
      res.status(HttpCode.BAD_REQUEST).json({error: {code: HttpCode.BAD_REQUEST, message: `Query string is empty.`, details: `Query string is empty. Check it.`}});
      return;
    }

    const searchResults = searchService.searchByTitle(query);

    res.status(HttpCode.OK).json(searchResults);
  });

  return router;
};
