import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMyPlaylist = createAsyncThunk('fetch/myPlaylist', async(obj)=>{
  const {token, Playlist} = obj
  const {data}= await axios.get(`https://api.spotify.com/v1/playlists/${Playlist.id}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return data
})
export const AddMyPlaylist = createAsyncThunk('post/myPlaylist', async(obj)=>{
  const {token, myPlaylist, uris} = obj
   await axios.post(`https://api.spotify.com/v1/playlists/${myPlaylist.id}/tracks`,{
    headers:{
      Authorization: `Bearer ${token}`
    },
    data:{
      uris
    },
  })
  return data
})
export const fetchYoPlaylist = createAsyncThunk('fetch/yoPlaylist', async(obj)=>{
  const {token, Playlist} = obj
  const {data}= await axios.get(`https://api.spotify.com/v1/playlists/${Playlist.id}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return data
})
export const fetchPlaylistTracks = createAsyncThunk('fetch/ListTracks', async(obj)=>{
  const {token, YoPlaylist} = obj
  const {data}= await axios.get(`https://api.spotify.com/v1/playlists/${YoPlaylist.id}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
  return data
})

const SinglePlaylistSlice = createSlice({
  name: 'SinglePlaylist',
  initialState:{
    MyList:{},
    YoList:{},
    YoTracks:[],
    error:null,
  },
  reducers:{},
  extraReducers: (builder)=>{
    builder.addCase(fetchMyPlaylist.fulfilled, (state, action)=>{
      state.MyList = action.payload
    });
    builder.addCase(fetchMyPlaylist.rejected, (state, action)=>{
      state.error = action.error
    });
    builder.addCase(fetchYoPlaylist.fulfilled, (state, action)=>{
      state.YoList = action.payload
    });
    builder.addCase(fetchYoPlaylist.rejected, (state, action)=>{
      state.error = action.error
    });
    builder.addCase(fetchPlaylistTracks.fulfilled, (state, action)=>{
      state.YoTracks = action.payload
    });
    builder.addCase(fetchPlaylistTracks.rejected, (state, action)=>{
      state.error = action.error
    });
  }
})

export const selectMyPlaylist = (state)=>{
  return state.MyList;
}
export const selectYoPlaylist = (state)=>{
  return state.YoList;
}
export const selectYoTracks = (state)=>{
  return state.Yotracks;
}

export default SinglePlaylistSlice.reducer
