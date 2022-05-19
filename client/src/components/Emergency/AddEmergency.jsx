import React, { useState, useEffect } from 'react'
import { chargeServices } from '../../redux/slices/services';
import {chargeUserEmergency} from '../../redux/slices/emergency'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Swal from 'sweetalert2'
import api from '../../services/api'

export default function AddEmergency() {
  let dispatch = useDispatch()
  useEffect(() => {
    dispatch(chargeServices())
  }, [dispatch])

  const { user } = useSelector((state) => state.auth)
  let userID = user.id

  useEffect(() => {
     dispatch(chargeUserEmergency(userID))
  }, [userID])

  let { dbServices } = useSelector((state) => state.services)
  let { userEmergency } = useSelector((state) => state.emergency)
  let servicesString = [...new Set(dbServices.map((service) => service.nombre))]
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  let [serviceOptions, setServiceOptions] = useState({
    id: '',
    ids: '',
    name: '',
    remote: [],
  })
  const [emergencyToPost, setEmergencyToPost] = useState({
    precioMaximo: '',
    tiempoMaximo: '',
    ServicioId: '',
    UsuarioId: userID,
  })

  function handleForm(e) {
    if (e.target.name === 'NOMBRE_SERVICIO') {
      let servicesFilteredByName = dbServices.filter((el) => el.nombre === e.target.value)
      let servicesFilteredId = servicesFilteredByName.map((el) => el.id)
      let remoteOrNot = servicesFilteredByName.map((el) => el.remote)
      setServiceOptions((prevState) => {
        return { ...prevState, name: e.target.value, remote: remoteOrNot, ids: servicesFilteredId }
      })
    }
    if (e.target.name === 'REMOTE') {
      let boolean = e.target.value === 'false' ? false : true
      let servicesFilteredByName = dbServices.filter((el) => el.nombre === serviceOptions.name)
      let servicesFilteredId = servicesFilteredByName.filter((el) => el.remote === boolean)

      setEmergencyToPost((prevState) => {
        return { ...prevState, ServicioId: servicesFilteredId[0].id }
      })
    }

    if (e.target.name === 'PRECIO') {
        setEmergencyToPost((prevState) => {
          return { ...prevState, precioMaximo: parseInt(e.target.value) }
        })
      }

      if (e.target.name === 'DURACION') {
        setEmergencyToPost((prevState) => {
          return { ...prevState, tiempoMaximo: e.target.value}
        })
      }
  }

  function handleSubmit(){
      api.post('/emergencia', emergencyToPost)
      .then(res => {
          Swal.fire('Éxito', '¡Se ha agregado tu emergencia correctamente!', 'success')
          dispatch(chargeUserEmergency(userID))
      })
      .catch(err=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
          })
      })
  }
  return (
    <>
    {userEmergency?.length===0 && <>
    
        <Button variant='warning' onClick={handleShow} style={{margin: '0px 0px 15px 0px'}}>
        <i className='fa fa-plus' aria-hidden='true'></i> NUEVA EMERGENCIA
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Creando tu emergencia.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Eligue tu servicio</Form.Label>
              <Form.Select aria-label='Selecciona tu servicio' name='NOMBRE_SERVICIO' onChange={(e) => handleForm(e)}>
                <option hidden className='text-muted'>
                  Elige tu servicio
                </option>
                {servicesString?.map((el) => {
                  if (el !== 'Sin servicios disponibles') {
                    return <option value={el}>{el}</option>
                  }
                })}
              </Form.Select>
            </Form.Group>

            <Form.Label>Tipo de servicio:</Form.Label>
            <Form.Select aria-label='Default select example' name='REMOTE' onChange={(e) => handleForm(e)}>
              <option hidden className='text-muted'>
                ¿Remoto o presencial?
              </option>
              {serviceOptions.remote?.map((el) => {
                if (!el) {
                  return <option value='false'>Presencial</option>
                }
                if (el) {
                  return <option value='true'>Remoto</option>
                }
              })}
            </Form.Select>
            <br />
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Precio máximo que deseas pagar:</Form.Label>
              <InputGroup className='mb-3'>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type='number' name='PRECIO' onChange={(e) => handleForm(e)} />
              </InputGroup>
            </Form.Group>

            <Form.Label>¿Cuánto tiempo estará disponible tu alerta?</Form.Label>
            <Form.Select aria-label='Duracion alerta' name='DURACION' onChange={(e) => handleForm(e)}>
              <option hidden className='text-muted'>
                Duración de tu emergencia activa...
              </option>

              <option value='1 horas'>1 horas</option>
              <option value='2 horas'>2 horas</option>
              <option value='3 horas'>3 horas</option>
              <option value='3 horas'>4 horas</option>
              <option value='4 horas'>5 horas</option>
              <option value='5 horas'>6 horas</option>
              <option value='6 horas'>7 horas</option>
              <option value='7 horas'>8 horas</option>
              <option value='8 horas'>9 horas</option>
              <option value='9 horas'>10 horas</option>
              <option value='10 horas'>11 horas</option>
              <option value='11 horas'>12 horas</option>
              <option value='12 horas'>13 horas</option>
              <option value='13 horas'>14 horas</option>
              <option value='14 horas'>15 horas</option>
              <option value='15 horas'>16 horas</option>
              <option value='16 horas'>17 horas</option>
              <option value='17 horas'>18 horas</option>
              <option value='18 horas'>19 horas</option>
              <option value='19 horas'>20 horas</option>
              <option value='20 horas'>21 horas</option>
              <option value='21 horas'>22 horas</option>
              <option value='22 horas'>23 horas</option>
              <option value='23 horas'>24 horas</option>


            </Form.Select>


          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>

          <Button variant='success' onClick={() => handleSubmit()}>
            Crear emergencia
          </Button>
        </Modal.Footer>
      </Modal></>}
      
    </>
  )
}
