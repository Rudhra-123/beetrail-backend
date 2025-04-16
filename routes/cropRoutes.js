const express = require('express');
const router = express.Router();
const { addCrop, getNearbyCrops } = require('../controllers/cropController');

router.post('/crops', addCrop);
router.get('/crops/nearby', getNearbyCrops);

module.exports = router;
