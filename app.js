var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var mongoose = require('mongoose');
var configDB = require('./config/db.js');
var expressSession = require('express-session');

var MongoStore = require('connect-mongo')(expressSession);



var app = express();


var index = require('./routes/index');
var users = require('./routes/users');




////////////////////////////////////////////////////////////////////////////
//////////////////////// Mongoose
////////////////////////////////////////////////////////////////////////////

mongoose.Promise = require('bluebird');
mongoose.connect(configDB.url, {useMongoClient:true});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("db connected to " + configDB.url);
});


////////////////////////////////////////////////////////////////////////////
//////////////////////// Session
////////////////////////////////////////////////////////////////////////////

app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    clear_interval: 900,
    cookie: { maxAge: 3600000 * 24 * 14},
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

const apiUsers = require('./api/v1/users');

app.use('/api/v1/users', apiUsers);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
