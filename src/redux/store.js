import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/authSlice";
import songsListReducer from "./features/songsListSlice";
import albumsReducer from "./features/albumsSlice";
import artistsReducer from "./features/artistsSlice";
import playlistReducer from "./features/playlistSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  songsList: songsListReducer,
  albums: albumsReducer,
  artists: artistsReducer,
  playlists: playlistReducer
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
