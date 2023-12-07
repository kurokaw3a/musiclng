import { createSlice } from '@reduxjs/toolkit';
import { getAccessToken, getCurrentSong, getSearchSong } from './PlayerActions';

const initialState = {
 currentSong:null,
 currentSongStatus:null,
searchResult:null,
searchStatus:null,
access_token:localStorage.getItem('client_acs') || null,
}

export const PlayerSlice = createSlice({
  name: 'player',
  initialState,
  reducers:{
   clearResult(state){
   state.searchResult = []
  }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(getAccessToken.fulfilled,(state,action)=>{
     state.access_token = action.payload?.token
    })
    .addCase(getSearchSong.pending, (state)=>{
        state.searchStatus = 'pending'
    })
    .addCase(getSearchSong.fulfilled,(state,action)=>{
        state.searchStatus = 'success'
        state.searchResult = action.payload?.searchResult
    })
    .addCase(getSearchSong.rejected,(state)=>{
         state.searchStatus = 'error'
    })
    .addCase(getCurrentSong.pending, (state)=>{
     state.currentSongStatus = 'pending'
    })
    .addCase(getCurrentSong.fulfilled, (state,action)=>{
     state.currentSongStatus = 'success'
     state.currentSong = action.payload?.currentSong
    })
    .addCase(getCurrentSong.rejected, (state)=>{
     state.currentSongStatus = 'error'
    })
  }
});
