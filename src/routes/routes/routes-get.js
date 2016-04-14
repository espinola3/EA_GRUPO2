/**
 * Created by carol on 12/04/16.
 */
var express = require('express');
var router  = express.Router();

var Route = require('./../../models/route');

router.get('/routes', function(req, res, next) {
    Route.find({}).exec().then(function (routes) {
        
        res.json(routes).end();
    });
});

module.exports = router;
