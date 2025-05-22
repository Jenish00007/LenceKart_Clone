const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
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

const CartModel = mongoose.model("cart", cartSchema);

module.exports = {
  CartModel,
};
