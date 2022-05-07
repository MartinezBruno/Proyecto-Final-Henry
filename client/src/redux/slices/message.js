import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: { mensaje: null},
  reducers: {
    SetMessage: (state, action) => {
      state.mensaje = action.payload
    },
    ClearMessage: (state, action) => {
      state.mensaje = action.payload
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
