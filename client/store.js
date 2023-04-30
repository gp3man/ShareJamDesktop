import logger from 'redux-logger';
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import MeReduceer from './features/MeSlice'
const store = configureStore({
  reducer:{
    Me:MeReduceer,
  },
  middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});
export default store;
