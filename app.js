var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session');
var Filestore = require('session-file-store')(session);



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishrouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);
connect.then((db) =>{
  console.log("connected o server correctly");
},(err) => { console.log(err);
       });

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({
  name:"session-id",
  secret:'12345-67890-09876-54321',
  saveUninitialized:false,
  resave:false,
  store:new Filestore()
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

function auth (req,res,next){
  console.log(req.session);
  if(!req.session.user) {
  
        err = new Error('You are no auhenicated');
        err.status = 403;
        next(err);
        return;

  }
  
  
else{
    if(req.session.user === 'authenticated'){
      next();
    }
    else{
      err = new Error('You are no authenticated');
      err.status = 403;
      next(err);
      return;
    }
}
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

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
