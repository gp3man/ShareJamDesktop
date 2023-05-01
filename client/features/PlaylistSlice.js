import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlaylist = createAsyncThunk('fetch/othersList', async(obj)=>{
  const {token, SearchUserId} = obj
  console.log(SearchUserId)
  console.log(token)
  const {data}= await axios.get(`https://api.spotify.com/v1/users/${SearchUserId}/playlists`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return data
})


const PlaylistSlice = createSlice({
  name: 'Playlist',
  initialState:{
    othersList:{},
    error:null,
  },
  reducers:{},
  extraReducers: (builder)=>{
    builder.addCase(fetchPlaylist.fulfilled, (state, action)=>{
      state.othersList = action.payload
    });
    builder.addCase(fetchPlaylist.rejected, (state, action)=>{
      state.error = action.error
    });
  }
})

export const selectPlaylist = (state)=>{
  return state.Playlist;
}

export default PlaylistSlice.reducer
