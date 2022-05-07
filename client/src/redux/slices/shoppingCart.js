import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'
// import axios from 'axios';

export const cartSlice = createSlice({
  name: 'shoppingCart', //Nombre del slice
  initialState: {
    services: [],
  },
  reducers: {
    //Aqui van las actions para el estado "test"
    setCart: (state, action) => {
      state.services = [...state.services, action.payload]
      localStorage.setItem('cartList', JSON.stringify(state.services))
    },
    deleteItem: (state, action) => {
      state.services = state.services.filter((el) => el.id !== action.payload)
      localStorage.setItem('cartList', JSON.stringify(state.services.slice(0, state.services.length - 1)))
    },
    updateState: (state, action) => {
      state.services = action.payload
    },
    clearServices: (state, action) => {
      state.services = []
    }
  },
})

export const { setCart, deleteItem, updateState, clearServices } = cartSlice.actions //La exporto para que la action este "visible" a la funcion pruebaFuncion

export default cartSlice.reducer //Esta propiedad tiene todos los reducers que le metamos

export const addToCart = (serviceData) => {
  return (dispatch) => {
    dispatch(setCart(serviceData))
  }
}

export const deleteService = (serviceID) => {
  return (dispatch) => {
    dispatch(deleteItem(serviceID))
  }
}
export const updateStateFromStorage = (state) => {
  return (dispatch) => {
    dispatch(updateState(state))
  }
}

export const payServices = (services) => async () => {
  let infoData = (await api.post('/checkout/payment', services)).data
  console.log(infoData)
  return infoData
}

export const clearCart = () => {
  return (dispatch) => {
    dispatch(clearServices())
  }
}