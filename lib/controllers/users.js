'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

// Create a new user
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';

  newUser.save(function(err) {
    if (err) {
      return res.json(400, err);
    }

    req.logIn(newUser, function(err) {
      if (err) return next(err);
      return res.json(newUser.user_info);
    });
  });
};

// Load user profile
exports.show = function (req, res, next) {
  User.load(req.params.userId, function(err, user) {
    if (err){
      return next(err);
    }

    if (!user){
      return next(new Error('Failed to load user ' + id));
    }
    req.user = user;
    next();
  });
};

// Check if username exists
exports.exists = function (req, res, next) {
  var username = req.params.username;
  User.findOne({ username : username }, function (err, user) {
    if (err) {
      return next(new Error('Failed to load User ' + username));
    }

    if(user) {
      res.json({exists: true});
    } else {
      res.json({exists: false});
    }
  });
}
