import { createSlice } from '@reduxjs/toolkit'

import { 
    changeTurn,
    setBoardState,
    updateBoardState,
} from '../utils/board/board.js'

export const homeSlice = createSlice({
    name: 'home',
    initialState: { 
        value: { 
            board: setBoardState(),
            turn: "light"
        }
    },
    reducers: {
        movePiece(state, action) {
            const { boardState, originSquare, targetSquare } = action.payload;
            const updatedBoardState = updateBoardState(boardState, originSquare, targetSquare);
            
            const turn = state.value.turn;
            const nextTurn = changeTurn(turn);

            return {
                ...state,
                value: {
                    board: updatedBoardState,
                    turn: nextTurn
                }
            };
        }
    },
})

// Action creators are generated for each case reducer function
export const { movePiece } = homeSlice.actions

export default homeSlice.reducer