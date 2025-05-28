const mongoose = require('mongoose');
const dbConfig = require('../Configs/db.config');

const clearProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://qaudsinfo:Qauds123@cluster0.nyfuhwt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    // Get the products collection
    const collection = mongoose.connection.collection('products');

    // Delete all documents in the collection
    const result = await collection.deleteMany({});
    console.log(`Successfully deleted ${result.deletedCount} products from the collection`);

    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');

  } catch (error) {
    console.error('Error clearing products:', error);
    process.exit(1);
  }
};

// Run the clear function
clearProducts(); 