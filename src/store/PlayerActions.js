import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiFetch } from "../api/ApiFetch";

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