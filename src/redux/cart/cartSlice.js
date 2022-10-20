import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: [],
  quantity: 0,
  sum: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const index = state.cart.findIndex(
        (itm) => itm._id === action.payload._id
      );
      if (index >= 0) {
        state.cart[index].cartQty += 1;

        toast.success(`${action.payload.name} added to your cart`);
      } else {
        const item = { ...action.payload, cartQty: 1 };
        state.cart.push(item);

        toast.success(`${action.payload.name} added to your cart`);
      }
    },
    removeFromCart(state, action) {
      const cartItems = state.cart.filter(
        (item) => item._id !== action.payload._id
      );
      state.cart = cartItems;

      toast.info(`${action.payload.name} removed from your cart`);
    },
    decreaseCartQty(state, action) {
      const index = state.cart.findIndex(
        (itm) => itm._id === action.payload._id
      );
      if (state.cart[index].cartQty > 1) {
        state.cart[index].cartQty -= 1;
      } else if (state.cart[index].cartQty === 1) {
        const cartItems = state.cart.filter(
          (item) => item._id !== action.payload._id
        );
        state.cart = cartItems;

        toast.info(`${action.payload.name} removed from your cart`);
      }
    },
    clearCart(state, action) {
      state.cart = [];

      toast.info("Cart cleared successfully!!!");
    },
    getCartQuantity(state, action) {
      state.quantity = state.cart
        .map(({ cartQty }) => cartQty)
        .reduce((sum, i) => sum + i, 0);
    },
    getCartSum(state, action) {
      state.sum = state.cart
        .map(({ cartQty, price }) => cartQty * price)
        .reduce((sum, i) => sum + i, 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCartQty,
  clearCart,
  getCartQuantity,
  getCartSum,
} = cartSlice.actions;
export default cartSlice.reducer;
