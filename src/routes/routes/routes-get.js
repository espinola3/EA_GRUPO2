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

router.get('/routesbytype/:type', function(req, res){
    var route = new Route(
        {
            type: req.params.type
        }
    );
    Route.find({type:route.type}, function(err, routes){
        res.json(routes);
    });
    
});

router.get('/routesbycity/:city', function(req, res){
    var route = new Route(
        {
            city: req.params.city
        }
    );
    Route.find({city:route.city}, function(err, routes){
        res.json(routes);
    });

});

module.exports = router;
