'use strict';

const pino = require(`pino`);
const {Env} = require(`../../consts`);

const LOG_FILE = `./logs/api.log`;
let defaultLogLevel;
let logsDestination;
let isPrettyPrintEnabled;

switch (process.env.NODE_ENV) {
  case Env.PRODUCTION:
    defaultLogLevel = `error`;
    isPrettyPrintEnabled = false;
    logsDestination = pino.destination(LOG_FILE);
    break;
  case Env.TESTING:
    defaultLogLevel = `silent`;
    isPrettyPrintEnabled = true;
    logsDestination = process.stdout;
    break;
  default:
    defaultLogLevel = `debug`;
    isPrettyPrintEnabled = true;
    logsDestination = process.stdout;
    break;
}

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  prettyPrint: isPrettyPrintEnabled
}, logsDestination);

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
