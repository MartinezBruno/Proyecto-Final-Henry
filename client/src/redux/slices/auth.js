import { createSlice } from '@reduxjs/toolkit'
import AuthService from '../../services/auth.service'
import api from '../../services/api'
import { SetMessage, setMessage } from './message'

const user = JSON.parse(sessionStorage.getItem('user'))

export const authSlice = createSlice({
  name: 'auth',
  initialState: user ? { isLoggedIn: true, user, registerSuccess: false } : { isLoggedIn: false, user: null, registerSuccess: false },
  reducers: {
    Register_Success: (state, action) => {
      state.isLoggedIn = false
      state.registerSuccess = true
    },
    Register_Fail: (state, action) => {
      state.isLoggedIn = false
      state.registerSuccess = false
    },
    Login_Success: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload.user
    },
    Login_Fail: (state, action) => {
      state.isLoggedIn = false
      state.user = null
    },
    Logout: (state, action) => {
      state.isLoggedIn = false
      state.user = null
    },
    Refresh_Token: (state, action) => {
      state.user = { ...state.user, accessToken: action.payload }
    },
    Put_User: (state, action) => {
      state.user = state.user
    },
  },
})

export const { Register_Success, Register_Fail, Login_Success, Login_Fail, Logout, Refresh_Token, Put_User, } = authSlice.actions

export default authSlice.reducer

export function userRegister(input) {
  return async function (dispatch) {
    try {
      await AuthService.userRegister(input)
      await dispatch(Register_Success(true))
      // dispatch(setMessage(data.data.message))
    } catch (error) {
      const message = (error.data && error.data.message) || error.response.data.message || error.message || error.toString()
      dispatch(Register_Fail(false))
      dispatch(SetMessage(message))
      // console.log(error)
      // console.log(message)
    }
  }
}
export function providerRegister(input) {
  return async function (dispatch) {
    try {
      var info = await AuthService.providerRegister(input)
      if (info) dispatch(Register_Success())
      return info
    } catch (error) {
      dispatch(Register_Fail())
      // console.log(error)
      return error
    }
  }
}
export function userLogin(usuario, contraseña) {
  return async function (dispatch) {
    try {
      var info = await AuthService.userLogin(usuario, contraseña)
      if (info) await dispatch(SetMessage(info.message))
      if (info) await dispatch(Login_Success({ user: info }))
    } catch (error) {
      const message = (error.data && error.data.message) || error.message || error.toString()
      dispatch(Login_Fail())
      // console.log(Login_Fail())
      dispatch(SetMessage(message))
    }
  }
}
export function providerLogin(usuario, contraseña) {
  return async function (dispatch) {
    try {
      var info = await AuthService.providerLogin(usuario, contraseña)
      if (info) dispatch(Login_Success({ user: info }))
    } catch (error) {
      dispatch(Login_Fail())
      // console.log(error)
    }
  }
}
export function adminLogin(usuario, contraseña) {
  return async function (dispatch) {
    try {
      var info = await AuthService.adminLogin(usuario, contraseña)
      if (info) dispatch(Login_Success({ user: info }))
    } catch (error) {
      dispatch(Login_Fail())
      // console.log(error)
    }
  }
}

export function logout() {
  return function (dispatch) {
    AuthService.logout()
    dispatch(Logout())
  }
}

export function refreshToken(accessToken) {
  return function (dispatch) {
    dispatch(Refresh_Token(accessToken))
  }
}

export function putUser(id, payload) {
  return async function (dispatch) {
    try {
      await api.put(`/usuario/${id}`, payload)
      dispatch(Put_User())
    } catch (error) {
      // console.log(error)
    }
  }
}
