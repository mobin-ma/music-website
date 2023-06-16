import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  songs: [],
  isLoading: false,
  error: null,
  isPlaying: false,
  currentTrack: null,
  audioPlayerRef: {},
  isVolume: 0.5,
};

export const songList = createAsyncThunk("fetch/songs", async (access) => {
  const axiosInstance = axios.create();
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  const response = await axiosInstance.get(
    "https://spotify.amirja.ir/api/music/all-musics/",
  );
  return response.data;
});

const songsListSlice = createSlice({
  name: "songsList",
  initialState,
  reducers: {
    play: (state) => {
      state.isPlaying  = true;
    },
    pause: (state) => {
      state.isPlaying  = false;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setVolume: (state, action) => {
      state.isVolume = action.payload;
    },
    setAudioPlayerRef: (state, action) => {
      state.audioPlayerRef = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(songList.pending, (state) => {
        state.isLoading = true;
        state.error = null
      })
      .addCase(songList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.songs = action.payload;
      })
      .addCase(songList.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});
export const { play, pause, setCurrentTrack, setAudioPlayerRef, setVolume } = songsListSlice.actions
export default songsListSlice.reducer;
