import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Legacy states (still in use by components)
  selectedCategory: '', // men, women, kids
  productType: '', // EYEGLASSES, SUNGLASSES, COMPUTER_BLU_LENSES, ZERO_POWER_COMPUTER_BLU, CONTACT_LENSES
  selectedType: '', // eyeglasses, computerglasses, kidsglasses, contactlenses, sunglasses
  selectedCategoryType: '', // classic-eyeglasses, premium-eyeglasses, computer-eyeglasses
  selectedSubCategory: '', // from Our Top Picks
  powerType: '', // ZERO_POWER, SINGLE_VISION,BIFOCAL,PROGRESSIVE,READING,
  powerRange: '', // 0.00 to 10.00
  prescriptionType: '', //Bifocal/Progressive Supported", "Single Vision Only", "Non-Prescription
  supportedPowers: '', // "Supports All Powers", "Supports Very High Power", "Supports High Power", "Upto Regular Power
  shape: '', //"Round",Square,Rectangle,Aviator,Cat Eye,Oval,Geometric,Wayfarer,Clubmaster,Butterfly,Wrap,Sports
  
  // Legacy filters object
  filters: {
    disposability: '', // Monthly, Day & Night, Daily, Yearly, Bi-weekly
    power: '', // Spherical - CYL, Spherical + CYL, Cylindrical Power, Toric Power
    color: '', // Green, Blue, Brown, Turquoise
    solution: '', // Small, Large
    shape: '',
    collection: '',
  },

  // New schema-based states
  masterCategory: '', // Eyeglasses, Computer Glasses, Sunglasses, Kids Glasses, Contact Lenses
  personCategory: '', // Men, Women, Kids
  
  // Contact Lenses specific filters
  contactLensesDisposability: '', // Monthly, Day & Night, Daily, Yearly, Bi-weekly
  exploreByPower: '', // Spherical-CYL, Cylindrical Power, Toric Power
  lenseColor: '', // Green, Blue, Brown, Turquoise
  lenseSolutions: '', // Small, Large
  lenseCollections: '', // Glam Slam, Havana, Polarized, Power Sunglasses, Designer Sunglasses
  
  // Lens Features
  lensFeatures: [], // Array of features
  lensMaterial: '', // Silicone Hydrogel, Hydrogel, Gas Permeable, Hybrid, NOT_APPLICABLE
  
  // Frame Information
  frameTypes: '', // Rectangle Frames, Wayfarer Frames, etc.
  frameType: '', // Full Rim, Half Rim, Rimless
  shapes: '', // Round, Square, Rectangle, etc.
  frameSize: '', // Extra Narrow, Narrow, Medium, Wide, Extra Wide
  frameWidth: '', // 123mm to 150mm
  weightGroup: '', // Light, Average
  
  // Style and Aesthetics
  style: '', // Casual, Formal, Sports, etc.
  colors: [], // Array of colors
  frameColors: [], // Array of specific frame colors
  gender: '', // Men, Women, Unisex, Kids
  ageGroup: '', // Kids, Teens, Adults, Seniors
  
  // Price and Rating
  priceCategory: null, // 1199 to 5999
  rating: null, // 0 to 5
  priceRange: {
    min: 0,
    max: 10000,
  },
  
  // Marketing Filters
  trending: false,
  recommended: false,
  isNew: false,
  isBestSeller: false,
  
  // Pagination and Sorting
  sortBy: '',
  currentPage: 1,
  itemsPerPage: 50
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Legacy reducers
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload || '';
    },
    setProductType: (state, action) => {
      state.productType = action.payload || '';
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload || '';
    },
    setSelectedCategoryType: (state, action) => {
      state.selectedCategoryType = action.payload || '';
    },
    setSelectedSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload || '';
    },
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      if (filterType && filterType in state.filters) {
        state.filters[filterType] = value || '';
      }
    },
    setDisposability: (state, action) => {
      state.filters.disposability = action.payload || '';
    },
    setPower: (state, action) => {
      state.filters.power = action.payload || '';
    },
    setColor: (state, action) => {
      state.filters.color = action.payload || '';
    },
    setSolution: (state, action) => {
      state.filters.solution = action.payload || '';
    },

    // New schema-based reducers
    setMasterCategory: (state, action) => {
      state.masterCategory = action.payload || '';
    },
    setPersonCategory: (state, action) => {
      state.personCategory = action.payload || '';
    },
    setContactLensesDisposability: (state, action) => {
      state.contactLensesDisposability = action.payload || '';
    },
    setExploreByPower: (state, action) => {
      state.exploreByPower = action.payload || '';
    },
    setLenseColor: (state, action) => {
      state.lenseColor = action.payload || '';
    },
    setLenseSolutions: (state, action) => {
      state.lenseSolutions = action.payload || '';
    },
    setLenseCollections: (state, action) => {
      state.lenseCollections = action.payload || '';
    },
    setLensFeatures: (state, action) => {
      state.lensFeatures = action.payload || [];
    },
    setLensMaterial: (state, action) => {
      state.lensMaterial = action.payload || '';
    },
    setFrameTypes: (state, action) => {
      state.frameTypes = action.payload || '';
    },
    setFrameType: (state, action) => {
      state.frameType = action.payload || '';
    },
    setShapes: (state, action) => {
      state.shapes = action.payload || '';
    },
    setFrameSize: (state, action) => {
      state.frameSize = action.payload || '';
    },
    setFrameWidth: (state, action) => {
      state.frameWidth = action.payload || '';
    },
    setWeightGroup: (state, action) => {
      state.weightGroup = action.payload || '';
    },
    setStyle: (state, action) => {
      state.style = action.payload || '';
    },
    setColors: (state, action) => {
      state.colors = action.payload || [];
    },
    setFrameColors: (state, action) => {
      state.frameColors = action.payload || [];
    },
    setGender: (state, action) => {
      state.gender = action.payload || '';
    },
    setAgeGroup: (state, action) => {
      state.ageGroup = action.payload || '';
    },
    setPriceCategory: (state, action) => {
      state.priceCategory = action.payload || null;
    },
    setRating: (state, action) => {
      state.rating = action.payload || null;
    },
    setPriceRange: (state, action) => {
      const { min = 0, max = 10000 } = action.payload || {};
      state.priceRange = { 
        min: Number(min) || 0,
        max: Number(max) || 10000
      };
    },
    setTrending: (state, action) => {
      state.trending = action.payload || false;
    },
    setRecommended: (state, action) => {
      state.recommended = action.payload || false;
    },
    setIsNew: (state, action) => {
      state.isNew = action.payload || false;
    },
    setIsBestSeller: (state, action) => {
      state.isBestSeller = action.payload || false;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload || '';
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload || 1;
    },
    resetFilters: (state) => {
      return initialState;
    }
  }
});

export const {
  // Legacy exports
  setSelectedCategory,
  setProductType,
  setSelectedType,
  setSelectedCategoryType,
  setSelectedSubCategory,
  setFilter,
  setDisposability,
  setPower,
  setColor,
  setSolution,
  
  // New schema-based exports
  setMasterCategory,
  setPersonCategory,
  setContactLensesDisposability,
  setExploreByPower,
  setLenseColor,
  setLenseSolutions,
  setLenseCollections,
  setLensFeatures,
  setLensMaterial,
  setFrameTypes,
  setFrameType,
  setShapes,
  setFrameSize,
  setFrameWidth,
  setWeightGroup,
  setStyle,
  setColors,
  setFrameColors,
  setGender,
  setAgeGroup,
  setPriceCategory,
  setRating,
  setPriceRange,
  setTrending,
  setRecommended,
  setIsNew,
  setIsBestSeller,
  setSortBy,
  setCurrentPage,
  resetFilters
} = filterSlice.actions;

export default filterSlice.reducer;