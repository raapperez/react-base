'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getStore = undefined;

var _redux = require('redux');

var _exampleActions = require('../actions/example-actions');

var actions = _interopRequireWildcard(_exampleActions);

var _reduxForm = require('redux-form');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var value = function value() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var action = arguments[1];

    switch (action.type) {
        case actions.SET_VALUE:
            return action.value;
        default:
            return state;
    }
};

var combinedReducers = (0, _redux.combineReducers)({
    value: value,
    form: _reduxForm.reducer
});

var rootReducer = function rootReducer(state, action) {
    return combinedReducers(state, action);
};

var getStore = exports.getStore = function getStore(initialState) {
    return (0, _redux.createStore)(rootReducer, initialState);
};