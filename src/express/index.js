'use strict';

const express = require(`express`);
const chalk = require(`chalk`);

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const offersRoutes = require(`./routes/offers-routes`);

const PORT_NUMBER = 8080;

const app = express();

app.listen(PORT_NUMBER, (err) => {
  if (err) {
    console.log(chalk.red(err.message));
  }
  console.log(chalk.green(`Front server is started on port: ${PORT_NUMBER}`));
});

app.use(`/`, mainRoutes);
app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);
