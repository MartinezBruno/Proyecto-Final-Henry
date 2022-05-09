import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chargePurchases } from '../redux/slices/purchases'
import Button from 'react-bootstrap/Button'
import Moment from 'react-moment'
import api from '../services/api'
import Swal from 'sweetalert2'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

export default function Purchases() {
  let dispatch = useDispatch()
  let { isLoggedIn } = useSelector((state) => state.auth) //PARA VERIFICAR SI EL USUARIO ESTA INICIADO SESION
  let { purchases } = useSelector((state) => state.purchases)
  let usuarioId

  ///////////////////////COntrol del MODAL
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  function calificarProveedor(idUsuario, idProveedor, idServicio) {
    api.get(`/usuario/compraSuccess/misCompras?idUsuario=${idUsuario}`, {})

    Swal.fire('FALTA', 'Necesito que manden el id del provedor y del servicio al hacer el GET a misCompras para que esto funcione', 'error')
  }

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('user'))
    usuarioId = user.id
    dispatch(chargePurchases(user.id))
  }, [dispatch])

  ///RENDERIZADO SI EL USUARIO ESTA LOGGEADO SOLO
  if (isLoggedIn) {
    return (
      <>
        <div className='container mt-3'>
          <div className='row align-items-center justify-content-center text-center'>
            <div className='col-6'>
              <h3>Listado de tus compras.</h3>
              <hr />
              <table className='table'>
                <thead className='table-dark'>
                  <tr style={{ border: 'none' }}>
                    <th scope='col'>SERVICIO</th>
                    <th scope='col'>COSTO</th>
                    <th scope='col'>FECHA</th>
                    <th scope='col'> </th>
                  </tr>
                </thead>
                <tbody>
                  {purchases?.map((el) => {
                    return (
                      <tr>
                        <td>
                          <div>
                            <span>
                              <b>{el.servicio}</b>
                            </span>
                            <p>{el.proveedor}</p>
                          </div>
                        </td>

                        <td>
                          <p>$ {el.precio}</p>
                        </td>

                        <td>
                          <p>
                            <Moment format='DD/MM/YYYY'>{el.fecha}</Moment>
                          </p>
                        </td>

                        <td>
                          {/* <Button variant="secondary" onClick={()=>calificarProveedor(usuarioId, 'ProviderID', 'Servicio')}>Calificar y comentar</Button> */}
                          <Button
                            variant='secondary'
                            onClick={() => {
                              handleShow()
                            }}>
                            Califica tu servicio
                          </Button>

                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Califica tu servicio</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form>
                                <Form.Group className='mb-3' controlId='formBasicEmail'>
                                  <Form.Label>¿Cuántas estrellas darías a tu servicio?</Form.Label>
                                         <Form.Select aria-label='Default select example'>
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
                                  <Form.Control as='textarea' maxLength='200' placeholder='Ingresa un comentario' />
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant='secondary' onClick={handleClose}>
                                Cerrar
                              </Button>
                              <Button variant='primary' onClick={handleClose}>
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
        </div>
      </>
    )
  }

  //////////////////////////////////////////////////////////////////////////////
}
