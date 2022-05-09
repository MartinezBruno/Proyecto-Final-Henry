import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Swal from 'sweetalert2'
import { chargeServices } from '../redux/slices/services'

import api from '../services/api'

export default function AddService(props) {
  //   let { provID } = props
  let provID = '015bf663-daa8-4401-860a-2cd153c29908'
  let dispatch = useDispatch()
  let { dbServices } = useSelector((state) => state.services)
  let [serviceOptions, setServiceOptions] = useState({
    name: '',
    remote: [],
  })

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [serviceToPost, setServiceToPost] = useState({
    NOMBRE_SERVICIO: '',
    REMOTE: null,
    PRECIO: '',
    DESCRIPCION: '',
  })

  useEffect(() => {
    dispatch(chargeServices())
  }, [dispatch])

  function postService(service, proveedorID) {
    service.REMOTE = service.REMOTE === 'false' ? false : true
    service.PRECIO = parseInt(service.PRECIO)

    let services = { servicios: [service] }

    api
      .post('/proveedor/' + proveedorID, services)
      .then((r) => Swal.fire(
        'Éxito',
        '¡Haz agregado un servicio!',
        'success'
      ))
      .catch((err) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error, inténtelo nuevamente',
        })
      )
  }

  function handleForm(e) {
    if (e.target.name === 'NOMBRE_SERVICIO') {
      let servicesFilteredByName = dbServices.filter((el) => el.nombre === e.target.value)
      let remoteOrNot = servicesFilteredByName.map((el) => el.remote)

      setServiceOptions((prevState) => {
        return { ...prevState, remote: remoteOrNot }
      })
    }
    setServiceToPost((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value }
    })
  }

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        <i className='fa fa-plus' aria-hidden='true'></i> CREAR SERVICIO
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
                {dbServices?.map((el) => {
                  if (el.nombre !== 'Sin servicios disponibles') {
                    return <option value={el.nombre}>{el.nombre}</option>
                  }
                })}
              </Form.Select>
            </Form.Group>
            <Form.Label>Tipo del servicio:</Form.Label>
            <Form.Select aria-label='Default select example' name='REMOTE' onChange={(e) => handleForm(e)}>
              <option hidden className='text-muted'>
                ¿Tu servicio es remoto o presencial?
              </option>
              {serviceOptions.remote?.map((el) => {
                if (!el) {
                  return <option value={false}>Presencial</option>
                }
                if (el) {
                  return <option value={true}>Remoto</option>
                }
              })}
            </Form.Select>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Precio</Form.Label>
              <InputGroup className='mb-3'>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type='number' name='PRECIO' onChange={(e) => handleForm(e)} />
              </InputGroup>
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Ingresa una descripción breve del servicio:</Form.Label>
              <Form.Control as='textarea' rows={3} maxLength='100' name='DESCRIPCION' onChange={(e) => handleForm(e)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant='success' onClick={() => postService(serviceToPost, provID)}>
            Guardar servicio
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
