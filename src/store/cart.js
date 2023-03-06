import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    notification: "",
    cartId: null,
  },
  reducers: {
    addItemsToCart: (state, action) => {
      state.items = state.items.map((item) => {
        // if (action.payload.items.has(item.id)) {
        //   return { ...item, inCart: true };
        // }
        return item;
      });
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setNotification: (state, action) => {
      state.notification = action.payload;
    },
    clearNotification: (state) => {
      state.notification = null;
    },
  },
});

export const { addItemsToCart, setItems, clearNotification, setNotification } =
  cartSlice.actions;

export default cartSlice.reducer;
