'use strict';

require('../less/example-main.less');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _example = require('./example');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render((0, _example.clientSide)({ history: _reactRouter.browserHistory, children: _example.routes }), document.getElementById('entry-point'));