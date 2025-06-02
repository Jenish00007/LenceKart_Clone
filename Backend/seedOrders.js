const mongoose = require("mongoose");
const Order = require("./Models/order.model");
require("dotenv").config();

// Function to generate dummy orders for specific user
const generateOrders = () => {
  const orders = [];
  const statuses = ['pending', 'completed', 'failed'];
  const currencies = ['INR'];
  const userId = "681f143fea2081f89e835d92"; // Specific user ID
  
  // Generate 10 dummy orders for this user
  for (let i = 1; i <= 10; i++) {
    const order = {
      orderId: `order_${Date.now()}_${i}`,
      userId: userId, // Using the specific user ID
      amount: Math.floor(Math.random() * 5000) + 1000, // Random amount between 1000 and 6000
      currency: currencies[0],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      paymentId: `pay_${Date.now()}_${i}`,
      paymentSignature: `sig_${Date.now()}_${i}`,
      receipt: `receipt_${Date.now()}_${i}`,
      orderDetails: {
        items: [
          {
            id: `item_${i}`,
            name: `Vincent Chase Eyeglasses ${i}`,
            quantity: Math.floor(Math.random() * 3) + 1,
            price: Math.floor(Math.random() * 2000) + 1000,
            image: 'https://static.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/vincent-chase-vc-e13784-c2-eyeglasses_g_9401_24_01_2023.jpg'
          }
        ],
        subtotal: Math.floor(Math.random() * 5000) + 1000,
        tax: Math.floor(Math.random() * 500) + 100,
        coupon: Math.floor(Math.random() * 200),
        total: Math.floor(Math.random() * 5000) + 1000
      },
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date within last 30 days
      updatedAt: new Date()
    };
    orders.push(order);
  }
  return orders;
};

// Connect to MongoDB and insert orders
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    
    // Clear existing orders for this user
    await Order.deleteMany({ userId: "681f143fea2081f89e835d92" });
    console.log("Cleared existing orders for user");
    
    // Generate and insert new orders
    const orders = generateOrders();
    await Order.insertMany(orders);
    console.log("Inserted 10 new orders for user");
    
    // Close the connection
    mongoose.connection.close();
    console.log("Connection closed");
  })
  .catch((err) => {
    console.error("Error:", err);
    mongoose.connection.close();
  }); 