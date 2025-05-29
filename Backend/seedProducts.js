const mongoose = require('mongoose');
const Product = require('./Models/product.model');
require('dotenv').config();

const glassesImages = [
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-transparent-full-rim-round-vincent-chase-sleek-steel-vc-e15069-c1-eyeglasses_g_3599_10_14_22.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-e16146-c4-eyeglasses_img_0196_26_10_2023.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vcs000318-c21-sunglasses__dsc5631_13_12_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/transparent-full-rim-round-lenskart-air-classic-la-e15018-c3-eyeglasses_g_8625_09_09_2022.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/matte-black-green-gradient-full-rim-wayfarer-vincent-chase-polarized-athleisure-vc-s14461-c5-sunglasses_g_2615_9_29_22.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-air-la-e17591-c2-eyeglasses_dsc5756_23_11_2024.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/grey-transparent-gunmetal-grey-full-rim-round-lenskart-air-signia-la-e14958-c2-eyeglasses_g_3127_06_oct22.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/silver-black-grey-gradient-full-rim-aviator-vincent-chase-polorized-maverick-2-0--vc-s15762-c2-sunglasses_g_7288_image_pla_09_08_2023.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/gold-full-rim-aviator-vincent-chase-sleek-steel-vc-e000077-c8-eyeglasses_dsc0472_10_09_2024.jpg"
];

const colorContactLensImages = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjCzNrNzxzzOuTgBVFSpf02NE9_5YGJ7czzw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdninaxqP9Ulpwssogcn0Vfmx7RG9hjb4xxg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDrE-T_HIlZIzd0m-3J0VYSh-Y_rqmdKXYZA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGzKPag7LSRajyHi4z9fA2VV7vyQX0UZ058g&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYenLbgFVm9XsSkKowrvBPZ0g6DOz6sxD5XA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRugpoYjI2rk0Jf8PpPN1Fpekfxh6dg1fie8Q&s"
];

const contactLensImages = [
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-nxt-monthly_csvfile-1706625948211-artboard_12.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-toric-monthly_aqualens-24h-toric-monthly---3lp_csvfile-1682208663780-135218.png.png",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/q/aqualens-24-h-contact-lens-30-lens-box-contact-lens_g_2766_1.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-monthly_csvfile-1706697736381-1.jpg",
  "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-toric-dailies_aqualens-24-h-daily-disposable-toric-contact-lens--30-lens-box_csvfile-1681127655690-144128.png.png"
];

const brands = [
  "Ray-Ban", "Aqualens", "Bausch Lomb", "Soflens", "Acuvue", "Iconnect", "Alcon",
  "Oakley", "Prada", "Gucci", "Dior", "Cartier", "Versace", "Fendi", "Burberry",
  "Dolce & Gabbana", "Louis Vuitton", "Hermes", "Chanel"
];

const frameWidths = [
  "123 mm", "125 mm", "126 mm", "127 mm", "128 mm", "129 mm", "130 mm", "131 mm",
  "132 mm", "133 mm", "134 mm", "135 mm", "136 mm", "137 mm", "138 mm", "139 mm",
  "140 mm", "141 mm", "142 mm", "143 mm", "144 mm", "145 mm", "146 mm", "147 mm",
  "148 mm", "149 mm", "150 mm"
];

