import { createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';

export const pruebaSlice = createSlice({
    name: 'testing', //Nombre del slice
    initialState : {
        test: ''
    },
    reducers: { //Aqui van las actions para el estado "test"
        setTest: (state, action)=>{
            state.test = action.payload
        }

    }
});

export const { setTest } = pruebaSlice.actions; //La exporto para que la action este "visible" a la funcion pruebaFuncion

export default pruebaSlice.reducer; //Esta propiedad tiene todos los reducers que le metamos

export const pruebaFunction = ()=>{
    return (dispatch) => {
        dispatch(setTest('Funcionooooo'))
    }
}