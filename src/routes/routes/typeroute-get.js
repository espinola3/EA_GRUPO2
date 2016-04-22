/**
 * Created by carol on 22/04/16.
 */
var express = require('express');
var router  = express.Router();

var TypeRoute = require('./../../models/typeroute');
var Route = require('./../../models/route');

router.get('/typeroutes', function(req, res) {

    TypeRoute.find({}, function(err, typeroutes) {
        Route.populate(typeroutes, {path: "lista"}, function (err, typeroutes) {
            res.status(200).send(typeroutes);
        });


    });
});


module.exports = router;