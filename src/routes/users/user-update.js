/**
 * Created by carol on 24/03/16.
 */
var express = require('express');
var router  = express.Router();

var User = require('./../../models/user');

router.put('/user/update/:username', function(req, res, next) {
    var user = new User(
        {

            username: req.body.username,
            email: req.body.email,
            city: req.body.city,
            address:req.body.address,
            about:req.body.about,
            gender: req.body.gender,
            pic: req.body.pic
        }
    );

    User.findOneAndUpdate({username: user.username},{$set:{email: user.email, city: user.city, address:user.address,about:user.about, pic: user.pic,gender: user.gender},upsert: true}
        ,function (err, user) {
        if (err) return console.error(err);
        else {
            User.find({}).exec().then(function (users) {
                res.json(users).end();
            });

        }
    });

    //res.json(user.toObject());


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

