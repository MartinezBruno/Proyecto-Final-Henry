import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api";

export const filtersSlice = createSlice({
    name:"filters",
    initialState: { currentProvider : [] },
    reducers:{
        FilterByRemote: (state, action) => {
            state.currentProvider = action.payload
        },
        FiltroSupremo: (state, action)=>{
            state.currentProvider = action.payload
        }
    }
})

export default filtersSlice.reducer;

export const { FilterByRemote } = filtersSlice.actions

export function filterByRemote(input){
    return async function(dispatch){
        let info = await api.get(`/proveedor/filtro?pais=Todos&provincia=Todos&ciudad=Todos&servicio=Todos&remote=${input.remoto}`)
        console.log(info.data)
        dispatch(FilterByRemote(info.data))
    }
}
export function filtroSupremo(payload){
    return async function(dispatch){
        let info = await api.get(`/proveedor/filtro?remote=${payload.remoto}`)
    }
}

