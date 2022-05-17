import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

export const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    eventosAgendados: [],
  },
  reducers: {
    GetAllEvents: (state, action) => {
      state.events = action.payload
    },
    SetEventos: (state, action) => {
      if (state.eventosAgendados.filter((el) => el.provName === action.payload.provName && el.id === action.payload.id).length < action.payload.count) {
        for (let i = 0; i < state.eventosAgendados.length; i++) {
          if (JSON.stringify(state.eventosAgendados[i]) === JSON.stringify(action.payload)) {
            state.eventosAgendados[i] = action.payload
            console.log(state.eventosAgendados[i] === action.payload)
            return
          }
        }
        state.eventosAgendados.push(action.payload)
      } else {
        let index = state.eventosAgendados.findIndex(
          (el) => el.provName === action.payload.provName && el.id === action.payload.id && el.start === action.payload.start
        )
        if (index !== -1) return
        else {
          let index = state.eventosAgendados.findIndex((el) => (el.provName = action.payload.provName && el.id === action.payload.id))
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
      if (state.eventosAgendados.filter((el) => el.provID === action.payload.idProvider && el.id === action.payload.idServicio).length > 0)
        state.eventosAgendados = state.eventosAgendados.filter((el) => el.provID !== action.payload.idProvider && el.id !== action.payload.idServicio)
    },
  },
})

export default eventSlice.reducer

export const { GetAllEvents, SetEventCount, SetEventos, VaciarEventos, VaciarProveedor } = eventSlice.actions

export const getAllEvents = (idProvider, idServicio) => async (dispatch) => {
  const events = await api.get(`/eventos/proveedor/${idProvider}`)
  dispatch(GetAllEvents(events.data))
  dispatch(VaciarProveedor(idProvider, idServicio))
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
