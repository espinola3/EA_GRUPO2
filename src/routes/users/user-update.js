/**
 * Created by carol on 24/03/16.
 */
var express = require('express');
var router  = express.Router();

var User = require('./../../models/user');

router.put('/user/update', function(req, res, next) {
    var user = new User(
        {

            name: req.body.name,
            pass: req.body.pass,
            email: req.body.email,
            city: req.body.city
        }
    );

    User.findOneAndUpdate({name: user.name},{pass: user.pass, email: user.email, city: user.city} ,function (err, user) {
        if (err) return console.error(err);
    });

    //res.json(user.toObject());

    User.find({}).exec().then(function (users) {
        
        res.json(users).end();
    });
});

router.put('/user/updatepuntos/:username', function(req, res, next) {
    var user = new User(
        {
            username: req.body.username,
            numrutas: req.body.numrutas
        }
    );

    User.findOneAndUpdate({username: user.username},{numrutas: user.numrutas} ,function (err, user) {
        if (err) return console.error(err);
        else {
            User.find({}).exec().then(function (users) {
                res.json(users).end();
            });

        }
    });

    /*User.find({}).exec().then(function (users) {
        res.json(users).end();
    });*/
});

module.exports = router;

