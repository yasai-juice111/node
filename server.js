/**
 * Timezone setting.
 */
var time = require('time')(Date);
var d = new Date();
d.setTimezone('Asia/Tokyo');

// third party
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var _ = require('underscore');
var dateformat = require('dateformat');

var app = express();

// global変数登録
require('./lib/util/global');

// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout/base');
app.use(expressLayouts);

app.locals._ = _;
app.locals.dateformat = dateformat;


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session 
app.use(session({
  secret: 'sugorilunch',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 1日
  }
}));

// logger
var logger = require('./lib/util/logger');
app.use(logger.express);

// routesSettings
var routes = require('./routes/index');
var auth = require('./routes/auth');
var error = require('./routes/error');
var top = require('./routes/top');
var reserved = require('./routes/reserved');
app.use('/', routes);
app.use('/auth', auth);
app.use('/error', error);
app.use('/top', top);
app.use('/reserved', reserved);

//Attached some objects and vars to request object.
app.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin", "*");

  var url = req.url.split('?');
  if(!url[0].match(/\.[a-zA-z0-9_.-]*$/)){
    // req.transaction = transactionManager.getTransaction('onhttp_'+ uid, true, req);
    // req.sequenceTransaction = transactionManager.getTransaction('onhttp_sequence_'+ uid, true, req);
  }
  req.currentDatetime = new Date();
  req.locals = {};

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
