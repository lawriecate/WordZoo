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

  }
};
