'use strict';

var mongoose = require('mongoose');
var Bar = mongoose.model('Bar');

/**
 * Find bar by id
 */
exports.bar = function(req, res, next, id) {
  Bar.load(id, function(err, bar) {
    if (err){
      return next(err);
    }

    if (!bar){
      return next(new Error('Failed to load bar ' + id));
    }
    req.bar = bar;
    next();
  });
};

/**
 * Create a bar
 */
exports.create = function(req, res) {
  var bar = new Bar(req.body);

  bar.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(bar);
    }
  });
};

/**
 * Update a bar
 */
exports.update = function(req, res) {
  var bar = req.bar;
  bar.name = req.body.name;
  bar.icon = req.body.icon;
  bar.address = req.body.address;
  bar.latitude = req.body.latitude;
  bar.longitude = req.body.longitude;
  bar.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(bar);
    }
  });
};

/**
 * Delete a bar
 */
exports.destroy = function(req, res) {
  var bar = req.bar;

  bar.remove(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(bar);
    }
  });
};

/**
 * Show a bar
 */
exports.show = function(req, res) {
  res.json(req.bar);
};

/**
 * List of bars
 */
exports.all = function(req, res) {
  Bar
    .find()
    .sort('-created')
    .exec(function(err, bars) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(bars);
    }
  });
};
