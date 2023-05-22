import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, fetchMePlaylists, selectMe } from "../features/MeSlice";
import { fetchPlaylist, fetchPlaylistTracks, selectPlaylist } from "../features/PlaylistSlice";
import { Link } from "react-router-dom";
import { fetchMyPlaylist } from "../features/SinglePlaylistSlice";
const UserProfile = () =>{
  const dispatch = useDispatch()
  const CLIENT_ID='79240ee4dc9a4ec6a3fc193a9d86674c'
  const REDIRECT_URI= 'http://localhost:3000'
  const AUTH_ENDPOINT= 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE= 'token'
  const User = useSelector(selectMe)
  const [token, setToken] = useState('')
  const [artists, setArtists] = useState([])
  const otherPlaylist= useSelector((state)=> state.Playlist.othersList.items)
  const MyList = useSelector((state)=> state.Me.allMePlaylist)
  const [searchKey, setSearchKey] = useState('')
  const [SearchUserId, setSearchUserID] = useState('')

  useEffect(()=>{
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if(!token && hash){
      token = hash.substring(1).split('&').find(ele => ele.startsWith('access_token')).split('=')[1]//magic
      window.location.hash = ''//gets rid of random chars in url
      window.localStorage.setItem('token', token)
      dispatch(fetchMe(token))
      dispatch(fetchMePlaylists(token))
    }
    setToken(token)
  },[])

      //removes token to log out
  const Logout=()=>{
      setToken('')
      window.localStorage.removeItem('token')
  }

//Tool to search artist
const searchArtist = async(e)=>{
  e.preventDefault()
  const {data}= await axios.get('https://api.spotify.com/v1/search',{
    headers:{
      Authorization: `Bearer ${token}`
    },
    params:{
      q: searchKey,
      type: 'artist'
    }
  })
  setArtists(data.artists.items)
}
const searchUser = (e)=>{
  e.preventDefault()
  dispatch(fetchPlaylist( {token, SearchUserId}))
}
const renderArtist=()=>{
  return artists.map(artist=>(
    <div id= 'renderedArtists'key={artist.id}>
      <h2>{artist.name}</h2>
      {artist.images.length ? <img width= '300px' height= '300px' src={artist.images[0].url} alt=""/>:<div width= '300px' height= '300px'>No Face no case</div>}

    </div>
  ))}
  const renderUserPlaylists=()=>{
    return  otherPlaylist.map(Playlist=>(
    <div id="renderedSearchPlaylist" key={Playlist.id}>
      <Link to={`/playlist/${Playlist.id}`}>
        {Playlist.images.length ? <img width= '150px' height= '150px' src={Playlist.images[0].url} alt=""/>:<div>No Image To Load</div>}
        <h2>{Playlist.name}</h2>
        <h4>Has {Playlist.tracks.total} track(s)</h4>
      </Link>
      </div>
    ))}
    const renderMyPlaylists=()=>{
    return  MyList.map(Playlist=>(
      <div  id='renderedMyPlaylists' key={Playlist.id}>
        {Playlist.images.length ? <img width= '150px' height= '150px' src={Playlist.images[0].url} alt=""/>:<div>No Image To Load</div>}
        <h2>{Playlist.name}</h2>
        <h4>Has {Playlist.tracks.total} track(s)</h4>
        <button onClick={()=>
           dispatch(fetchMyPlaylist({token, Playlist}))}>
          Make My List
      </button>
      </div>
    ))}






    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  return(
    <div className="UserProfile">
      <h1>ShareJams</h1>
      {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}> Login to spotify</a>: <button onClick={Logout}>LogOut</button>}
      {token?
      <form onSubmit={searchArtist}>
        <input type="text" onChange={e => setSearchKey(e.target.value)}/>
        <button type="submit">Search Stars</button>
      </form>
      :<h1>Login For some Magic!</h1>}

      {renderArtist()}

      {token?
      <div id="userMagic">
      <h1>Welcome, {User.display_name}</h1>
      {User.images ? <img src={User.images[0]}/> :null}
      <a>Find Yourself At: {User.href}</a>

      <div id="generate"> <h2>Click The Playlist You Want To Add Music To.</h2> <small>Heres Your Playlist Below:</small>
      { MyList ? renderMyPlaylists():null}</div>

      <div id="searchUserPlaylist">
        <form onSubmit={searchUser}>
          <input type="text" onChange={e => setSearchUserID(e.target.value)}/>
          <button type="submit">search Users</button>
        </form>
      {otherPlaylist ? renderUserPlaylists():null}
      </div>



      </div>
      :null}
    </div>
  )
}
export default UserProfile;
