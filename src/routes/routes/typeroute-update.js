/**
 * Created by carol on 22/04/16.
 */
var express = require('express');
var router  = express.Router();

var Route = require('./../../models/route');
var TypeRoute = require('./../../models/typeroute');

router.put('/typeroute/update', function(req, res, next) {
    var typeroute = new TypeRoute(
        {
            type: req.body.type,
            lista: req.body.name
        }
    );

    TypeRoute.findOneAndUpdate({type: typeroute.type},{$push:{type: typeroute.type}} ,{upsert: true},function (err, typeroute) {
        if (err) return console.error(err);
    });

    //res.json(user.toObject());

    TypeRoute.find({}).exec().then(function (typeroute) {
        res.json(typeroute).end();
    });
});

module.exports = router;