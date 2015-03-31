'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PubCrawlSchema = new Schema({
  title: {
    type: String,
    index: true,
    required: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  participants: [{
    type: Schema.ObjectId,
    ref: 'User'
  }],
  waypoints: [{
    type: Schema.ObjectId,
    ref: 'Waypoint'
  }],
  starts: {
    type: Date,
    required: true
  },
  city: {
    type: Schema.ObjectId,
    ref: 'City'
  }
});

// Static
PubCrawlSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    })
    .populate('creator', 'username email')
    .populate('participants', 'username')
    .populate('waypoints')
    .populate('city')
    .exec(cb);
  }
};

mongoose.model('PubCrawl', PubCrawlSchema);