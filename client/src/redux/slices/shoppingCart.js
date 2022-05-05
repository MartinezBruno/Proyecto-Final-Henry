import { createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';

export const cartSlice = createSlice({
    name: 'shoppingCart', //Nombre del slice
    initialState : {
       
            services: []
        
    },
    reducers: { //Aqui van las actions para el estado "test"
        setCart: (state, action)=>{
            state.services= [...state.services, action.payload]
            localStorage.setItem('cartList', JSON.stringify(state.services))
            
        },
        deleteItem: (state, action) => {
            state.services = state.services.filter(el => el.id!==action.payload)
            localStorage.setItem('cartList', JSON.stringify(state.services.slice(0, state.services.length-1)))
            
        },
        updateState: (state, action) => {
            state.services = action.payload
        }

    }
});

export const { setCart, deleteItem, updateState } = cartSlice.actions; //La exporto para que la action este "visible" a la funcion pruebaFuncion

export default cartSlice.reducer; //Esta propiedad tiene todos los reducers que le metamos

export const addToCart = (serviceData)=>{
    return (dispatch) => {
        dispatch(setCart(serviceData))
    }
}

export const deleteService = (serviceID)=>{
    return (dispatch) => {
        dispatch(deleteItem(serviceID))
    }
}
export const updateStateFromStorage = (state)=>{
    return (dispatch) => {
        dispatch(updateState(state))
    }
}