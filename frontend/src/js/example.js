'use strict';

import React from 'react';
import { Route, Redirect, Router  } from 'react-router';
import ExamplePage from './pages/example';
import {Provider} from 'react-redux';
import store from './stores/example-store';

export const routes = (
    <Route path="" component={({children}) => (children) }>
        <Route path="/index" component={ExamplePage} />
        <Redirect from="*" to="/index" />
    </Route>
);

export default renderProps => (
    <Provider store={store}>
        <Router {...renderProps}/>
    </Provider>
);