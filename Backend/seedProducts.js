const mongoose = require('mongoose');
const ProductModel = require('./Models/product.model');
const { Shape, initializeShapes } = require('./Models/Shape');
const { Power, initializePowers } = require('./Models/Power');
require('dotenv').config();

// Sample data arrays
const productImages = [
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-transparent-full-rim-round-vincent-chase-sleek-steel-vc-e15069-c1-eyeglasses_g_3599_10_14_22.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-e16146-c4-eyeglasses_img_0196_26_10_2023.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vcs000318-c21-sunglasses__dsc5631_13_12_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-full-rim-round-lenskart-air-classic-la-e15018-c3-eyeglasses_g_8625_09_09_2022.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-transparent-full-rim-round-vincent-chase-sleek-steel-vc-e15069-c1-eyeglasses_g_3599_10_14_22.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/matte-black-green-gradient-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14461-c5-sunglasses_g_2615_9_29_22.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-air-la-e17591-c2-eyeglasses_dsc5756_23_11_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gunmetal-grey-full-rim-round-lenskart-air-signia-la-e14958-c2-eyeglasses_g_3127_06_oct22.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-e16146-c4-eyeglasses_img_0196_26_10_2023.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-black-grey-gradient-full-rim-aviator-vincent-chase-polorized-maverick-2-0--vc-s15762-c2-sunglasses_g_7288_image_pla_09_08_2023.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gunmetal-grey-full-rim-round-lenskart-air-signia-la-e14958-c2-eyeglasses_g_3127_06_oct22.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/gold-full-rim-aviator-vincent-chase-sleek-steel-vc-e000077-c8-eyeglasses_dsc0472_10_09_2024.jpg"
];

const colorContactLensImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjCzNrNzxzzOuTgBVFSpf02NE9_5YGJ7czzw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdninaxqP9Ulpwssogcn0Vfmx7RG9hjb4xxg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrE-T_HIlZIzd0m-3J0VYSh-Y_rqmdKXYZA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjCzNrNzxzzOuTgBVFSpf02NE9_5YGJ7czzw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGzKPag7LSRajyHi4z9fA2VV7vyQX0UZ058g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYenLbgFVm9XsSkKowrvBPZ0g6DOz6sxD5XA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGzKPag7LSRajyHi4z9fA2VV7vyQX0UZ058g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRugpoYjI2rk0Jf8PpPN1Fpekfxh6dg1fie8Q&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdninaxqP9Ulpwssogcn0Vfmx7RG9hjb4xxg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYenLbgFVm9XsSkKowrvBPZ0g6DOz6sxD5XA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrE-T_HIlZIzd0m-3J0VYSh-Y_rqmdKXYZA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRugpoYjI2rk0Jf8PpPN1Fpekfxh6dg1fie8Q&s"
];

const contactLensImages = [
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-nxt-monthly_csvfile-1706625948211-artboard_12.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-toric-monthly_aqualens-24h-toric-monthly---3lp_csvfile-1682208663780-135218.png.png",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/q/aqualens-24-h-contact-lens-30-lens-box-contact-lens_g_2766_1.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-monthly_csvfile-1706697736381-1.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-toric-dailies_aqualens-24-h-daily-disposable-toric-contact-lens--30-lens-box_csvfile-1681127655690-144128.png.png",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-nxt-monthly_csvfile-1706625948211-artboard_12.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-dailies_csvfile-1706873774153-1_02_02_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-toric-monthly_aqualens-24h-toric-monthly---3lp_csvfile-1682208663780-135218.png.png",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/q/aqualens-24-h-contact-lens-30-lens-box-contact-lens_g_2766_1.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-monthly_csvfile-1706697736381-1.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-toric-dailies_aqualens-24-h-daily-disposable-toric-contact-lens--30-lens-box_csvfile-1681127655690-144128.png.png"
];

// Helper function to get random element from array
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

