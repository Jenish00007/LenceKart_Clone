const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // 🔹 Existing Fields
  imageTsrc: {
    type: String,
    required: true
  },
  productRefLink: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  colors: [{
    type: String
  }],
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
  name: {
    type: String,
    required: true
  },
  shape: {
    type: String,
    enum: ["Round", "Square", "Rectangle", "Aviator", "Cat Eye", "Oval", "Geometric"]
  },
  gender: {
    type: String,
    enum: ["Men", "Women", "Unisex", "Kids"]
  },
  style: {
    type: String,
    enum: ["Casual", "Formal", "Sports", "Fashion", "Vintage"]
  },
  dimension: String,
  productType: {
    type: String,
    required: true,
    enum: ["eyeglasses", "sunglasses", "contact-lenses"]
  },
  productId: {
    type: String,
    required: true,
    unique: true
  },
  userRated: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 1,
    min: 0
  },
  trending: {
    type: Boolean,
    default: false
  },
  recommended: {
    type: Boolean,
    default: false
  },
  frameType: {
    type: String,
    enum: ["Full Rim", "Half Rim", "Rimless"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  // 🔸 New Fields for Filtering
  frameColors: [{
    type: String,
    enum: ["Black", "Transparent", "Gold", "Gunmetal", "Blue", "Silver", "Brown",
      "Green", "Grey", "Purple", "Pink", "Red", "Rose Gold", "Yellow", "Orange",
      "White", "Copper", "Maroon"]
  }],
  // Frame Size
  frameSize: {
    type: String,
    enum: ["Extra Narrow", "Narrow", "Medium", "Wide", "Extra Wide"]
  },

  // Weight Group
  weightGroup: {
    type: String,
    enum: ["Light", "Average"]
  },

  // Prescription Type
  prescriptionType: {
    type: String,
    enum: ["Bifocal/Progressive Supported", "Single Vision Only", "Non-Prescription"]
  },

  // Supported Powers
  supportedPowers: {
    type: String,
    enum: [
      "Supports All Powers",
      "Supports Very High Power",
      "Supports High Power",
      "Upto Regular Power"
    ]
  },

  // Frame Width (in mm as string, optional filtering field)
  frameWidth: {
    type: String,
    enum: ["123 mm", "125 mm", "126 mm", "127 mm", "128 mm", "129 mm", "130 mm", "131 mm",
      "132 mm", "133 mm", "134 mm", "135 mm", "136 mm", "137 mm", "138 mm", "139 mm", "140 mm",
      "141 mm", "142 mm", "143 mm", "144 mm", "145 mm", "146 mm", "147 mm", "148 mm", "149 mm", "150 mm"]
  },

  // Derived Price Range (optional, useful for filter UI)
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
  }
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
