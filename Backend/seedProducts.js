const mongoose = require("mongoose");
const { ProductModel } = require("./Models/product.model");
require("dotenv").config();

// Expanded sample data for different categories
const colors = ["Black", "Brown", "Blue", "Green", "Red", "Gold", "Silver", "Tortoise", "Grey", "Pink", "Purple", "White", "Transparent", "Multi-color", "Navy", "Beige", "Rose Gold", "Gunmetal", "Bronze", "Copper"];
const shapes = ["Aviator", "Round", "Square", "Rectangle", "Cat Eye", "Wayfarer", "Oval", "Geometric", "Butterfly", "Clubmaster", "Browline", "Rimless", "Hexagonal", "Octagonal", "Teardrop", "Pilot", "Sport", "Wrap", "Shield", "Oversized"];
const genders = ["Men", "Women", "Unisex", "Kids", "Teen", "Senior", "Youth", "Adult"];
const styles = ["Casual", "Formal", "Sports", "Fashion", "Retro", "Vintage", "Modern", "Classic", "Trendy", "Professional", "Luxury", "Minimalist", "Bold", "Elegant", "Urban", "Street", "Business", "Party", "Beach", "Outdoor"];
const productTypes = ["Sunglasses", "Eyeglasses", "Contact Lenses", "Computer Glasses", "Reading Glasses", "Blue Light Glasses", "Polarized Sunglasses", "Gradient Sunglasses", "Sports Glasses", "Safety Glasses", "Fashion Glasses", "Prescription Glasses", "Bifocal Glasses", "Progressive Glasses", "Photochromic Glasses"];
const dimensions = ["50-20-145", "52-18-140", "54-19-150", "55-17-145", "53-19-145", "51-18-140", "56-16-145", "52-17-145", "54-18-145", "55-18-145", "53-17-145", "52-19-145", "54-20-145", "55-19-145", "56-17-145"];
const materials = ["Acetate", "Metal", "Titanium", "Plastic", "TR90", "Stainless Steel", "Wood", "Carbon Fiber", "Aluminum", "Memory Metal", "Monel", "Beta Titanium", "Flexon", "Grilamid", "Ultem"];
const lensTypes = ["Clear", "Photochromic", "Polarized", "Blue Light", "UV Protection", "Mirror Coated", "Gradient", "Anti-Reflective", "Transitions", "Photochromic Polarized", "Blue Light Filter", "Anti-Fog", "Scratch Resistant", "Impact Resistant", "High Index"];
const brands = ["Ray-Ban", "Oakley", "Gucci", "Prada", "Versace", "Dior", "Tom Ford", "Burberry", "Armani", "Dolce & Gabbana", "Michael Kors", "Coach", "Fossil", "Vogue", "Hugo Boss"];

// Generate random products
const generateProducts = () => {
  const products = [];
  let id = 1;

  for (let i = 0; i < 500; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const style = styles[Math.floor(Math.random() * styles.length)];
    const productType = productTypes[Math.floor(Math.random() * productTypes.length)];
    const dimension = dimensions[Math.floor(Math.random() * dimensions.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];
    const lensType = lensTypes[Math.floor(Math.random() * lensTypes.length)];
    const brand = brands[Math.floor(Math.random() * brands.length)];
    
    const price = Math.floor(Math.random() * (20000 - 1000) + 1000);
    const mPrice = Math.floor(price * 1.2); // 20% higher than price
    const rating = (Math.random() * 2 + 3).toFixed(1); // Random rating between 3 and 5
    const userRated = Math.floor(Math.random() * 10000);

    const product = {
      imageTsrc: `https://static.lenskart.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/lens/${id}.jpg`,
      productRefLink: `/product/${id}`,
      rating: parseFloat(rating),
      colors: color,
      price: price,
      mPrice: mPrice,
      name: `${brand} ${color} ${shape} ${productType} ${material}`,
      shape: shape,
      gender: gender,
      style: style,
      dimension: dimension,
      productType: productType,
      productId: `LK${id}`,
      userRated: userRated,
      quantity: Math.floor(Math.random() * 200) + 10,
      id: id++,
      material: material,
      lensType: lensType,
      brand: brand
    };

    products.push(product);
  }

  return products;
};

// Connect to MongoDB and insert products
mongoose.connect(process.env.mongoURL)
  .then(async () => {
    console.log("Connected to MongoDB");
    
    // Clear existing products
    await ProductModel.deleteMany({});
    console.log("Cleared existing products");
    
    // Generate and insert new products
    const products = generateProducts();
    await ProductModel.insertMany(products);
    console.log("Inserted 500 new products");
    
    // Close the connection
    mongoose.connection.close();
    console.log("Connection closed");
  })
  .catch((err) => {
    console.error("Error:", err);
    mongoose.connection.close();
  }); 