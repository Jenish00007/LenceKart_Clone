const ProductModel = require("../Models/product.model");

const searchProducts = async (req, res) => {
    try {
        const { query, style, gender, productType } = req.query;
        
        // Build search query
        const searchQuery = {};
        
        if (query) {
            searchQuery.name = { $regex: query, $options: 'i' };
        }
        
        if (style) {
            searchQuery.style = style;
        }
        
        if (gender) {
            searchQuery.gender = gender;
        }
        
        if (productType) {
            searchQuery.productType = productType;
        }

        const products = await ProductModel.find(searchQuery);
        
        res.status(200).json({
            success: true,
            data: products,
            message: "Products found successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error searching products",
            error: error.message
        });
    }
};

module.exports = {
    searchProducts
}; 