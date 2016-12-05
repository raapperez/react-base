'use strict';

const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    module.exports = require('./webpack.config.dev');

} else {
    module.exports = require('./webpack.config.prod');
}