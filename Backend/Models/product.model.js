const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // Basic Product Information
  name: {
    type: String,
    required: true
  },
  imageTsrc: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  productRefLink: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  mPrice: {
    type: Number,
    required: true,
    min: 0
  },
  productId: {
    type: String,
    required: true,
    unique: true
  },

  // Product Type and Category
  productType: {
    type: String,
    required: true,
    enum: [
      "EYEGLASSES",
      "SUNGLASSES",
      "COMPUTER_BLU_LENSES",
      "ZERO_POWER_COMPUTER_BLU",
      "CONTACT_LENSES",
      "COLOR_CONTACT_LENSES",
      "CONTACT_LENS_SOLUTION",
      "SUNGLASSES_WITH_POWER",
      "EYEGLASSES_WITH_POWER"
    ]
  },

  // Power and Lens Details
  powerType: {
    type: String,
    enum: [
      "ZERO_POWER",
      "SINGLE_VISION",
      "BIFOCAL",
      "PROGRESSIVE",
      "READING",
      "CONTACT_LENS_POWER",
      "NOT_APPLICABLE"
    ]
  },
  powerRange: {
    min: { type: Number },
    max: { type: Number }
  },
  prescriptionType: {
    type: String,
    enum: ["Bifocal/Progressive Supported", "Single Vision Only", "Non-Prescription"]
  },
  supportedPowers: {
    type: String,
    enum: [
      "Supports All Powers",
      "Supports Very High Power",
      "Supports High Power",
      "Upto Regular Power"
    ]
  },
  
  // Frame Details
  frameType: {
    type: String,
    enum: ["Full Rim", "Half Rim", "Rimless"]
  },
  shape: {
    type: String,
    enum: [
      "Round",
      "Square", 
      "Rectangle",
      "Aviator",
      "Cat Eye",
      "Oval",
      "Geometric",
      "Wayfarer",
      "Clubmaster",
      "Butterfly",
      "Wrap",
      "Sports"
    ]
  },
  frameSize: {
    type: String,
    enum: ["Extra Narrow", "Narrow", "Medium", "Wide", "Extra Wide"]
  },
  frameWidth: {
    type: String,
    enum: ["123 mm", "125 mm", "126 mm", "127 mm", "128 mm", "129 mm", "130 mm", "131 mm",
      "132 mm", "133 mm", "134 mm", "135 mm", "136 mm", "137 mm", "138 mm", "139 mm", "140 mm",
      "141 mm", "142 mm", "143 mm", "144 mm", "145 mm", "146 mm", "147 mm", "148 mm", "149 mm", "150 mm"]
  },
  weightGroup: {
    type: String,
    enum: ["Light", "Average"]
  },
  dimension: String,

  // Style and Aesthetics
  style: {
    type: String,
    enum: ["Casual", "Formal", "Sports", "Fashion", "Vintage", "Classic", "Modern"]
  },
  colors: [{
    type: String
  }],
  frameColors: [{
    type: String,
    enum: [
      "Black", "Transparent", "Gold", "Gunmetal", "Blue", "Silver",
      "Brown", "Green", "Grey", "Purple", "Pink", "Red", "Rose Gold",
      "Yellow", "Orange", "White", "Copper", "Maroon", "Multicolor"
    ]
  }],

  // Lens Features
  lensFeatures: [{
    type: String,
    enum: [
      "Anti Glare",
      "Blue Light Block",
      "Polarized",
      "UV Protection",
      "Anti Scratch",
      "Water Resistant",
      "Photochromic",
      "High Index"
    ]
  }],

  // Contact Lens Specific
  contactLensType: {
    type: String,
    enum: [
      "Daily",
      "Weekly",
      "Monthly",
      "Yearly",
      "NOT_APPLICABLE"
    ]
  },
  contactLensMaterial: {
    type: String,
    enum: [
      "Silicone Hydrogel",
      "Hydrogel",
      "Gas Permeable",
      "Hybrid",
      "NOT_APPLICABLE"
    ]
  },

  // Demographics
  gender: {
    type: String,
    enum: ["Men", "Women", "Unisex", "Kids"]
  },
  ageGroup: {
    type: String,
    enum: ["Kids", "Teens", "Adults", "Seniors"]
  },

  // Ratings and Reviews
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  userRated: {
    type: Number,
    default: 0
  },

  // Stock and Inventory
  quantity: {
    type: Number,
    default: 1,
    min: 0
  },

  // Marketing and Display
  trending: {
    type: Boolean,
    default: false
  },
  topPicks: {
    type: String,
    enum: ["new-arrivals", "best-sellers", "trending", "exclusive"]
  },
  masterCategory: {
    type: String,
    enum: ["eyeglasses", "sunglasses", "contact-lenses"]
  },
  personCategory: {
    type: String,
    enum: ["men", "women", "kids", "unisex"]
  },
  selectedCategoryPrice: {
    type: String,
    enum: ["classic-eyeglasses", "premium-eyeglasses", "designer-eyeglasses"]
  },
  recommended: {
    type: Boolean,
    default: false
  },
  isNew: {
    type: Boolean,
    default: false
  },
  isBestSeller: {
    type: Boolean,
    default: false
  },
  isExclusive: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },

  // Additional Images
  additionalImages: [{
    type: String
  }],

  // Price Range Category__________________________________
  priceRange: {
    type: String,
    enum: [
      "Rs. 500-999",
      "Rs. 1000-1499",
      "Rs. 1500-1999",
      "Rs. 2000-2499",
      "Rs. 2500-4999",
      "Rs. 5000-9999",
      "Rs. 10000-14999",
      "Rs. 15000+"
    ]
  },

  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
productSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;