// Helper function to generate random price
const getRandomPrice = () => Math.floor(Math.random() * (5000 - 500) + 500);

// Helper function to generate random product ID
const generateProductId = (index) => `PROD${String(index).padStart(6, '0')}`;

const initializeDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Initialize shapes
    await initializeShapes();
    console.log('Shapes initialized');

    // Initialize powers
    await initializePowers();
    console.log('Powers initialized');

    // Check if products already exist
    const productCount = await ProductModel.countDocuments();
    if (productCount === 0) {
      // Insert sample products
      await createSampleProducts();
      console.log('Sample products initialized successfully');
    }

    console.log('Database initialization completed');
    
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Function to create sample products
const createSampleProducts = async () => {
  try {
    // Clear existing products
    await ProductModel.deleteMany({});
    console.log('Cleared existing products');

    const products = [];
    const productTypes = ['EYEGLASSES', 'SUNGLASSES', 'CONTACT_LENSES', 'COLOR_CONTACT_LENSES'];
    const genders = ['Men', 'Women', 'Unisex', 'Kids'];
    const ageGroups = ['Kids', 'Teens', 'Adults', 'Seniors'];
    const shapes = ['Round', 'Square', 'Rectangle', 'Aviator', 'Cat Eye', 'Oval', 'Geometric', 'Wayfarer'];
    const styles = ['Casual', 'Formal', 'Sports', 'Fashion', 'Vintage', 'Classic', 'Modern'];
    const frameColors = ['Black', 'Transparent', 'Gold', 'Gunmetal', 'Blue', 'Silver', 'Brown', 'Green', 'Grey'];

    // Create 200 sample products
    for (let i = 0; i < 200; i++) {
      const productType = getRandomElement(productTypes);
      let imageTsrc;
      
      // Select appropriate image based on product type
      if (productType === 'COLOR_CONTACT_LENSES') {
        imageTsrc = getRandomElement(colorContactLensImages);
      } else if (productType === 'CONTACT_LENSES') {
        imageTsrc = getRandomElement(contactLensImages);
      } else {
        imageTsrc = getRandomElement(productImages);
      }

      const price = getRandomPrice();
      const mPrice = Math.floor(price * 1.2); // 20% higher than price

      const product = {
        name: `${productType} Product ${i + 1}`,
        imageTsrc,
        caption: `Stylish ${productType.toLowerCase()} for everyday use`,
        productRefLink: `https://lenskart.com/products/${i + 1}`,
        price,
        mPrice,
        productId: generateProductId(i + 1),
        productType,
        powerType: getRandomElement(['ZERO_POWER', 'SINGLE_VISION', 'BIFOCAL', 'PROGRESSIVE']),
        shape: getRandomElement(shapes),
        style: getRandomElement(styles),
        gender: getRandomElement(genders),
        ageGroup: getRandomElement(ageGroups),
        frameColors: [getRandomElement(frameColors)],
        quantity: Math.floor(Math.random() * 100) + 1,
        rating: (Math.random() * 5).toFixed(1),
        userRated: Math.floor(Math.random() * 1000),
        discount: Math.floor(Math.random() * 50),
        topPicks: getRandomElement(['new-arrivals', 'best-sellers', 'trending', 'exclusive']),
        masterCategory: productType === 'EYEGLASSES' ? 'eyeglasses' : 
                       productType === 'SUNGLASSES' ? 'sunglasses' : 'contact-lenses',
        personCategory: getRandomElement(['men', 'women', 'kids', 'unisex']),
        isNew: Math.random() > 0.7,
        isBestSeller: Math.random() > 0.8,
        isExclusive: Math.random() > 0.9,
        additionalImages: [imageTsrc]
      };

      products.push(product);
    }

    // Insert all products
    await ProductModel.insertMany(products);
    console.log('Successfully added 200 sample products');

  } catch (error) {
    console.error('Error creating sample products:', error);
  }
};

// Run the initialization
initializeDatabase();
