const mongoose = require("mongoose");
const ProductModel = require("./product.model");

const productVisitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    index: true
  },
  visitedAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Create compound index for userId and productId
productVisitSchema.index({ userId: 1, productId: 1 }, { unique: true });
// Create index for sorting by visitedAt
productVisitSchema.index({ visitedAt: -1 });

const ProductVisit = mongoose.model("ProductVisit", productVisitSchema);

module.exports = ProductVisit; 