'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CitySchema = new Schema({
  name: {
    type: String,
    index: true,
    required: true
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  }
});

// Static
CitySchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    })
    .exec(cb);
  }
};

mongoose.model('City', CitySchema);