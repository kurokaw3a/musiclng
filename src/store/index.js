import { configureStore } from '@reduxjs/toolkit';
import { PlayerSlice } from './PlayerSlice';

export const store = configureStore({
  reducer: {
    player:PlayerSlice.reducer
},
});
