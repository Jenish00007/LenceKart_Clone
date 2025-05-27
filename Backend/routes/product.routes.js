const express = require("express");
const ProductModel = require("../Models/product.model");
const ProductVisit = require("../Models/productVisit.model");
const auth = require("../middlwares/auth");
const productController = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.use(express.json());

// Get trending products
productRouter.get("/trending", async (req, res) => {
  try {
    const trendingProducts = await ProductModel.find()
      .sort({ rating: -1, userRated: -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      products: trendingProducts
    });
  } catch (error) {
    console.error("Error fetching trending products:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch trending products"
    });
  }
});

// Get recommended products
productRouter.get("/recommended", async (req, res) => {
  try {
    const recommendedProducts = await ProductModel.find({
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

// Get last visited products for authenticated user
productRouter.get("/lastvisited", auth, async (req, res) => {
  try {
    console.log("1. Starting last-visited API call");
    const userId = req.user._id;
    console.log("2. User ID from token:", userId);

    // Get last visited products for the user with populated product details
    console.log("3. Finding visits for user");
    const lastVisits = await ProductVisit.find({ userId })
      .sort({ visitedAt: -1 })
      .limit(8)
      .populate({
        path: 'productId',
        model: 'product',
        select: 'name price image rating colors shape gender style dimension productType imageTsrc'
      });
    console.log("4. Found visits:", lastVisits.length);

    // Filter out any null products and map to get only product data
    const lastVisitedProducts = lastVisits
      .filter(visit => visit.productId)
      .map(visit => visit.productId);
    console.log("5. Filtered products:", lastVisitedProducts.length);

    console.log("6. Sending response");
    res.status(200).json({
      success: true,
      products: lastVisitedProducts
    });
  } catch (error) {
    console.error("Error in last-visited API:", error);
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch last visited products",
      details: error.message 
    });
  }
});

// Record product visit for authenticated user
productRouter.post("/visit/:id", auth, async (req, res) => {
  try {
    console.log("1. Starting visit recording");
    const userId = req.user._id;
    const productId = req.params.id;
    console.log("2. User ID:", userId, "Product ID:", productId);

    // Check if product exists
    console.log("3. Checking if product exists");
    const product = await ProductModel.findById(productId);
    if (!product) {
      console.log("4. Product not found");
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    console.log("4. Product found:", product.name);

    // Update or create visit record
    console.log("5. Updating visit record");
    const visitRecord = await ProductVisit.findOneAndUpdate(
      { userId, productId },
      { visitedAt: new Date() },
      { upsert: true, new: true }
    );
    console.log("6. Visit record updated:", visitRecord);

    console.log("7. Sending response");
    res.status(200).json({
      success: true,
      message: "Visit recorded successfully",
      product: product
    });
  } catch (error) {
    console.error("Error in visit recording:", error);
    res.status(500).json({
      success: false,
      error: "Failed to record product visit",
      details: error.message
    });
  }
});

// Get all products with filters
productRouter.get("/", async (req, res) => {
  try {
    const query = {};
    // Case-insensitive string filters
    if (req.query.frameType && req.query.frameType !== "") {
      query.frameType = { $regex: new RegExp(`^${req.query.frameType}$`, 'i') };
    }
    if (req.query.productType && req.query.productType !== "") {
      query.productType = { $regex: new RegExp(`^${req.query.productType}$`, 'i') };
    }
    if (req.query.gender && req.query.gender !== "") {
      query.gender = { $regex: new RegExp(`^${req.query.gender}$`, 'i') };
    }
    if (req.query.shape && req.query.shape !== "") {
      query.shape = { $regex: new RegExp(`^${req.query.shape}$`, 'i') };
    }
    if (req.query.style && req.query.style !== "") {
      query.style = { $regex: new RegExp(`^${req.query.style}$`, 'i') };
    }
    // Array field filter (multi-select support)
    if (req.query.colors && req.query.colors !== "") {
      const colors = Array.isArray(req.query.colors) ? req.query.colors : [req.query.colors];
      query.colors = { $in: colors };
    }
    // Price range filter
    if (req.query.priceRange && req.query.priceRange !== "") {
      const match = req.query.priceRange.match(/(\d+)/g);
      if (match && match.length >= 2) {
        query.price = {
          $gte: Number(match[0]),
          $lte: Number(match[1])
        };
      }
    }
    // Search filter
    if (req.query.search && req.query.search !== "") {
      query.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { productRefLink: { $regex: req.query.search, $options: "i" } },
        { productType: { $regex: req.query.search, $options: "i" } }
      ];
    }
    // Special filters
    if (req.query.trending === "true") {
      query.trending = true;
    }
    if (req.query.recommended === "true") {
      query.recommended = true;
    }
    // Pagination
    const page = Number(req.query.page) || 0;
    const limit = Number(req.query.limit) || 12;
    const skip = page * limit;
    // Sorting
    const sort = req.query.sort === "lowtohigh" ? 1 : -1;
    // Query DB
    const products = await ProductModel.find(query)
      .sort({ price: sort })
      .skip(skip)
      .limit(limit);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in product filtering:", error);
    res.status(500).json({ error: "Failed to fetch products", details: error.message });
  }
});

// Special product category routes - Move these BEFORE the /:id route
productRouter.get('/categories', async (req, res) => {
  try {
    // Get all distinct product types
    const categories = await ProductModel.distinct('productType');
    
    // Normalize and deduplicate categories
    const normalizedCategories = [...new Set(categories.map(category => {
      // Convert to uppercase and replace hyphens with underscores
      return category.toUpperCase().replace(/-/g, '_');
    }))];

    // Sort categories alphabetically
    normalizedCategories.sort();

    res.status(200).json({
      success: true,
      categories: normalizedCategories
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching categories', 
      error: error.message 
    });
  }
});

productRouter.get('/categories/top-rated', async (req, res) => {
  try {
    const products = await ProductModel.find({ rating: { $gte: 4 } })
      .sort({ rating: -1 })
      .limit(10);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching top rated products', error: error.message });
  }
});

productRouter.get('/categories/latest', async (req, res) => {
  try {
    const products = await ProductModel.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest products', error: error.message });
  }
});

productRouter.get('/categories/exclusive', async (req, res) => {
  try {
    const products = await ProductModel.find({ isExclusive: true })
      .limit(10);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exclusive products', error: error.message });
  }
});

productRouter.get('/categories/offered', async (req, res) => {
  try {
    const products = await ProductModel.find({ discount: { $gt: 0 } })
      .sort({ discount: -1 })
      .limit(10);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offered products', error: error.message });
  }
});

// Get product by ID
productRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById({ _id: id });
    if (product) {
      res.status(200).json({
        success: true,
        product: product,
      });
    }
  } catch (err) {
    console.log({ err: err });
    res.status(400).send({ success: false, err: err });
  }
});

