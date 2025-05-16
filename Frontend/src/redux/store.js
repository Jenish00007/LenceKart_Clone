import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import { CartReducer } from './CartPage/reducer';
import { wishlistReducer } from './wishlist/wishlist.reducer';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    CartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
