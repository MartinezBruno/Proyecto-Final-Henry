import React, { useRef } from 'react'
import styles from '../../styles/login.module.css'
import styleSocial from '../../styles/register.module.css'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { adminLogin, providerLogin, userLogin } from '../../redux/slices/auth'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import api from '../../services/api'
import ReCAPTCHA from 'react-google-recaptcha'
import FacebookLogin from 'react-facebook-login'

export default function AdminLogin() {
  const dispatch = useDispatch()
  const { mensaje } = useSelector((state) => state.message)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const [input, setInput] = useState({
    email: '',
    password: '',
  })

  function handleChange(e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  function handleLogin(e) {
    //Se hace el login del admin con esta funcion
    api
    .post('/auth/admin/signin', input)
    .then((r) => {
        dispatch(adminLogin(input))
        Swal.fire('¡Logueado con exito!', '', 'success')
      })
      .catch((err) => {
        Swal.fire('¡Datos incorrectos!', '', 'error')
      })
  }

  return (
    <div className='d-flex container align-items-center justify-content-center' style={{ marginTop: '1rem' }}>
      <div className={styles.loginContainer}>
        <Tabs defaultActiveKey='Usuario' id='uncontrolled-tab-example' className='mb-3 text-center justify-content-center'>
          <Tab eventKey='Usuario' title='ADMINISTRACIÓN'>
            <div className='container '>
              <div className='row d-flex align-items-center justify-content-center' style={{ margin: '0px -220px 0px -220px' }}>
                <div className='col-md-6'>
                  <div className={`${styles.card}`}>
                    <div className='text-center mt-3'>
                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-envelope' style={{ left: '1.4rem' }}></i>{' '}
                        <input
                          type='text'
                          className={styles.formControl}
                          style={{ marginBottom: '10px' }}
                          placeholder='Correo electrónico'
                          name='email'
                          value={input.email}
                          onChange={(e) => handleChange(e)}
                        />{' '}
                      </div>
                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-lock' style={{ left: '1.5rem' }}></i>{' '}
                        <input
                          type='password'
                          className={styles.formControl}
                          placeholder='Contraseña'
                          name='password'
                          value={input.password}
                          onChange={(e) => handleChange(e)}
                        />{' '}
                      </div>
                      <div className={styles.formInput}></div>
                      <button className={`btn btn-success mt-4 ${styles.signup}`} onClick={(e) => handleLogin(e)}>
                        Iniciar sesión
                      </button>
                      {mensaje && (
                        <div>
                          <div role='alert'>{mensaje}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}
