'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _exampleActions = require('../actions/example-actions');

var actions = _interopRequireWildcard(_exampleActions);

var _reduxForm = require('redux-form');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var combinedReducers = (0, _redux.combineReducers)({
    form: _reduxForm.reducer
});

var rootReducer = function rootReducer(state, action) {
    return combinedReducers(state, action);
};
var store = (0, _redux.createStore)(rootReducer);

exports.default = store;