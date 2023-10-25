import { createSlice } from "@reduxjs/toolkit";
import getProducts from "../api/getProducts"; // Assuming you have an API function for fetching products

const productsSlice = createSlice({
  name: "products", // Name of the slice
  initialState: {
    productsData: [], // An array to store product data
    status: "idle", // Initial status: idle
    error: null, // Initial error value is null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        // When the data fetching is pending, set the status to "loading"
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        // When the data fetching is successful, set the status to "success"
        state.status = "success";
        // Store the fetched products in the productsData array
        state.productsData = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        // When the data fetching is rejected (failed), set the status to "failed"
        state.status = "failed";
        // Store the error message in the error field
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
