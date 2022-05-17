import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

export const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    eventosAgendados: [],
    countEvent: 0,
  },
  reducers: {
    GetAllEvents: (state, action) => {
      state.events = action.payload
    },
    SetEventos: (state, action) => {
      state.eventosAgendados[state.countEvent] = [action.payload, state.countEvent]
      state.countEvent++
    },
    VaciarEventos: (state, _action) => {
      state.eventosAgendados = []
    },
    SetEventCount: (state, action) => {
      state.countEvent = state.countEvent + action.payload
    },
  },
})

export default eventSlice.reducer

export const { GetAllEvents, SetEventCount, SetEventos, VaciarEventos } = eventSlice.actions

export const getAllEvents = (idProvider) => async (dispatch) => {
  const events = await api.get(`/eventos/proveedor/${idProvider}`)
  dispatch(GetAllEvents(events.data))
  // dispatch(SetEventCount(0))
}

export const addEvent = (cart, id) => async (dispatch) => {
  await api.post('/eventos', {
    cart,
    id,
  })
  dispatch(SetEventCount(1))
  dispatch(VaciarEventos())

  // dispatch(AddEvent(evento.data))
}

export const setEventos = (event) => async (dispatch) => {
  dispatch(SetEventos(event))
}
