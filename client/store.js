import logger from 'redux-logger';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import MeReducer from './features/MeSlice'
import PlaylistReducer from './features/PlaylistSlice';
import SinglePlaylistReducer from './features/SinglePlaylistSlice';

const store = configureStore({
  reducer:{
    Me:MeReducer,
    Playlist:PlaylistReducer,
    SinglePlaylist:SinglePlaylistReducer,
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});
export default store;
