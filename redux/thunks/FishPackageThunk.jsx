import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/api";

export const fetchFishPackageThunk = createAsyncThunk(
  "fishPackage/fetchFishPackage",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://192.168.1.14:5000/api/fish-packages"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response || "Failed to fetch fishPackage"
      );
    }
  }
);

export const addFishPackageThunk = createAsyncThunk(
  "fishPackage/addFishPackage",
  async ({ description, fishIds }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.1.14:5000/api/fish-packages",
        { description, fishIds }
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data || error.message || "Failed to add fish package";
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteFishPackageThunk = createAsyncThunk(
  "fishPackage/deleteFishPackage",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`http://192.168.1.14:5000/api/fish-packages/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting fishPackage:", error);
      return rejectWithValue(
        error.response?.data || "Could not delete package."
      );
    }
  }
);
