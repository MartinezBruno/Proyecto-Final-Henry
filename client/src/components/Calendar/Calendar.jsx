import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { addEvent, getAllEvents, setEventos, setError } from '../../redux/slices/events'
import moment from 'moment'

function Calendar({ isModal, provID, service }) {
  const dispatch = useDispatch()
  const count = service.count

  const { events, error } = useSelector((state) => state.events)

  const [input, setInput] = useState({
    fecha_evento: '',
    hora_evento: '',
  })

  const [errors, setErrors] = useState({
    fecha_evento: '',
    hora_evento: '',
  })

  const handleOnChange = (e) => {
    e.preventDefault()
    handleErrors(e)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }
  const handleErrors = (e) => {
    if (e.target.name === 'fecha_evento') {
      let year = e.target.value.slice(0, 4)
      let month = e.target.value.slice(5, 7)
      let day = e.target.value.slice(-2)

      let check = moment(new Date(), 'YYYY/MM/DD')

      let mes = check.format('MM')
      let dia = check.format('DD')
      let año = check.format('YYYY')

      setErrors((prevState) => {
        return { ...prevState, [e.target.name]: '' }
      })

      if (day < dia) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Seleccione un dia posterior al acutal.' }
        })
      }

      if (month < mes) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Seleccione un mes posterior al acutal.' }
        })
      }

      if (year < año || year > 2050) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Seleccione un año válido' }
        })
      }
    }
  }

  useEffect(() => {
    dispatch(getAllEvents(provID, service.id))
  }, [dispatch])

  const handleAddToCart = async (service, e, id, i) => {
    e.preventDefault()
    let fecha = moment(input.fecha_evento + ' ' + input.hora_evento).format('YYYY-MM-DD HH:mm')
    const evento = Object.assign({ start: fecha }, service)
    if (input.fecha_evento === '' || input.hora_evento === '') {
      return Swal.fire('Error al cambiar los datos', 'Por favor Intentelo nuevamente y asegurece de llenar todos los campos', 'error')
    }
    for (let i = 0; i < events.length; i++) {
      let event = events[i]
      if (moment(fecha).isSame(event.start)) {
        return Swal.fire('Error al cambiar los datos', 'Ya existe un evento en esa fecha', 'error')
      }
    }

    dispatch(setEventos(evento))
    console.log(error)
    console.log('hola')
    if (error) {
      return Swal.fire('Error al agendar la fecha', 'Horario no disponible', 'error')
    } else {
      let boton = document.getElementById(id)
      boton.disabled = true
      boton.innerText = '✓'
      boton.style.backgroundColor = '#198754'
      boton.style.color = 'black'
      boton.style.fontWeight = 'bold'
      boton.style.border = '1px solid black'
      boton.style.padding = '0.5rem 1.5rem 0.5rem 1.5rem'
      document.querySelector('.form' + i).disabled = true
      document.querySelector('.form-control' + i).disabled = true
    }
    console.log('chau')
    console.log(error)
  }

  let allForms = []
  for (let i = 0; i < count; i++) {
    let id = 'boton' + i
    allForms.push(
      <form className='m-4' id={`form${[i]}`}>
        <div className='form-group'>
          <label>Fecha:</label>
          <input type='date' name='fecha_evento' onChange={handleOnChange} className={'form-control form' + i} />
        </div>
        {errors.fecha_evento && <p className={` animate__animated animate__fadeInDown `}>{errors.fecha_evento}</p>}
        <div className='form-group'>
          <label>Hora:</label>
          <input type='time' name='hora_evento' onChange={handleOnChange} className={'form-control form-control' + i} />
        </div>
        {errors.hora_evento && <p className={` animate__animated animate__fadeInDown `}>{errors.hora_evento}</p>}
        <div className='form-group'>
          <button type='submit' onClick={(e) => handleAddToCart(service, e, id, i)} id={id} className='btn btn-outline-success mt-3'>
            Agregar
          </button>
        </div>
        <hr />
      </form>
    )
  }

  if (isModal) {
    return (
      <div className='d-flex flex-row'>
        <div style={{ width: '45rem' }} className='ms-4'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            locale='es'
            events={events}
            initialView='dayGridMonth'
          />
        </div>
        <div className='ms-4'>
          <h4>Elije la fecha y hora a la que quieres agendar tu servicio</h4>
          {allForms}
        </div>
      </div>
    )
  }
}

export default Calendar
