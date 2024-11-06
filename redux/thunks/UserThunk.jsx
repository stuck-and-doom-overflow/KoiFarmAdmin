import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    try {
      const response = await axios.post(
        "http://192.168.1.14:5000/api/auth/login",
        userCredentials
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.1.14:5000/api/auth/sign-up",
        userData
      );
      const responseData = response.data;
      localStorage.setItem("user", JSON.stringify(responseData));
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "Registration failed"
        );
      }
      return rejectWithValue(error.message || "Registration failed");
    }
  }
);

export const fetchUserThunk = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://192.168.1.14:5000/api/user");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response || "Failed to fetch users"
      );
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://192.168.1.14:5000/api/user/${id}`
      );
      if (response.status === 200) {
        return id;
      } else {
        return thunkAPI.rejectWithValue("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error deleting user"
      );
    }
  }
);
