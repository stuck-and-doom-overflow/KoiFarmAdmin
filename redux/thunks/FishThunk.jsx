import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFishesThunk = createAsyncThunk(
  "fish/fetchFishes",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://192.168.1.14:5000/api/fishs");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response || "Failed to fetch fishes"
      );
    }
  }
);

export const deleteFishThunk = createAsyncThunk(
  "fish/deleteFish",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://192.168.1.14:5000/api/fishs/${id}`
      );
      if (response.status === 200) {
        return id;
      } else {
        return thunkAPI.rejectWithValue("Failed to delete fish");
      }
    } catch (error) {
      console.error("Error deleting fish:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting fish"
      );
    }
  }
);

export const updateFishThunk = createAsyncThunk(
  "fish/updateFish",
  async ({ id, updatedFish }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://192.168.1.14:5000/api/fishs/${id}`,
        updatedFish
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error updating fish");
    }
  }
);

export const createFishThunk = createAsyncThunk(
  "fish/createFish",
  async (fishData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.1.14:5000/api/fishs",
        fishData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
