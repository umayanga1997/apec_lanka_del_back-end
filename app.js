const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const app = express();

//MY ROUTES
//Public Routes
const categoriesRoute = require('./routes/Public/categories');
const subCategoriesRoute = require('./routes/Public/sub_categories');
const itemsRoute = require('./routes/Public/items');
const itemRateRoute = require('./routes/Public/item_rate');

//Private Routes
const authRoute = require('./routes/Private/userAuth');
const profileRoute = require('./routes/Private/userProfile');
const orderRoute = require('./routes/Private/orders');
const categoriesRoutePrivate = require('./routes/Private/categories');
const subCategoriesRoutePrivate = require('./routes/Private/sub_categories');
const itemsRoutePrivate = require('./routes/Private/items');
const itemRateRoutePrivate = require('./routes/Private/item_rate');

// const indexView = require('./routes/index');

dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//MY MIDDLEWARES
//Public Middlewares
app.use('/del/',categoriesRoute);
app.use('/del/', itemsRoute);
app.use('/del/', subCategoriesRoute);
app.use('/del/',itemRateRoute);
//Private Middlewares
app.use('/del/',categoriesRoutePrivate);
app.use('/del/', itemsRoutePrivate);
app.use('/del/', subCategoriesRoutePrivate);
app.use('/del/',itemRateRoutePrivate);
app.use('/del/', authRoute);
app.use('/del/', profileRoute);
app.use('/del/',orderRoute);

//Viewers
// app.use('/',indexView);

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
