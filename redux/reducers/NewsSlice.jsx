import { createSlice } from "@reduxjs/toolkit";
import { deleteNewsThunk, fetchNewsThunk } from "../thunks/NewsThunk";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsList: [],
    loading: false,
    error: null,
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.newsList = action.payload;
      })
      .addCase(fetchNewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch orders";
      })
      .addCase(deleteNewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.newsList = state.newsList.filter(
          (news) => news.id !== action.payload
        );
      })
      .addCase(deleteNewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete fish package";
      });
  },
});

export default newsSlice.reducer;
export const selectNewsList = (state) => state.news.newsList;
