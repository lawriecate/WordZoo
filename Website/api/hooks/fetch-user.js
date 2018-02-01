module.exports = function fetchUserHook(sails) {

  return {

    // Add some routes to the app.
    routes: {

      // Add these routes _before_ anything defined in `config/routes.js`.
      before: {

        // Add a route that will match everything (using skipAssets to...skip assets!)
        '/*': {
          fn: function(req, res, next) {

            // Get the user ID  out of the session.
            var userId = req.session.me;

            // If there's no user logged in, just continue.
            if (!userId) { return next(); }

            // Look up the user by ID.
            User.findOne({id: userId}).populate('teaches_at').exec(function(err, user) {
              if (err) { return res.serverError(err); }
              if (!user) { return res.serverError(new Error('Session error')); }

              // Add the user info to the request.
              req.user = user;
              req.user.isAdmin = user.admin;
              req.user.isTeacher = (user.teaches_at[0] != null);

              if(req.session.pupilId != null) {// also check if a pupil session has been started
                Pupil.findOne({id: req.session.pupilId}).exec(function(err, pupil) {
                  if (err) { return res.serverError(err); }
                  if (!pupil) { return res.serverError(new Error('Session error')); }

                  // Add the user info to the request.
                  req.pupil = pupil;
                  // Continue the request.
                  return next();

                });
              }

              // Continue the request.
              return next();

            });


          },
          skipAssets: true
        }

      }
    }
  };
};
