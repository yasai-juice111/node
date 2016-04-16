// third party
var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// global変数登録
require('./lib/util/global');

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout/base');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// routesSettings
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');
var top = require('./routes/top');
app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
app.use('/top', top);

//Attached some objects and vars to request object.
app.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin", "*");

  var url = req.url.split('?');
  if(!url[0].match(/\.[a-zA-z0-9_.-]*$/)){
    // req.transaction = transactionManager.getTransaction('onhttp_'+ uid, true, req);
    // req.sequenceTransaction = transactionManager.getTransaction('onhttp_sequence_'+ uid, true, req);
    req.currentDatetime = new Date();
  }
  req.locals = {};

  // logger
  // req.logger = new Logger(req, 'yakushima');
  // req.errorLogger = new Logger(req, 'error');
  // req.sqlLogger = new Logger(req, 'sqlTrace');

  // req.timeMap = {};
  // req.time = function(label) {
  //     this.timeMap[label] = Date.now();
  // };
  // req.timeEnd = function(label) {
  //     req.logger.debug(label + ' time: '+(Date.now() - this.timeMap[label]) + 'ms');
  // };

  // req.finalize = function(cb){
  //     if (req.transaction) {
  //         req.transaction.end();
  //     }
  //     if (req.sequenceTransaction) {
  //         req.sequenceTransaction.end();
  //     }
  //     if(cb){ cb(); }
  // };
  next();
});

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// listen
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
