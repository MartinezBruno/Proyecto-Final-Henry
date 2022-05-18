import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'
import moment from 'moment'

export const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    eventosAgendados: [],
    agendados: false,
    Hour: [],
    error: false,
  },
  reducers: {
    GetAllEvents: (state, action) => {
      state.events = action.payload
    },
    SetEventos: (state, action) => {
      let startHour = action.payload.start
      let duracion = Number(action.payload.duracion)
      let endHour = moment(startHour).add(duracion, 'h').format('YYYY-MM-DD HH:mm')
      if (state.Hour.length === 0) {
        state.eventosAgendados.push(action.payload)
        state.Hour.push({ rovID: action.payload.provID, start: startHour, end: endHour })
      } else {
        if (state.eventosAgendados.filter((el) => el.provID === action.payload.provID).length === 0) {
          state.eventosAgendados.push(action.payload)
          state.Hour.push({ ProvID: action.payload.ProvID, start: startHour, end: endHour })
        } else {
          for (let i = 0; i < state.Hour.length; i++) {
            if (
              !(
                (moment(startHour).isSameOrBefore(moment(state.Hour[i].start)) && moment(endHour).isSameOrBefore(moment(state.Hour[i].end))) ||
                (moment(startHour).isSameOrAfter(moment(state.Hour[i].end)) && moment(endHour).isSameOrAfter(moment(state.Hour[i].end)))
              )
            ) {
              state.error = true
              console.log('SE TE CHINGARON LAS HORAS GIL')
              return true
            }
          }
        }
      }
    },
    VaciarEventos: (state, _action) => {
      state.eventosAgendados = []
    },
    SetEventCount: (state, action) => {
      state.countEvent = state.countEvent + action.payload
    },
    VaciarProveedor: (state, action) => {
      console.log(action.payload)
      if (state.eventosAgendados.filter((el) => el.provID === action.payload.provID && el.id === action.payload.id).length > 0)
        state.eventosAgendados = state.eventosAgendados.filter((el) => el.provID !== action.payload.provID && el.id !== action.payload.id)
    },
    Agenda: (state, action) => {
      state.agendados = action.payload
    },
    SetError: (state, action) => {
      state.error = false
    },
  },
})

export default eventSlice.reducer

export const { GetAllEvents, SetEventCount, SetEventos, VaciarEventos, VaciarProveedor, Agenda, SetError } = eventSlice.actions

export const getAllEvents = (idProvider, idServicio) => async (dispatch) => {
  const events = await api.get(`/eventos/proveedor/${idProvider}`)
  dispatch(GetAllEvents(events.data))
  let algo = {
    provID: idProvider,
    id: idServicio,
  }
  dispatch(VaciarProveedor(algo))
  // dispatch(SetEventCount(0))
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

export const setError = () => (dispatch) => {
  dispatch(SetError())
}
