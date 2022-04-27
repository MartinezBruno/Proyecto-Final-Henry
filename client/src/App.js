import "./App.css";
// import {useSelector, useDispatch} from 'react-redux'
// import logo from './logo.svg';
// import {pruebaFunction} from './redux/slices/prueba.js'
import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Card from "./components/Card";
import LandingPage from "./components/LandingPage";


function App() {

  const NavLayout = () =>(
    <>
    <NavBar />
    <Outlet />
    </>
  )

  //Se renderiza Navbar y en Outlet se renderiza el segundo componente a mostrar

  return (
  

      
          <Routes>
              <Route exact path="/" element={<LandingPage />}/>

              {/* Rutas anidadas / hijas */}
              <Route path="/" element={<NavLayout />}>
                  <Route path="home" element={<Home />} />
                  <Route path="cards" element={<Card />} />
              </Route>
            
          </Routes>

     
  );
}

export default App;
