/**
 * Created by carol on 24/03/16.
 */

var express = require('express');
var router  = express.Router();

var User = require('./../../models/user');

router.delete('/user/delete/:name', function(req, res, next) {

    var user = new User(
        {
            name:   req.params.name
        }
    );

    User.find({name:user.name},(function (err, user) {
        
        if (err) return console.error(err);

    })).remove().exec();

    User.find({}).exec().then(function (users) {
        res.json(users).end();
    });
});

module.exports = router;

