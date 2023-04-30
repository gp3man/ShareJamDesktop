import logger from 'redux-logger';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import MeReducer from './features/MeSlice'
import PlaylistReducer from './features/PlaylistSlice';
const store = configureStore({
  reducer:{
    Me:MeReducer,
    Playlist:PlaylistReducer,
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});
export default store;
