const mongoose = require('mongoose');
const ProductModel = require('../Models/product.model');
require('dotenv').config();

const offeredImages = [
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-transparent-full-rim-round-vincent-chase-sleek-steel-vc-e15069-c1-eyeglasses_g_3599_10_14_22.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/brown-transparent-silver-full-rim-geometric-vincent-chase-blend-edit-vc-e14977-c2-eyeglasses_g_3502_10_14_22.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gunmetal-grey-full-rim-round-lenskart-air-signia-la-e14958-c2-eyeglasses_g_3127_06_oct22.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-air-la-e17591-c2-eyeglasses_dsc5756_23_11_2024.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-black-grey-gradient-full-rim-aviator-vincent-chase-polorized-maverick-2-0--vc-s15762-c2-sunglasses_g_7288_image_pla_09_08_2023.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-silver-full-rim-cat-eye-lenskart-air-classic-la-e14575-c2-eyeglasses_g_4817_14_06_2022.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/green-full-rim-round-lenskart-air-flex-la-e11494-c11-eyeglasses_g_7628_24_12_2022.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-e17074-c2-eyeglasses__dsc0434_13_06_2024.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/blue-block-phone-&-computer-glasses:-matte-pink-transparent-full-rim-round-lenskart-blu-lb-e13736-c3_lenskart-blu-lb-e13736-c3-eyeglasses_g_393723_02_2022.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/black-gold-full-rim-cat-eye-vincent-chase-sleek-steel-vc-e12400-c2-eyeglasses_csvfile-1645794316610-g_0222.jpg'
];

const productTypes = [
  "EYEGLASSES",
  "SUNGLASSES",
  "COMPUTER_BLU_LENSES",
  "SUNGLASSES_WITH_POWER",
  "EYEGLASSES_WITH_POWER"
];

const shapes = [
  "Round",
  "Square",
  "Rectangle",
  "Aviator",
  "Cat Eye",
  "Oval",
  "Geometric",
  "Wayfarer",
  "Clubmaster"
];

const frameTypes = ["Full Rim", "Half Rim", "Rimless"];
const frameSizes = ["Extra Narrow", "Narrow", "Medium", "Wide", "Extra Wide"];
const styles = ["Casual", "Formal", "Sports", "Fashion", "Vintage", "Classic", "Modern"];
const genders = ["Men", "Women", "Unisex"];
const ageGroups = ["Teens", "Adults", "Seniors"];

const offeredProducts = Array.from({ length: 10 }, (_, index) => {
  const imageIndex = index % offeredImages.length;
  const productNumber = index + 1;
  const productType = productTypes[index % productTypes.length];
  const shape = shapes[index % shapes.length];
  const frameType = frameTypes[index % frameTypes.length];
  const frameSize = frameSizes[index % frameSizes.length];
  const style = styles[index % styles.length];
  const gender = genders[index % genders.length];
  const ageGroup = ageGroups[index % ageGroups.length];
  
  // Calculate discount (between 20% and 50%)
  const discount = Math.floor(Math.random() * 31) + 20; // Random number between 20 and 50
  const mPrice = Math.floor(Math.random() * 3000) + 4000; // Random price between 4000 and 7000
  const price = Math.floor(mPrice * (1 - discount/100)); // Apply discount
  
  return {
    name: `Special Offer ${style} ${shape} ${productType.split('_').join(' ')} ${productNumber}`,
    imageTsrc: offeredImages[imageIndex],
    caption: `${discount}% Off on ${style} ${shape} ${productType.split('_').join(' ')}`,
    productRefLink: `offered-${productType.toLowerCase()}-${productNumber}`,
    price: price,
    mPrice: mPrice,
    productId: `OFF${String(productNumber).padStart(3, '0')}`,
    productType: productType,
    powerType: productType.includes('POWER') ? "SINGLE_VISION" : "ZERO_POWER",
    frameType: frameType,
    shape: shape,
    frameSize: frameSize,
    frameWidth: "138 mm",
    weightGroup: "Light",
    dimension: "138-16-142",
    style: style,
    colors: ["Black", "Gold"],
    frameColors: ["Black", "Gold"],
    lensFeatures: ["Anti Glare", "UV Protection", "Blue Light Block"],
    gender: gender,
    ageGroup: ageGroup,
    rating: 4.5,
    userRated: 120,
    quantity: 50,
    trending: true,
    recommended: true,
    isNew: false,
    isBestSeller: false,
    discount: discount,
    additionalImages: [],
    priceRange: price < 2500 ? "Rs. 1000-1499" : "Rs. 2000-2499",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
});

const updateOfferedProducts = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Check existing offered products
    const existingCount = await ProductModel.countDocuments({ discount: { $gt: 0 } });
    console.log(`Found ${existingCount} existing offered products`);

    // Delete all existing offered products
    console.log('Deleting existing offered products...');
    const deleteResult = await ProductModel.deleteMany({ 
      productId: { $regex: '^OFF' }
    });
    console.log(`Deleted ${deleteResult.deletedCount} existing offered products`);

    // Insert new offered products
    console.log('Inserting new offered products...');
    const insertResult = await ProductModel.insertMany(offeredProducts);
    console.log(`Successfully inserted ${insertResult.length} new offered products`);

    // Verify the insertion
    const finalCount = await ProductModel.countDocuments({ discount: { $gt: 0 } });
    console.log(`Final count of offered products in database: ${finalCount}`);

    console.log('Offered products update completed successfully');
  } catch (error) {
    console.error('Error updating offered products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

updateOfferedProducts(); 