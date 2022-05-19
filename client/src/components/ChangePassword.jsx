import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import api from '../services/api'

function ChangePassword() {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const { user } = useSelector((state) => state.auth)

  const [errors, setErrors] = useState({})
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
  })

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value })
    handleErrors(e)
  }

  const handleErrors = (e) => {
    if (e.target.name === 'newPassword') {
      ;/^.{6,}$/.test(e.target.value)
        ? setErrors((prevState) => {
            return { ...prevState, [e.target.name]: '' }
          })
        : setErrors((prevState) => {
            return { ...prevState, [e.target.name]: 'La contraseña debe tener al menos 6 caracteres.' }
          })

      if (e.target.value === '') {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Es obligatorio ingresar una contraseña' }
        })
      }
    }
    if (e.target.name === 'oldPassword') {
      if (e.target.value === '') {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Es obligatorio ingresar su contraseña' }
        })
      }
    }
  }

  const handleSubmit = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Tu contraseña se cambiará!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, cambiar!',
    }).then((result) => {
      if (result.value) {
        if (user.Role === 'PROVEEDOR') {
          api
            .put(`/proveedor/password/${user.id}`, password)
            .then(() => Swal.fire('¡Contraseña cambiada!', '', 'success'))
            .catch((err) => {
              console.error(err)
              Swal.fire('¡Error al cambiar la contraseña', 'Verifique que su contraseña actual sea correcta', 'error')
            })
        }
        if (user.Role === 'USUARIO') {
          api
            .put(`/usuario/password/${user.id}`, password)
            .then(() => Swal.fire('¡Contraseña cambiada!', '', 'success'))
            .catch((err) => {
              console.error(err)
              Swal.fire('¡Error al cambiar la contraseña', 'Verifique que su contraseña actual sea correcta', 'error')
            })
        }
      }
    })
  }
  return (
    <>
      <button type='button' className='btn btn-warning mx-4' onClick={handleShow}>
        Cambiar contraseña
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cambiar contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-4' controlId='formBasicPassword'>
              <Form.Label>Contraseña actual</Form.Label>
              <Form.Control type='password' placeholder='Contraseña actual' name='oldPassword' onChange={handleChange} />
            </Form.Group>
            {errors.oldPassword && <Form.Text className='text-danger'>{errors.oldPassword}</Form.Text>}
            <Form.Group className='mb-4' controlId='formBasicPassword'>
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control type='password' placeholder='Nueva contraseña' name='newPassword' onChange={handleChange} />
            </Form.Group>
            {errors.newPassword && <Form.Text className='text-danger'>{errors.newPassword}</Form.Text>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant='primary'
            onClick={() => {
              handleSubmit()
            }}>
            Cambiar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ChangePassword
