'use strict';

import {createStore, combineReducers} from 'redux';
import * as actions from '../actions/example-actions';
import {reducer as formReducer} from 'redux-form';

const value = (state = 0, action) => {
    switch (action.type) {
        case actions.SET_VALUE:
            return action.value;
        default:
            return state;
    }
};

const combinedReducers = combineReducers({
    value,
    form: formReducer
});

const rootReducer = (state, action) => combinedReducers(state, action);
const store = createStore(rootReducer);

export default store;