import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const providerSlice = createSlice({
  name: "provider",
  initialState: {
    allProviders: [],
    currentProviders: [],
    uniqueprovider: {},
  },
  reducers: {
    //Reducer para el estado proveedor
    SetProvidersList: (state, action) => {
      state.allProviders = action.payload;
      state.currentProviders = action.payload;
    },
    SetUniqueprovider: (state, action) => {
      state.uniqueprovider = action.payload;
    },
    FilterByRemote: (state, action) => {
      state.currentProviders =
        action.payload === "true"
          ? state.allProviders.filter((prov) => prov.servicio.remote === true)
          : state.allProviders;
    },
    FilterByProfesion: (state, action) => {
      state.currentProviders =
        action.payload.length > 0
          ? state.allProviders.filter((prov) =>
              prov.servicio.nombre
                .toLowerCase()
                .includes(action.payload.toLowerCase())
            )
          : state.allProviders;
    },
    FilterByPrices: (state, action) => {
      state.currentProviders =
        action.payload === "MenorMayor"
          ? state.allProviders.sort(function (a, b) {
              return a.servicio.precio - b.servicio.precio;
            })
          : action.payload === "MayorMenor"
          ? state.allProviders.sort(function (a, b) {
              return b.servicio.precio - a.servicio.precio;
            })
          : state.allProviders;
    },
  },
});

export const {
  SetProvidersList,
  SetUniqueprovider,
  FilterByRemote,
  FilterByProfesion,
  FilterByPrices
} = providerSlice.actions;

export default providerSlice.reducer;

export function getAllProviders() {
  return async function (dispatch) {
    var info = await api.get("/proveedor");
    dispatch(SetProvidersList(info.data));
  };
}

export function getUniqueProvider(id) {
  return async function (dispatch) {
    var info = await api.get(`/proveedor/${id}`);
    dispatch(SetUniqueprovider(info.data));
  };
}

export function filterByPrices(payload){
  return function(dispatch) {
    dispatch(FilterByPrices(payload))
  }
}

export function filterByRemote(payload) {
  return function (dispatch) {
    dispatch(FilterByRemote(payload));
  };
}

export function filterByProfesion(payload) {
  return function (dispatch) {
    dispatch(FilterByProfesion(payload));
  };
}
