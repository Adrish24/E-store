import { createSlice } from "@reduxjs/toolkit";

// Create a Redux slice for managing page refresh-related state and fetch data using the states
const pageRefreshSlice = createSlice({
  name: "page-refresh",
  initialState: {
    productCategory: '',
    singleProductId: '',
  },
  reducers: {
    // Reducer for setting the selected product category
    setProductCategory: (state, action) => {
      state.productCategory = action.payload;
    },
    // Reducer for setting the selected single product's ID
    setSingleProductId: (state, action) => {
      state.singleProductId = action.payload;
    }
  },
});

// Export the reducer function for use in the Redux store
export default pageRefreshSlice.reducer;

// Export the action creators for setting product category and single product ID
export const { setProductCategory, setSingleProductId } = pageRefreshSlice.actions;
