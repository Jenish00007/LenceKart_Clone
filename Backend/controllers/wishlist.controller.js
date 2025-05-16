const Wishlist = require('../Models/wishlist.model');
const Product = require('../Models/product.model');

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id })
      .populate('products');
    
    if (!wishlist) {
      return res.status(200).json({ products: [] });
    }
    
    res.status(200).json(wishlist.products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching wishlist', error: error.message });
  }
};

// Add product to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let wishlist = await Wishlist.findOne({ userId: req.user._id });
    
    if (!wishlist) {
      // Create new wishlist if it doesn't exist
      wishlist = new Wishlist({
        userId: req.user._id,
        products: [productId]
      });
    } else {
      // Check if product is already in wishlist
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: 'Product already in wishlist' });
      }
      wishlist.products.push(productId);
    }
    
    await wishlist.save();
    res.status(200).json({ message: 'Product added to wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to wishlist', error: error.message });
  }
};

// Remove product from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const wishlist = await Wishlist.findOne({ userId: req.user._id });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    
    wishlist.products = wishlist.products.filter(
      product => product.toString() !== productId
    );
    
    await wishlist.save();
    res.status(200).json({ message: 'Product removed from wishlist', wishlist });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from wishlist', error: error.message });
  }
};

// Clear wishlist
exports.clearWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.user._id });
    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }
    
    wishlist.products = [];
    await wishlist.save();
    
    res.status(200).json({ message: 'Wishlist cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing wishlist', error: error.message });
  }
}; 