import { createAsyncThunk } from "@reduxjs/toolkit";
import fetch from "../../lib/fetch";


// fetching categories 
const getCategories = createAsyncThunk("api/categories", async() => {
    try {
        const response = await fetch(`https://dummyjson.com/products/categories`);
        return response
      } catch (error) {
        console.log(error.message);
      }
})


export default getCategories;