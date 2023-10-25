import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    updateCart: (state, action) => {
      state.cart = action.payload
    },
  },
});

export default cartSlice.reducer;
export const { updateCart } = cartSlice.actions;
