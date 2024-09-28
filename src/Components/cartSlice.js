import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  searchInput: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalAmount += newItem.price; // Update totalAmount when adding
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalAmount -= existingItem.price; // Update totalAmount when removing
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity, price } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        const priceDifference = price * (quantity - existingItem.quantity);
        existingItem.quantity = quantity;
        existingItem.totalPrice = price * quantity;
        state.totalAmount += priceDifference; // Update totalAmount accordingly
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  setSearchInput,
  updateItemQuantity, // Export the new action
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectSearchInput = (state) => state.cart.searchInput;
export default cartSlice.reducer;
