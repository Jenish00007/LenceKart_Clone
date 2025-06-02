const mongoose = require("mongoose");

const glassProductSchema = new mongoose.Schema({
    // Basic Product Information
    masterCategory: {
        type: String,
        required: true,
        enum: ["Eyeglasses", "Computer Glasses", "Sunglasses", "Kids Glasses", "Contact Lenses"]
    },
    personCategory: {
        type: String,
        required: true,
        enum: ["Men", "Women", "Kids"]
    },
    //-------------The structure for contact lense starts here-------------
    contactLensesDisposability: {
        type: String,
        enum: ["Monthly", "Day & Night", "Daily", "Yearly", "Bi-weekly"]
    },
    exploreByPower: {
        type: String,
        enum: ["Spherical-CYL", "Cylindrical Power", "Toric Power"]
    },
    lenseColor: {
        type: String,
        enum: ["Green", "Blue", "Brown", "Turquoise"]
    },
    lenseSolutions: {
        type: String,
        enum: ["Small", "Large"]
    },
    lenseCollections: {
        type: String,
        enum: ["Glam Slam", "Havana", "Polarized", "Power Sunglasses", "Designer Sunglasses"]
    },
    // Lens Features
    lensFeatures: [{
        type: String,
        enum: [
            "Anti Glare",
            "Blue Light Block",
            "Polarized",
            "UV Protection",
            "Anti Scratch",
            "Water Resistant",
            "Photo Chromic",
            "High Index"
        ]
    }],
    lensMaterial: {
        type: String,
        enum: [
            "Silicone Hydrogel",
            "Hydrogel",
            "Gas Permeable",
            "Hybrid",
            "NOT_APPLICABLE"
        ]
    },
    //-------------The structure for contact lense Ends here-------------
    imageUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    productRefLink: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true,
        unique: true
    },
    frameTypes: {
        type: String,
        enum: ["Rectange Frames", "Wayfarer Frames", "Round Frames", "Aviator Frames", "Cat-Eye Frames", "Rimless Frames",
            "Half Rim Frames", "Geometric Frames"]
    },
    frameType: {
        type: String,
        enum: ["Full Rim", "Half Rim", "Rimless"]
    },
    shapes: {
        type: String,
        enum: ["Round", "Square", "Rectangle", "Aviator", "Cat Eye", "Oval", "Geometric", "Wayfarer", "Club Master", "Butterfly", "Wrap", "Sports"]
    },
    frameSize: {
        type: String,
        enum: ["Extra Narrow", "Narrow", "Medium", "Wide", "Extra Wide"]
    },
    frameWidth: {
        type: String,
        enum: ["123 mm", "125 mm", "126 mm", "127 mm", "128 mm", "129 mm", "130 mm", "131 mm",
            "132 mm", "133 mm", "134 mm", "135 mm", "136 mm", "137 mm", "138 mm", "139 mm", "140 mm",
            "141 mm", "142 mm", "143 mm", "144 mm", "145 mm", "146 mm", "147 mm", "148 mm", "149 mm", "150 mm"]
    },
    weightGroup: {
        type: String,
        enum: ["Light", "Average"]
    },
    dimension: String,
    // Style and Aesthetics
    style: {
        type: String,
        enum: ["Casual", "Formal", "Sports", "Fashion", "Vintage", "Classic", "Modern"]
    },
    colors: [{
        type: String
    }],
    frameColors: [{
        type: String,
        enum: [
            "Black", "Transparent", "Gold", "Gunmetal", "Blue", "Silver",
            "Brown", "Green", "Grey", "Purple", "Pink", "Red", "Rose Gold",
            "Yellow", "Orange", "White", "Copper", "Maroon", "Multicolor"
        ]
    }],
    gender: {
        type: String,
        enum: ["Men", "Women", "Unisex", "Kids"]
    },
    ageGroup: {
        type: String,
        enum: ["Kids", "Teens", "Adults", "Seniors"]
    },
    priceCategory: {
        type: Number,
        required: true,
        enum: [1199, 1299, 2500, 3000, 3499, 3999, 4499, 4999, 5999]
    },
    // Ratings and Reviews
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    userRated: {
        type: Number,
        default: 0
    },

    // Stock and Inventory
    quantity: {
        type: Number,
        default: 1,
        min: 0
    },

    // Marketing and Display
    trending: {
        type: Boolean,
        default: false
    },
    recommended: {
        type: Boolean,
        default: false
    },
    isNew: {
        type: Boolean,
        default: false
    },
    isBestSeller: {
        type: Boolean,
        default: false
    },

    // Additional Images
    additionalImages: [{
        type: String
    }],
    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
glassProductSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const glassProduct = mongoose.model("glassProduct", glassProductSchema);

module.exports = glassProduct;