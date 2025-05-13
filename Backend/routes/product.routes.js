const express = require("express");
const ProductModel = require("../Models/product.model");

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

productRouter.get("/", async (req, res) => {
  try {
    const query = {};
    console.log("Received query params:", req.query);

    if (req.query.rating) {
      query.rating = req.query.rating;
    }
    if (req.query.colors) {
      query.colors = { $in: [req.query.colors] };
    }
    if (req.query.price) {
      query.price = req.query.price;
    }
    if (req.query.mPrice) {
      query.mPrice = req.query.mPrice;
    }
    if (req.query.shape) {
      query.shape = req.query.shape;
    }
    if (req.query.gender) {
      query.gender = req.query.gender;
    }
    if (req.query.style) {
      query.style = req.query.style;
    }
    if (req.query.dimension) {
      query.dimension = req.query.dimension;
    }
    if (req.query.productType) {
      query.productType = req.query.productType;
    }
    if (req.query.userRated) {
      query.userRated = req.query.userRated;
    }
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: "i" } },
        { productRefLink: { $regex: req.query.search, $options: "i" } },
        { productType: { $regex: req.query.search, $options: "i" } }
      ];
      console.log("Search query:", query.$or);
    }
    if (req.query.productRefLink) {
      query.productRefLink = { $regex: req.query.productRefLink, $options: "i" };
    }
    if (req.query.frameType) {
      query.frameType = req.query.frameType;
    }

    console.log("Final query:", query);

    const products = await ProductModel.find(query)
      .sort({ price: req.query.sort === "lowtohigh" ? 1 : -1 })
      .skip(parseInt(req.query.page) * 12)
      .limit(12);

    const totalCount = await ProductModel.countDocuments(query);

    console.log("Found products:", products.length);

    res.status(200).json({
      success: true,
      totalCount: totalCount,
      products: products
    });
  } catch (error) {
    console.error("Error in product search:", error);
    res.status(500).json({
      success: false,
      error: "Error searching products",
      details: error.message
    });
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
module.exports = {
  productRouter,
};
