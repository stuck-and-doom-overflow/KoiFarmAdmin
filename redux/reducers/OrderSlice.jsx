import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteFishThunk,
  fetchFishesThunk,
  updateFishThunk,
} from "../thunks/FishThunk";
import { fetchOrderThunk, updateOrderThunk } from "../thunks/OrderThunk";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderList: [],
    loading: false,
    error: null,
    fishList: [],
    status: null,
    selectedOrder: null,
  },
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload;
      })
      .addCase(fetchOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch orders";
      })
      .addCase(updateOrderThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateOrderThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
export const selectOrderList = (state) => state.order.orderList;
export const selectSelectedOrder = (state) => state.order.selectedOrder;
