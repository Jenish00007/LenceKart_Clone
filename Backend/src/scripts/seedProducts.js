const mongoose = require("mongoose");
const Product = require("../models/product.model");
require("dotenv").config();

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

const recommendedProducts = [
  {
    name: "Vincent Chase Blue Block",
    description: "Blue Block Computer Glasses: Reduce Eye Strain",
    price: 999,
    originalPrice: 2499,
    offer: "60% OFF",
    image: "https://static1.lenskart.com/media/desktop/img/May22/glasses.jpg",
    productType: "eyeglasses",
    recommended: true,
    trending: true
  },
  {
    name: "John Jacobs Premium",
    description: "Premium Eyeglasses with Anti-Glare Coating",
    price: 1499,
    originalPrice: 3999,
    offer: "62% OFF",
    image: "https://static1.lenskart.com/media/desktop/img/May22/progressive.jpg",
    productType: "eyeglasses",
    recommended: true,
    trending: true
  },
  {
    name: "Hooper Sun Glasses",
    description: "Polarized Sunglasses for Ultimate Protection",
    price: 1299,
    originalPrice: 2999,
    offer: "56% OFF",
    image: "https://static1.lenskart.com/media/desktop/img/May22/power-sun.jpg",
    productType: "sunglasses",
    recommended: true,
    trending: true
  },
  {
    name: "Lenskart Air",
    description: "Lightweight Comfortable Eyewear",
    price: 799,
    originalPrice: 1999,
    offer: "60% OFF",
    image: "https://static1.lenskart.com/media/desktop/img/May22/reading.jpg",
    productType: "eyeglasses",
    recommended: true,
    trending: true
  },
  {
    name: "Contact Lens Pack",
    description: "Monthly Disposable Contact Lenses",
    price: 599,
    originalPrice: 1499,
    offer: "60% OFF",
    image: "https://static1.lenskart.com/media/desktop/img/May22/clear-contact.jpg",
    productType: "contact-lenses",
    recommended: true,
    trending: true
  },
  {
    name: "Color Contact Lens",
    description: "Natural Looking Color Contact Lenses",
    price: 899,
    originalPrice: 2299,
    offer: "61% OFF",
    image: "https://static1.lenskart.com/media/desktop/img/May22/color-contact.jpg",
    productType: "contact-lenses",
    recommended: true,
    trending: true
  }
];

const connectWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log(`Attempting to connect to MongoDB (attempt ${i + 1}/${retries})...`);
      await mongoose.connect('mongodb://127.0.0.1:27017/lenskart', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
      });
      console.log("Connected to MongoDB successfully!");
      return true;
    } catch (error) {
      console.error(`Connection attempt ${i + 1} failed:`, error.message);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  return false;
};

const seedProducts = async () => {
  try {
    const connected = await connectWithRetry();
    if (!connected) {
      console.error("Failed to connect to MongoDB after multiple attempts");
      console.log("\nTroubleshooting steps:");
      console.log("1. Make sure MongoDB is installed");
      console.log("2. Check if MongoDB service is running: net start MongoDB");
      console.log("3. Verify MongoDB is installed as a service");
      console.log("4. Check if the data directory exists: C:\\data\\db");
      process.exit(1);
    }

    // Clear existing products
    console.log("Clearing existing products...");
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert new products
    console.log("Inserting new products...");
    await Product.insertMany(recommendedProducts);
    console.log("Successfully seeded products");

    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts(); 