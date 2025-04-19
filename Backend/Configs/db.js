const mongoose = require("mongoose");
require("dotenv").config();

// Set strictQuery to false to prepare for Mongoose 7
mongoose.set('strictQuery', false);

const connection = mongoose.connect(process.env.mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

module.exports = { connection };
