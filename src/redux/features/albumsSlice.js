import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const albumsList = createAsyncThunk("fetch/albumsList", async (access) => {
  try {
    const axiosInstance = axios.create();
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    const response = await axiosInstance.get(
      "https://spotify.amirja.ir/api/music/albums/"
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

const initialState = {
  albums: false,
  isLoading: false,
  error: null,
};

const albumsSlice = createSlice({
  name: 'albums', 
  initialState,
  reducers: {},
  extraReducers: (builder) => { 
    builder
      .addCase(albumsList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(albumsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.albums = action.payload;
      })
      .addCase(albumsList.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export default albumsSlice.reducer;