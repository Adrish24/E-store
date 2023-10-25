import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./dataSlices/productsSlice";
import singleProductSlice from "./dataSlices/singleProductSlice";
import categoriesSlice from "./dataSlices/categoriesSlice";
import categorySlice from "./slices/categorySlice";
import pageRefreshSlice from "./slices/pageRefreshSlice";
import cartCounterSlice from "./slices/cartCounterSlice";
import cartSlice from "./slices/cartSlice";

// Configure and create the Redux store.
const store = configureStore({
  reducer: {
    products: productsSlice,         // Reducer for managing products data.
    singleProduct: singleProductSlice, // Reducer for managing a single product's data.
    categories: categoriesSlice,     // Reducer for managing categories data.
    category: categorySlice,         // Reducer for managing the selected category.
    refresher: pageRefreshSlice,     // Reducer for managing page refresh-related state.
    cartCount: cartCounterSlice,
    cart: cartSlice,
  }
});

export default store;
