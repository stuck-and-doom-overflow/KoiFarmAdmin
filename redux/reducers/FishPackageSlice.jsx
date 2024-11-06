import { createSlice } from "@reduxjs/toolkit";
import {
  addFishPackageThunk,
  deleteFishPackageThunk,
  fetchFishPackageThunk,
} from "../thunks/FishPackageThunk";

const fishPackageSlice = createSlice({
  name: "fishPackage",
  initialState: {
    loading: false,
    error: null,
    fishPackageList: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFishPackageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFishPackageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.fishPackageList = action.payload;
      })
      .addCase(fetchFishPackageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch fish packages";
      })
      .addCase(addFishPackageThunk.fulfilled, (state, action) => {
        state.fishPackageList.push(action.payload);
      })
      .addCase(deleteFishPackageThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.fishPackageList = state.fishPackageList.filter(
          (fishPackage) => fishPackage.id !== action.payload
        );
      })
      .addCase(deleteFishPackageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete fish package";
      });
  },
});

export default fishPackageSlice.reducer;
export const selectFishPackageList = (state) => state.fishPackage.fishPackageList;
