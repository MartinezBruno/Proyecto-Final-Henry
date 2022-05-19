import './App.css'
// import logo from './logo.svg';
import React, { useEffect } from 'react'
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
import Calendar from './components/Calendar/Calendar'
import UsersList from './components/Admin/UsersList'
import ProvidersList from './components/Admin/ProvidersList'
import SalesHistory from './components/Admin/SalesHistory'
import { init } from '@sentry/react'
import useRoutingInstrumentation from 'react-router-v6-instrumentation'
import { BrowserTracing } from '@sentry/tracing'
import axios from 'axios'
import Emergency from './components/Emergency/Emergencies'
import AdminLogin from './components/Login_Register/AdminLogin'
import Ayuda from './components/Admin/Ayuda'
import PanelAdmin from './components/Admin/PanelAdmin'
import NewService from './components/Admin/NewService'

function App() {
  // Initialize Sentry with the browser tracing integration.
  // const routingInstrumentation = useRoutingInstrumentation()
  // useEffect(() => {

  //   const browserTracing = new BrowserTracing({
  //     routingInstrumentation,
  //   })
  //   init({
  //     dsn: 'https://e5326fd29c02448082e52f802f6b7e84@o1240796.ingest.sentry.io/6397010',
  //     integrations: [browserTracing],

  //     // Set tracesSampleRate to 1.0 to capture 100%
  //     // of transactions for performance monitoring.
  //     // We recommend adjusting this value in production
  //     tracesSampleRate: 1.0,
  //   })
  // }, [routingInstrumentation])

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
          <Route path='emergencies' element={<Emergency />} />
          <Route path='home/calendar' element={<Calendar />} />
          <Route path='admin/login' element={<AdminLogin />} />
          <Route path='admin/usersList' element={<UsersList />} />
          <Route path='admin/providersList' element={<ProvidersList />} />
          <Route path='admin/salesHistory' element={<SalesHistory />} />
          <Route path='admin/ayudas' element={<Ayuda />} />
          <Route path='admin/panelAdmin' element={<PanelAdmin />} />
          <Route path='admin/newService' element={<NewService />} />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
