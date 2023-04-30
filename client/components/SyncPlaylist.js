import React from "react";
import { NavLink } from "react-router-dom";
import { fetchPlaylistTracks } from "../features/PlaylistSlice";
const SyncPlaylist =(id)=>{
  const token = window.localStorage.getItem('token')
  // dispatch(fetchPlaylistTracks( ))
  return(
    <div className="Tracks">
      <ul>
        
      </ul>
    </div>
  )
}
export default SyncPlaylist;
