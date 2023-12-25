import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// API CALL
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:5000/products");
    const data = await response.data;
    return data;
  }
);

// PRODUCT SLICE
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// SELECTORS
export const selectProducts = (state) => state.product.products;

// EXPORTS
export default productSlice.reducer;
