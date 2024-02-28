import {configureStore} from "@reduxjs/toolkit"
import chanceSlice from "./slices/chance"
import checkSlice from "./slices/check"
import castlingSlice from "./slices/castling"

export const store=configureStore({
    reducer:{
        chance:chanceSlice,
        check:checkSlice,
        castling:castlingSlice,
    },
})
