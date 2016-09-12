'use strict';

const express = require('express');
const router = express.Router();
const {match} = require('react-router');
const {serverSide} = require('../frontend/js/example');
const {routes} = require('../frontend/js/example');
const ReactDOMServer = require('react-dom/server');

router.get('*', function (req, res, next) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      next(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {

      const initialState = {value: 10};

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