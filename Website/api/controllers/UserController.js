/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `UserController.login()`
   */
  login: function (req, res) {

    // See `api/responses/login.js`
    return res.login({
      email: req.param('email'),
      password: req.param('password'),
      successRedirect: '/',
      invalidRedirect: '/login'
    });
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {

    // "Forget" the user from the session.
    // Subsequent requests from this user agent will NOT have `req.session.me`.
    req.session.me = null;

    // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a simple response letting the user agent know they were logged out
    // successfully.
    if (req.wantsJSON) {
      return res.ok('Logged out successfully!');
    }

    // Otherwise if this is an HTML-wanting browser, do a redirect.
    return res.redirect('/');
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {

    // Attempt to signup a user using the provided parameters
    User.signup({
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password')
    }, function (err, user) {
      // res.negotiate() will determine if this is a validation error
      // or some kind of unexpected server error, then call `res.badRequest()`
      // or `res.serverError()` accordingly.
      if (err) return res.negotiate(err);

      // Go ahead and log this user in as well.
      // We do this by "remembering" the user in the session.
      // Subsequent requests from this user agent will have `req.session.me` set.
      req.session.me = user.id;

      // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
      // send a 200 response letting the user agent know the signup was successful.
      if (req.wantsJSON) {
        return res.ok('Signup successful!');
      }

      // Otherwise if this is an HTML-wanting browser, redirect to /welcome.
      return res.redirect('/welcome');
    });
  },

  list: function(req,res) {
    users = User.find().exec(function(err,users) {
      return res.view('admin/users.ejs', {'title':'Manage Users', users: users});
    });

  },
  edit: function(req,res) {
		User.findOne({id:req.params.id}).populate('teaches_at').exec(function(err,user) {
			if (err) {
				return res.serverError(err);
			}
      schools = School.find().exec(function(err,schools) {
				if (err) {
					return res.serverError(err);
				}
				return res.view('admin/userDetails', {'title':'Edit User',user: user, schools:schools});
      });
		})

	},

	update: function(req,res) {
		params = {
      name: req.param('name'),
			email: req.param('email'),
			password: req.param('password')
    };
		User.update({id:req.params.id},params).exec(function(err,user) {
			if (err) {
				return res.serverError(err);
			}
			return res.redirect('/admin/users/'+user[0].id+'/');
		})


	},

  assignSchool: function(req,res) {
    User.findOne({id:req.params.id}).populate('teaches_at').exec(function(err,user) {
			if (err) {
				return res.serverError(err);
			}
      school = School.findOne(req.param('school_id')).exec(function(err,school) {
				if (err) {
					return res.serverError(err);
				}
        user.teaches_at.add(school.id);
				return res.redirect('/admin/users/'+user.id+'/');
      });
		})
  }
};
