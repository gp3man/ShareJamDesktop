import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, selectMe } from "../features/MeSlice";
const UserProfile = () =>{

  useEffect(()=>{
    dispatch(fetchMe)
  },[dispatch])

  const User = useSelector(selectMe)
  const dispatch = useDispatch()
  const CLIENT_ID='79240ee4dc9a4ec6a3fc193a9d86674c'
  const REDIRECT_URI= 'http://localhost:3000'
  const AUTH_ENDPOINT= 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE= 'token'
  const [token, setToken] = useState('')

  const [searchKey, setSearchKey] = useState('')
  useEffect(()=>{
  const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if(!token && hash){
      token = hash.substring(1).split('&').find(ele => ele.startsWith('access_token')).split('=')[1]//magic
      window.location.hash = ''//gets rid of random chars in url
      window.localStorage.setItem('token', token)
    }
    setToken(token)
    console.log(User)
  },[])

      //removes token to log out
  const Logout=()=>{
      setToken('')
      window.localStorage.removeItem('token')
  }

//Tool to search artist
const [artists, setArtists] = useState([])
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

  console.log(data)
  setArtists(data.artists.items)

}
const renderUser=()=>{
  return <div className="userProfileMain">

  </div>
}
const renderArtist=()=>{
  return artists.map(artist=>(
    <div key={artist.id}>
      {artist.images.length ? <img  src={artist.images[0].url} alt=""/>:<div>No Face no case</div>}
      {artist.name}
    </div>
  ))

}
dispatch(fetchMe)
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

    </div>
  )
}
export default UserProfile;
