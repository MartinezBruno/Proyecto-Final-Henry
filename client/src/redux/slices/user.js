import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        UniqueUser:{},
    },
    reducers: {
        SetUser: (state, action) => {
            state.UniqueUser = action.payload
        },
        ModifyUser: (state, action) => {
            state.user = state.user
        }
    }
})

export const { SetUser, ModifyUser } = userSlice.actions;

export default userSlice.reducer

export function getUser(id){
    return async function(dispatch){
        var info = await api.get(`/usuario/${id}`);
        dispatch(SetUser(info.data))
    }
}

export function modofyUser(id, payload){
    return async function(dispatch){
        await api.put(`/usuario/${id}`, payload);
        console.log(payload)
        dispatch(ModifyUser())
    }
}