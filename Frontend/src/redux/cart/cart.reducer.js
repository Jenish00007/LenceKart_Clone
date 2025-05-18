import { API_URL } from '../../config';

// Action Types
export const CART_LOADING = 'CART_LOADING';
export const CART_ERROR = 'CART_ERROR';
export const GET_CART = 'GET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const CLEAR_CART = 'CLEAR_CART';
export const APPLY_COUPON = 'APPLY_COUPON';

// Initial State
const initialState = {
  loading: false,
  error: null,
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  coupon: 0
};

// Reducer
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CART_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_CART:
      return {
        ...state,
        loading: false,
        cart: action.payload,
        error: null
      };
    case ADD_TO_CART:
      const existingItem = state.cart.find(item => item._id === action.payload._id);
      const updatedCart = existingItem
        ? state.cart.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...action.payload, quantity: 1 }];
      
      return {
        ...state,
        loading: false,
        cart: updatedCart,
        error: null
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        loading: false,
        cart: state.cart.filter(item => item._id !== action.payload),
        error: null
      };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        loading: false,
        cart: state.cart.map(item =>
          item._id === action.payload._id ? action.payload : item
        ),
        error: null
      };
    case CLEAR_CART:
      return {
        ...state,
        loading: false,
        cart: [],
        error: null
      };
    case APPLY_COUPON:
      return {
        ...state,
        coupon: action.payload
      };
    default:
      return state;
  }
}; 