const mongoose = require('mongoose');
const ProductModel = require('../Models/product.model');
require('dotenv').config();

const colorLensImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrE-T_HIlZIzd0m-3J0VYSh-Y_rqmdKXYZA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdninaxqP9Ulpwssogcn0Vfmx7RG9hjb4xxg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRugpoYjI2rk0Jf8PpPN1Fpekfxh6dg1fie8Q&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjCzNrNzxzzOuTgBVFSpf02NE9_5YGJ7czzw&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYenLbgFVm9XsSkKowrvBPZ0g6DOz6sxD5XA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGzKPag7LSRajyHi4z9fA2VV7vyQX0UZ058g&s'
];

const colorLensProducts = Array.from({ length: 12 }, (_, index) => {
  const imageIndex = index % colorLensImages.length;
  const productNumber = index + 1;
  
  return {
    name: `Color contact Lens Product ${productNumber}`,
    imageTsrc: colorLensImages[imageIndex],
    caption: `This is a sample caption for Color Contact Lens ${productNumber}`,
    productRefLink: "#",
    price: 547,
    mPrice: 647,
    productId: `a20e7d2a-c967-4bb1-b6bd-6549e94faf${index + 1}`,
    productType: "COLOR_CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    prescriptionType: "Non-Prescription",
    supportedPowers: "Supports All Powers",
    frameType: "Full Rim",
    shape: "Round",
    frameSize: "Medium",
    frameWidth: "135 mm",
    weightGroup: "Average",
    dimension: "140x45x135 mm",
    style: "Fashion",
    colors: ["Clear"],
    frameColors: ["Transparent"],
    lensFeatures: ["UV Protection", "Anti Scratch"],
    contactLensType: "Monthly",
    contactLensMaterial: "Silicone Hydrogel",
    gender: "Unisex",
    ageGroup: "Adults",
    rating: 4.5,
    userRated: 100,
    quantity: 20,
    trending: true,
    recommended: true,
    isNew: true,
    isBestSeller: false,
    additionalImages: [
      colorLensImages[(imageIndex + 1) % colorLensImages.length],
      colorLensImages[(imageIndex + 2) % colorLensImages.length]
    ],
    priceRange: "Rs. 500-999",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
});

const updateColorContactLenses = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Delete all existing color contact lenses
    await ProductModel.deleteMany({ productType: 'COLOR_CONTACT_LENSES' });
    console.log('Deleted existing color contact lenses');

    // Insert new color contact lenses
    await ProductModel.insertMany(colorLensProducts);
    console.log('Inserted new color contact lenses');

    console.log('Color contact lenses update completed successfully');
  } catch (error) {
    console.error('Error updating color contact lenses:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

updateColorContactLenses(); 