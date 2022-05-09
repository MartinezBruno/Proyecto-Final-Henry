import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../services/api'
// import axios from 'axios';

export const favoritesSlice = createSlice({
  name: 'favorites', //Nombre del slice
  initialState: {
    favorites: [],
    errors: '',
  },
  reducers: {
    //Aqui van las actions para el estado "test"
    getFavs: (state, action) => {
      state.favorites = action.payload
    },
    setFavorites: (state, action) => {
      state.favorites = [...state.favorites, action.payload]
    },
    deleteItem: (state, action) => {
      state.favorites = state.favorites.filter((fav) => fav !== action.payload)
    },
    setErrors: (state, action) => {
      state.errors = action.payload
    },
  },
})

export const { setFavorites, deleteItem, setErrors, getFavs, setProviders } = favoritesSlice.actions

export default favoritesSlice.reducer

export const getFavoritesFromDb = () => async (dispatch) => {
  try {
    let user = JSON.parse(sessionStorage.getItem('user'))
    let favs = (await api.get(`/usuario/${user.id}`)).data.favoritos
    dispatch(getFavs(favs))
  } catch (error) {
    console.error(error)
  }
}


export const deleteFromFavorites = (provID) => async (dispatch) => {
  let user = JSON.parse(sessionStorage.getItem('user'))
  await api.delete(`/usuario/${user.id}/${provID}`)
  dispatch(deleteItem(provID))
}

export function addToFavorites(id) {
  return async function (dispatch) {
    var info = await api.get(`/proveedor/${id}`)
    dispatch(setFavorites(info.data))
  }
}
