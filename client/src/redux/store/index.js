import { configureStore } from '@reduxjs/toolkit';
// import prueba from '../slices/prueba';
import provider from "../slices/provider"
import user from '../slices/user';

export default configureStore({
    reducer: { 
        //AQUI VAN LOS REDUCERS DE CADA SLICE 
        provider,
        user
    }
});