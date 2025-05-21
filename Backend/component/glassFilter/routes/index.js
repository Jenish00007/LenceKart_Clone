const express = require('express');
const router = express.Router();

const listingRoutes = require('./listingRoutes');

router.use('/glassProducts', listingRoutes);

module.exports = router;