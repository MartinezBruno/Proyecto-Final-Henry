import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

export const emergencySlice = createSlice({
  name: 'emergency', //Nombre del slice
  initialState: {
    userEmergency: [],
    providerEmergency: [],
  },
  reducers: {
    setUserEmergency: (state, action) => {
      state.userEmergency = action.payload
    },
    clearUserEmergency: (state, action) => {
      state.userEmergency = []
    },
    setProvEmergency: (state, action) => {
      state.providerEmergency = action.payload
    },
    clearProvEmergency: (state, action) => {
      state.providerEmergency = []
    },
  },
})

export const { setUserEmergency, clearUserEmergency, setProvEmergency, clearProvEmergency } = emergencySlice.actions

export default emergencySlice.reducer //Esta propiedad tiene todos los reducers que le metamos

export function chargeUserEmergency(userObj) {
  return async function (dispatch) {
    let emergency = (await api.post(`/emergencia/usuario`, userObj)).data
    dispatch(setUserEmergency(emergency))
  }
}

export function chargeProvEmergency(provObj) {
  return async function (dispatch) {
    let emergency = (await api.patch(`/emergencia`, provObj)).data
      dispatch(setProvEmergency(emergency[0]))
  }
}