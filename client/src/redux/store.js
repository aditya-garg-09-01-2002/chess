import {configureStore} from "@reduxjs/toolkit"
import chanceSlice from "./slices/chance"
import checkSlice from "./slices/check"

export const store=configureStore({
    reducer:{
        chance:chanceSlice,
        check:checkSlice,
    },
})
