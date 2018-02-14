var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

/* GET users listing. */
router.get('/games', function(req, res, next) {
  res.render('index', { title: 'Games' });
});


module.exports = router;
