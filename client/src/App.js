import "./App.css";
// import {useSelector, useDispatch} from 'react-redux'
// import logo from './logo.svg';
// import {pruebaFunction} from './redux/slices/prueba.js'
import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from "./components/Navbar";
import Home from "./components/Home";
import Card from "./components/Card";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import Profile from "./components/Profile";


function App() {

  const NavLayout = () =>(
    <>
    <NavBar />
    <Outlet />
    </>
  )

  //Se renderiza Navbar y en Outlet se renderiza el componente que le indiquemos a la ruta

  return (
  

      
          <Routes>
              <Route exact path="/" element={<LandingPage />}/>

              {/* Rutas anidadas / hijas */}

              <Route path="/" element={<NavLayout />}>
                  <Route path="home" element={<Home />} />
                  <Route path="cards" element={<Card />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="about" element={<About />} />
                  <Route path="profile" element={<Profile />} />
                  


              </Route>
            
          </Routes>

     
  );
}

export default App;
