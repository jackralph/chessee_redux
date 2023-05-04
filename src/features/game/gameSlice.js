import { createSlice } from '@reduxjs/toolkit'

import { setBoardState } from '../../utils/board'

export const gameSlice = createSlice({
    name: 'game',
    initialState: { 
        value: {
            board: setBoardState(),
        } 
    },
    reducers: {
        movePiece: (state) => {
            console.log("moving piece...");
        }
    },
})

// Action creators are generated for each case reducer function
export const { } = gameSlice.actions

export default gameSlice.reducer