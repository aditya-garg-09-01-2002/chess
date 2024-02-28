import { createSlice } from '@reduxjs/toolkit'

export const checkSlice = createSlice({
  initialState:false,
  name: "check",
  reducers: {
    updateCheck:(state,action)=>action.payload
  }
})

export const { updateCheck } = checkSlice.actions
export default checkSlice.reducer