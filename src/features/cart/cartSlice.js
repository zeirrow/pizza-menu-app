import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  const storedCart = sessionStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
  cart: loadCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cart.find(
        (item) => item.pizzaId === action.payload.pizzaId,
      );

      if (!existingItem) {
        state.cart.push(action.payload);
        sessionStorage.setItem("cart", JSON.stringify(state.cart)); // Save cart
      }
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
      sessionStorage.setItem("cart", JSON.stringify(state.cart)); // Update cart
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (item) {
        if (item.quantity === 1) {
          cartSlice.caseReducers.removeFromCart(state, action)
        } else {
          item.quantity--;
          item.totalPrice = item.quantity * item.unitPrice;
        }
      }
    },
    clearCart(state) {
      state.cart = [];
      sessionStorage.removeItem("cart"); // Remove cart when purchase is finalized
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCartItems = (store) => store.cart.cart;

export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

// if item is in the cart or not
export const getCurrentQuantityById = (id) => (store) =>
  store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
