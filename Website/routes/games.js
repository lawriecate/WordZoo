var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

/* GET users listing. */
router.get('/menu', function(req, res, next) {
  res.render('games', { title: 'Games' });
});

router.get('/game1', function(req, res, next) {
  res.render('play', { title: 'Games' });
});


module.exports = router;
