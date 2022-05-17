import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import FullCalendar, { computeFallbackHeaderFormat } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { addEvent, getAllEvents } from '../../redux/slices/events'
import moment from 'moment'

function Calendar({ isModal, provID, service }) {
  const dispatch = useDispatch()

  const cart = (data, fecha) => {
    return data.map((item) => ({
      ...item,
      start: fecha,
    }))
  }

  const { user } = useSelector((state) => state.auth)
  const { events, error } = useSelector((state) => state.events)

  if (user.Role === 'USUARIO') {
    var userId = user.id
  }

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

  const handleAddEvent = (service, id, e) => {
    e.preventDefault()
    if (input.fecha_evento === '' || input.hora_evento === '') {
      return Swal.fire('Error al cambiar los datos', 'Por favor Intentelo nuevamente y asegurece de llenar todos los campos', 'error')
    }
    let fecha = input.fecha_evento + ' ' + input.hora_evento
    const cart = [Object.assign({ start: fecha }, service)]

    dispatch(addEvent(cart, id))
    if (error) {
      return Swal.fire('Error al agendar la fehca', 'Parece que el proveedor esta ocupado, intentelo nuevamente', 'error')
    }
    setInput({
      fecha_evento: '',
      hora_evento: '',
    })
    return Swal.fire('Fecha agendada correctamente', '', 'success')
  }
  useEffect(() => {
    dispatch(getAllEvents(provID))
  }, [dispatch])

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
            eventAdd={handleAddEvent}
          />
        </div>
        <div className='ms-4'>
          <form>
            <h4>Elije la fecha y hora a la que quieres agendar tu servicio</h4>
            <div>
              <label>Fecha:</label>
              <input type='date' name='fecha_evento' onChange={handleOnChange} />
            </div>
            {errors.fecha_evento && <p className={` animate__animated animate__fadeInDown `}>{errors.fecha_evento}</p>}
            <div>
              <label>Hora:</label>
              <input type='time' name='hora_evento' onChange={handleOnChange} />
            </div>
            {errors.hora_evento && <p className={` animate__animated animate__fadeInDown `}>{errors.hora_evento}</p>}
            <div>
              <button type='submit' onClick={(e) => handleAddEvent(service, userId, e)}>
                Agregar evento
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Calendar
