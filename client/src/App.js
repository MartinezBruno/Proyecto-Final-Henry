import "./App.css";
// import logo from './logo.svg';
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
import Footer from "./components/Footer";
import ProfileDetails from "./components/ProfileDetails";
import FloatCartButton from "./components/FloatCartButton";
import Shopping from "./components/Shopping";
import SuccessFulPayment from "./components/SuccessfulPayment";
import ServicesDetail from "./components/ServicesDetail";

function App() {

  const NavLayout = () =>(
    <>
    <FloatCartButton />
    <NavBar />
    <Outlet />
    </>
  )

  //Se renderiza Navbar y en Outlet se renderiza el componente que le indiquemos a la ruta

  return (
  
<>
          <Routes>
              <Route exact path="/" element={<LandingPage />}/>

              {/* Rutas anidadas / hijas */}

              <Route path="/" element={<NavLayout />}>
                  <Route path="home" element={<Home />} />
                  <Route path="cards" element={<Card />} />
                  <Route path="login" element={<Login />} />
                  <Route path="register" element={<Register />} />
                  <Route path="login" element={<Login />} />
                  <Route path="about" element={<About />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="shopping" element={<Shopping />} />
                  <Route path="home/:ProviderID" element={<ProfileDetails />} />
                  <Route path="home/PaymentSucces" element={<SuccessFulPayment />} />
                  <Route path="home/:idServ/:idProv" element={<ServicesDetail />} />
              </Route>
            
          </Routes>
          <Footer />
          </>
      
  );
}

export default App;
