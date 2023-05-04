import { createSlice } from '@reduxjs/toolkit'

import { setInitialBoardState } from '../../utils/board'

export const boardSlice = createSlice({
    name: 'board',
    initialState: { value: setInitialBoardState() },
    reducers: {},
})

// Action creators are generated for each case reducer function
export const { } = boardSlice.actions

export default boardSlice.reducer