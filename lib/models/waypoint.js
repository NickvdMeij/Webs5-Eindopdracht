'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WaypointSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  latitude: {
  	type: String,
  	required: true
  },
  longitude: {
  	type: String,
  	required: true
  },
  reference: {
    type: String
  },
  vicinity: {
    type: String
  },
  have_been_here: [{
  	type: Schema.ObjectId,
  	ref: 'User'
  }]
});

/**
 * Statics
 */
WaypointSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    })
    .populate('have_been_here', 'username email')
    .exec(cb);
  }
};

mongoose.model('Waypoint', WaypointSchema);