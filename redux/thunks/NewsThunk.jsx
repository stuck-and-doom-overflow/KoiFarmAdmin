import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNewsThunk = createAsyncThunk(
  "news/fetchNews",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://192.168.1.14:5000/api/news");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response || "Failed to fetch fetchNews"
      );
    }
  }
);

export const deleteNewsThunk = createAsyncThunk(
  "news/deleteNews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://192.168.1.14:5000/api/news/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting news:", error);
      return rejectWithValue(error.response?.data || "Could not delete news.");
    }
  }
);

export const addNewsThunk = createAsyncThunk(
  "news/addNews",
  async ({ title, content, imageUrl }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://192.168.1.14:5000/api/news", {
        title,
        content,
        imageUrl,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add news");
    }
  }
);

export const editNewsThunk = createAsyncThunk(
  "news/editNews",
  async ({ id, title, content, imageUrl }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://192.168.1.14:5000/api/news/${id}`,
        {
          title,
          content,
          imageUrl,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to update news");
    }
  }
);
