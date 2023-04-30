import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMe = createAsyncThunk('fetch/Me', async()=>{
  let token= window.localStorage.getItem('token')
  const {data} = await axios.get('https://api.spotify.com/v1/me',{
  headers:{
    Authorization: `Bearer ${token}`,
  },
})
  return data
})

const MeSlice = createSlice({
  name: 'Me',
  initialState:{
    info:{},
    error:{},
  },
  reducers:{},
  extraReducers: (builder)=>{
    builder.addCase(fetchMe.fulfilled, (state, action)=>{
      state.info = action.payload
    });
    builder.addCase(fetchMe.rejected, (state, action)=>{
      state.error = action.error
    });
  }
})

export const selectMe = (state)=>{
  return state.Me.info;
}

export default MeSlice.reducer
