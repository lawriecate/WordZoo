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
        req.flash('error', 'Sorry that passcode is not correct - please ask your teacher for help!');
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
    return res.view('student/welcome.ejs', {'title':'Welcome to WordZoo',  layout: 'student/game_layout'});
  },
  finishQuiz: function(req,res) {
    result = JSON.stringify(req.param('quiz_result'));
    animal = req.param('animal');

    function generateProfile() {
      len = 45;
      value = 0;
      if (len == 0) return [];
      var a = [value];
      while (a.length * 2 <= len) a = a.concat(a);
      if (a.length < len) a = a.concat(a.slice(0, len - a.length));
      return a;
    }
    // giraffe = 36, owl=37,octo=38,zebra,39,panda=41,sheep=42,elephant=43,lion=44,
    //elephant = 36,lion=37,octo=38,owl=39,panda=41,giraffe=42,zebra=43,sheep=44
    // 
    animalPositions = {
      0:42,
      1:39,
      2:38,
      3:43,
      4:41,
      5:44,
      6:36,
      7:37
    }
    characterProfile = generateProfile();
    var animalIndex = animalPositions[animal];
    sails.log(animal);
    sails.log(animalIndex);

    characterProfile[animalIndex] = 2;

    sails.log(characterProfile);
    Pupil.update({id:req.pupil.id},{quiz_result:result, completedWelcome:true,character:JSON.stringify(characterProfile)},function(err,pupil) {
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
