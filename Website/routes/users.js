var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/cool', function(req, res, next) {
  res.send('cool');
});

router.get('/login',function(req,res,next) {
  res.render('login', { title: 'Login' });
});
/*
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(
    /*function(username, password, done) {
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
    function(username,password,done) {
      if(err) { return done(err);}

      if(username != "lawrie") {
        return done(null, false, { message: 'Incorrect username.' });
      }
      return done(null, user);
    }
  ));

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });
*/
module.exports = router;
