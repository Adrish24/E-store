import { createAsyncThunk } from "@reduxjs/toolkit";
import fetch from "../../lib/fetch";

// fetching a singleProduct using id of a selected product
const getSingleProduct = createAsyncThunk(
  "api/single_product",
  async ({ id }) => {
    try {
      if (id) {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        return response;
      }else{
        const response = "No product selected"
        return response
      }
    } catch (error) {
      console.log(error.message);
    }
  }
);

export default getSingleProduct;
