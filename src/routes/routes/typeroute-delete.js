/**
 * Created by tono on 24/04/2016.
 */
var express = require('express');
var router  = express.Router();

var TypeRoute = require('./../../models/typeroute');

router.delete('/typeroute/delete/:name', function(req, res, next) {

    var typeroute = new TypeRoute(
        {
            lista:   req.params.name
        }
    );
    

    TypeRoute.update({}, {$pull: {lista: typeroute.lista}}, {multi:true}, function (err, route) {
        if (err) return console.error(err);
    });

    TypeRoute.find({}).exec().then(function (typeroutes) {
        res.json(typeroutes).end();
    });
});

module.exports = router;