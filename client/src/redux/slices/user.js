import { createSlice } from "@reduxjs/toolkit";
import api from "../../services/api"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        UniqueUser:{}
    },
    reducers: {
        SetUser: (state, action) => {
            state.UniqueUser = action.payload
        }
    }
})

export const { SetUser } = userSlice.actions;

export default userSlice.reducer

export function getUser(id){
    return async function(dispatch){
        var info = await api.get(`/usuario/${id}`);
        dispatch(SetUser(info.data))
    }
}