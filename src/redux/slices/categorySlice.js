import { createSlice } from "@reduxjs/toolkit";

// Define a Redux slice for category state
const categorySlice = createSlice({
  name: "category",  // Slice name
  initialState: {
    category: null,  // Initial state with a 'category' property
  },
  reducers: {
    // Reducer function to set the 'category' property
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

// Export the reducer function
export default categorySlice.reducer

// Export the 'setCategory' action for use in components
export const { setCategory } = categorySlice.actions