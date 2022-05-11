import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import api from '../../services/api'
// import axios from 'axios';

export const favoritesSlice = createSlice({
  name: 'favorites', //Nombre del slice
  initialState: {
    favorites: [],
  },
  reducers: {
    //Aqui van las actions para el estado "test"
    getFavs: (state, action) => {
      state.favorites = action.payload
    },
  },
})

export const { getFavs } = favoritesSlice.actions

export default favoritesSlice.reducer

export const getFavoritesFromDb = (userId) => async (dispatch) => {
  let favs = (await api.get(`/usuario/favoritos/${userId}`)).data
  dispatch(getFavs(favs))
}

export function deleteFromFavorites(userId, provId) {
  return async (dispatch) => {
    await api.delete(`/usuario/favoritos/${userId}/${provId}`)
    dispatch(getFavoritesFromDb(userId))
  }
}

export function addToFavorites(userId, provId) {
  return async (dispatch) => {
    await api.put(`/usuario/favoritos/${userId}/${provId}`)
    dispatch(getFavoritesFromDb(userId))
  }
}

// export function updateAdded(favorites, provId) {
//   return (dispatch) => {
//     state.favorites.forEach((fav) => {
//       if (fav.idProveedor === provId) dispatch(added(false))
//     })
//     dispatch(added(true))
//   }
// }
