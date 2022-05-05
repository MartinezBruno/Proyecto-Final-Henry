import { createSlice } from '@reduxjs/toolkit'
import AuthService from '../../services/auth.service'
import api from '../../services/api'

const user = JSON.parse(sessionStorage.getItem("user"));

export const authSlice = createSlice({
  
  name: 'auth',
  initialState: user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null },
  reducers: {
    Register_Success: (state, action) => {
      state.isLoggedIn = false
    },
    Register_Fail: (state, action) => {
      state.isLoggedIn = false
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

export const {
  Register_Success,
  Register_Fail,
  Login_Success,
  Login_Fail,
  Logout,
  Refresh_Token,
  Put_User,
} = authSlice.actions

export default authSlice.reducer

export function userRegister(input) {
  return async function (dispatch) {
    try{
      await AuthService.userRegister(input)
      dispatch(Register_Success())
    }catch(error){
      dispatch(Register_Fail())
      console.log(error)
    }
  }
}
export function providerRegister(input) {
  return async function (dispatch) {
    try{
      var info = await AuthService.providerRegister(input)
      if(info) dispatch(Register_Success())
    }catch(error){
      dispatch(Register_Fail())
      console.log(error)
    }
  }
}

// export function userLogin(usuario, contraseña){
//   return async function(dispatch){
//     return AuthService.userLogin(usuario, contraseña).then(
//       (data) => {
//         dispatch(Login_Success({user : data}));
//         return Promise.resolve();
//       },
//       (error) => {
//         dispatch(Login_Fail());
//     })
//   }
// }
export function userLogin(usuario, contraseña){
  return async function(dispatch){
    try{
      var info = await AuthService.userLogin(usuario, contraseña);
      if(info) dispatch(Login_Success({user : info})) 
    }catch(error){
      dispatch(Login_Fail())
      console.log(error)
    }
  }
}
export function providerLogin(usuario, contraseña){
  return async function(dispatch){
    try{
      var info = await AuthService.providerLogin(usuario, contraseña);
      if(info) dispatch(Login_Success({user : info})) 
    }catch(error){
      dispatch(Login_Fail())
      console.log(error)
    }
  }
}

export function logout(){
  return function(dispatch){
    AuthService.logout();
    dispatch(Logout())
  }
}

export function refreshToken(accessToken){
  return function(dispatch){
    dispatch(Refresh_Token(accessToken))
  }
}

export function putUser(id, payload){
  return async function(dispatch){
    try {
      await api.put(`/usuario/${id}`, payload)
      dispatch(Put_User())
    }
    catch (error) {
      console.log(error)
    }
  }
}