import { createSlice } from '@reduxjs/toolkit';
import { getCurrentSong, getSearchSong } from './PlayerActions';

const initialState = {
 currentSong:null,
 currentSongStatus:null,
searchResult:null,
searchStatus:null,
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
