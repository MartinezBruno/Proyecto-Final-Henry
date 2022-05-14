const express = require('express')
const router = express.Router()

const { getEvents, getProveedorEvents, createEvent, deleteEvent } = require('../controllers/event')

router.post('/', createEvent)

router.delete('/:id', deleteEvent)

router.get('/:compra_id', getEvents)

router.get('/proveedor/:proveedor_id', getProveedorEvents)

module.exports = router
