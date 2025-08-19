(function () {
  'use strict';
  const express = require('express'),
    app = express(),
    path = require('path'),
    favicon = require('serve-favicon'),
    config = require('./lib/config').initialize(),
    fs = require('fs'),
    glob = require('glob'),
    browserify = require('browserify'),
    browserifyHelper = require('./lib/browserifyHelper.js').initialize(fs, path, glob, browserify()),
    homeController = require('./routes/homeController').initialize(express);
  let server;
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(favicon(path.join(__dirname, './public/images/favicon.jpg')));
  app.use('/', homeController);
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }
  app.set('port', process.env.PORT || config.developmentPort);
  server = app.listen(app.get('port'), function () {
    browserifyHelper.bundleSourceFiles();
    console.log('Express server listening on port ' + server.address().port);
  });
}());