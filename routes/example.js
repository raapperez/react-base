'use strict';

const env = process.env.NODE_ENV || 'development';
const express = require('express');
const router = express.Router();
const {match} = require('react-router');
const ReactDOMServer = require('react-dom/server');

let serverSide;
let routes;
let reload;

if (env === 'development') {
  reload = require('require-reload')(require);
  serverSide = reload('../frontend/src/js/example').serverSide;
  routes = reload('../frontend/src/js/example').routes;
} else {
  serverSide = require('../frontend/build/js/example').serverSide;
  routes = require('../frontend/build/js/example').routes;
}

router.get('*', function (req, res, next) {

  if (env === 'development') {
    require('require-reload').emptyCache();
    serverSide = reload('../frontend/src/js/example').serverSide;
    routes = reload('../frontend/src/js/example').routes;
  }

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {

      const initialState = { value: 10 };

      res.status(200).render('example', {
        data: {
          entryPoint: ReactDOMServer.renderToString(serverSide(renderProps, initialState)),
          initialState
        }
      });
    } else {
      const error = new Error('Not found');
      error.status = 404;
      next(error);
    }
  });
});

module.exports = router;