const ProductModel = require("../Models/product.model");

const searchProducts = async (req, res) => {
    try {
        const { 
            query, 
            style, 
            gender, 
            productType,
            frameType,
            shape,
            priceRange,
            brand,
            category,
            limit = 20,
            page = 1
        } = req.query;
        
        // Build search query
        const searchQuery = {};
        
        // Text search across multiple fields
        if (query) {
            searchQuery.$or = [
                { name: { $regex: query, $options: 'i' } },
                { caption: { $regex: query, $options: 'i' } },
                { productType: { $regex: query, $options: 'i' } },
                { brands: { $regex: query, $options: 'i' } }
            ];
        }
        
        // Filter by style
        if (style) {
            searchQuery.style = { $regex: new RegExp(`^${style}$`, 'i') };
        }
        
        // Filter by gender
        if (gender) {
            searchQuery.gender = { $regex: new RegExp(`^${gender}$`, 'i') };
        }
        
        // Filter by product type
        if (productType) {
            searchQuery.productType = { $regex: new RegExp(`^${productType}$`, 'i') };
        }

        // Filter by frame type
        if (frameType) {
            searchQuery.frameType = { $regex: new RegExp(`^${frameType}$`, 'i') };
        }

        // Filter by shape
        if (shape) {
            searchQuery.shape = { $regex: new RegExp(`^${shape}$`, 'i') };
        }

        // Filter by brand
        if (brand) {
            searchQuery.brands = { $regex: new RegExp(`^${brand}$`, 'i') };
        }

        // Filter by category
        if (category) {
            searchQuery.$or = [
                { mainCategory: { $regex: new RegExp(`^${category}$`, 'i') } },
                { subCategory: { $regex: new RegExp(`^${category}$`, 'i') } }
            ];
        }

        // Price range filter
        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            searchQuery.price = {};
            if (!isNaN(min)) searchQuery.price.$gte = min;
            if (!isNaN(max)) searchQuery.price.$lte = max;
        }

        // Pagination
        const skip = (page - 1) * limit;
        const parsedLimit = parseInt(limit);

        // Execute search with pagination
        const [products, total] = await Promise.all([
            ProductModel.find(searchQuery)
                .select('productId name imageTsrc additionalImages caption productRefLink price mPrice mainCategory subCategory personCategory gender ageGroup selectedCategoryPrice brands topPicks powerType powerRange prescriptionType supportedPowers frameType shape frameSize frameWidth weightGroup style lensFeatures isRecommended isTrending isLatest isExclusive isSpecialOffer isBestSeller isTrialPack rating reviewCount quantity discount')
                .sort({ rating: -1 })
                .skip(skip)
                .limit(parsedLimit),
            ProductModel.countDocuments(searchQuery)
        ]);
        
        res.status(200).json({
            success: true,
            data: products,
            pagination: {
                total,
                page: parseInt(page),
                limit: parsedLimit,
                pages: Math.ceil(total / parsedLimit)
            },
            message: "Products found successfully"
        });
    } catch (error) {
        console.error('Search error:', error);
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