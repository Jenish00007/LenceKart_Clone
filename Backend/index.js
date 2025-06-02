const express = require("express");
const { connection } = require("./Configs/db");
const userRouter = require("./routes/user.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const paymentRouter = require("./routes/payment.routes");
const searchRouter = require("./routes/search.routes");
const bannerRouter = require("./routes/banner.route");
const adBannerRouter = require("./routes/adBannerRoutes");
const sectionBannerRoutes = require('./routes/sectionBannerRoutes');
const orderRouter = require('./routes/order.routes');
const shapeRoutes = require('./routes/shapeRoutes');
const glassProductRoutes = require('./component/glassFilter/routes');
const passport = require("passport");
const session = require("express-session");
const authRoutes = require("./routes/auth");

//Routes from component 
require("dotenv").config();
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://192.168.2.10:3000'],
  credentials: true
}));
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || "your_session_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Load passport configuration
require("./Configs/passport");

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Lenskart API");
}); 

app.use("/auth", authRoutes);
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/search', searchRouter);
app.use('/api/banner', bannerRouter);
app.use('/api/adbanner', adBannerRouter);
app.use('/api/sectionbanner', sectionBannerRoutes);
app.use('/api/orders', orderRouter);
app.use('/api/shape', shapeRoutes);
app.use('/api', glassProductRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 8080;

// Connect to database and start server
const startServer = async () => {
  try {
    await connection;
    console.log("Connected to MongoDB successfully");
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API available at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

startServer();
