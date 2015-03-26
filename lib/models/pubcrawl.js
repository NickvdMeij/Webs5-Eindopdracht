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
  created: Date,
  updated: [Date],
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
  }
});

/**
 * Pre hook.
 */

PubCrawlSchema.pre('save', function(next, done){
  if (this.isNew){
    this.created = Date.now();
  }

  this.updated.push(Date.now());

  next();
});

/**
 * Statics
 */
PubCrawlSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    })
    .populate('creator', 'username email')
    .populate('creator', 'username email')
    .populate('waypoints').exec(cb);
  }
};

mongoose.model('PubCrawl', PubCrawlSchema);