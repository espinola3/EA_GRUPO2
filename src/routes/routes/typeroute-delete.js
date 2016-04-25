/**
 * Created by tono on 24/04/2016.
 */
var express = require('express');
var router  = express.Router();

var TypeRoute = require('./../../models/typeroute');

router.delete('/typeroute/delete/:type', function(req, res, next) {

    var route = new Route(
        {
            type:   req.params.type
        }
    );

    TypeRoute.find({type:route.type},(function (err, typeroute) {

        if (err) return console.error(err);

    })).remove().exec();

    TypeRoute.find({}).exec().then(function (typerouters) {
        res.json(typerouters).end();
    });
});


module.exports = router;