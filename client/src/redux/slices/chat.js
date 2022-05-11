import { createSlice } from "@reduxjs/toolkit";
import api from "./../../services/api"

export const chatSlice = createSlice({
    name:"chat",
    initialState:{
        chatActual: {}
    },
    reducers: {
        SetChatActual: (state, action) => {
            state.chatActual = action.payload
        }
    }
})

export const { SetChatActual } = chatSlice.actions

export default chatSlice.reducer

export function setChatActual({idUsuario, idProveedor}){
    return async function(dispatch){
        let info = await api.get(`/chat?idUsuario=${idUsuario}&idProveedor=${idProveedor}`)
        dispatch(SetChatActual(info.data))
    }
}