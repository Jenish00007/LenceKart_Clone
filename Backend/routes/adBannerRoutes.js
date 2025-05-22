const express = require('express');
const router = express.Router();
const adBannerController = require('../controllers/adBannerController');

// Get all ad banners
router.get('/banners', adBannerController.getAdBanners);

// Create a new ad banner
router.post('/banners', adBannerController.createAdBanner);

// Update an ad banner
router.put('/banners/:id', adBannerController.updateAdBanner);

// Delete an ad banner
router.delete('/banners/:id', adBannerController.deleteAdBanner);

module.exports = router; 