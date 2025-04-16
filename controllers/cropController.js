const Crop = require('../models/Crop');

exports.addCrop = async (req, res) => {
  try {
    const { name, floweringStart, floweringEnd, latitude, longitude, recommendedHiveDensity } = req.body;

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ error: "Invalid coordinates" });
    }

    const crop = new Crop({
      name, floweringStart, floweringEnd,
      latitude, longitude, recommendedHiveDensity
    });

    await crop.save();
    res.status(201).json(crop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNearbyCrops = async (req, res) => {
  try {
    const { latitude, longitude, radius = 100, date = new Date().toISOString().split('T')[0] } = req.query;

    const EARTH_RADIUS_KM = 6371;
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const rad = parseFloat(radius);
    const searchDate = new Date(date);

    const crops = await Crop.find({
      floweringStart: { $lte: searchDate },
      floweringEnd: { $gte: searchDate }
    });

    const filtered = crops.filter(crop => {
      const toRad = deg => deg * (Math.PI / 180);
      const dLat = toRad(crop.latitude - lat);
      const dLng = toRad(crop.longitude - lng);

      const a = Math.sin(dLat / 2) ** 2 +
                Math.cos(toRad(lat)) * Math.cos(toRad(crop.latitude)) *
                Math.sin(dLng / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const dist = EARTH_RADIUS_KM * c;
      return dist <= rad;
    });

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
