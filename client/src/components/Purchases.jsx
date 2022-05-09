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
  let { user } = useSelector((state) => state.auth)
  let usuarioId = user.id

  useEffect(() => {
    dispatch(chargePurchases(user.id))
  }, [dispatch])

  ///////////////////////COntrol del MODAL
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  let [calificar, setCalificar] = useState({
    calificacion: '',
    comentario: '',
  })

  function calificarProveedor(idUsuario, idProveedor, idServicio, body) {
    let fullBody = { ...body, UsuarioId: idUsuario, ServicioId: idServicio, idProveedor: idProveedor }
    fullBody.calificacion = parseInt(fullBody.calificacion)
    fullBody.ServicioId = parseInt(fullBody.ServicioId)
    console.log(fullBody)
    api
      .put('/usuario/calificacion', {...fullBody})
      .then((res) => {
        Swal.fire('¡Calificacion exitosa!', 'Gracias por tomarte el tiempo de calificar tu compra', 'success')
      })
      .catch((res) => {
        if ((res.message === 'Ya calificaste esta compra')) {
          Swal.fire('Ha ocurrido un error', 'Ya has calificado esta compra anteriormente!', 'error')
        }
        else{
            Swal.fire('Ha ocurrido un error', 'No puedes calificar esta compra', 'error')
        }
        
      })
  }

  function handleForm(e) {
    setCalificar((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

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
                                  <Form.Select aria-label='Default select example' name='calificacion' onChange={(e) => handleForm(e)}>
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
                                    onChange={(e) => handleForm(e)}
                                  />
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant='secondary' onClick={handleClose}>
                                Cerrar
                              </Button>
                              <Button variant='primary' onClick={() => calificarProveedor(usuarioId, el.idProveedor, el.idServicio, calificar)}>
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
