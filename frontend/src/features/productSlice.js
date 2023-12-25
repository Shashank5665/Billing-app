import { api } from "../api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await api.get("/products");
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Async Thunk for adding products
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (addedProduct) => {
    try {
      console.log("newProduct-->", addedProduct);
      const response = await api.post("/products", addedProduct);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Async Thunk for updating products
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (updatedProduct) => {
    try {
      const { id } = updatedProduct;
      const { name, price, gst } = updatedProduct;
      const payload = { name, price, gst };

      const response = await api.patch(`/products/${id}`, payload);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Async Thunk for deleting products
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    search: "",
    loading: false,
    error: null,
  },
  reducers: {
    searchProduct: (state, action) => {
      state.search = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { _id, name, price, gst } = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === _id
        );
        state.products[index] = { _id, name, price, gst };
        state.loading = false;
      })

      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const { _id } = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === _id
        );
        state.products.splice(index, 1);
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { searchProduct } = productSlice.actions;
export default productSlice.reducer;
