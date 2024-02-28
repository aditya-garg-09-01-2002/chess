import { createSlice } from '@reduxjs/toolkit'

export const chanceSlice = createSlice({
  initialState:false,
  name: "chance",
  reducers: {
    updateChance:(state,action)=>action.payload
  }
})

export const { updateChance } = chanceSlice.actions
export default chanceSlice.reducer