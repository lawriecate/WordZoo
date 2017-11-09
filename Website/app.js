var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var manager = require('./routes/manager');
var teacher = require('./routes/teacher');
var games = require('./routes/games');
var signup = require('./routes/signup');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//login script from here

var flash    = require('connect-flash');
var crypto   = require('crypto');

//var require('./lib/sequelize_conn');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('testdb', 'root', 'mysqlpw', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

var sess  = require('express-session');
var Store = require('express-session').Store;
var BetterMemoryStore = require('session-memory-store')(sess);
var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
app.use(sess({
    name: 'JSESSION',
    secret: 'MYSECRETISVERYSECRET',
    resave: true,
    saveUninitialized: true
}));

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/signup', signup);
app.use('/manager', manager);
app.use('/teacher', teacher);



passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    return done(null, false, { message: 'No connection.' });
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.get('/signin', function(req, res){
//  console.log(req.flash('error'));
  res.render('login',{message :req.flash('error')});
});

app.post("/signin",
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/signin',
                                   failureFlash: true
                                 })
                      );

app.get('/logout', function(req, res){
    req.session.destroy();
    req.logout();
    res.redirect('/signin');
});


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
