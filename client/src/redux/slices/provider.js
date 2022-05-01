import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api"

export const providerSlice = createSlice({
  name: "provider",
  initialState: {
    allProviders: [],
    currentProviders:[],
    uniqueprovider: {},
  },
  reducers: {
    //Reducer para el estado proveedor
    SetProvidersList: (state, action) => {
      state.allProviders = action.payload;
    },
    SetUniqueprovider:(state, action) => {
      state.uniqueprovider = action.payload;
    },
    FilterByPrice: (state,action) => {
      
    }
  },
});

export const { SetProvidersList, SetUniqueprovider, FilterbyPrice } = providerSlice.actions;

export default providerSlice.reducer;

export function getAllProviders() {
  return async function (dispatch) {
    var info = await api.get("/proveedor");
    dispatch(SetProvidersList(info.data));
  };
}

export function getUniqueProvider(id){
  return async function (dispatch){
    var info = await api.get(`/proveedor/${id}`);
    dispatch(SetUniqueprovider(info.data))
  }
}

export function filterByPrice(payload){
  return function(dispatch){
    dispatch(FilterbyPrice(payload))
  }
}

