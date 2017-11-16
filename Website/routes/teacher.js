var express = require('express');
var router = express.Router();
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

/* GET users listing. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Teacher' });
});

router.get('/pupilstart', function(req, res, next) {
  res.render('select_pupil', { title: 'Start Pupil Session' });
});


module.exports = router;
