var express = require('express');
var router  = express.Router();

var User = require('./../../models/user');

router.post('/user', function(req, res, next) {
    var user = new User(
        {
            name: req.body.name,
            pass: req.body.pass,
            email: req.body.email,
            city: req.body.city
        }
    );

    user.save(function (err, user) {
        
        if (err) {
            console.log(err)
        }
        
    });

    User.find({name: user.name}).exec().then(function (users) {
        if (users == false)
            res.send()
    });
    User.find({}).exec().then(function (users) {
        res.json(users).end();
    });

    //res.json(user.toObject());


});



module.exports = router;
