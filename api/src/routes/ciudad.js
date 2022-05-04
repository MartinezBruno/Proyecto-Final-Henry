const express = require('express')
const router = express.Router()

const { getCiudades } = require('../controllers/ciudades')

router.get('/:region', getCiudades)

module.exports = router
