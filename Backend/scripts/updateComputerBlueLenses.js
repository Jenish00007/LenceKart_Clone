const mongoose = require('mongoose');
const ProductModel = require('../Models/product.model');
require('dotenv').config();

const blueLensImages = [
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-transparent-full-rim-round-vincent-chase-sleek-steel-vc-e15069-c1-eyeglasses_g_3599_10_14_22.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/brown-transparent-silver-full-rim-geometric-vincent-chase-blend-edit-vc-e14977-c2-eyeglasses_g_3502_10_14_22.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gunmetal-grey-full-rim-round-lenskart-air-signia-la-e14958-c2-eyeglasses_g_3127_06_oct22.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-air-la-e17591-c2-eyeglasses_dsc5756_23_11_2024.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-black-grey-gradient-full-rim-aviator-vincent-chase-polorized-maverick-2-0--vc-s15762-c2-sunglasses_g_7288_image_pla_09_08_2023.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-silver-full-rim-cat-eye-lenskart-air-classic-la-e14575-c2-eyeglasses_g_4817_14_06_2022.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/green-full-rim-round-lenskart-air-flex-la-e11494-c11-eyeglasses_g_7628_24_12_2022.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-e17074-c2-eyeglasses__dsc0434_13_06_2024.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-matte-pink-transparent-full-rim-round-lenskart-blu-lb-e13736-c3_lenskart-blu-lb-e13736-c3-eyeglasses_g_393723_02_2022.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/black-gold-full-rim-cat-eye-vincent-chase-sleek-steel-vc-e12400-c2-eyeglasses_csvfile-1645794316610-g_0222.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/rose-gold-rimless-cat-eye-john-jacobs-pro-titanium-jj-e13672-c1-eyeglasses_g_0968_2_jun2023.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-e16146-c4-eyeglasses_img_0196_26_10_2023.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/gold-full-rim-aviator-vincent-chase-sleek-steel-vc-e000077-c8-eyeglasses_dsc0472_10_09_2024.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/gunmetal-black-full-rim-aviator-vincent-chase-vintage-vc-5158/p-c133-polarized-sunglasses_g_3718_17_08_2022.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-full-rim-round-lenskart-air-classic-la-e15018-c3-eyeglasses_g_8625_09_09_2022.jpg'
];

const blueLensProducts = Array.from({ length: 15 }, (_, index) => {
  const imageIndex = index % blueLensImages.length;
  const productNumber = index + 1;
  
  return {
    name: `Computer Blue Light Glasses ${productNumber}`,
    imageTsrc: blueLensImages[imageIndex],
    caption: `Best Selling Blue Light Protection ${productNumber}`,
    productRefLink: `computer-blue-light-${productNumber}`,
    price: 1999,
    mPrice: 3499,
    productId: `BLU${String(productNumber).padStart(3, '0')}`,
    productType: "COMPUTER_BLU_LENSES",
    powerType: "ZERO_POWER",
    frameType: "Full Rim",
    shape: "Round",
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
    trending: false,
    recommended: true,
    isNew: false,
    isBestSeller: true,
    additionalImages: [],
    priceRange: "Rs. 1500-1999",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
});

const updateComputerBlueLenses = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Delete all existing computer blue light glasses
    await ProductModel.deleteMany({ 
      productType: 'COMPUTER_BLU_LENSES',
      powerType: 'ZERO_POWER'
    });
    console.log('Deleted existing computer blue light glasses');

    // Insert new computer blue light glasses
    await ProductModel.insertMany(blueLensProducts);
    console.log('Inserted new computer blue light glasses');

    console.log('Computer blue light glasses update completed successfully');
  } catch (error) {
    console.error('Error updating computer blue light glasses:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

updateComputerBlueLenses(); 