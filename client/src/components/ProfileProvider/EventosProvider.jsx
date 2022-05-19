import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEvents } from '../../redux/slices/events'
import { Modal } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

function EventosProvider() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  let { events } = useSelector((state) => state.events)
  const [showCalendar, setShowCalendar] = useState(false)
  const [fullscreen, setFullscreen] = useState(true)

  const handleCloseCalendar = () => setShowCalendar(false)
  const handleShowCalendar = (e) => {
    setShowCalendar(true)

  }

  useEffect(() => {
    dispatch(getAllEvents(user.id))
  }, [dispatch])
  return (
    <>
      <button onClick={handleShowCalendar} className='btn btn-outline-primary ms-4'>
        Ver Calendario
      </button>
      <Modal show={showCalendar} onHide={handleCloseCalendar}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h5>Agendar evento</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex justify-content-center align-items-center flex-row'>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleCloseCalendar}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EventosProvider
