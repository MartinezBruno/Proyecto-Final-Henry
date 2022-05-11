import './App.css'
// import logo from './logo.svg';
import React from 'react'
import { Route, Routes, Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from './components/Body/Navbar'
import Home from './components/Body/Home'
import Card from './components/Body/Card'
import LandingPage from './components/Body/LandingPage'
import Login from './components/Login_Register/Login'
import Register from './components/Login_Register/Register'
import About from './components/Body/About'
import Profile from './components/Profile'
import Footer from './components/Body/Footer'
import ProfileDetails from './components/ProfileProvider/ProfileDetails'
import FloatCartButton from './components/Body/FloatCartButton'
import Shopping from './components/Payment/Shopping'
import SuccessFulPayment from './components/Payment/SuccessfulPayment'
import FailedPayment from './components/Payment/FailedPayment'
import ServicesDetail from './components/ProfileProvider/ServicesDetail'
import Purchases from './components/ProfileUser/Purchases'
import Favorites from './components/Favorites/Favorites'
import Chat from './components/Chat/Chat'

function App() {
  const NavLayout = () => (
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
        <Route exact path='/' element={<LandingPage />} />

        {/* Rutas anidadas / hijas */}

        <Route path='/' element={<NavLayout />}>
          <Route path='home' element={<Home />} />
          <Route path='cards' element={<Card />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='about' element={<About />} />
          <Route path='profile' element={<Profile />} />
          <Route path='profile/favorites' element={<Favorites />} />
          <Route path='shopping' element={<Shopping />} />
          <Route path='home/:ProviderID' element={<ProfileDetails />} />
          <Route path='home/PaymentSuccess' element={<SuccessFulPayment />} />
          <Route path='home/PaymentFailed' element={<FailedPayment />} />
          <Route path='home/:idServ/:idProv' element={<ServicesDetail />} />
          <Route path='purchases' element={<Purchases />} />
          <Route path='home/chat' element={<Chat />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
