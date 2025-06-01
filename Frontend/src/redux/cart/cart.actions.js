import {
  CART_LOADING,
  CART_ERROR,
  GET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  CLEAR_CART,
  APPLY_COUPON
} from './cart.reducer';
import { API_URL } from '../../config';

// Get Cart Items
export const getCart = () => async (dispatch) => {
  try {
    dispatch({ type: CART_LOADING });
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/cart`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch cart items');
    }

    dispatch({ type: GET_CART, payload: data.cart || [] });
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    throw error;
  }
};

// Add to Cart
export const addToCart = (product) => async (dispatch) => {
  try {
    dispatch({ type: CART_LOADING });
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    // Check if the product is already a cartItem or needs to be converted
    const cartItem = product.productId ? product : {
      productId: product._id,
      quantity: 1,
      price: product.price,
      name: product.name,
      image: product.imageTsrc,
      productType: product.productType,
      shape: product.shape,
      gender: product.gender,
      style: product.style
    };

    console.log('Adding to cart:', cartItem); // Debug log

    const response = await fetch(`${API_URL}/cart`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cartItem)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to add item to cart');
    }

    // Update local storage
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = currentCart.find(item => item._id === (product._id || product.productId));

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(currentCart));

    dispatch({ type: ADD_TO_CART, payload: data.cartItem });
    return data;
  } catch (error) {
    console.error('Add to cart error:', error); // Debug log
    dispatch({ type: CART_ERROR, payload: error.message });
    throw error;
  }
};

// Remove from Cart
export const removeFromCart = (productId) => async (dispatch) => {
  try {
    dispatch({ type: CART_LOADING });
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    // First try to remove from API
    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to remove item from cart');
    }

    // Update local storage - check both _id and productId
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = currentCart.filter(item => 
      item._id !== productId && item.productId !== productId
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Dispatch success action
    dispatch({ type: REMOVE_FROM_CART, payload: productId });
    return data;
  } catch (error) {
    console.error('Remove from cart error:', error);
    dispatch({ type: CART_ERROR, payload: error.message });
    // Even if API call fails, try to remove from local storage
    try {
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = currentCart.filter(item => 
        item._id !== productId && item.productId !== productId
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      dispatch({ type: REMOVE_FROM_CART, payload: productId });
    } catch (localError) {
      console.error('Local storage update error:', localError);
    }
    throw error;
  }
};

// Update Cart Item
export const updateCartItem = (productId, quantity) => async (dispatch) => {
  try {
    dispatch({ type: CART_LOADING });
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/cart/${productId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to update cart item');
    }

    // Update local storage
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = currentCart.map(item =>
      item._id === productId ? { ...item, quantity } : item
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    dispatch({ type: UPDATE_CART_ITEM, payload: data.cartItem });
    return data;
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    throw error;
  }
};

// Clear Cart
export const clearCart = () => async (dispatch) => {
  try {
    dispatch({ type: CART_LOADING });
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/cart`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to clear cart');
    }

    // Clear local storage
    localStorage.removeItem('cart');

    dispatch({ type: CLEAR_CART });
    return data;
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    throw error;
  }
};

// Apply Coupon
export const applyCoupon = (couponCode) => async (dispatch) => {
  try {
    dispatch({ type: CART_LOADING });
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(`${API_URL}/cart/coupon`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ couponCode })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to apply coupon');
    }

    dispatch({ type: APPLY_COUPON, payload: data.discount });
    return data;
  } catch (error) {
    dispatch({ type: CART_ERROR, payload: error.message });
    throw error;
  }
}; 