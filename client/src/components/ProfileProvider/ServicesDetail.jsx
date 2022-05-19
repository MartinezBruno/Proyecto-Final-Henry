import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getServiceProvider, RefreshService } from '../../redux/slices/provider'
import api from '../../services/api'
import Swal from 'sweetalert2'
import { Button, Modal } from 'react-bootstrap'
import Questions from '../Questions'
import { addToCart, updateStateFromStorage } from '../../redux/slices/shoppingCart'
import { services } from '../../redux/slices/shoppingCart'
import styles from '../../styles/profile.module.css'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { setMessage } from '../../redux/slices/message'
import Banned from '../Banned'
var moment = require('moment')
moment.locale('es-us')

export default function ProfileDetails() {
  let { idProv } = useParams()
  let { idServ } = useParams()

  const dispatch = useDispatch()
  const { serviceProvider } = useSelector((state) => state.provider)
  const { services } = useSelector((state) => state.shoppingCart)
  const { user, isLoggedIn } = useSelector((state) => state.auth)
  const [showQuestions, setShowQuestions] = useState(false)
  const [order, setOrder] = useState('ordenado')
  if (user) {
    var banned = user.BANNED
  }
  const handleCloseQuestions = () => setShowQuestions(false)
  const handleshowQuestions = (e) => {
    // console.log(e.target.value)
    dispatch(setMessage(e.target.value))
    setShowQuestions(true)
  }

  const handleDeleteQuestion = (e) => {
    // console.log(e.target.value)
    api.delete(`/admin/pregunta/${e.target.value}`).then(() => Swal.fire('Pregunta eliminada Correctamente', '', 'success')).then(window.location.reload())
  }
  const handleDeleteComentario = (e) => {
    // console.log(e.target.value)
    api.delete(`/admin/comentarios/${e.target.value}`).then(() => Swal.fire('Comentario eliminado Correctamente', '', 'success')).then(window.location.reload())
  }

  useEffect(() => {
    dispatch(getServiceProvider(idProv, idServ))
  }, [dispatch, idProv, idServ])

  if (banned === 'Si') {
    return <Banned />
  }
  return (
    <>
      {isLoggedIn ? (
        <div className='container' style={{ marginTop: '20px' }}>
          <div className={styles.mainBody}>
            <div className={`row gutters-sm ${styles.guttersSm}`}>
              <div className='col-md-12 row' style={{ flexDirection: 'row-reverse' }}>
                <div className={`col-md-4 mb-3 ${styles.mb3}`}>
                  <div className={styles.card}>
                    <div className={`card-body ${styles.cardBody}`}>
                      <div className='d-flex flex-column align-items-center text-center'>
                        {/* MAPEO FOTO PERFIL: imagen predeterminada - "https://bootdey.com/img/Content/avatar/avatar7.png"  */}
                        <NavLink to='/home'>
                          <button type='submit' className='btn-close' aria-label='Close' style={{ marginLeft: '-350px' }}></button>
                        </NavLink>
                        <img
                          src={`http://localhost:3001/profiles/${serviceProvider[0]?.imagen}`}
                          alt={'NI'}
                          className='rounded-circle'
                          width='150'
                          onError={(e) => (e.target.src = 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20')}
                        />
                        <div className='mt-3'>
                          {/* MAPEO nombre:*/}
                          <h4>{serviceProvider[0]?.nombre_apellido_proveedor}</h4>
                          {/* MAPEO STATUS (PROOVEDOR U OTRO) */}
                          <p className='text-secondary mb-1'>Proveedor de servicio.</p>
                          {/* MAPEO CIUDAD */}
                          <p className='text-muted font-size-sm'>{serviceProvider[0]?.ciudad + ', ' + serviceProvider[0]?.provincia}</p>
                          <NavLink to={`/home/${idProv}`}>
                            <button className='btn btn-primary' style={{ margin: '7px' }}>
                              Ver Perfil
                            </button>
                          </NavLink>
                          <>
                            {user.Role === 'USUARIO' && (
                              <button
                                className='btn btn-success'
                                style={{ padding: '5px' }}
                                onClick={() => {
                                  dispatch(
                                    addToCart({ ...serviceProvider[0]?.servicio, provID: idProv, provName: serviceProvider[0]?.nombre_apellido_proveedor })
                                  ) //Le mando los datos del servicio y del proveedor
                                  localStorage.setItem(
                                    'cartList',
                                    JSON.stringify([
                                      ...services,
                                      { ...serviceProvider[0]?.servicio, provID: idProv, provName: serviceProvider[0]?.nombre_apellido_proveedor },
                                    ])
                                  )
                                }}>
                                <i className='fa fa-cart-plus' aria-hidden='true'></i> Solicitar
                              </button>
                            )}
                          </>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECCION DE CALIFICACION / DATOS EXTRAS */}
                </div>

                {/* DESCRIPCION */}
                <div className={`col-md-8 mb-3 ${styles.mb3}`}>
                  <div className={`card-body ${styles.cardBody}`}>
                    <div className='row' style={{ alignContent: 'center' }}>
                      <div className='col'>
                        <h5 className='mb-0 text-center text-secondary'>
                          <i className='fa fa-commenting-o' aria-hidden='true'></i> DETALLES COMPLETOS
                        </h5>
                      </div>
                    </div>
                    <hr />
                    <div className='list-group'>
                      <span className='list-group-item list-group-item-action list-group-item-light'>
                        <b>Nombre: </b> {serviceProvider[0]?.servicio.nombre}
                      </span>
                      <span className='list-group-item list-group-item-action list-group-item-light'>
                        <b>Descripcion: </b> {serviceProvider[0]?.servicio.descripcion}
                      </span>
                      <span className='list-group-item list-group-item-action list-group-item-light'>
                        <b>Precio:</b> ${serviceProvider[0]?.servicio.precio}
                      </span>
                      <span className='list-group-item list-group-item-action list-group-item-light' style={{ display: 'flex' }}>
                        <b>Remoto</b>
                        {serviceProvider[0]?.servicio.remote === true ? (
                          <td>
                            <i className='fa fa-check text-success' aria-hidden='true' style={{ marginLeft: '10px', fontWeight: 'bold' }}></i>
                          </td>
                        ) : (
                          <td>
                            <i className='fa fa-times text-danger' aria-hidden='true' style={{ marginLeft: '10px', fontWeight: 'bold' }}></i>
                          </td>
                        )}
                      </span>
                      <div className={`${styles.card} mt-3`}>
                        <ul className='list-group list-group-flush'>
                          <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                            <h6 className='mb-0'>
                              <i className='fa fa-angle-right' aria-hidden='true'></i> Calificación Promedio del Proveedor:{' '}
                            </h6>
                            <ul className='list-inline small'>
                              <div>
                                {serviceProvider[0]?.calificacion === 1 ? (
                                  <>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star-o text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star-o text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star-o text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star-o text-success'></i>
                                    </li>
                                  </>
                                ) : serviceProvider[0]?.calificacion === 2 ? (
                                  <>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star-o text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star-o text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star-o text-success'></i>
                                    </li>
                                  </>
                                ) : serviceProvider[0]?.calificacion === 3 ? (
                                  <>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star-o text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star-o text-success'></i>
                                    </li>
                                  </>
                                ) : serviceProvider[0]?.calificacion === 4 ? (
                                  <>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star-o text-success'></i>
                                    </li>
                                  </>
                                ) : serviceProvider[0]?.calificacion === 5 ? (
                                  <>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                    <li className='list-inline-item m-0'>
                                      <i className='fa fa-star text-success'></i>
                                    </li>
                                  </>
                                ) : (
                                  'No tiene Calificaciones'
                                )}
                              </div>
                              {/* CIERRA MAPEO CALIFICACION */}
                            </ul>
                          </li>
                          <li className='list-group-item d-flex justify-content-between align-items-center flex-wrap'>
                            <h6 className='mb-0'>
                              <i className='fa fa-angle-right' aria-hidden='true'></i> Antiguedad del Proveedor en ATTEND:
                            </h6>
                            {/* INICIA MAPEO DE FECHA DE REGISTRO */}
                            <span className='text-secondary'>{moment(serviceProvider[0]?.creation_date, 'YYYY-MM-DD').fromNow()}</span>
                            {/* CIERRA MAPEO DE FECHA DE REGISTRO */}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-sm-12'>{/* <button className="btn btn-dark">EDITAR</button> */}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ZONA DE PREGUNTAS */}
              <div className='col-md-12 row'>
                <div className={`col-md-6 mb-3`}>
                  <div className={`${styles.card} mb-3 ${styles.mb3}`}>
                    <div className={`card-body ${styles.cardBody}`}>
                      <div className='row'>
                        <div className='col'>
                          <h5 className='mb-0 text-center text-secondary'>
                            <i className='fa fa-commenting-o' aria-hidden='true'></i> PREGUNTAS
                          </h5>
                        </div>
                      </div>
                      <hr />
                      <div className='list-group'>
                        {/* { MAPEO DE CADA PREGUNTA HECHA AL PROVEDOR } */}

                        {serviceProvider[0]?.preguntas.length > 0 ? (
                          serviceProvider[0]?.preguntas.map((preg) => (
                            <>
                              <span
                                className='list-group-item list-group-item-action list-group-item-light'
                                style={{ marginBottom: '10px', border: '1px solid lightgray' }}>
                                <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
                                  {user.Role === 'ADMIN' ? (
                                    <button
                                      type='button'
                                      className='btn-close position-absolute top-0 end-0'
                                      aria-label='Close'
                                      value={preg.id}
                                      onClick={(e) => handleDeleteQuestion(e)}
                                      style={{ margin: '10px' }}></button>
                                  ) : (
                                    ''
                                  )}

                                  {user.Role === 'PROVEEDOR' && user.id === idProv && (
                                    <button
                                      className='btn btn-primary'
                                      type='button'
                                      value={preg.id}
                                      style={{ marginBottom: '-50px', height: '35px', textAlignLast: 'center' }}
                                      onClick={handleshowQuestions}>
                                      Responder
                                    </button>
                                  )}
                                </div>
                                <b style={{ color: 'seagreen' }}>
                                  {}
                                  {preg.USUARIO}:
                                </b>
                                <p style={{ fontSize: '15px', margin: '0px', marginLeft: '7px' }}>{preg.PREGUNTA}</p>
                                <b style={{ color: 'steelblue' }}>{serviceProvider[0]?.nombre_apellido_proveedor}:</b>
                                <p style={{ fontSize: '15px', margin: '0px', marginLeft: '7px' }}>{preg.RESPUESTA}</p>
                              </span>
                              {/* <hr /> */}
                            </>
                          ))
                        ) : (
                          <p style={{ textAlign: 'center', color: 'gray', fontSize: '15px', margin: '0px', marginLeft: '7px' }}>
                            Nadie hizo Preguntas todavía. ¡Hacé la primera!
                          </p>
                        )}
                      </div>
                      <div className='row'>
                        <div className='col-sm-12'>{/* <button className="btn btn-dark">EDITAR</button> */}</div>
                      </div>
                      <div className='d-grid gap-2 col-6 mx-auto'>
                        {user.Role === 'USUARIO' && (
                          <button
                            className='btn btn-primary '
                            type='button'
                            style={{ margin: 'auto', marginTop: '20px', width: '210px' }}
                            onClick={handleshowQuestions}>
                            Hacer una pregunta
                          </button>
                        )}

                        <Modal show={showQuestions} onHide={handleCloseQuestions}>
                          <Modal.Header closeButton>
                            <Modal.Title>
                              <h5>¡Preguntale a tu Proveedor!</h5>
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Questions isModal={true} />
                          </Modal.Body>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ZONA DE COMENTARIOS */}
                <div className={`col-md-6 mb-3`}>
                  <div className={`${styles.card} mb-3 ${styles.mb3}`}>
                    <div className={`card-body ${styles.cardBody}`}>
                      <div className='row'>
                        <div className='col'>
                          <h5 className='mb-0 text-center text-secondary'>
                            <i className='fa fa-commenting-o' aria-hidden='true'></i> COMENTARIOS
                          </h5>
                        </div>
                      </div>
                      <hr />
                      <div className='list-group'>
                        {/* { MAPEO DE CADA COMENTARIO HECHO AL PROVEDOR } */}
                        {serviceProvider[0]?.comentarios.length > 0 ? (
                          serviceProvider[0]?.comentarios.map((com) => (
                            <>
                              <span
                                className='list-group-item list-group-item-action list-group-item-light '
                                style={{ marginBottom: '10px', border: '1px solid lightgray' }}>
                                <div style={{ backgrondColor: 'red' }}>
                                  {user.Role === 'ADMIN' ? (
                                    <button
                                      type='button'
                                      className='btn-close position-absolute top-0 end-0'
                                      aria-label='Close'
                                      value={com.id}
                                      onClick={(e) => handleDeleteComentario(e)}
                                      style={{ margin: '10px' }}></button>
                                  ) : (
                                    ''
                                  )}
                                </div>
                                <b style={{}}>
                                  {}
                                  {com.USUARIO}:
                                </b>
                                <p style={{ fontSize: '15px', margin: '0px', marginLeft: '7px' }}>{com.COMENTARIO}</p>
                                {/* <b style={{color:"steelblue"}}>{serviceProvider[0]?.nombre_apellido_proveedor}:</b> 
                      <p style={{fontSize:"15px",margin:"0px", marginLeft:"7px"}}>{preg.RESPUESTA}</p> */}
                              </span>
                              {/* <hr /> */}
                            </>
                          ))
                        ) : (
                          <p style={{ textAlign: 'center', color: 'gray', fontSize: '15px', margin: '0px', marginLeft: '7px' }}>
                            Nadie hizo Comentarios todavía. ¡Hacé el primero!
                          </p>
                        )}
                      </div>
                      <div className='row'>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>
            <div style={{ textAlign: 'center', marginTop: '200px' }}>
              <img
                src='https://w7.pngwing.com/pngs/436/575/png-transparent-computer-icons-error-checklist-trademark-area-warning.png'
                style={{ borderRadius: '2000px', width: '7rem', margin: '20px' }}
              />
              <h2>
                ¡Oh! Parece que aun no has iniciado sesión.
                <br />
                <br />
                Si quiere var mas detalles sobre nuestros proveedores, por favor inicie sesión <br />
                <br /> ¡Muchas Gracias!
              </h2>
              <NavLink to={'/login'}>
                <button type='button' className='btn btn-success' style={{ marginTop: '30px' }}>
                  Iniciar Sesión
                </button>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </>
  )
}
