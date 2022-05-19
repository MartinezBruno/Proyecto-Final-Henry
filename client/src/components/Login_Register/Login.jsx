import React, { useRef } from 'react'
import styles from '../../styles/login.module.css'
import styleSocial from '../../styles/register.module.css'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { providerLogin, userLogin } from '../../redux/slices/auth'
import Swal from 'sweetalert2'
import { useEffect } from 'react'
import api from '../../services/api'
import ReCAPTCHA from 'react-google-recaptcha'
import FacebookLogin from 'react-facebook-login'

export default function Login(props) {
  const dispatch = useDispatch()
  const { mensaje } = useSelector((state) => state.message)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const [input, setInput] = useState({
    email: '',
    password: '',
  })
  const [inputProvider, setInputProvider] = useState({
    email: '',
    password: '',
  })

  const captcha = useRef(null)

  function onRecaptcha(e) {
    e.preventDefault(e)
    captcha.current.getValue()
  }
  function facebookUser(e) {
    let userToLog = {
      password: e.id, ///VERIFICAR
      email: e.email,
    }
    api
      .post('/auth/usuario/signin', userToLog)
      .then((r) => {
        dispatch(userLogin(userToLog))
        Swal.fire('¡Sesión iniciada correctamente!', '', 'success')
      })
      .catch((err) => {
        Swal.fire('¡Ha ocurrido un error, intentalo nuevamente!', '', 'error')
      })
  }

  function facebookProv(e) {
    let provToLog = {
      password: e.id, ///VERIFICAR
      email: e.email,
    }
    api
      .post('/auth/proveedor/signin', provToLog)
      .then((r) => {
        dispatch(providerLogin(provToLog))
        Swal.fire('¡Sesión iniciada correctamente!', '', 'success')
      })
      .catch((err) => {
        Swal.fire('¡Ha ocurrido un error, intentalo nuevamente!', '', 'error')
      })
  }

  function facebookClicked(e) {
    console.log('clicked:', e)
  }

  function handleChange(e) {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  function handleChangeProvider(e) {
    e.preventDefault()
    setInputProvider({
      ...inputProvider,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    dispatch(userLogin(input))
    api
      .post('/auth/usuario/signin', input)
      .then((r) => {
        Swal.fire('¡Logueado con exito!', '', 'success')
      })
      .catch((err) => {
        Swal.fire('¡Datos incorrectos!', '', 'error')
      })
  }

  function handleSubmitProvider(e) {
    dispatch(providerLogin(inputProvider))
    api
      .post('/auth/proveedor/signin', inputProvider)
      .then((r) => {
        Swal.fire('¡Logueado con exito!', '', 'success')
      })
      .catch((err) => {
        Swal.fire('¡Datos incorrectos!', '', 'error')
      })
  }
  if (props.isModal) {
    //Si se inicia sesión desde un modal
    return (
      <>
        <Tabs defaultActiveKey='Usuario' id='uncontrolled-tab-example' className='mb-3 text-center justify-content-center'>
          <Tab eventKey='Usuario' title='Como usuario'>
            <div className='container '>
              <div className='row d-flex align-items-center justify-content-center' style={{ margin: '0px -220px 0px -220px' }}>
                <div className='col-md-6'>
                  <div className={`${styles.card}`}>
                    <div className='text-center mt-3'>
                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-envelope'></i>{' '}
                        <input
                          type='text'
                          className={styles.formControl}
                          placeholder='Correo electrónico'
                          name='email'
                          value={input.email}
                          onChange={(e) => handleChange(e)}
                        />{' '}
                      </div>
                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-lock'></i>{' '}
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
                      {/* <div className='recaptcha'>
                        <ReCAPTCHA ref={captcha} sitekey='6Le5jukfAAAAAD7b-AKYrJS1A8bT_VqYBbXPwLcX' onChange={onRecaptcha} />
                      </div> */}

                      <button className={`btn btn-success mt-4 ${styles.signup}`} onClick={(e) => handleSubmit(e)}>
                        Iniciar sesión
                      </button>
                      {mensaje && (
                        <div>
                          <div role='alert'>{mensaje}</div>
                        </div>
                      )}
                    </div>

                    <div className='text-center mt-3'>
                      {' '}
                      <span>O inicia sesión usando:</span>{' '}
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                      {' '}
                      {/* <span className={styles.social}>
                        <i className='fa fa-google'></i>
                      </span>{' '} */}
                      <FacebookLogin
                        appId='422066786032438'
                        autoLoad={false}
                        fields='name,email,picture,birthday'
                        onClick={facebookClicked}
                        callback={facebookUser}
                        cssClass={styles.social}
                        textButton={<i className='fa fa-facebook'></i>}
                      />
                      {/* <span className={styles.social}>
                        <i className='fa fa-linkedin'></i>
                      </span>{' '} */}
                    </div>
                    <div className='text-center mt-4'>
                      {' '}
                      <span>¿No estás registrado?</span>{' '}
                      <Link to='./register' className='text-decoration-none'>
                        ¡Registrate ahora!
                      </Link>{' '}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab eventKey='Proveedor' title='Como proveedor'>
            <div className='container '>
              <div className='row d-flex align-items-center justify-content-center' style={{ margin: '0px -220px 0px -220px' }}>
                <div className='col-md-6'>
                  <div className={`${styles.card}`}>
                    {/* <h5 className="mt-3 text-center">Iniciar sesión</h5>  */}
                    <div className='text-center mt-3'>
                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-envelope'></i>{' '}
                        <input
                          type='text'
                          name='email'
                          value={inputProvider.email}
                          className={styles.formControl}
                          placeholder='Correo electrónico'
                          onChange={(e) => handleChangeProvider(e)}
                        />{' '}
                      </div>
                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-lock'></i>{' '}
                        <input
                          type='password'
                          name='password'
                          value={inputProvider.password}
                          className={styles.formControl}
                          placeholder='Contraseña'
                          onChange={(e) => handleChangeProvider(e)}
                        />{' '}
                      </div>
                      <div className={styles.formInput}></div>
                      {/* <div className='recaptcha'>
                        <ReCAPTCHA ref={captcha} sitekey='6Le5jukfAAAAAD7b-AKYrJS1A8bT_VqYBbXPwLcX' onChange={onRecaptcha} />
                      </div> */}

                      <button className={`btn btn-success mt-4 ${styles.signup}`} onClick={(e) => handleSubmitProvider(e)}>
                        Iniciar sesión
                      </button>
                    </div>

                    <div className='text-center mt-3'>
                      {' '}
                      <span>O inicia sesión usando:</span>{' '}
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                      {' '}
                      {/* <span className={styles.social}>
                        <i className='fa fa-google'></i>
                      </span>{' '} */}
                      <FacebookLogin
                        appId='422066786032438'
                        autoLoad={false}
                        fields='name,email,picture,birthday'
                        onClick={facebookClicked}
                        callback={facebookProv}
                        cssClass={styles.social}
                        textButton={<i className='fa fa-facebook'></i>}
                      />
                      {/* <span className={styles.social}>
                        <i className='fa fa-linkedin'></i>
                      </span>{' '} */}
                    </div>
                    <div className='text-center mt-4'>
                      {' '}
                      <span>¿No estás registrado?</span>{' '}
                      <Link to='./register' className='text-decoration-none'>
                        ¡Registrate ahora!
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </>
    )
  } else {
    return (
      <>
        <div className='d-flex container align-items-center justify-content-center' style={{ marginTop: '1rem' }}>
          <div className={styles.loginContainer}>
            <Tabs defaultActiveKey='Usuario' id='uncontrolled-tab-example' className='mb-3 text-center justify-content-center'>
              <Tab eventKey='Usuario' title='Como usuario'>
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
                          {/* <div className='recaptcha'>
                            <ReCAPTCHA ref={captcha} sitekey='6Le5jukfAAAAAD7b-AKYrJS1A8bT_VqYBbXPwLcX' onChange={onRecaptcha} />
                          </div> */}

                          <button className={`btn btn-success mt-4 ${styles.signup}`} onClick={(e) => handleSubmit(e)}>
                            Iniciar sesión
                          </button>
                          {mensaje && (
                            <div>
                              <div role='alert'>{mensaje}</div>
                            </div>
                          )}
                        </div>
                        <div className='text-center mt-3'>
                      {' '}
                      <span>O inicia sesión usando:</span>{' '}
                    </div>
                        <div className='d-flex justify-content-center mt-4'>
                          {' '}
                          {/* <span className={styles.social}>
                        <i className='fa fa-google'></i>
                      </span>{' '} */}
                          <FacebookLogin
                            appId='422066786032438'
                            autoLoad={false}
                            fields='name,email,picture,birthday'
                            onClick={facebookClicked}
                            callback={facebookUser}
                            cssClass={styles.social}
                            textButton={<i className='fa fa-facebook'></i>}
                          />
                          {/* <span className={styles.social}>
                        <i className='fa fa-linkedin'></i>
                      </span>{' '} */}
                        </div>
                        <div className='text-center mt-4'>
                          {' '}
                          <span>¿No estás registrado?</span>{' '}
                          <Link to='/register' className='text-decoration-none'>
                            ¡Registrate ahora!
                          </Link>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
              <Tab eventKey='Proveedor' title='Como proveedor'>
                <div className='container '>
                  <div className='row d-flex align-items-center justify-content-center' style={{ margin: '0px -220px 0px -220px' }}>
                    <div className='col-md-6'>
                      <div className={`${styles.card}`}>
                        {/* <h5 className="mt-3 text-center">Iniciar sesión</h5>  */}
                        <div className='text-center mt-3'>
                          <div className={styles.formInput}>
                            {' '}
                            <i className='fa fa-envelope' style={{ left: '1.4rem' }}></i>{' '}
                            <input
                              type='text'
                              name='email'
                              value={inputProvider.email}
                              className={styles.formControl}
                              placeholder='Correo electrónico'
                              onChange={(e) => handleChangeProvider(e)}
                            />{' '}
                          </div>
                          <div className={styles.formInput}>
                            {' '}
                            <i className='fa fa-lock' style={{ left: '1.4rem' }}></i>{' '}
                            <input
                              type='password'
                              name='password'
                              value={inputProvider.password}
                              className={styles.formControl}
                              placeholder='Contraseña'
                              onChange={(e) => handleChangeProvider(e)}
                            />{' '}
                          </div>
                          <div className={styles.formInput}></div>
                          {/* <div className='recaptcha'>
                            <ReCAPTCHA ref={captcha} sitekey='6Le5jukfAAAAAD7b-AKYrJS1A8bT_VqYBbXPwLcX' onChange={onRecaptcha} />
                          </div> */}

                          <button className={`btn btn-success mt-4 ${styles.signup}`} onClick={(e) => handleSubmitProvider(e)}>
                            Iniciar sesión
                          </button>
                        </div>
                        <div className='text-center mt-3'>
                          {' '}
                          <span>O inicia sesión usando:</span>{' '}
                        </div>
                        <div className='d-flex justify-content-center mt-4'>
                          {' '}
                          {/* <span className={styles.social}>
                        <i className='fa fa-google'></i>
                      </span>{' '} */}
                          <FacebookLogin
                            appId='422066786032438'
                            autoLoad={false}
                            fields='name,email,picture,birthday'
                            onClick={facebookClicked}
                            callback={facebookProv}
                            cssClass={styles.social}
                            textButton={<i className='fa fa-facebook'></i>}
                          />
                          {/* <span className={styles.social}>
                        <i className='fa fa-linkedin'></i>
                      </span>{' '} */}
                        </div>
                        <div className='text-center mt-4'>
                          {' '}
                          <span>¿No estás registrado?</span>{' '}
                          <Link to='/register' className='text-decoration-none'>
                            ¡Registrate ahora!
                          </Link>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </>
    )
  }
}
