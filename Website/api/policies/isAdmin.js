/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Restricts to admin user only
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // If `req.session.me` exists, that means the user is logged in.
  if (req.session.me) {
    if(req.user.isAdmin) {
      return next();
    }
  }
  // If this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
  // send a 401 response letting the user agent know they need to login to
  // access this endpoint.
  if (req.wantsJSON) {
    return res.send(403);
  }

  // Otherwise if this is an HTML-wanting browser, do a redirect.
  return res.send(403);
};
