import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'
// import axios from 'axios';

export const purchasesSlice = createSlice({
  name: 'purchases', //Nombre del slice
  initialState: {
    purchases:[]
  },
  reducers: {
    //Aqui van las actions para el estado "test"
    setPurchases: (state, action) => {
      state.purchases = action.payload
    }
  },
})

export const { setPurchases } = purchasesSlice.actions //La exporto para que la action este "visible" a la funcion pruebaFuncion

export default purchasesSlice.reducer //Esta propiedad tiene todos los reducers que le metamos

export function chargePurchases(userId) {
  return async function (dispatch) {
    var purchases = (await api.get(`/usuario/compraSuccess/misCompras?idUsuario=${userId}`)).data
    dispatch(setPurchases(purchases))
  }
}