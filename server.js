var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');

var indexRouter = require('./routes/index');
var flightsRouter = require('./routes/flights');
var destinationsRouter = require('./routes/destinations');
var ticketsRouter = require('./routes/tickets');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', indexRouter);
app.use('/flights', flightsRouter);
app.use('/', destinationsRouter);
app.use('/', ticketsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
  });

module.exports = app;