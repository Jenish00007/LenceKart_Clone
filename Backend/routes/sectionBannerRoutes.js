const express = require('express');
const router = express.Router();
const sectionBannerController = require('../controllers/sectionBannerController');

// Get all section banners
router.get('/banners', sectionBannerController.getAllBanners);

// Get banners by section
router.get('/banners/:section', sectionBannerController.getBannersBySection);

// Create new section banner
router.post('/banners', sectionBannerController.createBanner);

// Update section banner
router.put('/banners/:id', sectionBannerController.updateBanner);

// Delete section banner
router.delete('/banners/:id', sectionBannerController.deleteBanner);

module.exports = router; 