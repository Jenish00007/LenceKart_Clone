const wishlistRouter = require('./routes/wishlist.routes');

// Routes
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/users', userRouter);
app.use('/api/wishlist', wishlistRouter); 