import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUserThunk, loginUser, registerUser } from "../thunks/UserThunk";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    status: "idle",
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error =
          action.error.message ||
          "An error occurred while logging in. Please try again.";
      })
      .addCase(registerUser.pending, (state) => {
        state.registrationLoading = true;
        state.registrationError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registrationLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registrationLoading = false;
        state.registrationError = action.payload || "Registration failed.";
      })
      .addCase(fetchUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch fishes";
      });
  },
});

export default userSlice.reducer;
export const selectUserList = (state) => state.user.userList;
