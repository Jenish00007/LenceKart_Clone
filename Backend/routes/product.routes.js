const express = require("express");
const ProductModel = require("../Models/product.model");
const ProductVisit = require("../Models/productVisit.model");
const auth = require("../middlwares/auth");
const { productValidation } = require("../middlwares/validators");
const productController = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.use(express.json());

// Get trending products
productRouter.get("/trending", async (req, res, next) => {
  try {
    const trendingProducts = await ProductModel.find()
      .sort({ rating: -1, userRated: -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      products: trendingProducts
    });
  } catch (error) {
    next(error);
  }
});

// Get recommended products
productRouter.get("/recommended", async (req, res, next) => {
  try {
    const recommendedProducts = await ProductModel.find({
      recommended: true
    })
      .sort({ createdAt: -1 })
      .limit(6);

    res.status(200).json({
      success: true,
      products: recommendedProducts
    });
  } catch (error) {
    next(error);
  }
});

// Get last visited products for authenticated user
productRouter.get("/lastvisited", auth, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const lastVisits = await ProductVisit.find({ userId })
      .sort({ visitedAt: -1 })
      .limit(8)
      .populate({
        path: 'productId',
        model: 'product',
        select: 'name price image rating colors shape gender style dimension productType imageTsrc'
      });

    const lastVisitedProducts = lastVisits
      .filter(visit => visit.productId)
      .map(visit => visit.productId);

    res.status(200).json({
      success: true,
      products: lastVisitedProducts
    });
  } catch (error) {
    next(error);
  }
});

// Record product visit for authenticated user
productRouter.post("/visit/:id", auth, productValidation.getById, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const visitRecord = await ProductVisit.findOneAndUpdate(
      { userId, productId },
      { visitedAt: new Date() },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Visit recorded successfully",
      product: product
    });
  } catch (error) {
    next(error);
  }
});

// Get all products with filters
productRouter.get("/", async (req, res, next) => {
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

    // Get total count for pagination
    const total = await ProductModel.countDocuments(query);

    res.status(200).json({
      success: true,
      products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
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

// Create new product (protected route)
productRouter.post("/", auth, productValidation.create, async (req, res, next) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
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

// Update product (protected route)
productRouter.put("/:id", auth, productValidation.update, async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    next(error);
  }
});

// Delete product (protected route)
productRouter.delete("/:id", auth, productValidation.getById, async (req, res, next) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    next(error);
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
