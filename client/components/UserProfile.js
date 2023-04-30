import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, selectMe } from "../features/MeSlice";
import { fetchPlaylist, fetchPlaylistTracks, selectPlaylist } from "../features/PlaylistSlice";
const UserProfile = () =>{
  const dispatch = useDispatch()
  const CLIENT_ID='79240ee4dc9a4ec6a3fc193a9d86674c'
  const REDIRECT_URI= 'http://localhost:3000'
  const AUTH_ENDPOINT= 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE= 'token'
  const User = useSelector(selectMe)
  const [token, setToken] = useState('')
  const [artists, setArtists] = useState([])
  // const [otherPlaylist, setOtherPlaylist]= useState([])
  const otherPlaylist= useSelector((state)=> state.Playlist.othersList.items)
  const [searchKey, setSearchKey] = useState('')
  const [searchUserKey, setSearchUserKey] = useState('')

  useEffect(()=>{
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if(!token && hash){
      token = hash.substring(1).split('&').find(ele => ele.startsWith('access_token')).split('=')[1]//magic
      window.location.hash = ''//gets rid of random chars in url
      window.localStorage.setItem('token', token)
      dispatch(fetchMe(token))
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
  dispatch(fetchPlaylist( token, searchUserKey))
}
const renderArtist=()=>{
  return artists.map(artist=>(
    <div key={artist.id}>
      <h2>{artist.name}</h2>
      {artist.images.length ? <img width= '300px' height= '300px' src={artist.images[0].url} alt=""/>:<div width= '300px' height= '300px'>No Face no case</div>}

    </div>
  ))}
  const renderUserPlaylists=()=>{

    return  otherPlaylist.map(Playlist=>(
      <div key={Playlist.id}>
        {Playlist.images.length ? <img width= '150px' height= '150px' src={Playlist.images[0].url} alt=""/>:<div>No Image To Load</div>}
        <h2>{Playlist.name}</h2>
        <h4>Has {Playlist.tracks.total} track(s)</h4>
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
        <button type="submit">search</button>
      </form>
      :<h1>Login For some Magic!</h1>}

      {renderArtist()}

      {token?
      <div id="userMagic">
      <h1>Welcome, {User.display_name}</h1>
      {User.images ? <img src={User.images[0]}/> :null}
      <a>Find Yourself At: {User.href}</a>

      <div id="searchUserPlaylist">
        <form onSubmit={searchUser}>
          <input type="text" onChange={e => setSearchUserKey(e.target.value)}/>
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
