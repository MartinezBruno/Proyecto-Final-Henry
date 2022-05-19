import { configureStore } from '@reduxjs/toolkit'
import provider from '../slices/provider'
import user from '../slices/user'
import auth from '../slices/auth'
import message from '../slices/message'
import shoppingCart from '../slices/shoppingCart'
import countriesData from '../slices/countriesData'
import services from '../slices/services'
import purchases from '../slices/purchases'
import favorites from '../slices/favorites'
import chat from '../slices/chat'
import emergency from '../slices/emergency'
import events from '../slices/events'
import admin from '../slices/admin'

export default configureStore({
  reducer: {
    //AQUI VAN LOS REDUCERS DE CADA SLICE
    provider,
    user,
    auth,
    shoppingCart,
    message,
    countriesData,
    services,
    purchases,
    favorites,
    chat,
    emergency,
    events,
    admin
  },
})
