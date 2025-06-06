const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  floweringStart: { type: Date, required: true },
  floweringEnd: { type: Date, required: true },
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
  recommendedHiveDensity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Crop', CropSchema);
