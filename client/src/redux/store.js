import {configureStore} from "@reduxjs/toolkit"
import chanceSlice from "./slices/chance"

export const store=configureStore({
    reducer:{
        chance:chanceSlice,
    },
})
