var express = require('express');
var router  = express.Router();

var User = require('./../../models/user');

router.get('/', function(req, res, next) {
    
   User.find({}).exec().then(function (users) {
     res.json(users).end();
  });
});

router.get('/userdetail/:username', function(req, res){

    
    var user = new User(
        {
            username: req.params.username,
            password: req.params.password,
            email: req.params.email,
            city: req.params.city
        }
    );
    User.find({username:user.username}, function(err, users){
        res.json(users);
    });

});

module.exports = router;