const generateProduct = (index) => {
  const isGlasses = Math.random() > 0.5;
  const mainCategory = isGlasses ? "GLASSES" : "CONTACT_LENSES";
  const subCategory = isGlasses 
    ? ["EYEGLASSES", "SUNGLASSES", "COMPUTER_GLASSES"][Math.floor(Math.random() * 3)]
    : ["CONTACT_LENSES", "CONTACT_LENS_SOLUTION", "CONTACT_LENS_CASES"][Math.floor(Math.random() * 3)];

  // Ensure some products are computer blue lenses
  const isComputerBlueLens = subCategory === "COMPUTER_GLASSES" && Math.random() > 0.5;

  const imageTsrc = isGlasses 
    ? glassesImages[Math.floor(Math.random() * glassesImages.length)]
    : subCategory === "CONTACT_LENSES" 
      ? contactLensImages[Math.floor(Math.random() * contactLensImages.length)]
      : colorContactLensImages[Math.floor(Math.random() * colorContactLensImages.length)];

  const price = Math.floor(Math.random() * (15000 - 500) + 500);
  const mPrice = Math.floor(price * (1 + Math.random() * 0.3));

  const product = {
    productId: `PROD${String(index).padStart(6, '0')}`,
    name: isComputerBlueLens 
      ? `${brands[Math.floor(Math.random() * brands.length)]} Computer Blue Lens ${index}`
      : `${brands[Math.floor(Math.random() * brands.length)]} ${mainCategory === "GLASSES" ? "Eyewear" : "Contact Lens"} ${index}`,
    imageTsrc,
    additionalImages: [imageTsrc],
    caption: isComputerBlueLens 
      ? "Computer Blue Lens for Digital Eye Strain Protection"
      : `${mainCategory === "GLASSES" ? "Stylish" : "Comfortable"} ${subCategory.toLowerCase()} for everyday use`,
    productRefLink: `/product/${index}`,
    price,
    mPrice,
    mainCategory,
    subCategory,
    personCategory: ["men", "women", "kids", "unisex"][Math.floor(Math.random() * 4)],
    gender: ["Men", "Women", "Unisex", "Kids", "Not Applicable"][Math.floor(Math.random() * 5)],
    ageGroup: ["Kids", "Teens", "Adults", "Seniors", "Youth", "Not Applicable"][Math.floor(Math.random() * 6)],
    selectedCategoryPrice: ["classic-eyeglasses", "premium-eyeglasses", "designer-eyeglasses"][Math.floor(Math.random() * 3)],
    brands: [brands[Math.floor(Math.random() * brands.length)]],
    topPicks: ["new-arrivals", "best-sellers", "trending", "exclusive", "essentials"][Math.floor(Math.random() * 5)],
    powerType: isComputerBlueLens 
      ? (Math.random() > 0.5 ? "with_power" : "zero_power")
      : ["zero_power", "with_power", "single_vision", "bifocal", "progressive"][Math.floor(Math.random() * 5)],
    powerRange: {
      min: -6,
      max: 6
    },
    prescriptionType: ["Bifocal/Progressive Supported", "Single Vision Only", "Non-Prescription"][Math.floor(Math.random() * 3)],
    supportedPowers: ["Supports All Powers", "Supports Very High Power", "Supports High Power", "Upto Regular Power"][Math.floor(Math.random() * 4)],
    frameType: ["Full Rim", "Half Rim", "Rimless"][Math.floor(Math.random() * 3)],
    shape: ["Round", "Square", "Rectangle", "Aviator", "Cat Eye", "Oval"][Math.floor(Math.random() * 6)],
    frameSize: ["Extra Narrow", "Narrow", "Medium", "Wide", "Extra Wide"][Math.floor(Math.random() * 5)],
    frameWidth: frameWidths[Math.floor(Math.random() * frameWidths.length)],
    weightGroup: ["Light", "Average", "Heavy", "Extra Heavy"][Math.floor(Math.random() * 4)],
    style: ["Casual", "Formal", "Sports", "Fashion", "Vintage", "Classic"][Math.floor(Math.random() * 6)],
    contactLensColors: ["Black", "Brown", "Blue", "Green", "Grey", "Hazel"][Math.floor(Math.random() * 6)],
    contactLensType: ["Daily", "Weekly", "Monthly", "Yearly"][Math.floor(Math.random() * 4)],
    contactLensMaterial: ["Silicone Hydrogel", "Hydrogel", "Gas Permeable", "Hybrid"][Math.floor(Math.random() * 4)],
    lensFeatures: isComputerBlueLens ? ["Blue Light Block"] : ["Anti Glare", "UV Protection", "Anti Scratch"][Math.floor(Math.random() * 3)],
    isRecommended: Math.random() > 0.4,
    isTrending: Math.random() > 0.7,
    isLatest: Math.random() > 0.7,
    isExclusive: Math.random() > 0.8,
    isSpecialOffer: Math.random() > 0.8,
    isBestSeller: Math.random() > 0.7,
    isTrialPack: Math.random() > 0.9,
    rating: Math.floor(Math.random() * 5),
    reviewCount: Math.floor(Math.random() * 1000),
    quantity: Math.floor(Math.random() * 100) + 10,
    discount: Math.floor(Math.random() * 30)
  };

  return product;
};

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Generate and insert 200 products
    const products = Array.from({ length: 200 }, (_, i) => generateProduct(i + 1));
    await Product.insertMany(products);
    console.log('Successfully seeded 200 products');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
