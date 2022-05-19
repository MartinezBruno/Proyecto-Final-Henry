import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'
import moment from 'moment'
import Swal from 'sweetalert2'

export const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    eventosAgendados: [],
    agendados: false,
    Hour: [],
    error: { estado: false },
  },
  reducers: {
    GetAllEvents: (state, action) => {
      state.events = action.payload
    },
    SetEventos: (state, action) => {
      let startHour = action.payload.start
      let duracion = action.payload.duracion === 'Sin definir' ? 8 : Number(action.payload.duracion)
      let endHour = moment(startHour).add(duracion, 'h').format('YYYY-MM-DD HH:mm')
      if (state.Hour.length === 0) {
        state.eventosAgendados.push(action.payload)
        state.Hour.push({ provID: action.payload.provID, start: startHour, end: endHour, id: action.payload.id })
      } else {
        if (state.eventosAgendados.filter((el) => el.provID === action.payload.provID).length === 0) {
          state.eventosAgendados.push(action.payload)
          state.Hour.push({ provID: action.payload.provID, start: startHour, end: endHour, id: action.payload.id })
        } else {
          for (let i = 0; i < state.Hour.length; i++) {
            if (
              !(
                (moment(startHour).isSameOrBefore(moment(state.Hour[i].start)) && moment(endHour).isSameOrBefore(moment(state.Hour[i].start))) ||
                (moment(startHour).isSameOrAfter(moment(state.Hour[i].end)) && moment(endHour).isSameOrAfter(moment(state.Hour[i].end)))
              )
            ) {
              state.error.estado = true
              return Swal.fire('Error al agendar la fecha', 'Horario no disponible', 'error')
            }
          }
          state.eventosAgendados.push(action.payload)
          state.Hour.push({ provID: action.payload.provID, start: startHour, end: endHour, id: action.payload.id })
        }
      }
    },
    VaciarEventos: (state, action) => {
      state.eventosAgendados = []
    },
    SetEventCount: (state, action) => {
      state.countEvent = state.countEvent + action.payload
    },
    VaciarProveedor: (state, action) => {
      if (state.eventosAgendados.filter((el) => el.provID === action.payload.provID && el.id === action.payload.id).length > 0)
        state.eventosAgendados = state.eventosAgendados.filter((el) => el.provID !== action.payload.provID && el.id !== action.payload.id)
      if (state.Hour.filter((el) => el.provID === action.payload.provID && el.id === action.payload.id).length > 0)
        state.Hour = state.Hour.filter((el) => el.provID !== action.payload.provID && el.id !== action.payload.id)
    },
    Agenda: (state, action) => {
      state.agendados = action.payload
    },
  },
})

export default eventSlice.reducer

export const { GetAllEvents, SetEventCount, SetEventos, VaciarEventos, VaciarProveedor, Agenda, GetState } = eventSlice.actions

export const getAllEvents = (idProvider, idServicio) => async (dispatch) => {
  let algo = {
    provID: idProvider,
    id: idServicio,
  }
  dispatch(VaciarProveedor(algo))
  // dispatch(SetEventCount(0))
  const events = await api.get(`/eventos/proveedor/${idProvider}`)
  dispatch(GetAllEvents(events.data))
}

export const addEvent = (cart, id) => async (dispatch) => {
  await api.post('/eventos', {
    cart,
    id,
  })
  dispatch(Agenda(true))
  // dispatch(AddEvent(evento.data))
}

export const setEventos = (event) => (dispatch) => {
  return dispatch(SetEventos(event))
}
