'use strict';

const version = require(`./version`);
const help = require(`./help`);
const server = require(`./server`);
const filldb = require(`./filldb`);

const Cli = {
  [version.name]: version,
  [help.name]: help,
  [server.name]: server,
  [filldb.name]: filldb
};


module.exports = {Cli};
