import { createSlice } from '@reduxjs/toolkit'

import { updateBoardState, setBoardState } from '../utils/board/board.js'

export const homeSlice = createSlice({
    name: 'home',
    initialState: { 
        value: { 
            board: setBoardState(),
        }
    },
    reducers: {
        movePiece(state, action) {
            const { boardState, originSquare, targetSquare } = action.payload;
            const updatedBoardState = updateBoardState(boardState, originSquare, targetSquare);
            return {
                ...state,
                value: {
                    board: updatedBoardState
                }
            };
        }
    },
})

// Action creators are generated for each case reducer function
export const { movePiece } = homeSlice.actions

export default homeSlice.reducer