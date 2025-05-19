import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: '', // men, women, kids
  productType: '', // eyeglasses, computerglasses, kidsglasses, contactlenses, sunglasses
  selectedType: '', // eyeglasses, computerglasses, kidsglasses, contactlenses, sunglasses
  selectedSubCategory: '', // from Our Top Picks
  frameType: '', // from Frame Type section
  filters: {
    disposability: '', // Monthly, Day & Night, Daily, Yearly, Bi-weekly
    power: '', // Spherical - CYL, Spherical + CYL, Cylindrical Power, Toric Power
    color: '', // Green, Blue, Brown, Turquoise
    solution: '', // Small, Large
    shape: '',
    collection: '',
  }, 
  priceRange: {
    min: 0,
    max: 10000,
  },
  sortBy: '',
  currentPage: 1,
  itemsPerPage: 50
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload || '';
      console.log(state.selectedCategory, "selectedCategory");
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload || '';
      console.log(state.selectedType, "selectedType");
    },
    setSelectedSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload || '';
      console.log(state.selectedSubCategory, "selectedSubCategory");
    },
    setFrameType: (state, action) => {
      state.frameType = action.payload || '';
      console.log(state.frameType, "frameType");
    },
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      if (filterType && filterType in state.filters) {
        state.filters[filterType] = value || '';
        // Add specific console logging for shape and collection
        if (filterType === 'shape') {
          console.log('Shape filter updated:', value);
        }
        if (filterType === 'collection') {
          console.log('Collection filter updated:', value);
        }
        console.log(`Filter ${filterType}:`, value);
      }
    },
    setPriceRange: (state, action) => {
      const { min = 0, max = 10000 } = action.payload || {};
      state.priceRange = { 
        min: Number(min) || 0,
        max: Number(max) || 10000
      };
      console.log(state.priceRange, "priceRange");
        
    },
    setDisposability: (state, action) => {
      console.log(action.payload, "disposability");
      state.filters.disposability = action.payload;
    },
    setPower: (state, action) => {
      console.log(action.payload, "power");
      state.filters.power = action.payload;
    },
    setColor: (state, action) => {
      console.log(action.payload, "color");
      state.filters.color = action.payload;
    },

    setSolution: (state, action) => {
      console.log(action.payload, "solution");
      state.filters.solution = action.payload;
        
    },
    setSortBy: (state, action) => {
      console.log(action.payload, "sortBy");
      state.sortBy = action.payload;
    },
    setCurrentPage: (state, action) => {
      console.log(action.payload, "currentPage");
      state.currentPage = action.payload;

    },
    resetFilters: (state) => {
      return initialState;
    }
  }
});

export const {
  setSelectedCategory,
  setSelectedType,
  setSelectedSubCategory,
  setFrameType,
  setFilter,
  setPriceRange,
  setDisposability,
  setPower,
  setColor,
  setSolution,
  setSortBy,
  setCurrentPage,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;