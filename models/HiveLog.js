const mongoose = require('mongoose');

const HiveLogSchema = new mongoose.Schema({
  hiveId: { type: String, unique: true, required: true },
  datePlaced: { type: Date, required: true },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180
  },
  numColonies: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HiveLog', HiveLogSchema);
