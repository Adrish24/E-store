import { createSlice } from "@reduxjs/toolkit";
import getSingleProduct from "../api/getSingleProduct"; // Assuming you have an API function for fetching a single product

const singleProductSlice = createSlice({
  name: "single_product", // Name of the slice
  initialState: {
    singleProductData: null, // To store data of a single product
    status: "idle", // Initial status: idle
    error: null, // Initial error value is null
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSingleProduct.pending, (state) => {
        // When the data fetching is pending, set the status to "loading"
        state.status = "loading";
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        // When the data fetching is successful, set the status to "success"
        state.status = "success";
        // Store the fetched single product data
        state.singleProductData = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        // When the data fetching is rejected (failed), set the status to "failed"
        state.status = "failed";
        // Store the error message in the error field
        state.error = action.error.message;
      });
  },
});

export default singleProductSlice.reducer;
