const { Router } = require('express')
const express = require('express')
const router = express.Router()

const {emergencia, takeEmergencia, getEmergencias, getEmergenciaUsuario, finalizarEmergencia} = require ('../controllers/emergencia')

router.post('/', emergencia)
router.put('/', takeEmergencia)
router.get('/usuario', getEmergenciaUsuario)
router.get('/', getEmergencias)
router.delete('/', finalizarEmergencia)

module.exports = router 