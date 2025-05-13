const mongoose = require("mongoose");

const productVisitSchema = new mongoose.Schema({
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
  visitedAt: {
    type: Date,
    default: Date.now
  }
});

// Create compound index for userId and productId
productVisitSchema.index({ userId: 1, productId: 1 });

const ProductVisit = mongoose.model("productVisit", productVisitSchema);

module.exports = ProductVisit; 