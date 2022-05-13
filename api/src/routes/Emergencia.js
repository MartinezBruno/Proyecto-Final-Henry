const { Router } = require('express')
const express = require('express')
const router = express.Router()

const {emergencia, takeEmergencia, getEmergencias, getEmergenciaUsuario} = require ('../controllers/emergencia')

router.post('/', emergencia)
router.put('/', takeEmergencia)
router.get('/usuario', getEmergenciaUsuario)
router.get('/', getEmergencias)


module.exports = router 