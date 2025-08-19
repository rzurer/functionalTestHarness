exports.initialize = function (express) {
  'use strict';
  var router = express.Router();
  router.get('/', function (req, res) {
    res.render('home');
  });
  return router;
};