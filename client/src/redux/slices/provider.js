import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

export const providerSlice = createSlice({
  name: 'provider',
  initialState: {
    allProviders: [],
    currentProviders: [],
    uniqueprovider: {},
    servicios:[],
  },
  reducers: {
    //Reducer para el estado proveedor
    SetProvidersList: (state, action) => {
      state.allProviders = action.payload
      state.currentProviders = action.payload
    },
    SetUniqueprovider: (state, action) => {
      state.uniqueprovider = action.payload
    },
    SetServicios: (state, action) => {
      state.servicios = action.payload
    },
    FilterByPrices: (state, action) => {
      state.currentProviders =
        action.payload === 'MenorMayor'
          ? state.allProviders.sort(function (a, b) {
              return a.servicio.precio - b.servicio.precio
            })
          : action.payload === 'MayorMenor'
          ? state.allProviders.sort(function (a, b) {
              return b.servicio.precio - a.servicio.precio
            })
          : state.allProviders
    },
    FiltroSupremo: (state, action) => {
      state.currentProviders = action.payload
    },
  },
})

export const { SetProvidersList, SetUniqueprovider, FilterByRemote, FilterByProfesion, SetServicios, FilterByPrices, FiltroSupremo } = providerSlice.actions

export default providerSlice.reducer

export function getAllProviders() {
  return async function (dispatch) {
    var info = await api.get('/proveedor')
    dispatch(SetProvidersList(info.data))
  }
}

export function getUniqueProvider(id) {
  return async function (dispatch) {
    var info = await api.get(`/proveedor/${id}`)
    dispatch(SetUniqueprovider(info.data))
  }
}

export function setServicios(){
  return async function (dispatch) {
    let info = await api.get("/servicios")
    dispatch(SetServicios(info.data))
  }
}

export function filterByPrices(payload) {
  return function (dispatch) {
    dispatch(FilterByPrices(payload))
  }
}

export function filtroSupremo(input){
  return async function(dispatch){
      let info = await api.get(`/proveedor/filtro?pais=Todos&provincia=Todos&ciudad=Todos&servicio=Todos&remote=${input.remoto}`)
      // console.log(info.data)
      dispatch(FiltroSupremo(info.data))
  }
}

