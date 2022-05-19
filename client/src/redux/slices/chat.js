import { createSlice } from "@reduxjs/toolkit";
import api from "./../../services/api"

export const chatSlice = createSlice({
    name:"chat",
    initialState:{
        actualChat: {},
        chatHistory: [],
        idNewProvider: "",
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
        SetNewMessage:(state, action) => {
            state.actualChat.msj = action.payload
        },
        CleanNewProvider:(state, action) => {
            state.idNewProvider = action.payload
        }
    }
})

export const { SetActualChat, GetChatHistory, SetIdNewProvider, SetNewMessage, CleanNewProvider } = chatSlice.actions

export default chatSlice.reducer

export function cleanActualChat(){
    return function(dispatch){
        dispatch(SetActualChat([]))
    }
}
export function cleanNewProvider(){
    return function(dispatch){
        dispatch(CleanNewProvider(""))
    }
}

export function newProviderMessage(message){
    return function(dispatch){
        dispatch(SetNewMessage(message.mensajeProveedor))
    }
}

export function newUserMessage(message){
    // console.log(message)
    return function(dispatch){
        dispatch(SetNewMessage(message.mensajeUsuario))
    }
}

export function setIdNewProvider(id){
    // console.log(id)
    return function(dispatch){
        // console.log(id)
        dispatch(SetIdNewProvider(id))
    }
}

export function getUserChatHistory(idUsuario){
    // console.log(idUsuario)
    return async function(dispatch){
        let info = await api.get(`/chat/allChats?idUsuario=${idUsuario}`)
        dispatch(GetChatHistory(info.data))
    }
}
export function getProviderChatHistory(idProveedor){
    return async function(dispatch){
        let info = await api.get(`/chat/allChats?idProveedor=${idProveedor}`)
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