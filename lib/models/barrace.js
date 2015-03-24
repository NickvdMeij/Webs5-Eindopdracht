'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BarRaceSchema = new Schema({
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
  bars: [{
    type: Schema.ObjectId,
    ref: 'Bar'
  }],
  started: Boolean
});

/**
 * Pre hook.
 */

BarRaceSchema.pre('save', function(next, done){
  if (this.isNew)
    this.created = Date.now();

  this.updated.push(Date.now());

  next();
});

/**
 * Statics
 */
BarRaceSchema.statics = {
  load: function(id, cb) {
    this.findOne({
      _id: id
    })
    .populate('creator', 'username')
    .populate('participants', 'username')
    .populate('bars').exec(cb);
  }
};

mongoose.model('BarRace', BarRaceSchema);