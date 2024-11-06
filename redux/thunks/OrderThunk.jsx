import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrderThunk = createAsyncThunk(
  "order/fetchOrder",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://192.168.1.14:5000/api/orders");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response || "Failed to fetch orders"
      );
    }
  }
);

export const updateOrderThunk = createAsyncThunk(
  "order/update",
  async ({ id, updatedOrder }) => {
    const response = await axios.put(
      `http://192.168.1.14:5000/api/orders/${id}`,
      updatedOrder
    );
    return response.data;
  }
);
