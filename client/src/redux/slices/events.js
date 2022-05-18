import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'
import moment from 'moment'

export const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    eventosAgendados: [],
    agendados: false,
    lastHour: '0000-00-00 00:00',
    error: false,
  },
  reducers: {
    GetAllEvents: (state, action) => {
      state.events = action.payload
    },
    SetEventos: (state, action) => {
      state.error = false
      if (state.eventosAgendados.filter((el) => el.provID === action.payload.provID && el.id === action.payload.id).length < action.payload.count) {
        for (let i = 0; i < state.eventosAgendados.length; i++) {
          if (JSON.stringify(state.eventosAgendados[i]) === JSON.stringify(action.payload)) {
            state.eventosAgendados[i] = action.payload
            console.log(state.eventosAgendados[i] === action.payload)
            return
          }
        }
        let lastHour = action.payload.start
        let duracion = Number(action.payload.duracion)
        let minumunHour = moment(lastHour).add(duracion, 'h').format('YYYY-MM-DD HH:mm')
        let algo = state.lastHour
        

        if (moment(algo).isSameOrBefore(minumunHour)) {
          state.error = true
        } else {
          state.eventosAgendados.push(action.payload)
          state.lastHour = minumunHour
        }
      } else {
        let index = state.eventosAgendados.findIndex(
          (el) => el.provID === action.payload.provID && el.id === action.payload.id && el.start === action.payload.start
        )
        if (index !== -1) return
        else {
          let index = state.eventosAgendados.findIndex((el) => (el.provID = action.payload.provID && el.id === action.payload.id))
          state.eventosAgendados.splice(index, 1)
          state.eventosAgendados.push(action.payload)
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

export const setEventos = (event) => async (dispatch) => {
  dispatch(SetEventos(event))
}

export const setError = () => (dispatch) => {
  dispatch(SetError())
}
