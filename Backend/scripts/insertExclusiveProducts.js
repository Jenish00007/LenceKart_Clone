const mongoose = require('mongoose');
const ProductModel = require('../Models/product.model');
require('dotenv').config();

const products = [
    // Exclusive Products
    {
        name: "Limited Edition Gold Aviator",
        imageTsrc: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/gold-full-rim-aviator-vincent-chase-sleek-steel-vc-e000077-c8-eyeglasses_dsc0472_10_09_2024.jpg",
        caption: "Exclusive Gold Collection",
        productRefLink: "limited-gold-aviator-2024",
        price: 4999,
        mPrice: 7999,
        productId: "EXCL003",
        productType: "EYEGLASSES",
        powerType: "SINGLE_VISION",
        powerRange: { min: -6.00, max: +6.00 },
        prescriptionType: "Single Vision Only",
        supportedPowers: "Supports All Powers",
        frameType: "Full Rim",
        shape: "Aviator",
        frameSize: "Medium",
        frameWidth: "138 mm",
        weightGroup: "Light",
        dimension: "138-18-145",
        style: "Classic",
        colors: ["Gold"],
        frameColors: ["Gold"],
        lensFeatures: ["Anti Glare", "UV Protection", "Blue Light Block"],
        gender: "Unisex",
        ageGroup: "Adults",
        rating: 4.9,
        userRated: 50,
        quantity: 20,
        priceRange: "Rs. 2500-4999",
        isExclusive: true,
        trending: true,
        recommended: true,
        isNew: true
    },
    {
        name: "Premium Rose Gold Cat Eye",
        imageTsrc: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/rose-gold-rimless-cat-eye-john-jacobs-pro-titanium-jj-e13672-c1-eyeglasses_g_0968_2_jun2023.jpg",
        caption: "Luxury Titanium Collection",
        productRefLink: "premium-rose-gold-cat-eye-2024",
        price: 5999,
        mPrice: 8999,
        productId: "EXCL004",
        productType: "EYEGLASSES",
        powerType: "PROGRESSIVE",
        powerRange: { min: -8.00, max: +6.00 },
        prescriptionType: "Bifocal/Progressive Supported",
        supportedPowers: "Supports All Powers",
        frameType: "Rimless",
        shape: "Cat Eye",
        frameSize: "Medium",
        frameWidth: "135 mm",
        weightGroup: "Light",
        dimension: "135-16-140",
        style: "Modern",
        colors: ["Rose Gold"],
        frameColors: ["Rose Gold"],
        lensFeatures: ["Anti Glare", "UV Protection", "High Index"],
        gender: "Women",
        ageGroup: "Adults",
        rating: 4.8,
        userRated: 35,
        quantity: 15,
        priceRange: "Rs. 5000-9999",
        isExclusive: true,
        trending: true,
        isNew: true
    },

    // Special Offers & Trending Products
    {
        name: "Blue Light Gaming Glasses",
        imageTsrc: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-matte-pink-transparent-full-rim-round-lenskart-blu-lb-e13736-c3_lenskart-blu-lb-e13736-c3-eyeglasses_g_393723_02_2022.jpg",
        caption: "Special Gaming Collection",
        productRefLink: "gaming-glasses-offer-2024",
        price: 1499,
        mPrice: 2999,
        productId: "SPCL003",
        productType: "COMPUTER_BLU_LENSES",
        powerType: "ZERO_POWER",
        frameType: "Full Rim",
        shape: "Rectangle",
        frameSize: "Wide",
        frameWidth: "140 mm",
        weightGroup: "Light",
        dimension: "140-16-145",
        style: "Sports",
        colors: ["Black", "Blue"],
        frameColors: ["Black"],
        lensFeatures: ["Blue Light Block", "Anti Glare", "UV Protection"],
        gender: "Unisex",
        ageGroup: "Adults",
        rating: 4.7,
        userRated: 150,
        quantity: 100,
        priceRange: "Rs. 1000-1499",
        trending: true,
        recommended: true,
        isBestSeller: true
    },
    {
        name: "Designer Sunglasses Bundle",
        imageTsrc: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vcs000318-c21-sunglasses__dsc5631_13_12_2024.jpg",
        caption: "Summer Special Bundle",
        productRefLink: "summer-bundle-offer-2024",
        price: 2999,
        mPrice: 5999,
        productId: "SPCL004",
        productType: "SUNGLASSES",
        powerType: "ZERO_POWER",
        frameType: "Full Rim",
        shape: "Wayfarer",
        frameSize: "Medium",
        frameWidth: "138 mm",
        weightGroup: "Average",
        dimension: "138-18-145",
        style: "Fashion",
        colors: ["Black", "Green"],
        frameColors: ["Black"],
        lensFeatures: ["Polarized", "UV Protection", "Anti Scratch"],
        gender: "Unisex",
        ageGroup: "Adults",
        rating: 4.6,
        userRated: 89,
        quantity: 50,
        priceRange: "Rs. 2500-4999",
        trending: true,
        recommended: true
    },

    // New Arrivals
    {
        name: "Modern Round Metal Frame",
        imageTsrc: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gunmetal-grey-full-rim-round-lenskart-air-signia-la-e14958-c2-eyeglasses_g_3127_06_oct22.jpg",
        caption: "Contemporary Round Collection",
        productRefLink: "modern-round-metal-2024",
        price: 3499,
        mPrice: 4999,
        productId: "NEW001",
        productType: "EYEGLASSES",
        powerType: "SINGLE_VISION",
        powerRange: { min: -4.00, max: +4.00 },
        prescriptionType: "Single Vision Only",
        supportedPowers: "Supports All Powers",
        frameType: "Full Rim",
        shape: "Round",
        frameSize: "Medium",
        frameWidth: "136 mm",
        weightGroup: "Light",
        dimension: "136-18-142",
        style: "Modern",
        colors: ["Grey", "Gunmetal"],
        frameColors: ["Grey", "Gunmetal"],
        lensFeatures: ["Anti Glare", "UV Protection"],
        gender: "Unisex",
        ageGroup: "Adults",
        rating: 4.5,
        userRated: 25,
        quantity: 30,
        priceRange: "Rs. 2500-4999",
        isNew: true,
        recommended: true
    },

    // Best Sellers
    {
        name: "Classic Square Blue Light",
        imageTsrc: "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-computer-glasses:-ocean-blue-full-rim-wayfarer-lenskart-hustlr-hp-e15011-c6-eyeglasses_ocrean_blue_left_4.jpg",
        caption: "Best Selling Blue Light Protection",
        productRefLink: "classic-square-blu-2024",
        price: 1999,
        mPrice: 3499,
        productId: "BEST001",
        productType: "COMPUTER_BLU_LENSES",
        powerType: "ZERO_POWER",
        frameType: "Full Rim",
        shape: "Square",
        frameSize: "Medium",
        frameWidth: "138 mm",
        weightGroup: "Light",
        dimension: "138-16-142",
        style: "Classic",
        colors: ["Blue", "Black"],
        frameColors: ["Blue", "Black"],
        lensFeatures: ["Blue Light Block", "Anti Glare", "UV Protection"],
        gender: "Unisex",
        ageGroup: "Adults",
        rating: 4.8,
        userRated: 200,
        quantity: 75,
        priceRange: "Rs. 1500-1999",
        isBestSeller: true,
        recommended: true
    }
];

const insertProducts = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        // Insert all products
        await ProductModel.insertMany(products);
        console.log('All products inserted successfully');

        // Close the connection
        await mongoose.connection.close();
        console.log('Database connection closed');

    } catch (error) {
        console.error('Error inserting products:', error);
        process.exit(1);
    }
};

// Run the insertion script
insertProducts(); 