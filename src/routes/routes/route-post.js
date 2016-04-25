/**
 * Created by carol on 12/04/16.
 */
var express = require('express');
var router  = express.Router();

var Route = require('./../../models/route');

router.post('/route', function(req, res, next) {
    var route = new Route(
        {
            name: req.body.name,
            type: req.body.type,
            city: req.body.city,
            time: req.body.time,
            interest: req.body.interest
        }
    );

    route.save(function (err, route) {
        if (err) return console.error(err);
    });

    Route.find({}).exec().then(function (routes) {
       res.json(routes).end();
    });

   //res.json(route.toObject());


});



module.exports = router;
