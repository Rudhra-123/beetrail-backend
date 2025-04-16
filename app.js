const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const hiveRoutes = require('./routes/hiveRoutes');
const cropRoutes = require('./routes/cropRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', hiveRoutes);
app.use('/api', cropRoutes);

app.get('/', (req, res) => res.send('BeeTrail API Running 🚀'));

module.exports = app;
