import "./App.css";
// import {useSelector, useDispatch} from 'react-redux'
// import logo from './logo.svg';
// import {pruebaFunction} from './redux/slices/prueba.js'
import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Card from "./components/Card"
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      
      <Routes>
        <Route path="/home" element={<Home /> } />
        <Route path='/cards' element ={<Card />} />
      </Routes>
    </div>
  );
}

export default App;
