const mongoose = require('mongoose');
const ProductModel = require('./Models/product.model');
const { Shape, initializeShapes } = require('./Models/Shape');
const { Power, initializePowers } = require('./Models/Power');
require('dotenv').config();

const sampleProducts = [
  // Eyeglasses with Power
  {
    name: "Classic Round Metal Eyeglasses",
    imageTsrc: "/images/products/eyeglasses/round-metal.png",
    caption: "Timeless Round Metal Frame",
    productRefLink: "classic-round-metal",
    price: 2499,
    mPrice: 3999,
    productId: "EG001",
    productType: "EYEGLASSES_WITH_POWER",
    powerType: "SINGLE_VISION",
    powerRange: { min: -6.00, max: +6.00 },
    prescriptionType: "Single Vision Only",
    supportedPowers: "Supports All Powers",
    frameType: "Full Rim",
    shape: "Round",
    frameSize: "Medium",
    frameWidth: "135 mm",
    weightGroup: "Light",
    dimension: "135-18-140",
    style: "Classic",
    colors: ["Gold", "Silver"],
    frameColors: ["Gold", "Silver"],
    lensFeatures: ["Anti Glare", "UV Protection"],
    gender: "Unisex",
    ageGroup: "Adults",
    rating: 4.5,
    userRated: 128,
    quantity: 50,
    priceRange: "Rs. 2000-2499"
  },

  // Sunglasses
  {
    name: "Premium Aviator Sunglasses",
    imageTsrc: "/images/products/sunglasses/aviator.png",
    caption: "Classic Aviator Style",
    productRefLink: "premium-aviator",
    price: 3999,
    mPrice: 5999,
    productId: "SG001",
    productType: "SUNGLASSES",
    powerType: "ZERO_POWER",
    frameType: "Full Rim",
    shape: "Aviator",
    frameSize: "Large",
    frameWidth: "140 mm",
    weightGroup: "Light",
    dimension: "140-16-145",
    style: "Fashion",
    colors: ["Gold", "Green"],
    frameColors: ["Gold"],
    lensFeatures: ["Polarized", "UV Protection"],
    gender: "Unisex",
    ageGroup: "Adults",
    rating: 4.8,
    userRated: 256,
    quantity: 30,
    priceRange: "Rs. 2500-4999"
  },

  // Computer Blue Light Glasses
  {
    name: "Blue Cut Computer Glasses",
    imageTsrc: "/images/products/computer/blue-cut.png",
    caption: "Digital Eye Strain Protection",
    productRefLink: "blue-cut-computer",
    price: 1999,
    mPrice: 2999,
    productId: "CB001",
    productType: "COMPUTER_BLU_LENSES",
    powerType: "ZERO_POWER",
    frameType: "Half Rim",
    shape: "Rectangle",
    frameSize: "Medium",
    frameWidth: "138 mm",
    weightGroup: "Light",
    dimension: "138-16-142",
    style: "Modern",
    colors: ["Black", "Blue"],
    frameColors: ["Black", "Blue"],
    lensFeatures: ["Blue Light Block", "Anti Glare"],
    gender: "Unisex",
    ageGroup: "Adults",
    rating: 4.6,
    userRated: 189,
    quantity: 45,
    priceRange: "Rs. 1500-1999"
  },

  // Contact Lenses
  {
    name: "Monthly Disposable Contact Lenses",
    imageTsrc: "/images/products/contact-lenses/monthly.png",
    caption: "Comfortable Monthly Wear",
    productRefLink: "monthly-disposable",
    price: 899,
    mPrice: 1299,
    productId: "CL001",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    powerRange: { min: -8.00, max: +6.00 },
    contactLensType: "Monthly",
    contactLensMaterial: "Silicone Hydrogel",
    gender: "Unisex",
    ageGroup: "Adults",
    rating: 4.7,
    userRated: 312,
    quantity: 100,
    priceRange: "Rs. 500-999"
  },

  // Color Contact Lenses
  {
    name: "Hazel Color Contact Lenses",
    imageTsrc: "/images/products/contact-lenses/color-hazel.png",
    caption: "Natural Looking Hazel Eyes",
    productRefLink: "color-hazel",
    price: 699,
    mPrice: 999,
    productId: "CCL001",
    productType: "COLOR_CONTACT_LENSES",
    powerType: "ZERO_POWER",
    contactLensType: "Monthly",
    contactLensMaterial: "Hydrogel",
    gender: "Unisex",
    ageGroup: "Adults",
    rating: 4.4,
    userRated: 156,
    quantity: 80,
    priceRange: "Rs. 500-999"
  }
];

const initializeDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Initialize shapes
    await initializeShapes();
    console.log('Shapes initialized');

    // Initialize powers
    await initializePowers();
    console.log('Powers initialized');

    // Check if products already exist
    const productCount = await ProductModel.countDocuments();
    if (productCount === 0) {
      // Insert sample products
      await ProductModel.insertMany(sampleProducts);
      console.log('Sample products initialized successfully');
    }

    console.log('Database initialization completed');
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Run the initialization
initializeDatabase();
