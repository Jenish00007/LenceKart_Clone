import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import { CartReducer } from './CartPage/reducer';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    CartReducer,
  },
});

export default store;
