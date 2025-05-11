const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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
  }
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel;
