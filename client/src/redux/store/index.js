import { configureStore } from '@reduxjs/toolkit';
import provider from "../slices/provider"
import user from '../slices/user';
import auth from '../slices/auth';
import filters from '../slices/filters';
import message from '../slices/message';
import shoppingCart from '../slices/shoppingCart';

export default configureStore({
    reducer: { 
        //AQUI VAN LOS REDUCERS DE CADA SLICE 
        provider,
        user,
        auth,
        shoppingCart,
        message,
        filters
    }
});