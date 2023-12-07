import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiFetch } from "../api/ApiFetch";



export const getAccessToken = createAsyncThunk(
  'get/token',
  async(_,{rejectWithValue})=>{
    const CLIENT_ID = '2b2212f7c19a4b9f89596487456eca6f';
    const CLIENT_SECRET = 'c6a03071c1994efe9b0733a4a08660a5';
  try {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };
    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      params,
    );
    const token = await response.json();
    localStorage.setItem('client_acs', token.access_token);
    return {token:token.access_token};
  } catch (error) {
    rejectWithValue(error.message)
  }
})


export const getSearchSong = createAsyncThunk(
    'get/search', 
    async(props, {rejectWithValue})=>{
     try{
     const response = await ApiFetch({
     url:`search?q=${props.songName}&type=track`
    })
    const data = response.tracks?.items
    const searchResult = []
    for(let i=0;i<data?.length;i++){
      const duration = (data[i].duration_ms / 1000).toFixed()
      const durationMin = `${Math.floor(duration / 60)}:${duration % 60 < 10 ? '0' : ''}${duration % 60}`
      if(data[i].preview_url)
        searchResult.push({
          id: data[i].id,
          songName: data[i].name,
          author: data[i].artists[0].name,
          img: data[i].album.images[0].url,
          url: data[i].preview_url,
          duration: data[i].duration_ms,
          durationMin:durationMin
        })
    }
    return {searchResult}
    }
     catch(error){
     rejectWithValue(error.message)
    }
    }
  )


export const getCurrentSong = createAsyncThunk(
     'get/currentSong',
     async(props,{rejectWithValue})=>{
     try{
       const response = await ApiFetch({
     url:`tracks/${props.id}`
    })
    const currentSong = {
     id: response.id,
     name:response.name,
     author: response.artists[0].name,
     img: response.album.images[0].url,
     url: response.preview_url,
     duration: response.duration_ms,
     spotifyUrl:response.external_urls.spotify
    }
    return {currentSong}
    }catch(error){
     return rejectWithValue(error.message)
    }
    }
     )