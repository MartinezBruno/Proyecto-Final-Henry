import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'
import axios from 'axios'

export const cartSlice = createSlice({
  name: 'shoppingCart', //Nombre del slice
  initialState: {
    services: [],
    acumServices: [],
  },
  reducers: {
    //Aqui van las actions para el estado "test"
    setCart: (state, action) => {
      state.services = [...state.services, action.payload]
      localStorage.setItem('cartList', JSON.stringify(state.services))
    },
    deleteItem: (state, action) => {
      state.services = action.payload
      // localStorage.setItem('cartList', JSON.stringify(state.services.slice(0, state.services.length - 1)))
      localStorage.setItem('cartList', JSON.stringify(state.services))
    },
    updateState: (state, action) => {
      state.services = action.payload
    },
    clearServices: (state, action) => {
      state.services = []
      localStorage.setItem('cartList', JSON.stringify(state.services))
    },
    setAcumuladorServices: (state, action) => {
      state.acumServices = action.payload
    },
  },
})

export const { setCart, deleteItem, updateState, clearServices, setAcumuladorServices } = cartSlice.actions //La exporto para que la action este "visible" a la funcion pruebaFuncion

export default cartSlice.reducer //Esta propiedad tiene todos los reducers que le metamos

export const addToCart = (serviceData) => {
  return (dispatch) => {
    dispatch(setCart(serviceData))
  }
}

export function deleteService(services, serviceID, provID) {
  let servicesCopy = [...services]

  for (var i = 0; i < servicesCopy.length; i++) {
    if (servicesCopy[i].id === serviceID && servicesCopy[i].provID === provID) {
      servicesCopy.splice(i, 1)
      break
    }
  }

  return async function (dispatch) {
    dispatch(deleteItem(servicesCopy))
  }
}

export function deleteAllOfOneService(services, serviceID, provID) {
  let servicesCopy = [...services]
  let flag = true

  while (flag) {
    let servicesKey = servicesCopy.map((el) => `${el.id}_${el.provID}`)

    if (servicesKey.includes(`${serviceID}_${provID}`)) {
      for (var i = 0; i < servicesCopy.length; i++) {
        if (servicesCopy[i].id === serviceID && servicesCopy[i].provID === provID) {
          servicesCopy.splice(i, 1)
          break
        }
      }
    } else {
      flag = false
    }
  }

  return async function (dispatch) {
    dispatch(deleteItem(servicesCopy))
  }
}

export const updateStateFromStorage = (state) => {
  return (dispatch) => {
    dispatch(updateState(state))
  }
}

export const payServices = (services) => async () => {
  let infoData = (await axios.post('http://localhost:3001/api/checkout/payment', services)).data
  
  return infoData
}

export const clearCart = () => {
  return (dispatch) => {
    dispatch(clearServices())
  }
}

export const setAcumServices = (services) => {
  let individualServices = {}
  services?.forEach((el) => {
    if (individualServices[[`${el.id}_${el.provID}`]]) {
      individualServices[`${el.id}_${el.provID}`].count++
    } else {
      individualServices[`${el.id}_${el.provID}`] = {
        id: el.id,
        nombre: el.nombre,
        remote: el.remote,
        precio: el.precio,
        duracion: el.duracionServicio,
        descripcion: el.descripcion,
        provID: el.provID,
        provName: el.provName,
        count: 1,
      }
    }
  })

  let individualServicesToMap = (function () {
    let servicesArr = []
    for (let prop in individualServices) {
      servicesArr.push(individualServices[prop])
    }
    return servicesArr
  })()

  return (dispatch) => {
    dispatch(setAcumuladorServices(individualServicesToMap))
  }
}

export const paymentSuccess = async (cart, id) => {
  let compra = await api.post('/usuario/compraSuccess', { cart, id })
  return compra.data
}
