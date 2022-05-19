import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { getUniqueProvider } from '../../redux/slices/provider'

import Swal from 'sweetalert2'
import api from '../../services/api'

function DeleteService() {
  const { user } = useSelector((state) => state.auth)
  let provID = user.id
  let dispatch = useDispatch()
  const { uniqueprovider } = useSelector((state) => state.provider)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [idServ, setIdServ] = useState({
    id: '',
  })

  const handleForm = (e) => {
    if (e.target.name === 'NOMBRE_SERVICIO') {
      // console.log(e.target.value)
      setIdServ({ id: e.target.value })
    }
  }

  function deleteService(idServ, provID) {
    api
      .delete('/proveedor/' + idServ.id + '/' + provID)
      .then((r) => Swal.fire('Éxito', '¡Haz eliminado el servicio con éxito!', 'success'))
      .catch((err) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error, inténtelo nuevamente',
        })
      )
    window.location.reload()
  }

  useEffect(() => {
    dispatch(getUniqueProvider(user.id))
  }, [dispatch])

  return (
    <>
      <Button variant='danger' onClick={handleShow}>
        <i className='fa fa-times mx-2' aria-hidden='true'></i> ELIMINAR UN SERVICIO
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creando tu servicio.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Nombre del servicio:</Form.Label>
              <Form.Select aria-label='Default select example' name='NOMBRE_SERVICIO' onChange={(e) => handleForm(e)}>
                <option hidden className='text-muted'>
                  Elige tu servicio
                </option>
                {uniqueprovider.servicios?.map((serv) => {
                  if (serv.nombre !== 'Sin servicios disponibles')
                    return (
                      <option key={serv.id} value={serv.id}>
                        {serv.nombre}({serv.remote ? 'REMOTE' : 'LOCAL'})
                      </option>
                    )
                })}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => deleteService(idServ, provID)}>
            Eliminar servicio
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteService
