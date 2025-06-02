// addGlassProducts.js

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const glassProductSchema = new mongoose.Schema({
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
  lensFeatures: [{
    type: String,
    enum: [
      "Anti Glare", "Blue Light Block", "Polarized", "UV Protection",
      "Anti Scratch", "Water Resistant", "Photo Chromic", "High Index"
    ]
  }],
  lensMaterial: {
    type: String,
    enum: ["Silicone Hydrogel", "Hydrogel", "Gas Permeable", "Hybrid", "NOT_APPLICABLE"]
  },
  imageUrl: { type: String, required: true },
  caption: { type: String, required: true },
  productRefLink: { type: String, required: true },
  productId: { type: String, required: true, unique: true },
  frameTypes: {
    type: String,
    enum: ["Rectange Frames", "Wayfarer Frames", "Round Frames", "Aviator Frames",
      "Cat-Eye Frames", "Rimless Frames", "Half Rim Frames", "Geometric Frames"]
  },
  frameType: { type: String, enum: ["Full Rim", "Half Rim", "Rimless"] },
  shapes: {
    type: String,
    enum: ["Round", "Square", "Rectangle", "Aviator", "Cat Eye", "Oval", "Geometric",
      "Wayfarer", "Club Master", "Butterfly", "Wrap", "Sports"]
  },
  frameSize: {
    type: String,
    enum: ["Extra Narrow", "Narrow", "Medium", "Wide", "Extra Wide"]
  },
  frameWidth: {
    type: String,
    enum: Array.from({ length: 28 }, (_, i) => `${i + 123} mm`)
  },
  weightGroup: { type: String, enum: ["Light", "Average"] },
  dimension: String,
  style: {
    type: String,
    enum: ["Casual", "Formal", "Sports", "Fashion", "Vintage", "Classic", "Modern"]
  },
  colors: [{ type: String }],
  frameColors: [{
    type: String,
    enum: ["Black", "Transparent", "Gold", "Gunmetal", "Blue", "Silver", "Brown", "Green",
      "Grey", "Purple", "Pink", "Red", "Rose Gold", "Yellow", "Orange", "White", "Copper", "Maroon", "Multicolor"]
  }],
  gender: { type: String, enum: ["Men", "Women", "Unisex", "Kids"] },
  ageGroup: { type: String, enum: ["Kids", "Teens", "Adults", "Seniors"] },
  priceCategory: {
    type: Number,
    required: true,
    enum: [1199, 1299, 2500, 3000, 3499, 3999, 4499, 4999, 5999]
  },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  userRated: { type: Number, default: 0 },
  quantity: { type: Number, default: 1, min: 0 },
  trending: { type: Boolean, default: false },
  recommended: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  additionalImages: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, {
  suppressReservedKeysWarning: true // ⚠️ Suppress mongoose isNew warning
});

const glassProduct = mongoose.model("glassProduct", glassProductSchema);

const glassImages = [
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-transparent-full-rim-round-vincent-chase-sleek-steel-vc-e15069-c1-eyeglasses_g_3599_10_14_22.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/brown-transparent-silver-full-rim-geometric-vincent-chase-blend-edit-vc-e14977-c2-eyeglasses_g_3502_10_14_22.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gunmetal-grey-full-rim-round-lenskart-air-signia-la-e14958-c2-eyeglasses_g_3127_06_oct22.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-air-la-e17591-c2-eyeglasses_dsc5756_23_11_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-black-grey-gradient-full-rim-aviator-vincent-chase-polorized-maverick-2-0--vc-s15762-c2-sunglasses_g_7288_image_pla_09_08_2023.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-silver-full-rim-cat-eye-lenskart-air-classic-la-e14575-c2-eyeglasses_g_4817_14_06_2022.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/green-full-rim-round-lenskart-air-flex-la-e11494-c11-eyeglasses_g_7628_24_12_2022.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-e17074-c2-eyeglasses__dsc0434_13_06_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-matte-pink-transparent-full-rim-round-lenskart-blu-lb-e13736-c3_lenskart-blu-lb-e13736-c3-eyeglasses_g_393723_02_2022.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/black-gold-full-rim-cat-eye-vincent-chase-sleek-steel-vc-e12400-c2-eyeglasses_csvfile-1645794316610-g_0222.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/rose-gold-rimless-cat-eye-john-jacobs-pro-titanium-jj-e13672-c1-eyeglasses_g_0968_2_jun2023.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-e16146-c4-eyeglasses_img_0196_26_10_2023.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/gold-full-rim-aviator-vincent-chase-sleek-steel-vc-e000077-c8-eyeglasses_dsc0472_10_09_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/gunmetal-black-full-rim-aviator-vincent-chase-vintage-vc-5158/p-c133-polarized-sunglasses_g_3718_17_08_2022.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-full-rim-round-lenskart-air-classic-la-e15018-c3-eyeglasses_g_8625_09_09_2022.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-e17070-c2-eyeglasses__dsc0634_13_06_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/matte-black-green-gradient-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14461-c5-sunglasses_g_2615_9_29_22.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/pink-gold-pink-full-rim-cat-eye-vincent-chase-polarized-all-time-hits-vc-s11759-c10-sunglasses_g_0495_23_08_2023.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vcs000318-c21-sunglasses__dsc5631_13_12_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-s16968-c1-sunglasses__dsc5894_22_05_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/brown-gold-full-rim-aviator-vincent-chase-polarized-vc-sun-non-metal-vc-s000603-sunglasses__dsc9506_23_02_2025.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/grey-matte-black-full-rim-rectangle--square-vincent-chase-athleisure-vc-s000708-ploarized-sunglasses_dsc6330_18_03_2025.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-e14543-c3-eyeglasses_g_1696_20_09_2022.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vcs000284-c2-sunglasses__dsc0398_02_12_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/grey-transparent-full-rim-cat-eye-vincent-chase-fashion-essential-3-0-vc-s17535-c2-sunglasses__dsc2728_27_09_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/transparent-green-grey-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14459-c6-sunglasses_g_2601_9_29_22.jpg"
];


const generateGlassProduct = (id, imageUrl, isContactLens = false) => {
  const common = {
    masterCategory: isContactLens ? "Contact Lenses" : ["Eyeglasses", "Computer Glasses", "Sunglasses", "Kids Glasses"][Math.floor(Math.random() * 4)],
    personCategory: ["Men", "Women", "Kids"][Math.floor(Math.random() * 3)],
    imageUrl,
    caption: `Product ${id}`,
    productRefLink: `https://example.com/product/${id}`,
    productId: uuidv4(),
    priceCategory: [1199, 1299, 2500, 3000, 3499, 3999, 4499, 4999, 5999][Math.floor(Math.random() * 9)],
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
    userRated: Math.floor(Math.random() * 500),
    quantity: Math.floor(Math.random() * 100) + 1,
    trending: Math.random() < 0.3,
    recommended: Math.random() < 0.3,
    isNew: Math.random() < 0.3,
    isBestSeller: Math.random() < 0.3,
    additionalImages: [imageUrl],
    createdAt: new Date(),
    updatedAt: new Date()
  };

  if (isContactLens) {
    return {
      ...common,
      contactLensesDisposability: ["Monthly", "Day & Night", "Daily", "Yearly", "Bi-weekly"][Math.floor(Math.random() * 5)],
      exploreByPower: ["Spherical-CYL", "Cylindrical Power", "Toric Power"][Math.floor(Math.random() * 3)],
      lenseColor: ["Green", "Blue", "Brown", "Turquoise"][Math.floor(Math.random() * 4)],
      lenseSolutions: ["Small", "Large"][Math.floor(Math.random() * 2)],
      lenseCollections: ["Glam Slam", "Havana", "Polarized", "Power Sunglasses", "Designer Sunglasses"][Math.floor(Math.random() * 5)],
      lensFeatures: ["Anti Glare", "Blue Light Block", "Polarized", "UV Protection"].slice(0, Math.floor(Math.random() * 4) + 1),
      lensMaterial: ["Silicone Hydrogel", "Hydrogel", "Gas Permeable", "Hybrid", "NOT_APPLICABLE"][Math.floor(Math.random() * 5)]
    };
  } else {
    return {
      ...common,
      frameTypes: ["Rectange Frames", "Wayfarer Frames", "Round Frames", "Aviator Frames", "Cat-Eye Frames", "Rimless Frames", "Half Rim Frames", "Geometric Frames"][Math.floor(Math.random() * 8)],
      frameType: ["Full Rim", "Half Rim", "Rimless"][Math.floor(Math.random() * 3)],
      shapes: ["Round", "Square", "Rectangle", "Aviator", "Cat Eye", "Oval", "Geometric", "Wayfarer", "Club Master", "Butterfly", "Wrap", "Sports"][Math.floor(Math.random() * 12)],
      frameSize: ["Extra Narrow", "Narrow", "Medium", "Wide", "Extra Wide"][Math.floor(Math.random() * 5)],
      frameWidth: `${Math.floor(Math.random() * (150 - 123 + 1)) + 123} mm`,
      weightGroup: ["Light", "Average"][Math.floor(Math.random() * 2)],
      dimension: `${Math.floor(Math.random() * 50) + 100}x${Math.floor(Math.random() * 50) + 100}`,
      style: ["Casual", "Formal", "Sports", "Fashion", "Vintage", "Classic", "Modern"][Math.floor(Math.random() * 7)],
      colors: ["Black", "Blue", "Red", "Green"].slice(0, Math.floor(Math.random() * 4) + 1),
      frameColors: ["Black", "Transparent", "Gold", "Gunmetal", "Blue", "Silver", "Brown", "Green", "Grey", "Purple"].slice(0, Math.floor(Math.random() * 5) + 1),
      gender: ["Men", "Women", "Unisex", "Kids"][Math.floor(Math.random() * 4)],
      ageGroup: ["Kids", "Teens", "Adults", "Seniors"][Math.floor(Math.random() * 4)]
    };
  }
};

(async () => {
  try {
    await mongoose.connect("mongodb+srv://qaudsinfo:Qauds123@cluster0.nyfuhwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Connected to MongoDB");

    const TOTAL = 5000;
    const bulk = [];

    for (let i = 0; i < TOTAL; i++) {
      const imageUrl = glassImages[i % glassImages.length];
      const isContact = i % 5 === 0;
      bulk.push(generateGlassProduct(i + 1, imageUrl, isContact));
    }

    await glassProduct.insertMany(bulk);
    console.log(`✅ Inserted ${TOTAL} dummy glass products`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Failed to insert products:", err);
    process.exit(1);
  }
})();
