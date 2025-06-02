const express = require('express');
const router = express.Router();
const GlassProduct = require('../controller/listingFilterClient');

//controllers
router.get('/filter', GlassProduct.filterGlassProduct);

module.exports = router;