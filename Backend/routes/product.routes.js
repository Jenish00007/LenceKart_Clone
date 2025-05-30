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
      isRecommended: true
    })
      .sort({ rating: -1 })
      .limit(6)
      .select('productId name imageTsrc additionalImages caption productRefLink price mPrice mainCategory subCategory personCategory gender ageGroup selectedCategoryPrice brands topPicks powerType powerRange prescriptionType supportedPowers frameType shape frameSize frameWidth weightGroup style lensFeatures isRecommended isTrending isLatest isExclusive isSpecialOffer isBestSeller isTrialPack rating reviewCount quantity discount');

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
    console.log('Fetching last visited products for user:', req.user._id);
    
    const userId = req.user._id;
    if (!userId) {
      console.error('No user ID found in request');
      return res.status(400).json({
        success: false,
        message: "User ID not found"
      });
    }

    console.log('Finding visits for user:', userId);
    const lastVisits = await ProductVisit.find({ userId })
      .sort({ visitedAt: -1 })
      .limit(8)
      .populate({
        path: 'productId',
        model: 'Product',
        select: 'name price imageTsrc rating shape gender style productType'
      });

    console.log('Found visits:', lastVisits);

    // Extract just the product data from the populated visits
    const lastVisitedProducts = lastVisits
      .filter(visit => visit.productId) // Filter out any null products
      .map(visit => visit.productId);

    console.log('Processed products:', lastVisitedProducts);

    // Return empty array if no products found
    res.status(200).json({
      success: true,
      products: lastVisitedProducts || []
    });
  } catch (error) {
    console.error('Error in /lastvisited route:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
});

// Record product visit for authenticated user
productRouter.post("/visit/:id", auth, productValidation.getById, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;

    console.log('Recording product visit:', { userId, productId });

    const product = await ProductModel.findById(productId);
    if (!product) {
      console.log('Product not found:', productId);
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    console.log('Found product:', product._id);

    const visitRecord = await ProductVisit.findOneAndUpdate(
      { userId, productId },
      { visitedAt: new Date() },
      { upsert: true, new: true }
    );

    console.log('Visit record created/updated:', visitRecord);

    res.status(200).json({
      success: true,
      message: "Visit recorded successfully",
      product: product
    });
  } catch (error) {
    console.error('Error recording product visit:', error);
    next(error);
  }
});

