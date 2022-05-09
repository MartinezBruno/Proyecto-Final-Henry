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

export default function NavBar() {
  const [showRegister, setShowRegister] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const { isLoggedIn } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const { UniqueUser } = useSelector((state) => state.user)

  useEffect(() => {
    isLoggedIn && dispatch(getUser(user.id))
  }, [dispatch])

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
                ¿QUIENES SOMOS?
              </NavLink>

              <NavLink to='/favorites' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                FAVORITOS
              </NavLink>
              {/* <NavLink to='/profile' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}>
                MI PERFIL
              </NavLink> */}
            </div>

            <div className='d-flex align-items-center justify-content-center text-center' style={{ flexDirection: 'row' }}>
              <NavLink to='/profile' className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')} style={{ width: '150px' }}>
                {/* <img src={UniqueUser.imagen} alt="nt" class="img-circle" width={"20px"}></img> */}
                <img
                  src={UniqueUser.imagen}
                  width='28px'
                  height='28px'
                  style={{ borderRadius: '5000px', marginRight: '10px' }}
                  onError={(e) =>
                    (e.target.src =
                      'data:image/png;base64,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')
                  }
                />
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
