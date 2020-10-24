var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs =require('express-handlebars');
var indexRouter = require('./routes/index');
var mongoose = require('mongoose');
var session= require('express-session');
var passport= require('passport');
var flash=require('connect-flash');
var routes=require('./routes/index');
var authTokens=require('./routes/data');

var app = express();
mongoose.connect("mongodb://localhost:['YOUR_DB_PORT]/shopping", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
require('./config/passport');
// view engine setup
app.engine('.hbs', expressHbs({defaultLayout:'layout', extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: 'mysupersecret',resave: false, saveUninitialized:false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
   // Get auth token from the cookies
   const authToken = req.cookies['AuthToken'];

   // Inject the user to the request
   req.user = authTokens[authToken];
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
});

module.exports = app;
