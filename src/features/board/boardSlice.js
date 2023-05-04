import { createSlice } from '@reduxjs/toolkit'

import { setBoardState } from '../../utils/board'

export const boardSlice = createSlice({
    name: 'board',
    initialState: { value: setBoardState() },
    reducers: {
        movePiece: (state) => {
            console.log("moving piece...");
        }
    },
})

// Action creators are generated for each case reducer function
export const { } = boardSlice.actions

export default boardSlice.reducer