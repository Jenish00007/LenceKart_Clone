require('dotenv').config();
const mongoose = require('mongoose');
const ProductModel = require('./Models/product.model'); // <-- Update the path
const fs = require('fs');

// Load the dummy products from JSON file
const products = JSON.parse(
  fs.readFileSync('./dummy_products_3000.json', 'utf-8') // <-- Update path if needed
);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');

  // Insert dummy data
  const inserted = await ProductModel.insertMany(products);
  console.log(`✅ Successfully inserted ${inserted.length} products`);

  // Close connection
  mongoose.connection.close();
})
.catch(err => {
  console.error('❌ Error connecting to MongoDB:', err);
});
