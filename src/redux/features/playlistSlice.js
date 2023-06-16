import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  playlists: [],
  playlistSongs: [],
  isLoading: false,
  error: null,
  openModalEdit: null,
  openModalAddMusic: null,
};

// Create Playlist
export const createPlaylist = createAsyncThunk(
  "fetch/createPlaylist",
  async (access) => {
    const axiosInstance = axios.create();
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    const response = await axiosInstance.post(
      "https://spotify.amirja.ir/api/playlist/create/"
    );
    return response.data;
  }
);

// Playlists
export const getPlaylist = createAsyncThunk(
  "fetch/getPlaylists",
  async (access) => {
    const axiosInstance = axios.create();
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    const response = await axiosInstance.get(
      "https://spotify.amirja.ir/api/playlist/all/"
    );
    return response.data;
  }
);

// Delete Playlist
export const deletePlaylist = createAsyncThunk(
  "fetch/deletePlaylist",
  async (playlistID, { dispatch, getState }) => {
    // set access token
    const access = getState().auth.tokens.access;
    const axiosInstance = axios.create();
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    const response = await axiosInstance.post(
      `https://spotify.amirja.ir/api/playlist/delete/${playlistID}/`
    );

    // updata playlist
    const state = getState();
    const updatedPlaylists = state.playlists.playlists.filter(
      (item) => item.id !== playlistID
    );
    dispatch(setPlaylists(updatedPlaylists));

    return response.data;
  }
);

// Edit Playlist
export const editPlaylist = createAsyncThunk(
  "fetch/editPlaylist",
  async ({ id, formData }, { dispatch, getState }) => {
    // set access token
    const access = getState().auth.tokens.access;
    const axiosInstance = axios.create();
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    const response = await axiosInstance.patch(
      `https://spotify.amirja.ir/api/playlist/update/${id}/`,
      formData
    );

    // updata playlist
    const state = getState();
    const playlists = state.playlists.playlists;
    const updatedPlaylists = playlists.map((playlist) => {
      if (playlist.id === id) {
        return response.data;
      } else {
        return playlist;
      }
    });

    dispatch(setPlaylists(updatedPlaylists));
    dispatch(setCloseModal()); // Optional: Close the modal after editing

    // // Remove the new playlist from the state if it exists
    // const newPlaylistId = response.data.id;
    // const isNewPlaylistAdded = playlists.some((playlist) => playlist.id === newPlaylistId);
    // if (isNewPlaylistAdded) {
    //   const filteredPlaylists = playlists.filter((playlist) => playlist.id !== newPlaylistId);
    //   dispatch(setPlaylists(filteredPlaylists));
    // }

    return response.data;
  }
);

// Add Music to Playlist
export const addMusiToPlaylist = createAsyncThunk(
  "fetch/addMusiToPlaylist",
  async (formData, { getState }) => {
    // set access token
    const access = getState().auth.tokens.access;
    const axiosInstance = axios.create();
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    const response = await axiosInstance.post(
      `https://spotify.amirja.ir/api/playlist/add/`,
      formData
    );
    return response.data;
  }
);

// Delete Music to Playlist
export const deleteMusiToPlaylist = createAsyncThunk(
  "fetch/deleteMusiToPlaylist",
  async (formData, { getState }) => {
    // set access token
    const access = getState().auth.tokens.access;
    const axiosInstance = axios.create();
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    const response = await axiosInstance.post(
      `https://spotify.amirja.ir/api/playlist/delete/`,
      formData
    );

    return response.data;
  }
);

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    setPlaylistSongsData: (state, action) => {
      state.playlistSongs = state.playlistSongs.concat(action.payload);
    },
    deletePlaylistSongsData: (state, action) => {
      state.playlistSongs = state.playlistSongs.filter(item => item.id !== action.payload);
    },
    setOpenModalEdit: (state, action) => {
      state.openModalEdit = action.payload;
    },
    setOpenModalAddMusic: (state, action) => {
      state.openModalAddMusic = action.payload;
    },
    setCloseModal: (state) => {
      state.openModalEdit = null;
      state.openModalAddMusic = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists.push(action.payload);
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getPlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.playlists = action.payload;
      })
      .addCase(getPlaylist.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deletePlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(deletePlaylist.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(editPlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(editPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.playlists.push(action.payload);
      })
      .addCase(editPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addMusiToPlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(addMusiToPlaylist.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addMusiToPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteMusiToPlaylist.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(deleteMusiToPlaylist.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteMusiToPlaylist.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });;
  },
});

export const {
  setPlaylists,
  setOpenModalEdit,
  setOpenModalAddMusic,
  setCloseModal,
  setPlaylistSongsData,
  deletePlaylistSongsData,
} = playlistSlice.actions;

export default playlistSlice.reducer;
