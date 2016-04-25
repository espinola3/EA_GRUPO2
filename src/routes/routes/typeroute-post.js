/**
 * Created by carol on 22/04/16.
 */
var express = require('express');
var router  = express.Router();

var TypeRoute = require('./../../models/typeroute');

router.post('/typeroute', function (req, res, next) {

    var typeroute = new TypeRoute(
        {
            type: req.body.type
        }
    );

    console.log(typeroute);
    typeroute.save(function (err) {
        if (err) res.status(500).send('Internal server error');
        else res.json(typeroute);

    })

});



module.exports = router;
