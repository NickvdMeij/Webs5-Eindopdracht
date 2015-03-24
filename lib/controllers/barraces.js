'use strict';

var mongoose = require('mongoose');
var BarRace = mongoose.model('BarRace');

/**
 * Find barrace by id
 */
exports.barrace = function(req, res, next, id) {
  BarRace.load(id, function(err, barrace) {
    if (err){
      return next(err);
    }

    if (!barrace){
      return next(new Error('Failed to load barrace ' + id));
    }
    req.barrace = barrace;
    next();
  });
};

/**
 * Create a barrace
 */
exports.create = function(req, res) {
  var barrace = new BarRace(req.body);
  barrace.creator = req.user;

  barrace.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(barrace);
    }
  });
};

/**
 * Update a barrace
 */
exports.update = function(req, res) {
  var barrace = req.barrace;
  barrace.title = req.body.title;
  barrace.description = req.body.description;
  barrace.bars = req.body.bars;
  barrace.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(barrace);
    }
  });
};

/**
 * Delete a barrace
 */
exports.destroy = function(req, res) {
  var barrace = req.barrace;

  barrace.remove(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(barrace);
    }
  });
};

/**
 * Show a barrace
 */
exports.show = function(req, res) {
  res.json(req.barrace);
};

/**
 * List of barraces
 */
exports.all = function(req, res) {
  BarRace
    .find()
    .sort('-created')
    .populate('creator', 'username')
    .populate('participants', 'username')
    .populate('bars')
    .exec(function(err, barraces) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(barraces);
    }
  });
};
