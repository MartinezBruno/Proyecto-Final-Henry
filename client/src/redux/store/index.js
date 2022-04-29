import { configureStore } from '@reduxjs/toolkit';
import prueba from '../slices/prueba';

export default configureStore({
    reducer: { 
        //AQUI VAN LOS REDUCERS DE CADA SLICE 
        prueba
    }
});