import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: null,
  selectedFrameType: null
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedFrameType: (state, action) => {
      state.selectedFrameType = action.payload;
    }
  }
});

export const { setSelectedCategory, setSelectedFrameType } = categorySlice.actions;
export default categorySlice.reducer; 