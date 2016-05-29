var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');


router.post('/register', function(req, res) {
    console.log(req.body.password);
    console.log(req.body.email);
    console.log(req.body.username);
    console.log(req.body.city);

    User.register(new User({ username: req.body.username , city : req.body.city , email : req.body.email , pic: req.body.pic}),
        req.body.password, function(err, account) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            passport.authenticate('local')(req, res, function () {
                return res.status(200).json({
                    status: 'Registration successful!'
                });
            });
        });
});

router.post('/login', function(req, res, next) {
    console.log(req.body.password);
    console.log(req.body.email);
    console.log(req.body.username);
    console.log(req.body.city);
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.status(200).json({
                status: 'Login successful!'
            });
        });
    })(req, res, next);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});

router.get('/status', function(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});

router.get ('/', function (req, res, next) {
    res.render('index', {title: 'OAuth example: facebook'});
});

router.get('/profile', isAuth, function(req,res,next)
{
    res.render('profile', {title:'Your profile page', user:req.user});
});

//route for logging out
router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

//route for facebook authentication and login. See the list of permissions
//(scopes): http://developers.facebook.com/docs/reference/login/

router.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['public_profile', 'email'] }));



/*router.get('/auth/facebook', function (req, res, next) {

 console.log("AUTH/FB");

});
*/

 //handle the callback after facebook has authenticated the user
 router.get('/auth/facebook/callback',
     passport.authenticate('facebook', {failureRedirect: '/login'}),
     function (req, res, next) {
         res.redirect('/#/login-fb?fb_user=' + req.user.username);
 });
/*
router.get('/auth/facebook/callback', passport.authenticate('facebook', function(err, user){
        console.log('datos user', user);
        if (err){
            res.send(err);
            return;
        }
        successRedirect: '#/home';
    /*
        req.login(user, function(error){
            if (error){
                res.send(error);
                return;
            }
            res.send(null, user);
        })
    })
);

*/
/* route middleware to check whether user is authenticated */
function isAuth(req, res, next) {
// if user is authenticated, go on
    if (req.isAuthenticated())
        return next();
// otherwise, send her back to home
    res.redirect('/login');
}

module.exports = router;
