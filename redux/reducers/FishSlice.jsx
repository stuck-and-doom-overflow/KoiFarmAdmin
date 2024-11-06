import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteFishThunk,
  fetchFishesThunk,
  updateFishThunk,
} from "../thunks/FishThunk";

const fishSlice = createSlice({
  name: "fish",
  initialState: {
    fishes: [],
    loading: false,
    error: null,
    fishList: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFishesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFishesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.fishes = action.payload;
      })
      .addCase(fetchFishesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch fishes";
      })
      .addCase(deleteFishThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFishThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (Array.isArray(state.fishes)) {
          state.fishes = state.fishes.filter(
            (fish) => fish.id !== action.payload
          );
        }
      })
      .addCase(deleteFishThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete fish";
      })
      .addCase(updateFishThunk.fulfilled, (state, action) => {
        const index = state.fishList.findIndex(
          (fish) => fish.id === action.payload.id
        );
        if (index !== -1) state.fishList[index] = action.payload;
      });
  },
});

export default fishSlice.reducer;
export const fishList = (state) => state.fish.fishes;
