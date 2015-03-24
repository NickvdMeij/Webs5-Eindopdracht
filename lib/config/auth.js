'use strict';

/**
 *  Route middleware to ensure user is authenticated.
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send(401);
}

/**
 * barrace authorizations routing middleware
 */
exports.barrace = {
  hasAuthorization: function(req, res, next) {
    if (req.barrace.creator._id.toString() !== req.user._id.toString()) {
      return res.send(403);
    }
    next();
  }
};