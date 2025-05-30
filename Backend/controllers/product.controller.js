const Product = require('../Models/product.model');

// ... existing code ...

// Get top rated products
exports.getTopRatedProducts = async (req, res) => {
    try {
        const products = await Product.find({ rating: { $gte: 4 } })
            .sort({ rating: -1 })
            .limit(10);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top rated products', error: error.message });
    }
};

// Get latest products
exports.getLatestProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .limit(10);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching latest products', error: error.message });
    }
};

// Get exclusive products
exports.getExclusiveProducts = async (req, res) => {
    try {
        const products = await Product.find({ isExclusive: true })
            .limit(10);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching exclusive products', error: error.message });
    }
};

// Get offered products
exports.getOfferedProducts = async (req, res) => {
    try {
        const products = await Product.find({ discount: { $gt: 0 } })
            .sort({ discount: -1 })
            .limit(10);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching offered products', error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);
        
        if (!product) {
            return res.status(404).json({ 
                success: false,
                message: 'Product not found' 
            });
        }

        res.status(200).json({ 
            success: true,
            message: 'Product deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error deleting product',
            error: error.message 
        });
    }
}; 