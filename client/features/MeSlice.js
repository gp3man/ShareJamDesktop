import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMe = createAsyncThunk('fetch/Me', async(token)=>{
  const {data} = await axios.get('https://api.spotify.com/v1/me',{
  headers:{
    Authorization: `Bearer ${token}`,
  },
})
  return data
})
export const fetchMePlaylists = createAsyncThunk('fetch/MePlaylist', async(token)=>{
  const {data} = await axios.get('https://api.spotify.com/v1/me/playlists',{
  headers:{
    Authorization: `Bearer ${token}`,
  },
})
  return data.items
})

const MeSlice = createSlice({
  name: 'Me',
  initialState:{
    info:{},
    allMePlaylist:[],
    error:null,
  },
  reducers:{},
  extraReducers: (builder)=>{
    builder.addCase(fetchMe.fulfilled, (state, action)=>{
      state.info = action.payload
    });
    builder.addCase(fetchMe.rejected, (state, action)=>{
      state.error = action.error
    });
    builder.addCase(fetchMePlaylists.fulfilled, (state, action)=>{
      state.allMePlaylist = action.payload
    });
    builder.addCase(fetchMePlaylists.rejected, (state, action)=>{
      state.error = action.error
    });
  }
})

export const selectMe = (state)=>{
  return state.Me.info;
}
export const selectMePlaylist = (state)=>{
  return state.Me.allMePlaylist;
}

export default MeSlice.reducer
