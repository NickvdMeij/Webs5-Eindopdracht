'use strict';

var mongoose = require('mongoose');
var Waypoint = mongoose.model('Waypoint');

// Add waypoint to request
exports.waypoint = function(req, res, next, id) {
  Waypoint.load(id, function(err, waypoint) {
    if (err){
      return next(err);
    }

    if (!waypoint){
      return next(new Error('Failed to load waypoint ' + id));
    }
    req.waypoint = waypoint;
    next();
  });
};

// Create a new waypoint
exports.create = function(req, res) {
  var waypoint = new Waypoint(req.body);

  waypoint.pubcrawl = req.pubcrawl._id;

  req.pubcrawl.waypoints.push(waypoint._id);

  req.pubcrawl.save();

  waypoint.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(waypoint);
    }
  });
};

// Delete a waypoint
exports.destroy = function(req, res) {
  var waypoint = req.waypoint;

  waypoint.remove(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(waypoint);
    }
  });
};

// Show a waypoint
exports.show = function(req, res) {
  res.json(req.waypoint);
};

// List all waypoints
exports.all = function(req, res) {
  Waypoint
    .find()
    .where('pubcrawl').equals(req.pubcrawl._id)
    .populate('have_been_here', 'username')
    .exec(function(err, waypoints) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(waypoints);
    }
  });
};