// Filter products
productRouter.get("/", async (req, res, next) => {
  try {
    const query = {};
    
    // Category filters
    if (req.query.mainCategory) {
      query.mainCategory = req.query.mainCategory.toUpperCase();
    }
    if (req.query.subCategory) {
      query.subCategory = req.query.subCategory.toUpperCase();
    }
    
    // Selected Category Price filter
    if (req.query.selectedCategoryPrice) {
      query.selectedCategoryPrice = req.query.selectedCategoryPrice.toLowerCase();
      
      // Add price range based on category with exact ranges
      switch(req.query.selectedCategoryPrice.toLowerCase()) {
        case 'classic-eyeglasses':
          query.price = { $gte: 1499, $lte: 4998 };
          break;
        case 'premium-eyeglasses':
          query.price = { $gte: 4999, $lte: 14999 };
          break;
        case 'designer-eyeglasses':
          query.price = { $gte: 15000 };
          break;
      }
    }
    
    // Person and gender filters
    if (req.query.personCategory) {
      query.personCategory = req.query.personCategory.toLowerCase();
    }
    if (req.query.gender) {
      query.gender = req.query.gender;
    }
    
    // Frame and shape filters
    if (req.query.frameType) {
      query.frameType = req.query.frameType;
    }
    if (req.query.shape) {
      query.shape = req.query.shape;
    }
    
    // Style and features
    if (req.query.style) {
      query.style = req.query.style.toUpperCase();
    }
    if (req.query.lensFeatures) {
      query.lensFeatures = { $in: [req.query.lensFeatures.toUpperCase()] };
    }
    
    // Brand filter
    if (req.query.brands) {
      query.brands = { $in: [req.query.brands] };
    }
    
    // Price range filter (only if not using selectedCategoryPrice)
    if (req.query.priceRange && !req.query.selectedCategoryPrice) {
      const [min, max] = req.query.priceRange.split('-').map(Number);
      query.price = { $gte: min, $lte: max };
    }
    
    // Power type filter
    if (req.query.powerType) {
      query.powerType = req.query.powerType.toLowerCase();
    }

    // Contact lens colors filter
    if (req.query.contactLensColors) {
      // Convert to title case (first letter uppercase, rest lowercase)
      const color = req.query.contactLensColors.toLowerCase();
      query.contactLensColors = { $in: [color.charAt(0).toUpperCase() + color.slice(1)] };
    }

    // Contact lens solution size filter
    if (req.query.contactLensSolutionSize) {
      // Convert to title case and handle special cases
      const size = req.query.contactLensSolutionSize.toLowerCase();
      let formattedSize;
      
      switch(size) {
        case 'extra small':
          formattedSize = 'Extra Small (10-25 ml)';
          break;
        case 'small':
          formattedSize = 'Small (30-45 ml)';
          break;
        case 'medium':
          formattedSize = 'Medium (50-65 ml)';
          break;
        case 'large':
          formattedSize = 'Large (70-85 ml)';
          break;
        case 'extra large':
          formattedSize = 'Extra Large (90-100 ml)';
          break;
        default:
          formattedSize = 'Not Applicable';
      }
      
      query.contactLensSolutionSize = { $in: [formattedSize] };
    }

    // Contact lens type filter
    if (req.query.contactLensType) {
      // Convert to title case (first letter uppercase, rest lowercase)
      const lensType = req.query.contactLensType.toLowerCase();
      query.contactLensType = lensType.charAt(0).toUpperCase() + lensType.slice(1);
    }

    // Contact lens accessories filter
    if (req.query.subCategory === "CONTACT_LENS_ACCESSORIES") {
      // Add name search for accessories
      if (req.query.name) {
        const searchTerms = req.query.name.toLowerCase().split(' ');
        query.$or = searchTerms.map(term => ({
          name: { $regex: term, $options: "i" }
        }));
      }

      // Add accessory type filter
      if (req.query.accessoryType) {
        const accessoryType = req.query.accessoryType.toUpperCase();
        query.accessoryType = accessoryType;
      }
    }

    // Top picks filter
    if (req.query.topPicks) {
      query.topPicks = req.query.topPicks.toLowerCase();
    }

    console.log('Filter Query:', query);
    
    // Pagination
    const limit = parseInt(req.query.limit) || 12;
    const offset = parseInt(req.query.offset) || 0;
    
    // Get total count for pagination
    const total = await ProductModel.countDocuments(query);
    
    // Get filtered products
    const products = await ProductModel.find(query)
      .sort({ rating: -1 })
      .skip(offset)
      .limit(limit)
      .select('name imageTsrc price mPrice rating discount mainCategory subCategory gender frameType shape style brands lensFeatures selectedCategoryPrice');
    
    console.log('Found Products:', products.length);
    
    res.status(200).json({
      success: true,
      total,
      limit,
      offset,
      count: products.length,
      products
    });
  } catch (error) {
    console.error('Filter Error:', error);
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

// Get computer blue lenses products with power
productRouter.get('/computer-blu-lenses/with-power', async (req, res) => {
  try {
    const products = await ProductModel.find({
      subCategory: "COMPUTER_GLASSES",
      powerType: "with_power",
      lensFeatures: { $in: ["Blue Light Block"] }
    })
    .sort({ rating: -1 })
    .select('productId name imageTsrc additionalImages caption productRefLink price mPrice mainCategory subCategory personCategory gender ageGroup selectedCategoryPrice brands topPicks powerType powerRange prescriptionType supportedPowers frameType shape frameSize frameWidth weightGroup style lensFeatures isRecommended isTrending isLatest isExclusive isSpecialOffer isBestSeller isTrialPack rating reviewCount quantity discount');

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching computer blue lenses products', 
      error: error.message 
    });
  }
});

// Get computer blue lenses products with zero power
productRouter.get('/computer-blu-lenses/zero-power', async (req, res) => {
  try {
    const products = await ProductModel.find({
      subCategory: "COMPUTER_GLASSES",
      powerType: "zero_power",
      lensFeatures: { $in: ["Blue Light Block"] }
    })
    .sort({ rating: -1 })
    .select('productId name imageTsrc additionalImages caption productRefLink price mPrice mainCategory subCategory personCategory gender ageGroup selectedCategoryPrice brands topPicks powerType powerRange prescriptionType supportedPowers frameType shape frameSize frameWidth weightGroup style lensFeatures isRecommended isTrending isLatest isExclusive isSpecialOffer isBestSeller isTrialPack rating reviewCount quantity discount');

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching computer blue lenses products', 
      error: error.message 
    });
  }
});

