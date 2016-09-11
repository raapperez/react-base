'use strict';

import {createStore, combineReducers} from 'redux';
import * as actions from '../actions/example-actions';
import {reducer as formReducer} from 'redux-form';

const combinedReducers = combineReducers({
    form: formReducer
});

const rootReducer = (state, action) => combinedReducers(state, action);
const store = createStore(rootReducer);

export default store;