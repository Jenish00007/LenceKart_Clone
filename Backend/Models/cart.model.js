const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  productType: String,
  shape: String,
  gender: String,
  style: String
}, {
  timestamps: true
});

// Compound index to ensure unique product per user
cartSchema.index({ userId: 1, productId: 1 }, { unique: true });

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = {
  CartModel,
};
