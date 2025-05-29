const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Basic Product Information
    productId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageTsrc: {
      type: String,
      required: true,
    },
    additionalImages: [
      {
        type: String,
      },
    ],

    caption: {
      type: String,
      required: true,
    },
    productRefLink: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    mPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // Main Category (Level 1)
    mainCategory: {
      type: String,
      required: true,
      enum: ["GLASSES", "CONTACT_LENSES"],
    },

    // Sub Category (Level 2)
    subCategory: {
      type: String,
      required: true,
      enum: [
        // Glasses
        "EYEGLASSES",
        "SUNGLASSES",
        "COMPUTER_GLASSES",
        // Contact Lenses
        "CONTACT_LENSES",
        "CONTACT_LENS_SOLUTION",
        "CONTACT_LENS_CASES",
        "CONTACT_LENS_ACCESSORIES"
      ],
    },
    personCategory: {
      type: String,
      enum: ["men", "women", "kids", "unisex"],
    },
    gender: {
      type: String,
      enum: ["Men", "Women", "Unisex", "Kids", "Not Applicable"],
    },
    ageGroup: {
      type: String,
      enum: ["Kids", "Teens", "Adults", "Seniors", "Youth", "Not Applicable"],
    },
    selectedCategoryPrice: {
      type: String,
      enum: ["classic-eyeglasses", "premium-eyeglasses", "designer-eyeglasses"],
    },

    brands: [
      {
        type: String,
        enum: [
          "Ray-Ban",
          "Aqualens",
          "Bausch Lomb",
          "Soflens",
          "Acuvue",
          "Iconnect",
          "Alcon",
          "Oakley",
          "Prada",
          "Gucci",
          "Dior",
          "Cartier",
          "Versace",
          "Fendi",
          "Burberry",
          "Dolce & Gabbana",
          "Louis Vuitton",
          "Hermes",
          "Chanel",
        ],
      },
    ],
    topPicks: {
      type: String,
      required: true,
      enum: [
        "new-arrivals",
        "best-sellers",
        "trending",
        "exclusive",
        "essentials",
        "lenskart-blu-lenses",
        "tinted-eyeglasses",
        "computer-eyeglasses",
        "progressive-eyeglasses",
        "pilot-style",
        "power-sunglasses",
        "polarized-sunglasses",
      ],
    },
    // Power and Lens Details
    powerType: {
      type: String,
      enum: [
        "zero_power",
        "with_power",
        "single_vision",
        "bifocal",
        "progressive",
        "reading",
        "clear",
        "contact_lens_power",
        "spherical_minus_cyl",
        "spherical_plus_cyl",
        "cylindrical_power",
        "toric_power",
        "not_applicable"
      ],
    },
    powerRange: {
      min: { type: Number },
      max: { type: Number },
    },
    prescriptionType: {
      type: String,
      enum: [
        "Bifocal/Progressive Supported",
        "Single Vision Only",
        "Non-Prescription",
      ],
    },
    supportedPowers: {
      type: String,
      enum: [
        "Supports All Powers",
        "Supports Very High Power",
        "Supports High Power",
        "Upto Regular Power",
        "Not Applicable",
      ],
    },

    // Frame Details
    frameType: {
      type: String,
      enum: ["Full Rim", "Half Rim", "Rimless"],
    },
    shape: {
      type: String,
      enum: [
        "Round",
        "Square",
        "Rectangle",
        "Aviator",
        "Cat Eye",
        "Oval",
        "Geometric",
        "Wayfarer",
        "Clubmaster",
        "Butterfly",
        "Wrap",
        "Sports",
        "Spherical Contact Lense",
        "Not Applicable",
      ],
    },
    frameSize: {
      type: String,
      enum: ["Extra Narrow", "Narrow", "Medium", "Wide", "Extra Wide"],
    },
    frameWidth: {
      type: String,
      enum: [
        "123 mm",
        "125 mm",
        "126 mm",
        "127 mm",
        "128 mm",
        "129 mm",
        "130 mm",
        "131 mm",
        "132 mm",
        "133 mm",
        "134 mm",
        "135 mm",
        "136 mm",
        "137 mm",
        "138 mm",
        "139 mm",
        "140 mm",
        "141 mm",
        "142 mm",
        "143 mm",
        "144 mm",
        "145 mm",
        "146 mm",
        "147 mm",
        "148 mm",
        "149 mm",
        "150 mm",
      ],
    },
    weightGroup: {
      type: String,
      enum: ["Light", "Average", "Heavy", "Extra Heavy", "Not Applicable"],
    },

    // Style and Aesthetics
    style: {
      type: String,
      enum: [
        "Casual",
        "Formal",
        "Sports",
        "Fashion",
        "Vintage",
        "Classic",
        "Day Night",
        "Modern",
        "Unisex",
        "Kids",
        "Youth",
        "Senior",
        "Not Applicable",
      ],
    },
    contactLensColors: [
      {
        type: String,
        enum: [
          "Black",
          "Brown",
          "Blue",
          "Green",
          "Grey",
          "Hazel",
          "Purple",
          "Red",
          "Silver",
          "White",
          "Multicolor",
          "Turquoise",
          "Not Applicable",
        ],
      },
    ],
    contactLensSolutionSize: [
      {
        type: String,
        enum: [
          "Extra Small (10-25 ml)",
          "Small (30-45 ml)",
          "Medium (50-65 ml)",
          "Large (70-85 ml)",
          "Extra Large (90-100 ml)",
          "Not Applicable",
        ],
      },
    ],

    frameColors: [
      {
        type: String,
        enum: [
          "Black",
          "Transparent",
          "Gold",
          "Gunmetal",
          "Blue",
          "Silver",
          "Brown",
          "Green",
          "Grey",
          "Purple",
          "Pink",
          "Red",
          "Rose Gold",
          "Yellow",
          "Orange",
          "White",
          "Copper",
          "Maroon",
          "Multicolor",
          "Not Applicable",
          "Gradient",
        ],
      },
    ],

    // Lens Features
    lensFeatures: [
      {
        type: String,
        enum: [
          "Anti Glare",
          "Blue Light Block",
          "Polarized",
          "UV Protection",
          "Anti Scratch",
          "Water Resistant",
          "Photochromic",
          "High Index",
          "Not Applicable",
          "Day Night",
        ],
      },
    ],

    // Contact Lens Specific
    contactLensType: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly", "Yearly", "Not Applicable"],
    },
    contactLensMaterial: {
      type: String,
      enum: [
        "Silicone Hydrogel",
        "Hydrogel",
        "Gas Permeable",
        "Hybrid",
        "Silicone Hydrogel Hybrid",
        "Silicone Hydrogel Gas Permeable",
        "Not Applicable",
      ],
    },

    // Product Status and Ratings
    isRecommended: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isLatest: {
      type: Boolean,
      default: false,
    },
    isExclusive: {
      type: Boolean,
      default: false,
    },
    isSpecialOffer: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isRecentlyViewed: {
      type: Boolean,
      default: false,
    },
    isTrialPack: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },

    // Stock and Inventory
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    // Price Range Category__________________________________
    // priceRange: {
    //   type: String,
    //   enum: [
    //     "Rs. 500-999",
    //     "Rs. 1000-1499",
    //     "Rs. 1500-1999",
    //     "Rs. 2000-2499",
    //     "Rs. 2500-4999",
    //     "Rs. 5000-9999",
    //     "Rs. 10000-14999",
    //     "Rs. 15000+"
    //   ]
    // },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
productSchema.index({ mainCategory: 1, subCategory: 1 });
productSchema.index({ isRecommended: 1 });
productSchema.index({ isTrending: 1 });
productSchema.index({ isLatest: 1 });
productSchema.index({ isExclusive: 1 });
productSchema.index({ isSpecialOffer: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
