import { createSlice } from "@reduxjs/toolkit";
import getCategories from "../api/getCategories";

// Define a Redux slice for categories state
const categoriesSlice = createSlice({
  name: "categories",  // Slice name
  initialState: {
    data: [],         // An array to store categories data
    status: "idle",   // Status to track the state of the request
    error: null,      // Error message, if any
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        // Handle the pending action - state transitions to "loading"
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        // Handle the fulfilled action - state transitions to "success" and set categories data
        state.status = "success";
        state.data = action.payload; // Setting categories data
      })
      .addCase(getCategories.rejected, (state, action) => {
        // Handle the rejected action - state transitions to "failed" and stores the error message
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the reducer function
export default categoriesSlice.reducer;
