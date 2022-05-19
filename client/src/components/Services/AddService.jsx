import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Swal from 'sweetalert2'
import { chargeServices } from '../../redux/slices/services'

import api from '../../services/api'

const validation = (input) => {
  let errors = {}
  if (input.NOMBRE_SERVICIO === '') errors.name = 'El nombre del servicio es requerido'
  if (input.DESCRIPCION === '') errors.description = 'La descripción del servicio es requerido'
  if (input.PRECIO === '') errors.price = 'El precio del servicio es requerido'
  if (input.REMOTE === null) errors.remote = 'Es requerido que indique si el servicio es remoto o local'
  if (input.DURACION === '') errors.duration = 'La duración del servicio es requerido'
  return errors
}

export default function AddService(props) {
  //   let { provID } = props
  const { user } = useSelector((state) => state.auth)
  let provID = user.id
  let dispatch = useDispatch()
  let { dbServices } = useSelector((state) => state.services)
  let servicesString = [...new Set(dbServices.map((service) => service.nombre))]
  let [serviceOptions, setServiceOptions] = useState({
    name: '',
    remote: [],
  })

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [errors, setErrors] = useState({})
  const [serviceToPost, setServiceToPost] = useState({
    NOMBRE_SERVICIO: '',
    REMOTE: null,
    PRECIO: '',
    DESCRIPCION: '',
    DURACION: '',
  })

  useEffect(() => {
    dispatch(chargeServices())
  }, [dispatch])

  function postService(service, proveedorID) {
    let errors = validation(service)
    // console.log(errors)
    if (Object.keys(errors).length !== 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que no has completado todos los camos de forma correcta, por favor, vuelve a intentarlo',
      })
      return setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
    service.REMOTE = service.REMOTE === 'false' ? false : true
    service.PRECIO = parseInt(service.PRECIO)

    let services = { servicios: [service] }

    api
      .post('/proveedor/' + proveedorID, services)
      .then((r) => Swal.fire('Éxito', '¡Haz agregado un servicio!', 'success'))
      .catch((err) =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error, inténtelo nuevamente',
        })
      )
    window.location.reload()
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
    setErrors(validation({ ...serviceToPost }))
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
                {servicesString?.map((el) => {
                  if (el !== 'Sin servicios disponibles') {
                    return <option value={el}>{el}</option>
                  }
                })}
              </Form.Select>
              {errors.name && <Form.Text className='text-danger'>{errors.name}</Form.Text>}
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
            {errors.remote && <Form.Text className='text-danger'>{errors.remote}</Form.Text>}
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Precio</Form.Label>
              <InputGroup className='mb-3'>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type='number' name='PRECIO' onChange={(e) => handleForm(e)} />
              </InputGroup>
              {errors.price && <Form.Text className='text-danger'>{errors.price}</Form.Text>}
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Duración</Form.Label>
              <InputGroup className='mb-3'>
                <InputGroup.Text>Horas</InputGroup.Text>
                <Form.Control type='number' name='DURACION' onChange={(e) => handleForm(e)} />
              </InputGroup>
              {errors.duration && <Form.Text className='text-danger'>{errors.duration}</Form.Text>}
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Ingresa una descripción breve del servicio:</Form.Label>
              <Form.Control as='textarea' rows={3} maxLength='100' name='DESCRIPCION' onChange={(e) => handleForm(e)} />
              {errors.description && <Form.Text className='text-danger'>{errors.description}</Form.Text>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
          {!errors.name && !errors.price && !errors.remote && !errors.description && (
            <Button variant='success' onClick={() => postService(serviceToPost, provID)}>
              Guardar servicio
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}
