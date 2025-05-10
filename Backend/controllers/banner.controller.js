const Banner = require('../models/banner.model');

// Get all banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create multiple banners
exports.createBanners = async (req, res) => {
  try {
    const banners = await Banner.insertMany(req.body);
    res.status(201).json(banners);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};