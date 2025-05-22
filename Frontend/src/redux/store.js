import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import { cartReducer } from './cart/cart.reducer';
import { wishlistReducer } from './wishlist/wishlist.reducer';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
