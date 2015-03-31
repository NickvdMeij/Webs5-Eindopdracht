'use strict';

// Middleware to ensure user is logged in
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
  	return next(); 
  }
  res.send(401);
}

// Middleware to check if the user owns the specific pubcrawl
exports.pubcrawl = {
  hasAuthorization: function(req, res, next) {
    if (req.pubcrawl.creator._id.toString() !== req.user._id.toString()) {
      return res.send(403);
    }
    next();
  }
};