'use strict';

var mongoose = require('mongoose');
var passport = require('passport');

// Return current user
exports.session = function (req, res) {
  res.json(req.user.user_info);
};

// Logout user
exports.logout = function (req, res) {
  if(req.user) {
    req.logout();
    res.send(204);
  } else {
    res.send(400, "Not logged in");
  }
};

// Login user
exports.login = function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (error) { return res.json(400, error); }
    req.logIn(user, function(err) {
      if (err) { return res.send(err); }
      res.json(req.user.user_info);
    });
  })(req, res, next);
}