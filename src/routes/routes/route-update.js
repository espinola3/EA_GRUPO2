/**
 * Created by carol on 13/04/16.
 */
var express = require('express');
var router  = express.Router();

var Route = require('./../../models/route');

router.put('/route/update', function(req, res, next) {
    var route = new Route(
        {
            name: req.body.name,
            type: req.body.type,
            city: req.body.city,
            time: req.body.time,
            interest: req.body.interest
        }
    );

    Route.findOneAndUpdate({name: route.name},{type: route.type, city: route.city, time: route.time, interest: route.interest} ,function (err, route) {
        if (err) return console.error(err);
    });

    //res.json(user.toObject());

    Route.find({}).exec().then(function (routes) {

        res.json(routes).end();
    });
});

module.exports = router;
