import React from 'react'
import styles from '../styles/navbar.module.css'
import logo from './img-logo/Logo2_Definitivo.png'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Register from './Register'
import Login from './Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../redux/slices/user'
import { logout } from '../redux/slices/auth'
import { getUniqueProvider } from '../redux/slices/provider'

export default function NavBar() {
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  let role
  const { user } = useSelector((state) => state.auth)
  if (user) {
    role = user.Role
  }

  const { isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const handleCloseRegister = () => setShowRegister(false)
  const handleShowRegister = () => setShowRegister(true)

  const handleCloseLogin = () => setShowLogin(false)
  const handleShowLogin = () => setShowLogin(true)

  function handleLogout(e) {
    dispatch(logout())
  }

  return (
    <>
      {!isLoggedIn && (
        <div className={`d-flex container justify-content-center`} style={{ backgroundColor: 'transparent' }}>
          <div className={`${styles.searchbarContainer} `}>
            <NavLink to='/'>
              <img src={logo} alt='logo' />
            </NavLink>

            <div className='d-flex container justify-content-center'>
              <NavLink to='/home' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                INICIO
              </NavLink>
              <NavLink to='/about' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                ¿QUIENES SOMOS?
              </NavLink>

              {/* <NavLink to='/profile' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                MI PERFIL
              </NavLink> */}
            </div>

            <div className='d-flex align-items-center justify-content-center text-center' style={{ flexDirection: 'column' }}>
              <Button
                variant='primary'
                onClick={handleShowRegister}
                className='btn btn-primary'
                style={{
                  color: 'white',
                  borderRadius: '20px',
                  // width: "180px",
                  width: '12rem',
                  fontWeight: 'bold',
                }}>
                REGISTRATE
              </Button>
              <a href='#' className='link-success'>
                <p
                  style={{
                    margin: '0px',
                    fontSize: '0.6rem',
                    textDecoration: 'underline',
                  }}
                  onClick={handleShowLogin}>
                  ¿Ya estás registrado? Inicia sesión
                </p>
              </a>

              <Modal show={showRegister} onHide={handleCloseRegister}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {' '}
                    <h5>¡Registrate gratis!</h5>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className='show-grid'>
                  <Register isModal={true} />
                </Modal.Body>
              </Modal>

              <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <h5>Iniciar sesión</h5>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Login isModal={true} />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div className={`d-flex container justify-content-center`} style={{ backgroundColor: 'transparent' }}>
          <div className={`${styles.searchbarContainer} `}>
            <NavLink to='/'>
              <img src={logo} alt='logo' />
            </NavLink>

            <div className='d-flex container justify-content-center'>
              <NavLink to='/home' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                INICIO
              </NavLink>
              <NavLink to='/about' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                SOBRE NOSOTROS
              </NavLink>

              {role === 'USUARIO' && (
                <NavLink to='/purchases' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                  TUS COMPRAS
                </NavLink>
              )}

              {/* <NavLink to='/profile' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                MI PERFIL
              </NavLink> */}
            </div>

            <div className='d-flex align-items-center justify-content-center text-center' style={{ flexDirection: 'row' }}>
              <NavLink to='/profile' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')} style={{ width: '150px' }}>
                {/* <img src={UniqueUser.imagen} alt="nt" class="img-circle" width={"20px"}></img> */}
                MI PERFIL
              </NavLink>
              <NavLink to={'/'}>
                <Button
                  variant='secondary'
                  onClick={() => handleLogout()}
                  className='btn btn-primary'
                  style={{
                    color: 'black',
                    backgroundColor: 'lightgray',
                    borderRadius: '20px',
                    width: '7rem',
                    fontSize: '12px',
                  }}>
                  <i class='fa fa-sign-out' aria-hidden='true'></i> Cerrar sesión
                </Button>
              </NavLink>
              {/* 
              <a href='#' className='link-success'>
                <p
                  style={{
                    margin: '0px',
                    fontSize: '0.6rem',
                    textDecoration: 'underline',
                  }}
                  onClick={handleShowLogin}>
                  ¿Ya estás registrado? Inicia sesión
                </p>
              </a> */}

              {/* <Modal show={showRegister} onHide={handleCloseRegister}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    {' '}
                    <h5>¡Registrate gratis!</h5>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className='show-grid'>
                  <Register />
                </Modal.Body>
              </Modal>

              <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    <h5>Iniciar sesión</h5>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Login isModal={true} />
                </Modal.Body>
              </Modal> */}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
