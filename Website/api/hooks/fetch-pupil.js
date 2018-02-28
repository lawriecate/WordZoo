module.exports = function fetchPupilHook(sails) {

  return {

    // Add some routes to the app.
    routes: {

      // Add these routes _before_ anything defined in `config/routes.js`.
      before: {

        // Add a route that will match everything (using skipAssets to...skip assets!)
        '/*': {
          fn: function(req, res, next) {
            var pupilId = req.session.pupilId;
            if(!pupilId) {// Continue the request.
              return next();}

              
                //sails.log("Pupil session found");
                Pupil.findOne({id: req.session.pupilId}).exec(function(err, pupil) {
                //  sails.log(pupil);
                  if (err) { return res.serverError(err); }
                  if (!pupil) { return res.serverError(new Error('Session error')); }

                  // Add the user info to the request.
                  req.pupil = pupil;
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
