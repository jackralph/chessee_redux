import { createSlice } from '@reduxjs/toolkit'

import { setBoardState } from '../utils/board'

export const homeSlice = createSlice({
    name: 'game',
    initialState: { 
        value: {
            board: setBoardState(),
        } 
    },
    reducers: {
        selectPiece(state, action) {
            const { square } = action.payload;

            console.log(square);
        }
    },
})

// Action creators are generated for each case reducer function
export const { selectPiece } = homeSlice.actions

export default homeSlice.reducer