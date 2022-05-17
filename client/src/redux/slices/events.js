import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'

export const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    error: false,
  },
  reducers: {
    GetAllEvents: (state, action) => {
      state.events = action.payload
    },
    AddEventError: (state, action) => {
      state.error = action.payload
    },
  },
})

export default eventSlice.reducer

export const { GetAllEvents, AddEventError } = eventSlice.actions

export const getAllEvents = (idProvider) => async (dispatch) => {
  const events = await api.get(`/eventos/proveedor/${idProvider}`)
  dispatch(GetAllEvents(events.data))
  dispatch(AddEventError(false))
}

export const addEvent = (cart, id) => async (dispatch) => {
  let event = await api.post('/eventos', {
    cart,
    id,
  })
  console.log(event.response.status)
  if (event.response.status === 400) dispatch(AddEventError(true))
}
