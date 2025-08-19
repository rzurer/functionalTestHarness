/* global initializeLayout:writable, $ */
const dateFunctions = require('date-fns'),
  dateHelper = require('./dateHelper').initialize(dateFunctions);
initializeLayout = function (viewName) {
  'use strict';
  if (viewName === 'home') {
    require('./home').initialize(dateHelper);
  }
};