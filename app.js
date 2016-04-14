var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router  = express.Router();
var path = require('path');

var routes    = require('./src/routes/index');
var users_get = require('./src/routes/users/users-get');
var user_post = require('./src/routes/users/user-post');
var user_update = require('./src/routes/users/user-update');
var user_delete = require('./src/routes/users/user-delete');

var route_post = require('./src/routes/routes/route-post');
var routes_get = require('./src/routes/routes/routes-get');
var route_delete = require('./src/routes/routes/route-delete');
var route_update = require('./src/routes/routes/route-update');

var app = express();

mongoose.connect('mongodb://localhost/viajapp');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users_get);
app.use('/', user_post);
app.use('/', user_update);
app.use('/', user_delete);

app.use('/', route_post);
app.use('/', routes_get);
app.use('/', route_delete);
app.use('/', route_update);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
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


//app.listen(5885,'147.83.7.156');

//app.get('/', function(req, res) {
  //res.sendFile(path.join(__dirname, 'angular', 'index.html'));
  //res.sendFile('/home/carol/Code/EA/proyecto/angular/index.html');
  //res.sendFile('index.html', {root: path.join(__dirname, 'angular')})
//});


app.listen(5885, '127.0.0.1');

module.exports = app;