// Get eyeglasses products
productRouter.get('/eyeglasses', async (req, res) => {
  try {
    const products = await ProductModel.find({
      subCategory: "EYEGLASSES"
    })
    .sort({ rating: -1 })
    .select('productId name imageTsrc additionalImages caption productRefLink price mPrice mainCategory subCategory personCategory gender ageGroup selectedCategoryPrice brands topPicks powerType powerRange prescriptionType supportedPowers frameType shape frameSize frameWidth weightGroup style lensFeatures isRecommended isTrending isLatest isExclusive isSpecialOffer isBestSeller isTrialPack rating reviewCount quantity discount');

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching eyeglasses products', 
      error: error.message 
    });
  }
});

// Get sunglasses products
productRouter.get('/sunglasses', async (req, res) => {
  try {
    const products = await ProductModel.find({
      subCategory: "SUNGLASSES"
    })
    .sort({ rating: -1 })
    .select('productId name imageTsrc additionalImages caption productRefLink price mPrice mainCategory subCategory personCategory gender ageGroup selectedCategoryPrice brands topPicks powerType powerRange prescriptionType supportedPowers frameType shape frameSize frameWidth weightGroup style lensFeatures isRecommended isTrending isLatest isExclusive isSpecialOffer isBestSeller isTrialPack rating reviewCount quantity discount');

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching sunglasses products', 
      error: error.message 
    });
  }
});

// Get computer glasses products
productRouter.get('/computer-glasses', async (req, res) => {
  try {
    const products = await ProductModel.find({
      subCategory: "COMPUTER_GLASSES"
    })
    .sort({ rating: -1 })
    .select('productId name imageTsrc additionalImages caption productRefLink price mPrice mainCategory subCategory personCategory gender ageGroup selectedCategoryPrice brands topPicks powerType powerRange prescriptionType supportedPowers frameType shape frameSize frameWidth weightGroup style lensFeatures isRecommended isTrending isLatest isExclusive isSpecialOffer isBestSeller isTrialPack rating reviewCount quantity discount');

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching computer glasses products', 
      error: error.message 
    });
  }
});

// Get contact lenses products
productRouter.get('/contact-lenses', async (req, res) => {
  try {
    const products = await ProductModel.find({
      subCategory: "CONTACT_LENSES"
    })
    .sort({ rating: -1 })
    .select('productId name imageTsrc additionalImages caption productRefLink price mPrice mainCategory subCategory personCategory gender ageGroup selectedCategoryPrice brands topPicks powerType powerRange prescriptionType supportedPowers frameType shape frameSize frameWidth weightGroup style lensFeatures isRecommended isTrending isLatest isExclusive isSpecialOffer isBestSeller isTrialPack rating reviewCount quantity discount');

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching contact lenses products', 
      error: error.message 
    });
  }
});

// Get color contact lenses products
productRouter.get('/color-contact-lenses', async (req, res) => {
  try {
    const products = await ProductModel.find({
      subCategory: "CONTACT_LENSES",
      contactLensColors: { $exists: true, $ne: [] }
    })
    .sort({ rating: -1 })
    .select('productId name imageTsrc additionalImages caption productRefLink price mPrice mainCategory subCategory personCategory gender ageGroup selectedCategoryPrice brands topPicks powerType powerRange prescriptionType supportedPowers frameType shape frameSize frameWidth weightGroup style lensFeatures isRecommended isTrending isLatest isExclusive isSpecialOffer isBestSeller isTrialPack rating reviewCount quantity discount contactLensColors contactLensType contactLensMaterial');

    res.status(200).json({
      success: true,
      products
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching color contact lenses products', 
      error: error.message 
    });
  }
});

// Get product by ID - This should be AFTER all specific routes
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

