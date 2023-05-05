import { createSlice } from '@reduxjs/toolkit'

import { updateBoardState, setBoardState } from '../utils/board'

export const homeSlice = createSlice({
    name: 'game',
    initialState: { 
        value: setBoardState() 
    },
    reducers: {
        movePiece(state, action) {
            const { boardState, originSquare, targetSquare } = action.payload;
            const updatedBoardState = updateBoardState(boardState, originSquare, targetSquare);
            return {
                ...state,
                value: updatedBoardState
            };
        }
    },
})

// Action creators are generated for each case reducer function
export const { movePiece } = homeSlice.actions

export default homeSlice.reducer