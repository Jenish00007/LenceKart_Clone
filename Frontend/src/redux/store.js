import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import { cartReducer } from './cart';
import { wishlistReducer } from './wishlist/wishlist.reducer';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
