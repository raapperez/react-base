'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require('../configs/config.json')[env];
const winston = require('winston');

winston.level = config.winston.level || 'error';

winston.add(winston.transports.File, {
    filename: __dirname + '/../log/api-maplink-fleet.log',
    json: false,
    maxFiles: 10,
    maxsize: 1048576 * 5,
    colorize: false
});

module.exports = winston;