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
      required: false,
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
      enum: ["GLASSES", "CONTACT_LENSES", "ACCESSORIES"],
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
      enum: ["Male", "Female", "Transgender","Other","All"],
    },
    ageGroup: {
      type: String,
      enum: ["Kids", "Youth", "Teens", "Adults", "Seniors", "Grandparents", "Not Applicable"],
    },
    selectedCategoryPrice: {
      type: String,
      enum: ["classic-eyeglasses", "premium-eyeglasses", "designer-eyeglasses", "Not Applicable"],
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
          "Not Applicable"
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
        "Not Applicable"
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
        
        "contact_lens_power",
        "spherical_minus_cyl",
        "spherical_plus_cyl",
        "cylindrical_power",
        "toric_power",
        "Not Applicable"
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
        "Not Applicable",
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
      enum: ["Full Rim", "Half Rim", "Rimless", "Not Applicable"],
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
      enum: ["Extra Narrow", "Narrow", "Medium", "Wide", "Extra Wide", "Not Applicable"],
    },
    frameWidth: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          // Allow "Not Applicable" or a number between 123-150 followed by " mm"
          return v === "Not Applicable" || /^(12[3-9]|13[0-9]|14[0-9]|150)\s*mm$/.test(v);
        },
        message: props => `${props.value} is not a valid frame width! Must be between 123-150 mm or "Not Applicable"`
      }
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
        "Not Applicable",
      ],
    },
    isContactLensColor: {
      type: String,
      enum: ["yes", "no"],
      default: "no"
    },
    contactLensColors: [
      {
        type: String,
        enum: [
          "Clear",
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
          "Gradient",
          "Not Applicable",
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
          "Day Night",
          "Not Applicable",
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

    // Contact Lens Accessories
    accessoryType: {
      type: String,
      enum: ["CASE", "SOLUTION", "CLEANER", "MULTI_PURPOSE", "Not Applicable"],
    },
    accessorySize: {
      type: String,
      enum: ["SMALL", "MEDIUM", "LARGE", "Not Applicable"],
    },
    accessoryMaterial: {
      type: String,
      enum: ["PLASTIC", "SILICONE", "METAL", "Not Applicable"],
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
