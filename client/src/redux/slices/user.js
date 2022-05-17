import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    UniqueUser: {},
    allUsers: [],
  },
  reducers: {
    SetUser: (state, action) => {
      state.UniqueUser = action.payload
    },
    ModifyUser: (state, action) => {
      state.user = state.user
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload
    },
  },
})

export const { SetUser, ModifyUser, setAllUsers } = userSlice.actions

export default userSlice.reducer

export function getUser(id) {
  return async function (dispatch) {
    var info = await api.get(`/usuario/${id}`)
    dispatch(SetUser(info.data))
  }
}

export function modifyUser(id, payload) {
  return async function (dispatch) {
    await api.put(`/usuario/${id}`, payload)
    // console.log(payload)
    dispatch(ModifyUser())
  }
}

export function chargeAllUsers() {
  return async function (dispatch) {
    let info = await api.get(`/usuario`)
    dispatch(setAllUsers(info.data))
  }
}
