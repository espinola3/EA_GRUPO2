// dependencies
var expressSession = require('express-session');
var hash = require('bcrypt-nodejs');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router  = express.Router();
var path = require('path');

var User   = require('./src/models/user.js');
var index   = require('./src/routes/index.js');
var users_get = require('./src/routes/users/users-get');
var user_post = require('./src/routes/users/user-post');
var user_update = require('./src/routes/users/user-update');
var user_delete = require('./src/routes/users/user-delete');

var route_post = require('./src/routes/routes/route-post');
var routes_get = require('./src/routes/routes/routes-get');
var route_delete = require('./src/routes/routes/route-delete');
var route_update = require('./src/routes/routes/route-update');

var typeroute_post = require('./src/routes/routes/typeroute-post');
var typeroutes_get = require('./src/routes/routes/typeroute-get');
var typeroute_update = require('./src/routes/routes/typeroute-update');
var typeroute_delete = require('./src/routes/routes/typeroute-delete');

var app = express();

mongoose.connect('mongodb://localhost/viajapp');

// define middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routes
//app.use('/', User);
app.use('/user/', index);
app.use('/users', users_get);
app.use('/', user_post);
app.use('/', user_update);
app.use('/', user_delete);

app.use('/', route_post);
app.use('/', routes_get);
app.use('/', route_delete);
app.use('/', route_update);

app.use('/', typeroute_post);
app.use('/', typeroutes_get);
app.use('/', typeroute_update);
app.use('/', typeroute_delete);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// error hndlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(5885, '127.0.0.1');


module.exports = app;

// error handlers

// development error handler
// will print stacktrace



//app.listen(5885,'147.83.7.156');

//app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname, 'angular', 'index.html'));
  //res.sendFile('/home/carol/Code/EA/proyecto/angular/index.html');
  //res.sendFile('index.html', {root: path.join(__dirname, 'angular')})
//});



