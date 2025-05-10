const express = require("express");
const cors = require("cors");
const { connection } = require("../Configs/db");
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

app.use("/api/payment", paymentRoutes);

// Start server
const PORT = process.env.port || 8080;

// Initialize database connection and start server
const startServer = async () => {
  try {
    // Wait for database connection
    await connection;
    console.log("Connected to MongoDB successfully");

    // Start server after database connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer(); 