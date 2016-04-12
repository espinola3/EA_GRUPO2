var express = require('express');
var router  = express.Router();

var User = require('./../../models/user');

router.post('/user', function(req, res, next) {
    var user = new User(
        {
            id:   req.body.id,
            name: req.body.name,
            pass: req.body.pass,
            email: req.body.email,
            city: req.body.city
        }
    );

    user.save(function (err, user) {
        if (err) return console.error(err);
    });

    User.find({}).exec().then(function (users) {
        res.json(users).end();
    });

    //res.json(user.toObject());


});



module.exports = router;
