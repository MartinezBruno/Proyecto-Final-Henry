import { configureStore } from '@reduxjs/toolkit'
import provider from '../slices/provider'
import user from '../slices/user'
import auth from '../slices/auth'
import message from '../slices/message'
import shoppingCart from '../slices/shoppingCart'
import countriesData from '../slices/countriesData'
import favorites from '../slices/favorites'

export default configureStore({
  reducer: {
    //AQUI VAN LOS REDUCERS DE CADA SLICE
    provider,
    user,
    auth,
    shoppingCart,
    message,
    countriesData,
    favorites,
  },
})
