import { api } from "../api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk for fetching cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    try {
      const response = await api.get("/cartItems");
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

// Async Thunk for adding cart item
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (payload) => {
    try {
      const response = await api.post("/cartItems", payload);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Async Thunk for updating cart item
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async (updatedCartItem) => {
    try {
      const { id } = updatedCartItem;
      const { quantity } = updatedCartItem;
      const payload = { id, quantity };
      const response = await api.patch(`/cartItems`, payload);
      const data = await response.data;
      console.log("updated data --> ", data);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

// Async Thunk for deleting cart item
export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItem",
  async (id) => {
    try {
      const response = await api.delete(`/cartItems/${id}`);
      const data = await response.data;
      return data;
    } catch (error) {
      console.log(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    quantity: 0,
    count: 0,
    totalAmount: 0,
    gst: 0,
    billAmount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    increment: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      state.cartItems[index].quantity += 1;
    },

    decrement: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      state.cartItems[index].quantity -= 1;
    },

    calculateNumbers: (state, action) => {
      let count = 0;
      let totalAmount = 0;
      let gst = 0;
      let billAmount = 0;
      state.cartItems.forEach((item) => {
        count += item.quantity;
        totalAmount += item.product.price * item.quantity;
        gst += (item.product.gst * item.product.price * item.quantity) / 100;
        billAmount +=
          item.product.price * item.quantity +
          (item.product.gst * item.product.price * item.quantity) / 100;
      });
      state.count = count;
      state.totalAmount = totalAmount.toFixed(2);
      state.gst = gst.toFixed(2);
      state.billAmount = billAmount.toFixed(2);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.cartItems.push(action.payload);
        state.loading = false;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        // const index = state.cartItems.find(
        //   (item) => item._id === action.payload._id
        // );
        // state.cartItems[index].quantity = action.payload.quantity;
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteCartItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        const { _id } = action.payload;
        const index = state.cartItems.findIndex((item) => item._id === _id);
        state.cartItems.splice(index, 1);
        state.loading = false;
      })
      .addCase(deleteCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { calculateNumbers } = cartSlice.actions;
export default cartSlice.reducer;
