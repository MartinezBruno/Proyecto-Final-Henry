const { Router } = require('express')
const express = require('express')
const router = express.Router()

const {emergencia, takeEmergencia, getEmergencias, getEmergenciaUsuario, finalizarEmergencia} = require ('../controllers/emergencia')

router.post('/', emergencia)
router.put('/', takeEmergencia)
router.post('/usuario', getEmergenciaUsuario)
router.patch('/', getEmergencias)
router.delete('/', finalizarEmergencia)

module.exports = router 