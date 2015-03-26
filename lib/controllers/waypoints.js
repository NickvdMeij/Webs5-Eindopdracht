'use strict';

var mongoose = require('mongoose');
var Waypoint = mongoose.model('Waypoint');

/**
 * Find waypoint by id
 */
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

/**
 * Create a waypoint
 */
exports.create = function(req, res) {
  var waypoint = new Waypoint(req.body);

  waypoint.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(waypoint);
    }
  });
};

/**
 * Update a waypoint
 */
exports.update = function(req, res) {
  var waypoint = req.waypoint;
  waypoint.name = req.body.name;
  waypoint.latitude = req.body.latitude;
  waypoint.longitude = req.body.longitude;

  waypoint.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(waypoint);
    }
  });
};

/**
 * Delete a waypoint
 */
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

/**
 * Show a waypoint
 */
exports.show = function(req, res) {
  res.json(req.waypoint);
};

/**
 * List of barraces
 */
exports.all = function(req, res) {
  Waypoint
    .find()
    .populate('have_been_here', 'username')
    .exec(function(err, barraces) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(barraces);
    }
  });
};
