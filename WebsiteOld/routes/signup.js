var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.send('respond with a resource');
});



module.exports = router;
