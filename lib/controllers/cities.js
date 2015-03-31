'use strict';

var mongoose = require('mongoose');
var City = mongoose.model('City');

// Add city to request
exports.city = function(req, res, next, id) {
  City.load(id, function(err, city) {
    if (err){
      return next(err);
    }

    if (!city){
      return next(new Error('Failed to load city ' + id));
    }
    req.city = city;
    next();
  });
};

// Create a new city
exports.create = function(req, res) {
  var city = new City(req.body);

  city.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(city);
    }
  });
};

// Update a city
exports.update = function(req, res) {
  var city = req.city;
  city.name = req.body.name;
  city.latitude = req.body.latitude;
  city.longitude = req.body.longitude;

  city.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(city);
    }
  });
};

// Delete a city
exports.destroy = function(req, res) {
  var city = req.city;

  city.remove(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(city);
    }
  });
};

// Show a city
exports.show = function(req, res) {
  res.json(req.city);
};

// Search query for name
exports.all = function(req, res) {
  
  var nameQuery = req.query.name ? req.query.name : "[A-Za-z0-9]*";
  
  City
    .find()
    .regex("name", nameQuery, "ig")
    .exec(function(err, cities) {
      if (err) {
        res.json(500, err);
      } else {
        res.json(cities);
      }
  });
}