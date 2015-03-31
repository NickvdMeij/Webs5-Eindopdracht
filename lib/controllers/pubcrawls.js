'use strict';

var mongoose = require('mongoose');
var PubCrawl = mongoose.model('PubCrawl');

// Find pubcrawl and add it to the request
exports.pubcrawl = function(req, res, next, id) {
  PubCrawl.load(id, function(err, pubcrawl) {
    if (err){
      return next(err);
    }

    if (!pubcrawl){
      return next(new Error('Failed to load pubcrawl ' + id));
    }
    req.pubcrawl = pubcrawl;
    next();
  });
};

// Create a pubcrawl
exports.create = function(req, res) {
  var pubcrawl = new PubCrawl(req.body);

  pubcrawl.creator = req.user;

  pubcrawl.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(pubcrawl);
    }
  });
};

// Add a participant
exports.addParticipant = function(req, res) {
  var pubcrawl = req.pubcrawl;

  pubcrawl.participants.push(req.user._id);

  pubcrawl.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(pubcrawl);
    }
  });
};

// Remove a participant
exports.removeParticipant = function(req, res) {
  var pubcrawl = req.pubcrawl;

  pubcrawl.participants.pull(req.user._id);
  
  pubcrawl.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(pubcrawl);
    }
  });
};

// Update a pubcrawl
exports.update = function(req, res) {
  var pubcrawl = req.pubcrawl;
  pubcrawl.title = req.body.title;
  pubcrawl.description = req.body.description;
  pubcrawl.starts = req.body.starts;
  
  pubcrawl.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(pubcrawl);
    }
  });
};

// Delete a pubcrawl
exports.destroy = function(req, res) {
  var pubcrawl = req.pubcrawl;

  pubcrawl.remove(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(pubcrawl);
    }
  });
};

// show a pubcrawl
exports.show = function(req, res) {
  res.json(req.pubcrawl);
};

// List all pubcrawls
exports.all = function(req, res) {
  var currentDate = new Date();

  PubCrawl
    .find()
    .where('starts').gt(currentDate)
    .sort('-starts')
    .populate('creator', 'username')
    .populate('participants', 'username')
    .populate('city')
    .populate('waypoints')
    .exec(function(err, pubcrawls) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(pubcrawls);
    }
  });
};
