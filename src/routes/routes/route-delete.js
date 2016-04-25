/**
 * Created by carol on 13/04/16.
 */
var express = require('express');
var router  = express.Router();

var Route = require('./../../models/route');

router.delete('/route/delete/:name', function(req, res, next) {

    var route = new Route(
        {
            name:   req.params.name
        }
    );

    Route.find({name:route.name},(function (err, route) {

        if (err) return console.error(err);

    })).remove().exec();

    Route.find({}).exec().then(function (routers) {
        res.json(routers).end();
    });
});

module.exports = router;