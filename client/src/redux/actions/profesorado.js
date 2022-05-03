import axios from 'axios';
import { GET_CURSOS, GET_MATERIAS, GET_CLASES, POST_CLASES, PUT_CLASES, PUT_MATERIAS, DELETE_CLASES, DELETE_MATERIAS, GET_ANUNCIOS, POST_ANUNCIOS, PUT_ANUNCIOS, DELETE_ANUNCIOS } from "./types";

//Anuncios

export function getAnuncios(){
  return async function(dispatch){
    try {
      var json = await axios.get(`http://fundacioncrearte.online/api/anuncios`);
      return dispatch({
        type: GET_ANUNCIOS,
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export function postAnuncios(payload){
  return async function(dispatch){
    try {
      await axios.post(`http://fundacioncrearte.online/api/anuncios`, payload);
      return dispatch({
        type: POST_ANUNCIOS,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export function putAnuncios(id, payload){
  return async function(dispatch){
    try {
      await axios.put(`http://fundacioncrearte.online/api/anuncios/${id}`, payload);
      return dispatch({
        type: PUT_ANUNCIOS,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export function deleteAnuncios(id){
  return async function(dispatch){
    try {
      await axios.delete(`http://fundacioncrearte.online/api/anuncios/${id}`);
      return dispatch({
        type: DELETE_ANUNCIOS,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

//Cursos

export function getCursos(){
  return async function(dispatch){
    try {
      var json = await axios.get(`http://fundacioncrearte.online/api/cursos`);
      return dispatch({
        type: GET_CURSOS,
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

//Materias

export function getMaterias(){
  return async function(dispatch){
    try {
      var json = await axios.get(`http://fundacioncrearte.online/api/materias`);
      return dispatch({
        type: GET_MATERIAS,
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export function putMaterias(id, payload){
  return async function(dispatch){
    try {
      await axios.put(`http://fundacioncrearte.online/api/materias/${id}`, payload);
      return dispatch({
        type: PUT_MATERIAS,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export function deleteMaterias(id){
  return async function(dispatch){
    try {
      await axios.delete(`http://fundacioncrearte.online/api/materias/${id}`);
      return dispatch({
        type: DELETE_MATERIAS,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

//Clases

export function getClases(){
  return async function(dispatch){
    try {
      var json = await axios.get(`http://fundacioncrearte.online/api/clases`);
      return dispatch({
        type: GET_CLASES,
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export function postClases(payload){
  return async function(dispatch){
    try {
      await axios.post(`http://fundacioncrearte.online/api/clases`, payload);
      return dispatch({
        type: POST_CLASES,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export function putClases(id, payload){
  return async function(dispatch){
    try {
      await axios.put(`http://fundacioncrearte.online/api/clases/${id}`, payload);
      return dispatch({
        type: PUT_CLASES,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export function deleteClases(id){
  return async function(dispatch){
    try {
      await axios.delete(`http://fundacioncrearte.online/api/clases/${id}`);
      return dispatch({
        type: DELETE_CLASES,
      });
    } catch (error) {
      console.error(error);
    }
  }
}