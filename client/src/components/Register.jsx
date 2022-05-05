import React, { useState } from 'react'
import styles from '../styles/register.module.css'
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userRegister } from '../redux/slices/auth'

export default function Register() {
  let [termsAccepted, setTerms] = useState('disabled')
  const dispatch = useDispatch()

  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
    password: '',
    email: '',
    imagen: '',
    fecha_nacimiento: '',
    pais: '',
    provincia: '',
    ciudad: '',
    celular: '',
  })

  function handleChecked(e) {
    if (termsAccepted === 'disabled') {
      setTerms('')
    }
    if (termsAccepted === '') {
      setTerms('disabled')
    }
  }

  function handleChange(e) {
    e.preventDefault()
    if (e.target.name === 'cellphone') {
      setInput({
        ...input,
        [e.target.name]: parseInt(e.target.value),
      })
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    }
  }

  function handleSubmit(e) {
    dispatch(userRegister(input))
    setInput({
      nombre: '',
      apellido: '',
      password: '',
      email: '',
      imagen: '',
      fecha_nacimiento: '',
      pais: '',
      provincia: '',
      ciudad: '',
      celular: '',
    })
    alert('Se ha registrado Correctamente')
  }

  return (
    <>
      <Container>
        <Col md={12}>
          <div className={`${styles.card}`}>
            {' '}
            <span className={styles.circle}>
              <i className='fa fa-check'></i>
            </span>
            <h5 className='mt-3 '>
              Unete a la comunidad profesional
              <br /> más completa de la red.
            </h5>{' '}
            <small className='mt-2 text-muted'>
              Conecta con miles de profesionistas de calidad o encuentra a tus
              potenciales clientes.{' '}
            </small>
            <div className='text-center mt-3'>
              <div className={styles.halfInputContainer}>
                <div className={styles.formInput}>
                  {' '}
                  <i className='fa fa-user' style={{ left: '15px' }}></i>{' '}
                  <input
                    type='text'
                    className={styles.formControl}
                    style={{ width: '12rem' }}
                    name='nombre'
                    placeholder='Nombre'
                    value={input.nombre}
                    onChange={(e) => handleChange(e)}
                  />{' '}
                </div>
                <div className={styles.formInput}>
                  {' '}
                  <i class='fa fa-address-card' style={{ left: '13px' }}></i>
                  <input
                    type='text'
                    className={styles.formControl}
                    style={{ width: '12rem' }}
                    name='apellido'
                    placeholder='Apellido'
                    value={input.apellido}
                    onChange={(e) => handleChange(e)}
                  />{' '}
                </div>
              </div>

              <div className={styles.formInput}>
                {' '}
                <i className='fa fa-envelope'></i>{' '}
                <input
                  type='text'
                  className={styles.formControl}
                  name='email'
                  placeholder='Correo electrónico'
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
                  name='password'
                  placeholder='Contraseña'
                  value={input.password}
                  onChange={(e) => handleChange(e)}
                />{' '}
              </div>
              <div className={styles.formInput}>
                {' '}
                <i class='fa fa-camera' aria-hidden='true'></i>{' '}
                <input
                  type='text'
                  className={styles.formControl}
                  name='imagen'
                  placeholder='Imagen'
                  value={input.imagen}
                  onChange={(e) => handleChange(e)}
                />{' '}
              </div>
              <div className={styles.formInput}>
                {' '}
                <i class='fa fa-mobile' aria-hidden='true'></i>{' '}
                <input
                  type='number'
                  className={styles.formControl}
                  name='celular'
                  placeholder='Celular'
                  value={input.celular}
                  onChange={(e) => handleChange(e)}
                />{' '}
              </div>
              <div className={styles.formInput}>
                <label htmlFor='date'>Fecha nacimiento:</label>
                <i
                  class='fa fa-calendar'
                  style={{ top: '40px' }}
                  aria-hidden='true'></i>{' '}
                <input
                  type='text'
                  className={styles.formControl}
                  name='fecha_nacimiento'
                  placeholder='Fecha de nacimiento'
                  value={input.fecha_nacimiento}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className={styles.halfInputContainer}>
                <div className={styles.formInput}>
                  {' '}
                  <i
                    class='fa fa-globe'
                    aria-hidden='true'
                    style={{ left: '15px' }}></i>{' '}
                  <input
                    type='text'
                    className={styles.formControl}
                    style={{ width: '12rem' }}
                    name='pais'
                    placeholder='País'
                    value={input.pais}
                    onChange={(e) => handleChange(e)}
                  />{' '}
                </div>
                <div className={styles.formInput}>
                  {' '}
                  <i
                    class='fa fa-map-marker'
                    aria-hidden='true'
                    style={{ left: '15px' }}></i>{' '}
                  <input
                    type='text'
                    className={styles.formControl}
                    style={{ width: '12rem' }}
                    name='provincia'
                    placeholder='Provincia'
                    value={input.provincia}
                    onChange={(e) => handleChange(e)}
                  />{' '}
                </div>
                <div className={styles.formInput}>
                  {' '}
                  <i
                    class='fa fa-building'
                    aria-hidden='true'
                    style={{ left: '15px' }}>
                    {' '}
                  </i>{' '}
                  <input
                    type='text'
                    className={styles.formControl}
                    style={{ width: '12rem' }}
                    name='ciudad'
                    placeholder='Ciudad'
                    value={input.ciudad}
                    onChange={(e) => handleChange(e)}
                  />{' '}
                </div>
              </div>

              <div className={styles.formInput}>
                <label htmlFor='role' className='text-muted'>
                  ¿Que deseas hacer?
                </label>{' '}
                <br />
                <select className={styles.selectArea} name='role' id='role'>
                  <option value='hire'>Contratar servicios</option>
                  <option value='offer'>Vender mis servicios</option>
                </select>
              </div>
              <div className='form-check d-flex justify-content-center'>
                {' '}
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id='flexCheckChecked'
                  onChange={handleChecked}
                />{' '}
                <label
                  className={styles.formCheckLabel}
                  htmlFor='flexCheckChecked'>
                  {' '}
                  Acepto todas las condiciones{' '}
                </label>{' '}
              </div>
              <button
                className={`btn btn-success mt-4 ${styles.signup} ${termsAccepted}`}
                onClick={(e) => handleSubmit(e)}>
                Confirmar registro
              </button>
            </div>
            <div className='text-center mt-3'>
              {' '}
              <span>O registrate usando:</span>{' '}
            </div>
            <div className='d-flex justify-content-center mt-4'>
              {' '}
              <span className={styles.social}>
                <i className='fa fa-google'></i>
              </span>{' '}
              <span className={styles.social}>
                <i className='fa fa-facebook'></i>
              </span>{' '}
              <span className={styles.social}>
                <i className='fa fa-linkedin'></i>
              </span>{' '}
            </div>
            <div className='text-center mt-4'>
              {' '}
              <span>¿Ya estás registrado?</span>{' '}
              <Link to='/login' className='text-decoration-none'>
                Inicia sesión
              </Link>{' '}
            </div>
          </div>
        </Col>
      </Container>

      {/* <div className="container ">
    <div className="row d-flex align-items-center justify-content-center" style={{margin:'0px -220px 0px -220px'}}>
        <div className="col-md-6">
            <div className={`${styles.card}`}> <span className={styles.circle}><i className="fa fa-check"></i></span>
                <h5 className="mt-3 ">Unete a la comunidad profesional<br /> más completa de la red.</h5> <small className="mt-2 text-muted">Conecta con miles de profesionistas de calidad o encuentra a tus potenciales clientes. </small>
                <div className="text-center mt-3">
                    <div className={styles.formInput}> <i className="fa fa-user"></i> <input type="text" className={styles.formControl} placeholder="Nombre y apellido"/> </div>
                    <div className={styles.formInput}> <i className="fa fa-envelope"></i> <input type="text" className={styles.formControl} placeholder="Correo electrónico" /> </div>
                    <div className={styles.formInput}> <i className="fa fa-lock"></i> <input type="text" className={styles.formControl} placeholder="Contraseña"/> </div>
                    <div className={styles.formInput}> 
                    
                    

                    <label htmlFor="role" className='text-muted'>¿Que deseas hacer?</label> <br /> 

                        <select className={styles.selectArea}name="role" id="role">
                        <option value="hire">Contratar servicios</option>
                        <option value="offer">Vender mis servicios</option>
                        </select>
                    
                    
                    </div>
                    <div className="form-check d-flex justify-content-center"> <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" /> <label className={styles.formCheckLabel} htmlFor="flexCheckChecked"> Acepto todas las condiciones </label> </div> 
                    <button className={`btn btn-success mt-4 ${styles.signup}`}>Confirmar registro</button>
                </div>

                <div className="text-center mt-3"> <span>O registrate usando:</span> </div>
                <div className="d-flex justify-content-center mt-4"> <span className={styles.social}><i className="fa fa-google"></i></span> <span className={styles.social}><i className="fa fa-facebook"></i></span> <span className={styles.social}><i className="fa fa-linkedin"></i></span> </div>
                <div className="text-center mt-4"> <span>¿Ya estás registrado?</span> <Link to="/login" className="text-decoration-none">Inicia sesión</Link> </div>
            </div>
        </div>
    </div>
</div> */}
    </>
  )
}
