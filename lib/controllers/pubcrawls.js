'use strict';

var mongoose = require('mongoose');
var PubCrawl = mongoose.model('PubCrawl');
var Waypoint = mongoose.model('Waypoint');

/**
 * Find pubcrawl by id
 */
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

/**
 * Create a pubcrawl
 */
exports.create = function(req, res) {
  var pubcrawl = new PubCrawl();
  pubcrawl.title = req.body.title;
  pubcrawl.creator = req.user;
  pubcrawl.starts = req.body.starts;

  //pubcrawl.waypoints = req.body.waypoints;
 
  for(var x = 0; x < req.body.waypoints.length; x++){
    var waypoint = new Waypoint(req.body.waypoints[x]);
    pubcrawl.waypoints.push(waypoint._id);

    waypoint.save();
  }

  pubcrawl.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(pubcrawl);
    }
  });
};

/**
 * Update a pubcrawl
 */
exports.update = function(req, res) {
  var pubcrawl = req.pubcrawl;
  pubcrawl.title = req.body.title;
  pubcrawl.description = req.body.description;
  pubcrawl.starts = req.body.starts;
  pubcrawl.waypoints = req.body.waypoints;
  
  pubcrawl.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(pubcrawl);
    }
  });
};

/**
 * Delete a pubcrawl
 */
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

/**
 * Delete a pubcrawl
 */
exports.addParticipant = function(req, res) {
  var pubcrawl = req.pubcrawl;

  pubcrawl.participants.push(req.user);

  pubcrawl.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(pubcrawl);
    }
  });
};

/**
 * Delete a pubcrawl
 */
exports.removeParticipant = function(req, res) {
  var pubcrawl = req.pubcrawl;

  pubcrawl.participants.pull(req.user);

  pubcrawl.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(pubcrawl);
    }
  });
};

/**
 * Show a pubcrawl
 */
exports.show = function(req, res) {
  res.json(req.pubcrawl);
};

/**
 * List of barraces
 */
exports.all = function(req, res) {
  PubCrawl
    .find()
    .sort('-starting')
    .populate('creator', 'username')
    .populate('participants', 'username')
    .populate('waypoints')
    .exec(function(err, pubcrawl) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(pubcrawl);
    }
  });
};
