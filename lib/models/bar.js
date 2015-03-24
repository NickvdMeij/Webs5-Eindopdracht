'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  icon: {
    type: String
  },
  latitude: {
  	type: String,
  	required: true
  },
  longitude: {
  	type: String,
  	required: true
  },
  address: {
  	type: String
  }
});

/**
 * Statics
 */
Bar.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    }).exec(cb);
  }
};

mongoose.model('Bar', Bar);