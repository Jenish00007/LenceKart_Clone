const mongoose = require("mongoose");
const ProductModel = require("../Models/product.model"); // update path as needed
const { v4: uuidv4 } = require("uuid");

// Connect to MongoDB
mongoose.connect('mongodb+srv://qaudsinfo:Qauds123@cluster0.nyfuhwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
  seedData();
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// Function to generate dummy product
const generateProduct = (index) => ({
  name: `Color contact Lens Product ${index + 1}`,
  imageTsrc: `https://example.com/image${index + 1}.jpg`,
  caption: `This is a sample caption for Contact Lens ${index + 1}`,
  productRefLink: `https://example.com/product${index + 1}`,
  price: 499 + index,
  mPrice: 599 + index,
  productId: uuidv4(), // generate a unique ID
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
    `https://example.com/image${index + 1}_1.jpg`,
    `https://example.com/image${index + 1}_2.jpg`
  ],
  priceRange: "Rs. 500-999"
});

// Insert 50 products
const seedData = async () => {
  try {
    const products = Array.from({ length: 50 }, (_, i) => generateProduct(i));
    await ProductModel.insertMany(products);
    console.log("50 CONTACT_LENSES products inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error inserting products:", err);
    mongoose.connection.close();
  }
};
