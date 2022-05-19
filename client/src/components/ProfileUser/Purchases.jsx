import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chargePurchases } from '../../redux/slices/purchases'
import Button from 'react-bootstrap/Button'
import api from '../../services/api'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Moment from 'react-moment'
import { NavLink } from 'react-router-dom'
import { getServiceProvider, getUniqueProvider } from '../../redux/slices/provider'
import { setIdNewProvider } from '../../redux/slices/chat'
import styles from '../../styles/purchases.module.css'

export default function Purchases() {
  let dispatch = useDispatch()
  let { isLoggedIn } = useSelector((state) => state.auth) //PARA VERIFICAR SI EL USUARIO ESTA INICIADO SESION
  let { purchases } = useSelector((state) => state.purchases)
  var { user } = useSelector((state) => state.auth)
  var { serviceProvider } = useSelector((state) => state.provider)

  var usuarioId = user.id

  var idProv = serviceProvider[0]?.id
  // console.log(idProv)
  var idServ = serviceProvider[0]?.servicio.id
  // console.log(idServ)

  useEffect(() => {
    dispatch(chargePurchases(usuarioId))
    setInput({
      ...input,
      idServicio: idServ,
      idProveedor: idProv,
    })
  }, [dispatch, serviceProvider])

  ///////////////////////COntrol del MODAL
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [input, setInput] = useState({
    calificacion: '',
    comentario: '',
    idUsuario: usuarioId,
    idServicio: idServ,
    idProveedor: idProv,
  })

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit() {
    // dispatch(chargePurchases(usuarioId))
    // console.log(input)
    api
      .put('/usuario/calificacion', input)
      .then((res) => {
        Swal.fire('¡Calificacion exitosa!', 'Gracias por tomarte el tiempo de calificar tu compra', 'success')
      })
      .catch((res) => {
        if (res.message === 'Ya calificaste esta compra') {
          Swal.fire('Ha ocurrido un error', 'Ya has calificado esta compra anteriormente!', 'error')
        } else {
          Swal.fire('Ha ocurrido un error', 'No puedes calificar esta compra', 'error')
        }
      })
  }

  function newChat(e) {
    // console.log(e)
    dispatch(getUniqueProvider(e))
    dispatch(setIdNewProvider(e))
  }

  ///RENDERIZADO SI EL USUARIO ESTA LOGGEADO SOLO
  if (isLoggedIn) {
    return (
      <>
        <div className='container'>
          <div className='d-flex column align-items-center justify-content-center text-center' style={{ flexDirection: 'column' }}>
           
              <h3>Listado de tus compras.</h3>
              <hr />
              <table className={`table ${styles.tableDetails}`}>
                <thead className='table-dark'>
                  <tr style={{ border: 'none' }}>
                    <th scope='col' className={styles.biggerOnSmall}>SERVICIO</th>
                    <th scope='col' className={styles.hideOnSmall}>COSTO</th>
                    <th scope='col' className={styles.smallerOnSmall}>FECHA</th>
                    <th scope='col' className={styles.smallerOnSmall}> </th>
                  </tr>
                </thead>
                <tbody className={styles.tableContent}>
                  {purchases?.map((el, index) => {
                    return (
                      <tr key={el.idServicio}>
                        <td>
                        <div className={styles.flexCenter}>
                            <span>
                              <b>{el.servicio}</b>
                            </span>
                            <p>{el.proveedor}</p>
                          </div>
                        </td>

                        <td className={styles.hideOnSmall}>
                        <div className={styles.flexCenter}>
                          <p>$ {el.precio}</p>
                          </div>
                        </td>

                        <td>
                          <div className={styles.flexCenter}>
                          <p>
                            <Moment format='DD/MM/YYYY'>{el.fecha}</Moment>
                          </p>
                          </div>
                        </td>

                        <td>
                          {/* <Button variant="secondary" onClick={()=>calificarProveedor(usuarioId, 'ProviderID', 'Servicio')}>Calificar y comentar</Button> */}
                          <div className={`${styles.flexCenter}`}>
                          <Button
                            key={index}
                            variant='secondary'
                            className={styles.buttonOption}
                            onClick={() => {
                              dispatch(getServiceProvider(el.idProveedor, el.idServicio))
                              handleShow()
                            }}>
                            Califica tu servicio
                          </Button>
                          <NavLink to={"/home/chat"}>
                            <Button
                              key={index}
                              variant='primary'
                              className={styles.buttonOption}
                              onClick={() => {
                                newChat(el.idProveedor)
                              }}>
                              Ir al Chat
                            </Button>
                          </NavLink>
                          </div>

                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Califica tu servicio</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form>
                                <Form.Group className='mb-3' controlId='formBasicEmail'>
                                  <Form.Label>¿Cuántas estrellas darías a tu servicio?</Form.Label>
                                  <Form.Select aria-label='Default select example' name='calificacion' onChange={(e) => handleChange(e)}>
                                    <option>Selecciona la calificacion</option>
                                    <option value='1'>⭐</option>
                                    <option value='2'>⭐⭐</option>
                                    <option value='3'>⭐⭐⭐</option>
                                    <option value='4'>⭐⭐⭐⭐</option>
                                    <option value='5'>⭐⭐⭐⭐⭐</option>
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='formBasicPassword'>
                                  <Form.Label>Comentario del servicio:</Form.Label>
                                  <Form.Control
                                    as='textarea'
                                    maxLength='200'
                                    placeholder='Ingresa un comentario'
                                    name='comentario'
                                    value={input.comentario}
                                    onChange={(e) => handleChange(e)}
                                  />
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant='secondary' onClick={handleClose}>
                                Cerrar
                              </Button>
                              <Button variant='primary' onClick={() => handleSubmit()}>
                                Calificar
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
           
          </div>
        </div>
      </>
    )
  }

  //////////////////////////////////////////////////////////////////////////////
}
