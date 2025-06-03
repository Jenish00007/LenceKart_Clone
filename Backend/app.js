const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { errorHandler, notFound } = require('./middlwares/errorHandler');
const { apiLimiter } = require('./middlwares/rateLimiter');

// Import routes
const authRouter = require('./routes/user.routes');
const productRouter = require('./routes/product.routes');
const orderRouter = require('./routes/order.routes');
const userRouter = require('./routes/user.routes');
const wishlistRouter = require('./routes/wishlist.routes');
const cartRouter = require('./routes/cart.routes');
const paymentRouter = require('./routes/payment.routes');
const bannerRouter = require('./routes/banner.route');
const adBannerRouter = require('./routes/adBannerRoutes');
const sectionBannerRouter = require('./routes/sectionBannerRoutes');
const shapeRouter = require('./routes/shapeRoutes');
const searchRouter = require('./routes/search.routes');
const adminRouter = require('./routes/admin.routes');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all routes
app.use(apiLimiter);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);
app.use('/api/wishlist', wishlistRouter);
app.use('/api/cart', cartRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/banners', bannerRouter);
app.use('/api/ad-banners', adBannerRouter);
app.use('/api/section-banners', sectionBannerRouter);
app.use('/api/shapes', shapeRouter);
app.use('/api/search', searchRouter);
app.use('/api/admin', adminRouter);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app; 