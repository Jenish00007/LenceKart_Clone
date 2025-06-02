const express = require("express");
const { CartModel } = require("../Models/cart.model");
const auth = require("../middlwares/auth");
const cartRouter = express.Router();

// Get user's cart
cartRouter.get("/", auth, async (req, res) => {
  try {
    console.log('Fetching cart for user:', req.user._id);
    
    const carts = await CartModel.find({ userId: req.user._id })
      .populate({
        path: 'productId',
        model: 'Product',
        select: 'name price imageTsrc rating shape gender style productType'
      })
      .sort({ createdAt: -1 });
    
    console.log('Found cart items:', carts.length);
    
    res.status(200).json({
      success: true,
      cart: carts
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart items",
      error: error.message
    });
  }
});

// Add item to cart
cartRouter.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity, price, name, image } = req.body;

    // Validate required fields
    const missingFields = [];
    if (!productId) missingFields.push('productId');
    if (!quantity) missingFields.push('quantity');
    if (!price) missingFields.push('price');
    if (!name) missingFields.push('name');
    if (!image) missingFields.push('image');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields
      });
    }

    console.log('Adding to cart:', { userId: req.user._id, productId, quantity });

    // Check if item already exists in cart
    let cartItem = await CartModel.findOne({
      userId: req.user._id,
      productId
    });

    if (cartItem) {
      // Update quantity if item exists
      cartItem.quantity += quantity;
      await cartItem.save();
      console.log('Updated existing cart item:', cartItem._id);
    } else {
      // Create new cart item
      cartItem = new CartModel({
        userId: req.user._id,
        productId,
        quantity,
        price,
        name,
        image,
        productType: req.body.productType,
        shape: req.body.shape,
        gender: req.body.gender,
        style: req.body.style
      });
      await cartItem.save();
      console.log('Created new cart item:', cartItem._id);
    }

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      cartItem
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: error.message
    });
  }
});

// Update cart item
cartRouter.patch("/:id", auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartId = req.params.id;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid quantity"
      });
    }

    console.log('Updating cart item:', { cartId, userId: req.user._id, quantity });

    const cartItem = await CartModel.findOneAndUpdate(
      { _id: cartId, userId: req.user._id },
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart item updated",
      cartItem
    });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update cart item",
      error: error.message
    });
  }
});

// Remove item from cart
cartRouter.delete("/:id", auth, async (req, res) => {
  try {
    const cartId = req.params.id;
    console.log('Removing cart item:', { cartId, userId: req.user._id });

    const cartItem = await CartModel.findOneAndDelete({
      _id: cartId,
      userId: req.user._id
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart"
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove item from cart",
      error: error.message
    });
  }
});

// Clear cart
cartRouter.delete("/", auth, async (req, res) => {
  try {
    console.log('Clearing cart for user:', req.user._id);
    
    const result = await CartModel.deleteMany({ userId: req.user._id });
    console.log('Deleted cart items:', result.deletedCount);
    
    res.status(200).json({
      success: true,
      message: "Cart cleared successfully"
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({
      success: false,
      message: "Failed to clear cart",
      error: error.message
    });
  }
});

module.exports = cartRouter;
