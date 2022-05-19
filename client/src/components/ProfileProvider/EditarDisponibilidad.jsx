import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import api from '../../services/api'
import { getUniqueProvider } from '../../redux/slices/provider'

function EditarDisponibilidad() {
  const dispatch = useDispatch()
  
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { user } = useSelector((state) => state.auth)

  const [errors, setErrors] = useState({})
  const [disponibilidad, setDisponibilidad] = useState({
    hora_inicio: '',
    hora_final: '',
  })
  const handleOnChange = (e) => {
    setDisponibilidad({ ...disponibilidad, [e.target.name]: e.target.value })
    handleErrors(e)
  }
  const handleErrors = (e) => {
    if (e.target.name === 'inicio') {
      if (e.target.value === '') {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Es obligatorio ingresar una fecha de inicio' }
        })
      }
    }
    if (e.target.name === 'final') {
      if (e.target.value === '') {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Es obligatorio ingresar una fecha de finalización' }
        })
      }
    }
  }
  const handleSubmit = (e) => {
    handleErrors(e)
    let horaInit = Number(disponibilidad.hora_inicio.slice(0, 2))
    let horaFin = Number(disponibilidad.hora_final.slice(0, 2))
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Tu disponibilidad se cambiará!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, cambiar!',
    }).then((result) => {
      if (result.value) {
        if (horaInit >= horaFin) {
          return Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'La hora de inicio debe ser menor a la hora final',
          })
        }
        api
          .put(`/proveedor/${user.id}/`, disponibilidad)
          .then(() => {
            Swal.fire('¡Cambiado!', 'Tu disponibilidad ha sido cambiada.', 'success')
            dispatch(getUniqueProvider(user.id))
          })
          .catch(() => Swal.fire('¡Error al cambiar los horarios', 'Verifique que los datos sean correctos', 'error'))
      }
    })
  }
  return (
    <>
      <button type='button' className='btn btn-outline-info' onClick={handleShow}>
        Cambiar disponibilidad Horaria
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar disponibilidad horaria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-4'>
              <Form.Label>Desde:</Form.Label>
              <Form.Control type='time' placeholder='Contraseña actual' name='hora_inicio' onChange={handleOnChange} />
            </Form.Group>
            {errors.inicio && <Form.Text className='text-danger'>{errors.inicio}</Form.Text>}
            <Form.Group className='mb-4'>
              <Form.Label>Hasta:</Form.Label>
              <Form.Control type='time' placeholder='Contraseña actual' name='hora_final' onChange={handleOnChange} />
            </Form.Group>
            {errors.final && <Form.Text className='text-danger'>{errors.final}</Form.Text>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant='primary'
            onClick={(e) => {
              handleSubmit(e)
            }}>
            Cambiar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditarDisponibilidad
