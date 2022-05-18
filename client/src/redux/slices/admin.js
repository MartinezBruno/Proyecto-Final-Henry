import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    allUsers: [],
    allProviders: [],
    allBuys: [],
    admin: false,
  },
  reducers: {
    SetAllUsers: (state, action) => {
      state.allUsers = action.payload
    },
    SetAllProviders: (state, action) => {
      state.allProviders = action.payload
    },
    SetAllBuys: (state, action) => {
      state.allBuys = action.payload
    },
  },
})

export const { SetAllUsers, SetAllProviders, SetAllBuys } = adminSlice.actions

export default adminSlice.reducer

export function setAllUsers() {
  return async function (dispatch) {
    let info = await api.get('/admin/usuarios')
    dispatch(SetAllUsers(info.data))
  }
}

export function setAllProviders() {
  return async function (dispatch) {
    let info = await api.get('/admin/proveedores')
    dispatch(SetAllProviders(info.data))
  }
}

export function setAllBuys() {
  return async function (dispatch) {
    let info = await api.get('/admin/compras')
    dispatch(SetAllBuys(info.data))
  }
}