// Get all products with filters
productRouter.get("/", async (req, res, next) => {
  try {
    const query = {};
    let searchTerm = "";
    
    // Enhanced fuzzy search functionality
    if (req.query.search) {
      searchTerm = req.query.search.toLowerCase();
      
      // Create an array of search terms with common variations
      const searchTerms = [searchTerm];
      
      // Add common misspellings and variations
      const misspellings = {
        'conact': 'contact',
        'eyeglass': 'eyeglasses',
        'sunglass': 'sunglasses',
        'lense': 'lens',
        'lenses': 'lens',
        'glasses': 'glass',
        'frame': 'frames',
        'spectacle': 'spectacles',
        'spectacles': 'spectacle',
        'len': 'lens',
        'contct': 'contact',
        'gls': 'glasses',
        'specs': 'spectacles',
        'sun': 'sunglasses',
        'eye': 'eyeglasses',
        'comp': 'computer',
        'blu': 'blue',
        'blck': 'black',
        'wht': 'white',
        'rd': 'red',
        'grn': 'green',
        'ylw': 'yellow',
        'prpl': 'purple',
        'pink': 'pink',
        'brwn': 'brown',
        'gry': 'gray',
        'slvr': 'silver',
        'gld': 'gold',
        'matal': 'metal',
        'plastc': 'plastic',
        'woodn': 'wooden',
        'titan': 'titanium',
        'acct': 'acetate',
        'trnd': 'trendy',
        'clas': 'classic',
        'modrn': 'modern',
        'vntg': 'vintage',
        'sport': 'sports',
        'casl': 'casual',
        'forml': 'formal',
        'kids': 'children',
        'wmn': 'women',
        'mn': 'men',
        'unisex': 'unisex',
        'child': 'children',
        'adult': 'adults',
        'senior': 'seniors',
        'youth': 'youth',
        'teen': 'teenager',
        'teenager': 'teen',
        'presc': 'prescription',
        'prescr': 'prescription',
        'prescrptn': 'prescription',
        'power': 'powered',
        'powrd': 'powered',
        'zero': 'zero power',
        'zerop': 'zero power',
        'zeropwr': 'zero power',
        'withp': 'with power',
        'withpwr': 'with power',
        'withpower': 'with power',
        'bluelight': 'blue light',
        'bluelite': 'blue light',
        'blulite': 'blue light',
        'blulight': 'blue light',
        'compglass': 'computer glasses',
        'compgls': 'computer glasses',
        'compglasses': 'computer glasses',
        'sungls': 'sunglasses',
        'sunglass': 'sunglasses',
        'eyegls': 'eyeglasses',
        'eyeglass': 'eyeglasses',
        'contlens': 'contact lenses',
        'contlenses': 'contact lenses',
        'contlense': 'contact lenses',
        'contlen': 'contact lenses',
        'contl': 'contact lenses',
        'clens': 'contact lenses',
        'clense': 'contact lenses',
        'clense': 'contact lenses',
        'cl': 'contact lenses'
      };

      // Add misspelling variations
      if (misspellings[searchTerm]) {
        searchTerms.push(misspellings[searchTerm]);
      }

      // Add partial matches
      const words = searchTerm.split(/\s+/);
      words.forEach(word => {
        if (word.length > 2) {
          searchTerms.push(word);
        }
      });

      // Create the search query with similarity scoring
      query.$or = searchTerms.map(term => ({
        $or: [
          { name: { $regex: term, $options: "i" } },
          { caption: { $regex: term, $options: "i" } },
          { productType: { $regex: term, $options: "i" } },
          { brands: { $regex: term, $options: "i" } },
          { mainCategory: { $regex: term, $options: "i" } },
          { subCategory: { $regex: term, $options: "i" } },
          { productRefLink: { $regex: term, $options: "i" } }
        ]
      }));
    }
    
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

    // Query DB with aggregation for better search results
    const aggregationPipeline = [
      { $match: query }
    ];

    // Add scoring only if there's a search term
    if (searchTerm) {
      aggregationPipeline.push({
        $addFields: {
          searchScore: {
            $add: [
              // Name score
              { $cond: [{ $regexMatch: { input: "$name", regex: searchTerm, options: "i" } }, 10, 0] },
              // Caption score
              { $cond: [{ $regexMatch: { input: "$caption", regex: searchTerm, options: "i" } }, 8, 0] },
              // Product type score
              { $cond: [{ $regexMatch: { input: "$productType", regex: searchTerm, options: "i" } }, 6, 0] },
              // Main category score
              { $cond: [{ $regexMatch: { input: "$mainCategory", regex: searchTerm, options: "i" } }, 5, 0] },
              // Sub category score
              { $cond: [{ $regexMatch: { input: "$subCategory", regex: searchTerm, options: "i" } }, 4, 0] },
              // Brands score
              { $cond: [{ $in: [searchTerm, { $map: { input: "$brands", as: "brand", in: { $toLower: "$$brand" } } }] }, 3, 0] }
            ]
          }
        }
      });

      // Sort by search score first if searching
      aggregationPipeline.push({ $sort: { searchScore: -1, price: sort } });
    } else {
      // Sort by price only if not searching
      aggregationPipeline.push({ $sort: { price: sort } });
    }

    // Add pagination
    aggregationPipeline.push(
      { $skip: skip },
      { $limit: limit }
    );

    const products = await ProductModel.aggregate(aggregationPipeline);

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
    console.error('Error in products route:', error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
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

// Special product category routes
productRouter.get('/top-rated', productController.getTopRatedProducts);
productRouter.get('/latest', productController.getLatestProducts);
productRouter.get('/exclusive', productController.getExclusiveProducts);
productRouter.get('/offered', productController.getOfferedProducts);

module.exports = productRouter;
