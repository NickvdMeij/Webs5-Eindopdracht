'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

var UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: String,
  salt: String,
  name: String,
  provider: String,
  participates: [{
    type: Schema.ObjectId,
    ref: 'PubCrawl'
  }],
  owned_races: [{
    type: Schema.ObjectId,
    ref: 'PubCrawl'
  }]
});

// Set virtual for password hashing
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Set virtual for user info
UserSchema
  .virtual('user_info')
  .get(function () {
    return { '_id': this._id, 'username': this.username, 'email': this.email };
  });


// Validate if value exists
var validatePresenceOf = function (value) {
  return value && value.length;
};

// Validate email using regex
UserSchema.path('email').validate(function (email) {
  var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailRegex.test(email);
}, 'The specified email is invalid.');

// Validate email for unique
UserSchema.path('email').validate(function(value, respond) {
  mongoose.models["User"].findOne({email: value}, function(err, user) {
    if(err) {
      throw err;
    }

    if(user) {
      return respond(false);
    }

    respond(true);
  });
}, 'The specified email address is already in use.');

// Validate username for unique
UserSchema.path('username').validate(function(value, respond) {
  mongoose.models["User"].findOne({username: value}, function(err, user) {
    if(err) throw err;
    if(user) return respond(false);
    respond(true);
  });
}, 'The specified username is already in use.');

// Pre-save action
UserSchema.pre('save', function(next) {
  if (!this.isNew) {
    return next();
  }

  if (!validatePresenceOf(this.password)) {
    next(new Error('Invalid password'));
  }
  else {
    next();
  }
});

// Static
UserSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    })
    .populate('owned_races')
    .exec(cb);
  }
};


// Custom methods
UserSchema.methods = {

  // Authenticate
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  // Make Salt
  makeSalt: function() {
    return crypto.randomBytes(16).toString('base64');
  },

  // Encrypt password
  encryptPassword: function(password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

mongoose.model('User', UserSchema);
