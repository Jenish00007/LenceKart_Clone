const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.controller');

router.get("/banners", bannerController.getBanners);
router.post("/banners", bannerController.createBanners);
router.delete("/:id", bannerController.deleteBanner);

module.exports = router;
