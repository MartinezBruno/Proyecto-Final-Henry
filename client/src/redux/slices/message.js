import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {},
  reducers: {
    SetMessage: (state, action) => {
      return { message: action.payload }
    },
    ClearMessage: (state, action) => {
      return { message: '' }
    },
  },
})

export default messageSlice.reducer

export const { SetMessage, ClearMessage } = messageSlice.actions

export function setMessage(message) {
  return function (dispatch) {
    dispatch(SetMessage(message))
  }
}
export function clearMessage() {
  return function (dispatch) {
    dispatch(ClearMessage())
  }
}
