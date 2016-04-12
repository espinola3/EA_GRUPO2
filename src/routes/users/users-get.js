var express = require('express');
var router  = express.Router();

var User = require('./../../models/user');

router.get('/', function(req, res, next) {
   User.find({}).exec().then(function (users) {
     res.json(users).end();
  });
});

module.exports = router;
