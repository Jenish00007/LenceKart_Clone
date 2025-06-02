import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST, RESET } from "./wishlist.types";

const wishlistInitalState = {
  loading: false,
  error: false,
  wishlist: []
};

export const wishlistReducer = (state = wishlistInitalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_WISHLIST: {
      const { wishlist } = state;
      const product = payload;
      
      // Check if product already exists in wishlist
      const exists = wishlist.some(item => item._id === product._id);
      if (exists) {
        return state;
      }

      return {
        ...state,
        wishlist: [...wishlist, product]
      };
    }
    case REMOVE_FROM_WISHLIST: {
      return {
        ...state,
        wishlist: state.wishlist.filter((item) => item._id !== payload)
      };
    }
    case RESET: {
      return {
        ...state,
        wishlist: []
      };
    }
    default: {
      return state;
    }
  }
};
