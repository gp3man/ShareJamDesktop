import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlaylist = createAsyncThunk('fetch/othersList', async(token, userID)=>{
  const {data}= await axios.get(`https://api.spotify.com/v1/users/${userID}/playlists`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return data
})
export const fetchPlaylistTracks = createAsyncThunk('fetch/ListTracks', async(href, token)=>{
  const {data}= await axios.get(`${href}`,{
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
    tracks:[],
    error:null,
  },
  reducers:{},
  extraReducers: (builder)=>{
    builder.addCase(fetchPlaylist.fulfilled, (state, action)=>{
      state.othersList = action.payload
    });
    // builder.addCase(fetchPlaylist.rejected, (state, action)=>{
    //   state.error = action.error
    // });
    // builder.addCase(fetchPlaylistTracks.fulfilled, (state, action)=>{
    //   state.tracks = action.payload
    // });
    // builder.addCase(fetchPlaylistTracks.rejected, (state, action)=>{
    //   state.error = action.error
    // });
  }
})

export const selectPlaylist = (state)=>{
  return state.Playlist;
}

export default PlaylistSlice.reducer
