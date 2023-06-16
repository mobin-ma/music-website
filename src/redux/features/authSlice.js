import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isAuthenticated: false,
  registered: false,
  isLoading: false,
  error: null,
  success: false,
  tokens: null,
};

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await axios.post(
      "https://spotify.amirja.ir/api/users/signup/",
      userData
    );
    return response.data;
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    const response = await axios.post(
      "https://spotify.amirja.ir/api/users/login/",
      userData
    );
    return response.data;
  }
);

// Update token
export const updateToken = createAsyncThunk(
  "auth/updateAccess",
  async (refresh) => {
    const response = await axios.post(
      "https://spotify.amirja.ir/get/token/refresh/",
      { refresh: refresh }  
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.tokens = null;
      state.isAuthenticated = false;
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.tokens = action.payload.tokens;
        state.user = action.meta;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registered = true;
        state.tokens = action.payload.tokens;
        state.user = action.meta;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.tokens.access = null;
      })
      .addCase(updateToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tokens.access = action.payload.access;
      })
      .addCase(updateToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
