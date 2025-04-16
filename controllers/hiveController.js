const HiveLog = require('../models/HiveLog');

exports.addHive = async (req, res) => {
  try {
    const { hiveId, datePlaced, latitude, longitude, numColonies } = req.body;

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ error: "Invalid latitude/longitude" });
    }

    const exists = await HiveLog.findOne({ hiveId });
    if (exists) {
      return res.status(400).json({ error: "Hive ID must be unique" });
    }

    const hive = new HiveLog({ hiveId, datePlaced, latitude, longitude, numColonies });
    await hive.save();
    res.status(201).json(hive);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHives = async (req, res) => {
  try {
    const { startDate, endDate, page = 1, limit = 10 } = req.query;

    const query = {};
    if (startDate && endDate) {
      query.datePlaced = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const hives = await HiveLog.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(hives);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
