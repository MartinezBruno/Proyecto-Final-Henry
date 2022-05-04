import { configureStore } from '@reduxjs/toolkit';
import provider from "../slices/provider"
import user from '../slices/user';
import auth from '../slices/auth';

export default configureStore({
    reducer: { 
        //AQUI VAN LOS REDUCERS DE CADA SLICE 
        provider,
        user,
        auth
    }
});