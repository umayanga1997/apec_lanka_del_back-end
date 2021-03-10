const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const app = express();
//my routes
const categoriesRoute = require('./routes/Public/categories');
const subCategoriesRoute = require('./routes/Public/sub_categories');
const itemsRoute = require('./routes/Public/items');
const authRoute = require('./routes/Private/userAuth');
const profileRoute = require('./routes/Private/userProfile');
const orderRoute = require('./routes/Private/orders');
const itemRateRoute = require('./routes/Public/item_rate');

const indexView = require('./routes/index');

dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//my middlewares
app.use('/api/public/',categoriesRoute);
app.use('/api/public/', itemsRoute);
app.use('/api/public/', subCategoriesRoute);
app.use('/api/public/',itemRateRoute);
app.use('/api/v1/user/', authRoute);
app.use('/api/v1/user/', profileRoute);
app.use('/api/v1/details/',orderRoute);

//Viewers
app.use('/',indexView);

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
// app.listen("3000",() =>{

// });