const express = require('express')
const router = express.Router()

const { getEvents, createEvent, getProveedorEvents } = require('../controllers/event')
const { compraVerify } = require('../controllers/compraVerify')

router.post('/', compraVerify)
// router.post('/', createEvent)
router.get('/', getEvents)
router.get('/:proveedor_id', getProveedorEvents)

module.exports = router
