const express = require("express");
const cors = require("cors");
const { connection } = require("../Configs/db");
const userRoutes = require("./routes/user.route");
const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const paymentRoutes = require("./routes/payment.route");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Lenskart API");
});

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);

// Start server
const PORT = process.env.port || 8080;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to the DB");
  } catch (err) {
    console.log("Trouble connecting to the DB");
    console.log(err);
  }
  console.log(`Server is running on port ${PORT}`);
}); 