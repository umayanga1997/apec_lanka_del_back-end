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
// app.use('/',categoriesRoute);
// app.use('/', itemsRoute);
// app.use('/', subCategoriesRoute);
// app.use('/',itemRateRoute);
// app.use('/', authRoute);
// app.use('/', profileRoute);
// app.use('/',orderRoute);

//Viewers
app.use('/',function (req,res, next) {
  res.render('index', {title:"Hello World"});  
});

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
