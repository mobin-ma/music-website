import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const artistsList = createAsyncThunk(
  "fetch/artistsList",
  async () => {
    const response = await axios.post(
      "https://spotify.amirja.ir/api/users/artists/",
    );
    return response.data;
  }
);

const initialState = {
  artists: false,
  isLoading: false,
  error: null,
};

const artistsSlice = createSlice({
  name: 'artists', 
  initialState,
  reducers: {},
  extraReducers: (builder) => { 
    builder
      .addCase(artistsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(artistsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.artists = action.payload;
      })
      .addCase(artistsList.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export default artistsSlice.reducer;