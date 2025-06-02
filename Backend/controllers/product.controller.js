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

// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const productData = req.body;
        console.log('Received product data:', JSON.stringify(productData, null, 2));
        
        // Validate required fields
        const requiredFields = ['name', 'imageTsrc', 'caption', 'price', 'mPrice', 'mainCategory', 'subCategory', 'topPicks'];
        const missingFields = requiredFields.filter(field => !productData[field]);
        
        if (missingFields.length > 0) {
            console.log('Missing required fields:', missingFields);
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
                missingFields
            });
        }

        // Validate enum values
        if (productData.mainCategory && !['GLASSES', 'CONTACT_LENSES'].includes(productData.mainCategory)) {
            console.log('Invalid mainCategory:', productData.mainCategory);
            return res.status(400).json({
                success: false,
                message: 'Invalid mainCategory value',
                validValues: ['GLASSES', 'CONTACT_LENSES']
            });
        }

        // Validate subCategory based on mainCategory
        const validSubCategories = {
            'GLASSES': ['EYEGLASSES', 'SUNGLASSES', 'COMPUTER_GLASSES'],
            'CONTACT_LENSES': ['CONTACT_LENSES', 'CONTACT_LENS_SOLUTION', 'CONTACT_LENS_CASES', 'CONTACT_LENS_ACCESSORIES']
        };

        if (productData.mainCategory && productData.subCategory) {
            if (!validSubCategories[productData.mainCategory].includes(productData.subCategory)) {
                console.log('Invalid subCategory:', {
                    mainCategory: productData.mainCategory,
                    subCategory: productData.subCategory,
                    validValues: validSubCategories[productData.mainCategory]
                });
                return res.status(400).json({
                    success: false,
                    message: `Invalid subCategory for ${productData.mainCategory}`,
                    validValues: validSubCategories[productData.mainCategory]
                });
            }
        }

        // Validate topPicks
        const validTopPicks = [
            'new-arrivals', 'best-sellers', 'trending', 'exclusive', 'essentials',
            'lenskart-blu-lenses', 'tinted-eyeglasses', 'computer-eyeglasses',
            'progressive-eyeglasses', 'pilot-style', 'power-sunglasses',
            'polarized-sunglasses', 'Not Applicable'
        ];

        if (productData.topPicks && !validTopPicks.includes(productData.topPicks)) {
            console.log('Invalid topPicks:', {
                topPicks: productData.topPicks,
                validValues: validTopPicks
            });
            return res.status(400).json({
                success: false,
                message: 'Invalid topPicks value',
                validValues: validTopPicks
            });
        }

        // Validate price values
        if (isNaN(productData.price) || isNaN(productData.mPrice)) {
            console.log('Invalid price values:', {
                price: productData.price,
                mPrice: productData.mPrice
            });
            return res.status(400).json({
                success: false,
                message: 'Price and Market Price must be numbers'
            });
        }

        if (productData.price < 0 || productData.mPrice < 0) {
            console.log('Negative price values:', {
                price: productData.price,
                mPrice: productData.mPrice
            });
            return res.status(400).json({
                success: false,
                message: 'Price values cannot be negative'
            });
        }

        // Generate a unique productId if not provided
        if (!productData.productId) {
            productData.productId = `PROD${Date.now()}`;
        }

        // Set default values for optional fields
        productData.additionalImages = productData.additionalImages || [];
        productData.brands = productData.brands || ['Not Applicable'];
        productData.personCategory = productData.personCategory || 'unisex';
        productData.gender = productData.gender || 'All';
        productData.ageGroup = productData.ageGroup || 'Not Applicable';
        productData.selectedCategoryPrice = productData.selectedCategoryPrice || 'Not Applicable';
        productData.powerType = productData.powerType || 'Not Applicable';
        productData.prescriptionType = productData.prescriptionType || 'Not Applicable';
        productData.supportedPowers = productData.supportedPowers || 'Not Applicable';
        productData.frameType = productData.frameType || 'Not Applicable';
        productData.shape = productData.shape || 'Not Applicable';
        productData.frameSize = productData.frameSize || 'Not Applicable';
        productData.frameWidth = productData.frameWidth || 'Not Applicable';
        productData.weightGroup = productData.weightGroup || 'Not Applicable';
        productData.style = productData.style || 'Not Applicable';

        console.log('Processed product data:', JSON.stringify(productData, null, 2));

        // Create new product
        const product = new Product(productData);
        await product.save();

        res.status(201).json({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        console.error('Error creating product:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message,
                value: err.value
            }));
            
            console.log('Validation errors:', validationErrors);
            
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: validationErrors
            });
        }

        // Handle duplicate key error
        if (error.code === 11000) {
            console.log('Duplicate key error:', error.keyValue);
            return res.status(400).json({
                success: false,
                message: 'Product ID already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating product',
            error: error.message
        });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const updateData = req.body;

        const product = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product
        });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating product',
            error: error.message
        });
    }
}; 