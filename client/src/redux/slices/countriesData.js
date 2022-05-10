import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'
// import axios from 'axios';

export const countriesSlice = createSlice({
  name: 'countries', //Nombre del slice
  initialState: {
    countries: [{name: 'Argentina', code: 'ar' }, {name: 'Mexico', code: 'mx' }, {name: 'Uruguay', code: 'uy' }],
    provinces: [],
    cities: []
  },
  reducers: {
    //Aqui van las actions para el estado "test"
    setProvinces: (state, action) => {
      state.provinces = action.payload
    },
    setCities: (state, action)=> {
      state.cities = action.payload
    }
  },
})

export const { setProvinces, setCities } = countriesSlice.actions //La exporto para que la action este "visible" a la funcion pruebaFuncion

export default countriesSlice.reducer //Esta propiedad tiene todos los reducers que le metamos

// export const chargeProvinces = async (country) => {
//   let provinces = (await api.get(`/provincias/${country}`)).data
//   console.log(provinces)
//   return async (dispatch) => {
//     dispatch(setProvinces(provinces))
//   }
// }

export function chargeProvinces(country) {
  return async function (dispatch) {
    var provinces = (await api.get(`/provincias/${country}`)).data
    dispatch(setProvinces(provinces))
  }
}


export function chargeCities(province){
  return async function (dispatch) {
    let cities = (await api.get(`/ciudad/${province}`)).data
    dispatch(setCities(cities))
  }
}

export const payServices = (services) => async () => {
  let infoData = (await api.post('/checkout/payment', services)).data
  // console.log(infoData)
  return infoData
}
