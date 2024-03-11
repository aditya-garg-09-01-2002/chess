import { createSlice } from '@reduxjs/toolkit'

export const castlingSlice = createSlice({
  initialState:{kingSideCastling:false,queenSideCastling:false},
  name: "castling",
  reducers: {
    kingSide:(state,action)=>{
        state.kingSideCastling=action.payload;
        return state
    },
    queenSide:(state,action)=>{
        state.queenSideCastling=action.payload;
        return state;
    }
  }
})

export const { kingSide,queenSide } = castlingSlice.actions
export default castlingSlice.reducer