import React from "react";
import { useSelector } from "react-redux";
import { fetchPlaylistTracks, fetchYoPlaylist } from "../features/SinglePlaylistSlice";
const SyncPlaylist =({xtoken, xPlaylist})=>{
const token = xtoken
const Playlist = xPlaylist
fetchYoPlaylist({token, Playlist})
const YoPlaylist = useSelector((state)=> state.SinglePlaylist.YoPlaylist)
fetchPlaylistTracks({token, Playlist})
const MyList = useSelector((state)=> state.Me.allMePlaylist)
const YoTracks = useSelector((state)=> state.SinglePlaylist.YoTracks)
const uris = [];
  return(
  <div className="TheirPlaylist">
    {MyList ?
    <ul>{console.log(YoPlaylist)}
      <img id="playlistImg" width='25vw' height='25vh' src={YoPlaylist.images[0]}/>
      <h1>{YoPlaylist.name}, </h1><small> has {YoPlaylist.tracks.length} track(s)</small>
      {YoTracks? YoTracks.map((track)=>{
        return<li key={track.id}>{uris.push(track.uri)}
          <h3>{track.track.name}</h3>
          <img id="trackImg" width='30px' height='40px' src={track.track.images[0]} />
          <h4>{track.track.artists.map((artist)=>{<h5>{artist}</h5>})}</h4>
          <h4>{track.track.genres.map((genre)=>{<h5>{genre}</h5>})}</h4>
        </li>
      }):null}

    <button onClick={console.log(uris)}>Print Uris</button>
    </ul>
    : <h1>Whoa You Need To Choose A Playlist Of Your Own first!</h1>} </div>

  )
}
export default SyncPlaylist;
