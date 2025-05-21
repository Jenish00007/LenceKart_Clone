const mongoose = require('mongoose');
const ProductModel = require('../Models/product.model');
require('dotenv').config();

const contactLensImages = [
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-dailies_csvfile-1706873774153-1_02_02_2024.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/q/aqualens-24-h-contact-lens-30-lens-box-contact-lens_g_2766_1.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-toric-dailies_aqualens-24-h-daily-disposable-toric-contact-lens--30-lens-box_csvfile-1681127655690-144128.png.png',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-toric-monthly_aqualens-24h-toric-monthly---3lp_csvfile-1682208663780-135218.png.png',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-monthly_csvfile-1706697736381-1.jpg',
  'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-nxt-monthly_csvfile-1706625948211-artboard_12.jpg'
];

const contactLensProducts = [
  {
    name: "Aqualens 10H Dailies",
    imageTsrc: contactLensImages[0],
    caption: "Daily Disposable Contact Lenses",
    productRefLink: "/contact-lenses/aqualens-10h-dailies",
    price: 999,
    mPrice: 1299,
    productId: "CL001",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    contactLensType: "Daily",
    contactLensMaterial: "Silicone Hydrogel",
    rating: 4.5,
    userRated: 120
  },
  {
    name: "Aqualens 24H Contact Lens",
    imageTsrc: contactLensImages[1],
    caption: "Monthly Disposable Contact Lenses",
    productRefLink: "/contact-lenses/aqualens-24h",
    price: 1499,
    mPrice: 1799,
    productId: "CL002",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    contactLensType: "Monthly",
    contactLensMaterial: "Silicone Hydrogel",
    rating: 4.3,
    userRated: 95
  },
  {
    name: "Aqualens 24H Toric Dailies",
    imageTsrc: contactLensImages[2],
    caption: "Daily Disposable Toric Contact Lenses",
    productRefLink: "/contact-lenses/aqualens-24h-toric-dailies",
    price: 1299,
    mPrice: 1599,
    productId: "CL003",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    contactLensType: "Daily",
    contactLensMaterial: "Silicone Hydrogel",
    rating: 4.4,
    userRated: 85
  },
  {
    name: "Aqualens 24H Toric Monthly",
    imageTsrc: contactLensImages[3],
    caption: "Monthly Disposable Toric Contact Lenses",
    productRefLink: "/contact-lenses/aqualens-24h-toric-monthly",
    price: 1799,
    mPrice: 2099,
    productId: "CL004",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    contactLensType: "Monthly",
    contactLensMaterial: "Silicone Hydrogel",
    rating: 4.6,
    userRated: 110
  },
  {
    name: "Aqualens 10H Monthly",
    imageTsrc: contactLensImages[4],
    caption: "Monthly Disposable Contact Lenses",
    productRefLink: "/contact-lenses/aqualens-10h-monthly",
    price: 1299,
    mPrice: 1599,
    productId: "CL005",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    contactLensType: "Monthly",
    contactLensMaterial: "Silicone Hydrogel",
    rating: 4.2,
    userRated: 75
  },
  {
    name: "Aqualens NXT Monthly",
    imageTsrc: contactLensImages[5],
    caption: "Premium Monthly Disposable Contact Lenses",
    productRefLink: "/contact-lenses/aqualens-nxt-monthly",
    price: 1999,
    mPrice: 2299,
    productId: "CL006",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    contactLensType: "Monthly",
    contactLensMaterial: "Silicone Hydrogel",
    rating: 4.7,
    userRated: 130
  },
  {
    name: "Aqualens 10H Dailies (Pack of 2)",
    imageTsrc: contactLensImages[0],
    caption: "Daily Disposable Contact Lenses - Twin Pack",
    productRefLink: "/contact-lenses/aqualens-10h-dailies-twin",
    price: 1899,
    mPrice: 2299,
    productId: "CL007",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    contactLensType: "Daily",
    contactLensMaterial: "Silicone Hydrogel",
    rating: 4.5,
    userRated: 90
  },
  {
    name: "Aqualens 24H Contact Lens (Pack of 2)",
    imageTsrc: contactLensImages[1],
    caption: "Monthly Disposable Contact Lenses - Twin Pack",
    productRefLink: "/contact-lenses/aqualens-24h-twin",
    price: 2799,
    mPrice: 3299,
    productId: "CL008",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    contactLensType: "Monthly",
    contactLensMaterial: "Silicone Hydrogel",
    rating: 4.4,
    userRated: 85
  },
  {
    name: "Aqualens 24H Toric Dailies (Pack of 2)",
    imageTsrc: contactLensImages[2],
    caption: "Daily Disposable Toric Contact Lenses - Twin Pack",
    productRefLink: "/contact-lenses/aqualens-24h-toric-dailies-twin",
    price: 2499,
    mPrice: 2999,
    productId: "CL009",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    contactLensType: "Daily",
    contactLensMaterial: "Silicone Hydrogel",
    rating: 4.6,
    userRated: 95
  },
  {
    name: "Aqualens 24H Toric Monthly (Pack of 2)",
    imageTsrc: contactLensImages[3],
    caption: "Monthly Disposable Toric Contact Lenses - Twin Pack",
    productRefLink: "/contact-lenses/aqualens-24h-toric-monthly-twin",
    price: 3399,
    mPrice: 3999,
    productId: "CL010",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    contactLensType: "Monthly",
    contactLensMaterial: "Silicone Hydrogel",
    rating: 4.7,
    userRated: 100
  },
  {
    name: "Aqualens 10H Monthly (Pack of 2)",
    imageTsrc: contactLensImages[4],
    caption: "Monthly Disposable Contact Lenses - Twin Pack",
    productRefLink: "/contact-lenses/aqualens-10h-monthly-twin",
    price: 2499,
    mPrice: 2999,
    productId: "CL011",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    contactLensType: "Monthly",
    contactLensMaterial: "Silicone Hydrogel",
    rating: 4.3,
    userRated: 80
  },
  {
    name: "Aqualens NXT Monthly (Pack of 2)",
    imageTsrc: contactLensImages[5],
    caption: "Premium Monthly Disposable Contact Lenses - Twin Pack",
    productRefLink: "/contact-lenses/aqualens-nxt-monthly-twin",
    price: 3799,
    mPrice: 4299,
    productId: "CL012",
    productType: "CONTACT_LENSES",
    powerType: "CONTACT_LENS_POWER",
    contactLensType: "Monthly",
    contactLensMaterial: "Silicone Hydrogel",
    rating: 4.8,
    userRated: 120
  }
];

const updateContactLenses = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

    // Delete all existing contact lenses
    await ProductModel.deleteMany({ productType: 'CONTACT_LENSES' });
    console.log('Deleted existing contact lenses');

    // Insert new contact lenses
    await ProductModel.insertMany(contactLensProducts);
    console.log('Inserted new contact lenses');

    console.log('Contact lenses update completed successfully');
  } catch (error) {
    console.error('Error updating contact lenses:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

updateContactLenses();