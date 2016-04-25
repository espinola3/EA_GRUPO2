/**
 * Created by carol on 22/04/16.
 */
var express = require('express');
var router  = express.Router();

var TypeRoute = require('./../../models/typeroute');

router.get('/typeroutes', function(req, res, next) {
    TypeRoute.find({}).exec().then(function (typeroutes) {

        res.json(typeroutes).end();
    });
});


module.exports = router;