'use strict';


const path = require(`path`);

const session = require(`express-session`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

const {Env} = require(`../../consts`);
if (process.env.NODE_ENV === Env.TESTING) {
  require(`dotenv`).config({path: path.resolve(__dirname, `../../../test.env`)});
} else {
  require(`dotenv`).config({path: path.resolve(__dirname, `../../../.env`)});
}


module.exports = async (app, sequelize) => {
  const mySessionStore = new SequelizeStore({
    db: sequelize,
    expiration: +process.env.SESSION_EXPIRATION,
    // expiration: 90000,
    checkExpirationInterval: +process.env.SESSION_CHECK_EXPIRATTION_INTERVAL,
  });

  app.use(session({
    secret: process.env.SESSIONS_SECRET,
    store: mySessionStore,
    resave: false,
    proxy: true,
    saveUninitialized: false,
  }));

  await sequelize.sync({force: false});
};


