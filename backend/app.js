var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var logger = require('morgan');
var indexRouter = require('./routes/index');
var pcsRouter = require('./routes/PCs');
var electroRouter = require('./routes/electronique');
var tlfRouter = require('./routes/telephone');

var cartRouter = require('./routes/cart');
var cors = require('cors');
var usersRouter = require('./routes/users');
var mongoose = require('mongoose') ;

mongoose.connect('mongodb://localhost:27017/projet_shop', {useNewUrlParser: true});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//add cors 
var cors = require('cors');
app.use(cors({
  origin:'http://localhost:4200'
}));
app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/PCs', pcsRouter);
app.use('/electronique',electroRouter);
app.use('/cart', cartRouter);
app.use('/tlf',tlfRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
