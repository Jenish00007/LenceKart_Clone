const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");

// Get trending eyeglasses
router.get("/trending", async (req, res) => {
  try {
    const trendingProducts = await Product.find({
      productType: "eyeglasses",
      trending: true
    })
    .sort({ createdAt: -1 })
    .limit(8);

    res.status(200).json(trendingProducts);
  } catch (error) {
    console.error("Error fetching trending products:", error);
    res.status(500).json({ error: "Failed to fetch trending products" });
  }
});

// Get recommended products
router.get("/recommended", async (req, res) => {
  try {
    const recommendedProducts = await Product.find({
      recommended: true
    })
    .sort({ createdAt: -1 })
    .limit(6);

    res.status(200).json(recommendedProducts);
  } catch (error) {
    console.error("Error fetching recommended products:", error);
    res.status(500).json({ error: "Failed to fetch recommended products" });
  }
});

module.exports = router; 