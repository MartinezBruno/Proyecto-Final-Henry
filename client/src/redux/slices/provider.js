import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

export const providerSlice = createSlice({
  name: 'provider',
  initialState: {
    allProviders: [],
    currentProviders: [],
    uniqueprovider: {},
    serviceProvider: {},
    servicios: [],
    provincias: [],
    ciudades: [],
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
          ? state.currentProviders.sort(function (a, b) {
              return a.servicio.precio - b.servicio.precio
            })
          : action.payload === 'MayorMenor'
          ? state.currentProviders.sort(function (a, b) {
              return b.servicio.precio - a.servicio.precio
            })
          : state.allProviders
    },
    FiltroSupremo: (state, action) => {
      state.currentProviders = action.payload
    },
    SetProvincias: (state, action) => {
      state.provincias = action.payload
    },
    SetCiudades: (state, action) => {
      state.ciudades = action.payload
    },
    SetServiceProvider: (state, action) => {
      state.serviceProvider = action.payload
    }
  },
})

export const {
  SetProvidersList,
  SetUniqueprovider,
  FilterByRemote,
  FilterByProfesion,
  SetServicios,
  FilterByPrices,
  FiltroSupremo,
  SetProvincias,
  SetCiudades,
  SetServiceProvider,
} = providerSlice.actions

export default providerSlice.reducer

export function getServiceProvider(idProv, idServ){
  return async function(dispatch){
    var info = await api.get(`/proveedor?idProv=${idProv}&idServ=${idServ}`)
    dispatch(SetServiceProvider(info.data))
  }
}

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

export function setServicios() {
  return async function (dispatch) {
    let info = await api.get('/servicios')
    return dispatch(SetServicios(info.data))
  }
}

export function filterByPrices(payload) {
  return function (dispatch) {
    dispatch(FilterByPrices(payload))
  }
}

export function filtroSupremo(input) {
  return async function (dispatch) {
    let info = input.search.length === 0 ? await api.get(
      `/proveedor/filtro?pais=${input.pais}&provincia=${input.provincia}&ciudad=${input.ciudad}&servicio=${input.servicio}&remote=${input.remoto}`
    ) : await api.get(
      `/proveedor/filtro?pais=${input.pais}&provincia=${input.provincia}&ciudad=${input.ciudad}&servicio=${input.servicio}&remote=${input.remoto}&search=${input.search}`
    )
    dispatch(FiltroSupremo(info.data))
  }
}

export function setProvincias(payload) {
  return async function (dispatch) {
    let info = await api.get(`/provincias/${payload}`)
    dispatch(SetProvincias(info.data))
  }
}

export function setCiudades(payload) {
  return async function (dispatch) {
    let info = payload !== "Todos" && await api.get(`/ciudad/${payload}`)
    dispatch(SetCiudades(info.data))
  }
}
