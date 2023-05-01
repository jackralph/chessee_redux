import { createSlice } from '@reduxjs/toolkit'

import { setInitialBoardState } from './board'

export const boardSlice = createSlice({
  name: 'counter',
  initialState: { value: setInitialBoardState() },
  reducers: {},
})

// Action creators are generated for each case reducer function
export const { } = boardSlice.actions

export default boardSlice.reducer