import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'
// import axios from 'axios';

export const servicesSlice = createSlice({
  name: 'services', //Nombre del slice
  initialState: {
    dbServices: [],
  },
  reducers: {
    //Aqui van las actions para el estado "test"
    setServicesDb: (state, action) => {
      state.dbServices = action.payload
    },
  },
})

export const { setServicesDb } = servicesSlice.actions //La exporto para que la action este "visible" a la funcion pruebaFuncion

export default servicesSlice.reducer //Esta propiedad tiene todos los reducers que le metamos

export function chargeServices() {
  return async function (dispatch) {
    var services = (await api.get(`/servicios`)).data
    dispatch(setServicesDb(services))
  }
}
