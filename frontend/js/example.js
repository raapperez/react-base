'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.routes = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _example = require('./pages/example');

var _example2 = _interopRequireDefault(_example);

var _reactRedux = require('react-redux');

var _exampleStore = require('./stores/example-store');

var _exampleStore2 = _interopRequireDefault(_exampleStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var routes = exports.routes = _react2.default.createElement(
    _reactRouter.Route,
    { path: '', component: function component(_ref) {
            var children = _ref.children;
            return children;
        } },
    _react2.default.createElement(_reactRouter.Route, { path: '/index', component: _example2.default }),
    _react2.default.createElement(_reactRouter.Redirect, { from: '*', to: '/index' })
);

exports.default = function (renderProps) {
    return _react2.default.createElement(
        _reactRedux.Provider,
        { store: _exampleStore2.default },
        _react2.default.createElement(_reactRouter.Router, renderProps)
    );
};