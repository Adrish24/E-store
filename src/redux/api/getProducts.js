import { createAsyncThunk } from "@reduxjs/toolkit";
import fetch from "../../lib/fetch";

// fetching products

const getProducts = createAsyncThunk("api/products", async ({ category }) => {
  try {
    if (category) {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      return response.products;
    } else {
      const response = await fetch(`https://dummyjson.com/products/`);
      return response.products;
    }
  } catch (error) {
    console.log(error.message);
  }
});

export default getProducts;
