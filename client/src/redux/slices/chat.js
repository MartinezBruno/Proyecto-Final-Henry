import { createSlice } from "@reduxjs/toolkit";
import api from "./../../services/api"

export const chatSlice = createSlice({
    name:"chat",
    initialState:{
        actualChat: {},
        chatHistory: [],
        idNewProvider: ""
    },
    reducers: {
        SetActualChat: (state, action) => {
            state.actualChat = action.payload
        },
        GetChatHistory:(state, action) => {
            state.chatHistory = action.payload
        },
        SetIdNewProvider:(state, action) => {
            state.idNewProvider = action.payload
        },
    }
})

export const { SetActualChat, GetChatHistory, SetIdNewProvider } = chatSlice.actions

export default chatSlice.reducer

export function setIdNewProvider(id){
    // console.log(id)
    return function(dispatch){
        // console.log(id)
        dispatch(SetIdNewProvider(id))
    }
}

export function getUserChatHistory(idUsuario){
    console.log(idUsuario)
    return async function(dispatch){
        let info = await api.get(`/chat/allChats?idUsuario=${idUsuario}`)
        // console.log(info.data)
        dispatch(GetChatHistory(info.data))
    }
}
export function getProviderChatHistory(idProveedor){
    // console.log(idProveedor)
    return async function(dispatch){
        let info = await api.get(`/chat/allChats?idProveedor=${idProveedor}`)
        // console.log(info.data)
        dispatch(GetChatHistory(info.data))
    }
}

export function setClickChat(idUsuario, idProveedor){
    return async function(dispatch){
        let info = await api.get(`/chat?idUsuario=${idUsuario}&idProveedor=${idProveedor}`)
        dispatch(SetActualChat(info.data))
    }
}
export function refreshChat({idUsuario, idProveedor}){
    return async function(dispatch){
        let info = await api.get(`/chat?idUsuario=${idUsuario}&idProveedor=${idProveedor}`)
        dispatch(SetActualChat(info.data))
    }
}