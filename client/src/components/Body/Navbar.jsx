import React from 'react'
import styles from '../../styles/navbar.module.css'
import logo from '../img-logo/Logo2_Definitivo.png'
import logoLight from '../img-logo/logo-light.png'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import Register from '../Login_Register/Register'
import Login from '../Login_Register/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../../redux/slices/user'
import { logout } from '../../redux/slices/auth'
import { getUniqueProvider } from '../../redux/slices/provider'
import Dropdown from 'react-bootstrap/Dropdown'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default function NavBar() {
  const location = useLocation()
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
      {/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////EMPIEZA NAVBAR DE ALGUIEN  NO LOGUEADO */}
      {!isLoggedIn && (
        <div className={`d-flex container justify-content-center ${styles.navMain} ${styles.wrapOnSmall}`}>
                    <div className={`${styles.logoWrap} ${styles.showOnSmall} `}>
          <Link to='/' className={`${styles.showOnSmall}`}><img className={`${styles.logoImg} ${styles.showOnSmall}`} src={location.pathname ==='/' ? logoLight : logo} alt='logo' /></Link>
          </div>
          <div className={`${styles.searchbarContainer} `}>
            <NavLink to='/'>
              <img className={`${styles.logoImg} ${styles.hideOnSmall}`} src={logo} alt='logo' />
            </NavLink>
            <div className='d-flex align-items-center justify-content-center text-center'>
              <NavLink to='/home' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                INICIO
              </NavLink>
              <NavLink to='/about' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                ¿QUIENES SOMOS?
              </NavLink>
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
                  width: '9rem',
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

      {/* //////////////////////////////////////////////////////////////////////////////////////////////TERMINA NAV BAR DE ALGUIEN NO LOGUEADO */}

      {/* //////////////////////////////////////////////////////////////////////////////////////////////EMPIEZA NAV BAR DE USUARIO / PROVEEDOR*/}

      {isLoggedIn && (
        <div className={`d-flex container justify-content-center align-items-center ${styles.wrapOnSmall}`} style={{ backgroundColor: 'transparent' }}>
          <div className={`${styles.logoWrap} ${styles.showOnSmall} `}>
          <Link to='/' className={`${styles.showOnSmall}`}><img className={`${styles.logoImg} ${styles.showOnSmall}`} src={location.pathname ==='/' ? logoLight : logo} alt='logo' /></Link>
          </div>
          <div className={`${styles.searchbarContainer} `}>
            <NavLink to='/'>
              <img className={`${styles.logoImg} ${styles.hideOnSmall}`} src={logo} alt='logo' />
            </NavLink>

            <div className='d-flex container justify-content-center align-items-center text-center'>
              <NavLink to='/home' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                INICIO
              </NavLink>
              <NavLink to='/about' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                NOSOTROS
              </NavLink>

            </div>

            <div className='d-flex align-items-center justify-content-center text-center' style={{ flexDirection: 'row' }}>
              <NavDropdown
                id='nav-dropdown-dark'
                title={
                  <span>
                    <i className='fa fa-user-circle' aria-hidden='true'></i> MI PERFIL
                  </span>
                }>
                <NavDropdown.Item>
                  <NavLink to='/profile' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                    Ver mi perfil
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to='/home/chat' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                    Mis chats
                  </NavLink>
                </NavDropdown.Item>
                {role === 'USUARIO' && (
                  <>
                    <NavDropdown.Item>
                      <NavLink to='/purchases' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                        Mis compras
                      </NavLink>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      {' '}
                      <NavLink to='/profile/favorites' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                        Mis favoritos
                      </NavLink>
                    </NavDropdown.Item>
                  </>
                )}
                                    <NavDropdown.Item>
                      <NavLink to='/emergencies' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                        Mis emergencias
                      </NavLink>
                    </NavDropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item href='/' onClick={() => handleLogout()} >
                  <i className='fa fa-sign-out' aria-hidden='true'></i> Cerrar sesión
                </Dropdown.Item>
              </NavDropdown>
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
