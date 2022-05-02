import { configureStore } from '@reduxjs/toolkit';
// import prueba from '../slices/prueba';
import provider from "../slices/provider"

export default configureStore({
    reducer: { 
        //AQUI VAN LOS REDUCERS DE CADA SLICE 
        provider,
    }
});