productRouter.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const newProduct = new ProductModel(payload);
    await newProduct.save();
    res
      .status(201)
      .json({ newProduct, message: "New Products successfully Added" });
  } catch (err) {
    console.log("err :", err);
    res.status(400).send({ msg: err });
  }
});

productRouter.post("/many", async (req, res) => {
  const payload = req.body;
  try {
    const newProduct = await ProductModel.insertMany(payload);
    res.status(201).send(newProduct);
  } catch (err) {
    console.log("err :", err);
    res.status(400).send({ msg: err });
  }
});

productRouter.patch("/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    const product = await ProductModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(204).send({
      success: true,
      msg: "Successfully Updated the product",
      products: product,
    });
    await product.save();
  } catch (err) {
    console.log({ err: err, msg: " Product Update Error!" });
    res.send({ success: false, msg: " Product Update Error!", err: err });
  }
});

productRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await ProductModel.findByIdAndDelete({ _id: id });
    res.json({ status: 200, message: "Deleted The Product" });
  } catch {
    console.log("err :", err);
    res.send({ msg: err });
  }
});

productRouter.get("/filter", async (req, res) => {
  try {
    const {
      productType,
      frameWidth,
      gender,
      frameSize,
      frameShape,
      supportedPowers,
      prescriptionType,
      weightGroup,
      priceRange,
      frameColors,
      frameType,
      search,
      limit = 10,
      offset = 0
    } = req.query;

    const query = {};

    if (productType) query.productType = productType;
    if (frameWidth) query.frameWidth = frameWidth;
    if (gender) query.gender = gender;
    if (frameShape) query.frameShape = frameShape;
    if (prescriptionType) query.prescriptionType = prescriptionType;
    if (weightGroup) query.weightGroup = weightGroup;
    if (frameType) query.frameType = frameType;

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (priceRange) {
      const [min, max] = priceRange.split(',').map(Number);
      query.price = {};
      if (!isNaN(min)) query.price.$gte = min;
      if (!isNaN(max)) query.price.$lte = max;
    }

    if (supportedPowers) {
      const powers = supportedPowers.split(',');
      query.supportedPowers = { $in: powers };
    }

    if (frameSize) {
      const sizes = frameSize.split(',');
      query.frameSize = { $in: sizes };
    }

    if (frameColors) {
      const colors = frameColors.split(',');
      query.frameColors = { $in: colors };
    }

    const parsedLimit = Math.max(1, parseInt(limit));
    const parsedOffset = Math.max(0, parseInt(offset));

    const [products, total] = await Promise.all([
      ProductModel.find(query).skip(parsedOffset).limit(parsedLimit),
      ProductModel.countDocuments(query)
    ]);

    return res.status(200).json({
      status: true,
      total,
      limit: parsedLimit,
      offset: parsedOffset,
      count: products.length,
      data: products
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

// Special product category routes
productRouter.get('/top-rated', productController.getTopRatedProducts);
productRouter.get('/latest', productController.getLatestProducts);
productRouter.get('/exclusive', productController.getExclusiveProducts);
productRouter.get('/offered', productController.getOfferedProducts);

module.exports = {
  productRouter,
};
