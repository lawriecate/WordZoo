/**
 * Student Controller
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `UserController.login()`
   */
  login: function (req, res) {

    Pupil.attemptLogin({
      username: req.param('username'),
      passcode: req.param('passcode')
    }, function (err, pupil) {
      invalidRedirect = '/student/login';
      successRedirect = '/student';
      if (err) return res.negotiate(err);
      if (!pupil) {

        // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
        // send a 200 response letting the user agent know the login was successful.
        // (also do this if no `invalidRedirect` was provided)
        if (req.wantsJSON || !invalidRedirect) {
          return res.badRequest('Invalid username/passcode combination.');
        }
        // Otherwise if this is an HTML-wanting browser, redirect to /login.
        return res.redirect(invalidRedirect);
      }

      // "Remember" the user in the session
      // Subsequent requests from this user agent will have `req.session.me` set.
      req.session.pupilId = pupil.id;

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the user agent know the login was successful.
      // (also do this if no `successRedirect` was provided)
      if (req.wantsJSON || !successRedirect) {
        return res.ok();
      }

      // Otherwise if this is an HTML-wanting browser, redirect to /.*/
      return res.redirect(successRedirect);
    });

  },
  loginForm: function(req,res) {
    return res.view('student/login.ejs', {'title':'Sign In to WordZoo',layout: 'layout_student'});
  },

  quiz: function(req,res) {
    return res.view('student/welcome.ejs', {'title':'Welcome to WordZoo',games:games,  layout: 'student/game_layout'});
  },
  finishQuiz: function(req,res) {
    result = JSON.stringify(req.param('quiz_result'));
    Pupil.update({id:res.pupil.id},{quiz_result:result},function(err,pupil) {
      
      return res.ok();
    })
  },
  profile: function(req,res) {
    sails.log(req.pupil);
    characterParsed= "";
    if(req.pupil.character != "") {
      characterParsed = JSON.parse(req.pupil.character);
    }
    var profile = {
      name: req.pupil.name,
      points: req.pupil.points,
      character: characterParsed
    };
    return res.json(profile);
  },
  saveProfile: function(req,res) {
    points = req.param('newPoints');
    character = req.param('newCharacter');
    sails.log(points);
    sails.log(character);
    Pupil.update({id:req.pupil.id},{points:points,character:JSON.stringify(character)}, function(err,pupil2) {
      sails.log(pupil2);
      return res.ok();
    });
  }
};
